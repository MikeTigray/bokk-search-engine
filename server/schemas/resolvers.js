const { User } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");
const { findOneAndUpdate } = require("../models/User");

const resolvers = {
  Query: {
    me: async (parent, {}, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user.id }).select(
          "-__v -password"
        );
      } else {
        throw new AuthenticationError("Please log in!");
      }
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user with this email was found!");
      }
      //   User schema has a isCorrectPassword method
      const password = await user.isCorrectPassword(password);
      if (!password) {
        throw new AuthenticationError("Incorrect credentials");
      }
      const token = signToken(user);

      return { token, user };
    },
    saveBook: async (parent, { book }, context) => {
      if (context.user) {
        const user = findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: book } },
          { new: true }
        );
        return user;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    removeBook: (parent, { bookId }, context) => {
      if (context.user) {
        const user = User.findOneAndUpdate(
          {
            _id: context.user._id,
          },
          {
            $pull: { savedBooks: bookId },
          },
          { new: true }
        );
        return user;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};
