const { gql } = require('apollo-server');

const typeDefs = gql`
scalar Upload

type Query {
    me: User
    users: [User]
    DIY(_id: ID!): DIY
    DIYs: [DIY]
    allDIYs: [DIY]

    searchDIYs(searchTerm: String): [DIY]

    getSavedDIYs: [DIY]
    getLikedUsers(DIYId: ID!): [User] 
    getLikes(DIYId: ID!): [Like]    
    getComments(DIYId: ID): [Comment]
}

type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addDIY(title: String!, description: String!, materialsUsed: [String], instructions: String!, images: [String] ): DIY
    
    addComment(DIYId: ID!, content: String!): DIY
    addLike(DIYId: ID!): Like
    saveDIY(DIYId: ID!): User

    removeDIY(DIYId: ID!): User
    removeComment(commentId: ID!): DIY
    removeLike(DIYId: ID!): DIY

}

type Auth {
    token: ID!
    user: User
}

type User {
    _id: ID
    username: String
    email: String
    DIYs: [DIY]
    comments: [Comment]
    likes: [Like]
    savedDIYs: [DIY]
    DIYCount: Int
}

type DIY {
    _id: ID
    title: String
    description: String
    materialsUsed: [String]
    instructions: String
    images: [String]
    user: User!
    comments: [Comment]
    likes: [Like]
}

type Comment {
    _id: ID
    content: String
    user: User
    DIY: DIY
}

type Like {
    _id: ID!
    user: User!
    DIY: DIY!
  }
`;

module.exports = typeDefs;