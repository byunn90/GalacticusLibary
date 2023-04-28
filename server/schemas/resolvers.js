const { User, Book } = require("../models");

const resolvers = {
  Query: {
    User: async () => {
      return User.find({});
    },
    User: async (_, { id }) => {
      return User.findOne({ _id: id });
    },
    Mutation: {
      login: async (_, { email, password }) => {
        const user = await User.findOne({ email });
        if (!user) {
          throw new error("Invalid email or password");
        }

        // Check the password
        const isValidPassword = await User.findOne({ password });
        if (!isValidPassword) {
          throw new error("Invalid email or password");
        }
        return user;
      },
      // Create a new user
      addUser: async (_, { username, email, password }) => {
        const user = await User.create({ username, email, password });
        return user;
      },
      // saveBook
      saveBook: async (_, { book }, context) => {
        // Check if the user is logged in
        if (!context.user) {
          throw new Error("You must be logged in to save a book!");
        }

        // Get the user's ID from the context object
        const userId = context.user._id;

        // Find the user in the database
        const user = await User.findById(userId);

        // Create a new Book object with the necessary fields
        const newBook = new Book({
          title: book.title,
          authors: book.authors,
          description: book.description,
          bookId: book.bookId,
          image: book.image,
          link: book.link,
        });

        // Add the new book to the user's savedBooks array
        user.savedBooks.push(newBook);

        // Save the changes to the database
        await user.save();

        // Return the updated user object
        return user;
      },
      removeBook: async (_, { _id }) => {
        const remove = await Book.findByIdAndRemove(_id);
        return remove;
      },
    },
  },
};

module.exports = resolvers;
