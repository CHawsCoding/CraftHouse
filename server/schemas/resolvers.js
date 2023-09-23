const { AuthenticationError } = require('apollo-server-express');
const { User, DIY, Comment } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        // get a single user by either their id or their username
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
            return DIY.findOne({ _id })
        },
    },
Mutation: {
    // create a user, sign a token
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
        // save a DIY to a user's `savedDIYs` field by adding it to the set (to prevent duplicates)
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
        // remove a DIY from `savedDIYs`
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
