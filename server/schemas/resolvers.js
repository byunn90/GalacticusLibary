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
      saveBook: async (_, { book }, Content) => {},
      removeBook: async (_, { _id }) => {
        const remove = await Book.findByIdAndRemove(_id);
        return remove;
      },
    },
  },
};

module.exports = resolvers;
