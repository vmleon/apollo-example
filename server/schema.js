const { gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    getCount: Int!
    getPhotos: [Photo!]!
    countPhotos: Int!
    getUsers: [User!]!
    countUsers: Int!
    me: User
  }

  type Mutation {
    incrementCount: Int!
    decrementCount: Int!
    postPhoto(input: PostPhotoInput): Photo!
    githubAuth(code: String!): AuthPayload!
    addFakeUser(count: Int!): [User!]!
  }

  type Photo {
    id: ID!
    name: String!
    description: String
    category: PhotoCategory!
    postedBy: User!
    taggedUsers: [User!]!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type User {
    githubLogin: ID!
    name: String
    avatar: String
    postedPhotos: [Photo!]!
    inPhotos: [Photo!]!
  }

  input PostPhotoInput {
    name: String!
    category: PhotoCategory = PORTRAIT
    description: String
  }

  enum PhotoCategory {
    SELFIE
    PORTRAIT
    ACTION
    LANDSCAPE
    GRAPHIC
  }
`;

module.exports = { typeDefs };
