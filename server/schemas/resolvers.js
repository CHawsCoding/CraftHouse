const { AuthenticationError } = require('apollo-server-express');
const { User, DIY, Comment } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        // get a user by username
        me: async (parent, args, context) => {
          if (context.user) {
              const userData = await User.findById(context.user._id)
                  .select('-__v -password')
                  .populate('DIYs')
                  .populate({
                      path: 'comments',
                      populate: { path: 'DIY' },
                  });
      
              return userData;
          }
          throw new AuthenticationError('Not logged in');
      },
  
        // get all users
        users: async () => {
            try {
              const usersData = await User.find()
                .select('-__v -password')
                .populate('DIYs')
                .populate({
                  path: 'comments',
                  populate: { path: 'DIY' }, // Populate the DIY field in comments
                });
              return usersData;
            } catch (error) {
              console.error('Error fetching users data:', error);
              throw new Error('Unable to fetch users data');
            }
          },
          
          //this one filters by username //but if username is not provided, it will return all DIYs
          DIYs: async (parent, { username }) => {
            const params = username ? { username } : {};
            const DIYsData = await DIY.find(params)
              .sort({ createdAt: -1 })
              .populate('user')
              .populate('comments')
              .exec();
          
            return DIYsData;
          },
          
          //and here we get all DIYs without filtering any particular user
          allDIYs: async () => {
            try {
                const allDIYsData = await DIY.find().populate('user');
                return allDIYsData;
            } catch (error) {
                console.error('Error fetching all DIYs:', error);
                throw new Error('Unable to fetch DIYs data');
            }
        }
        
        },

    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        },

        // login a user, sign a token
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('No user found with this email address');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);

            return { token, user };
        },
        
        addDIY: async (parent, args, context) => {
          if (context.user) {
            const { title, description, materialsUsed, instructions, images } = args;
        
            const newDIY = {
              title,
              description,
              materialsUsed,
              instructions,
              images,
              user: context.user._id,
            };
        
            const createdDIY = await DIY.create(newDIY);
        
            // Update the user's DIYs field with the newly created DIY
            await User.findByIdAndUpdate(context.user._id, { $push: { DIYs: createdDIY._id } });
        
            // Populate the created DIY and return it
            const populatedDIY = await DIY.findById(createdDIY._id)
              .populate('user')
              .populate('comments')
              .exec();
        
            return populatedDIY;
          }
        
          throw new AuthenticationError('You need to be logged in!');
        },        
        
        addComment: async (_, { DIYId, content }, context) => {
            try {
              if (context.user) {
                const newComment = await Comment.create({
                  content,
                  user: context.user._id,
                  DIY: DIYId,
                });
      
                // Update the DIY's comments field to include the new comment
                await DIY.findByIdAndUpdate(DIYId, { $push: { comments: newComment._id } });
      
                return newComment;
              }
              throw new AuthenticationError('You need to be logged in to add a comment.');
            } catch (error) {
              throw new UserInputError('Failed to add a comment.', { errors: error.errors });
            }
          },

          removeComment: async (_, { commentId }, context) => {
            try {
              if (context.user) {
                // Find the comment to be removed
                const comment = await Comment.findById(commentId);
      
                // Check if the user trying to remove the comment is the comment's author
                if (comment.user.toString() === context.user._id.toString()) {
                  // Remove the comment from the DIY's comments array
                  await DIY.findByIdAndUpdate(comment.DIY, { $pull: { comments: commentId } });
      
                  // Remove the comment document
                  await Comment.findByIdAndRemove(commentId);
      
                  return comment;
                } else {
                  throw new AuthenticationError('You are not authorized to remove this comment.');
                }
              }
              throw new AuthenticationError('You need to be logged in to remove a comment.');
            } catch (error) {
              throw new UserInputError('Failed to remove the comment.', { errors: error.errors });
            }
          },
    
        saveDIY: async (parent, { DIYId }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $push: { savedDIYs: DIYId } },
                    { new: true }
                ).populate('savedDIYs');

                return updatedUser;
            }

            throw new AuthenticationError('You need to be logged in!');
        },
        removeDIY: async (parent, { DIYId }, context) => {
            if (context.user){
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedDIYs: DIYId } },
                    { new: true }
                ).populate('savedDIYs');

                return updatedUser;
            }

            throw new AuthenticationError('You need to be logged in!');
        },
    },
};

module.exports = resolvers;
