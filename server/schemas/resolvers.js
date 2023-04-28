const { Books, User } = require("../models");

const resolvers = {
  Query: {
    User: async () => {
      return User.find({});
    },
    User: async (_, { id }) => {
      return User.findOne({ _id: id });
    },

    bookTitle: async () => {
      return Books.find({});
    },
  },
};

module.exports = resolvers;
