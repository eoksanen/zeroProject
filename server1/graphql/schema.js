const { gql } = require('apollo-server')

const typeDefs = gql`

type User {
    username: String!
    password: String!
    id: ID!
  }
  
  type Token {
    value: String!
  }
  
    type Query {
      me: User
      userCount: Int!
  
    }
    type Mutation {
      createUser(
      username: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
    }
`

  module.export = typeDefs