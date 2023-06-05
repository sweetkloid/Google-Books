
const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
  
    //fetching information for logged in user with account
    me: async (parent, args, context) => {
      if (context.user) {
        const userData= await User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    //creating a new user with given parameters
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
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

      const book = await book.create({ author, description, title, bookId: bookId, image, link });

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
        return Book.findOneAndUpdate(
          { _id: bookId },
          {
            $pull: {
              books: {
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

module.exports = resolvers;
