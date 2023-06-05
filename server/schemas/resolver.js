
const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolver = {
  Query: {
    //fetching information for logged in user with account
    me: async (parent, args, context) => {
      if (context.user) {
        const userData= await User.findOne({ _id: context.user._id });
        return userData;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    //creating a new user with given parameters
    addUser: async (_, { input }) => {
      console.log("addUser resolvers");
      const { username, email, password } = input;
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user: { _id: user._id, username: user.username }};
    },
    login: async (parent, { email, password }) => {
      // looking up user by email
      const user = await User.findOne({ email });

      // If no user found
      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      //checking password is correct
      const correctPw = await user.isCorrectPassword(password);

      // If the password is incorrect
      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      // If email and password are correct allow user to log in
      const token = signToken(user);

      // Return an `Auth` object that consists of the signed token and user's information
      return { token, user };
    },
    
    //creates a new book with given parameters
    saveBook: async (parent, { book: bookInput }, context) => {
      const { author, description, title, bookId, image, link } = bookInput;

      const book = await Book.create({ author, description, title, bookId: bookId, image, link });

      return {
        author,
        description,
        title,
        bookId,
        image,
        link,
      }
    },
    //removes a book by id
    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
        //finding book by id to remove it
        return User.findOneAndUpdate(
          { _id:context.user._id },
          {
            $pull: {
              savedBooks: {
                _id: bookId,
              },
            },
          },
          { new: true }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolver;
