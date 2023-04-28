const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Profile {
    _id: ID!
    name: String!
  }
  type Book {
    _id: ID!
    authors: [String!]!
    description: String!
    title: String!
    image: String
    link: String
  }
  type Author {
    _id: ID!
    name: String!
  }
  type User {
    username: String!
    email: String!
    password: String!
    savedBooks: [Book]
    bookCount: Int!
  }
`;

module.exports = typeDefs;
