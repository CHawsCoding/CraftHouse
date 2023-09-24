const { AuthenticationError } = require('apollo-server-express');
const { User, DIY, Comment } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        // get a user by username
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-__v -password')
                    .populate('DIYs')
                    .populate('comments');

                return userData;
            }

            throw new AuthenticationError('Not logged in');
        },
        // get all users
        users: async () => {
            return User.find()
                .select('-__v -password')
                .populate('DIYs')
                .populate('comments');
        },
        
        DIYs: async (parent, { username }) => {
            const params = username ? { username } : {};
            return DIY.find(params).sort({ createdAt: -1 });
        },
        DIY: async (parent, { _id }) => {
            return DIY.findOne({ _id });
        },
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

                return createdDIY;
            }

            throw new AuthenticationError('You need to be logged in!');
        },

        addComment: async (parent, { DIYId, content }, context) => {
            if (context.user) {
                const updatedDIY = await DIY.findOneAndUpdate(
                    { _id: DIYId },
                    { $push: { comments: { content, user: context.user._id } } },
                    { new: true, runValidators: true }
                );

                return updatedDIY;
            }

            throw new AuthenticationError('You need to be logged in!');
        },

        removeComment: async (parent, { DIYId, commentId }, context) => {
            if (context.user) {
                const updatedDIY = await DIY.findOneAndUpdate(
                    { _id: DIYId },
                    { $pull: { comments: { _id: commentId } } },
                    { new: true }
                );
                    
                return updatedDIY;
            }

            throw new AuthenticationError('You need to be logged in!');
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
