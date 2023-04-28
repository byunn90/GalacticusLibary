const { Books, User } = require("../models");

const resolvers = {
  Query: {
    User: async () => {
      return User.find({});
    },
    User: async (_, { id }) => {
      return User.findOne({ _id: id });
    },
    Mutation: {
      login: async (_, { _id }) => {},
      addUser: async () => {},
      saveBook: async () => {},
      removeBook: async () => {},
    },
  },
};

module.exports = resolvers;
