const { gql } = require("apollo-server-express");

const typeDef = gql`
  type User {
    _id: ID
    username: String
    email: String
    savedBooks: [Book]!
    bookCount: Int
  }
  type Auth {
    token: ID!
    user: User
  }
  type Book {
    authors: [String]!
    description: String
    bookId: String
    image: String
    link: String
    title: String!
  }
  input InputBook {
    bookId: String
    authors: [String]
    title: String
    description: String
    image: String
    link: String
  }
  type Query {
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(book: InputBook!): User
    removeBook(bookId: ID!): User
  }
`;
module.exports = typeDef;
