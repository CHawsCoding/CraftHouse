const { gql } = require('apollo-server');

const typeDefs = gql`
type Query {
    me: User
    users: [User]
    DIYs: [DIY]
    DIY(_id: ID!): DIY
    comment(_id: ID!): Comment
}

type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addDIY(title: String!, description: String!, materialsUsed: [String], instructions: String!, images: [String] ): DIY
    addComment(content: String!): Comment
    saveDIY(DIYId: ID!): User
    removeDIY(DIYId: ID!): User
    removeComment(commentId: ID!): DIY
}

type Auth {
    token: String
    user: User
}

type User {
    _id: ID
    username: String
    email: String
    DIYs: [DIY]
    comments: [Comment]
}

type DIY {
    _id: ID
    title: String
    description: String
    materialsUsed: [String]
    instructions: String
    images: [String]
    user: User
    comments: [Comment]
}

type Comment {
    _id: ID
    content: String
    user: User
    DIY: DIY
}

`;

module.exports = typeDefs;