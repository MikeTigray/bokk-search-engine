const { gql } = require("apollo-server-express");

const typeDef = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    savedBooks: [Book]!
    bookCount: Int
  }
  type Book {
    authors: [String]!
    description: String
    bookId: String
    image: String
    link: String
    title: String!
  }
`;
