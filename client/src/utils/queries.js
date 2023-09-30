import { gql } from "@apollo/client";

//a query to get the logged in user's data
export const GET_ME = gql`
query Me {
    me {
      _id
      username
      email
      DIYs {
        _id
        title
        description
        materialsUsed
        instructions
        images
        user {
          _id
          username
        }
      }
    }
  }
`;
//get single User by _id
export const GET_USER = gql`
query GetUser($_id: ID!) {
  user(_id: $_id) {
    username
  }
}
`;

//a query to get all users
export const QUERY_USERS = gql`
query GetAllUsers {
    users {
      _id
      username
      email
      DIYs {
        _id
        title
        description
        materialsUsed
        instructions
        images
        createdAt
        user {
          _id
          username
        }
        comments {
          _id
          content
          createdAt
          user {
            _id
            username
          }
        }
      }
    }
  }
`;
  

//a query to get all DIYs
export const GET_ALL_DIYS = gql`
  query GetDIYs {
    DIYs {
      _id
      title
      description
      materialsUsed
      instructions
      images
      user {
        _id
        username
      }
    }
  }
`;

//a query to get a single DIY by its _id
export const QUERY_DIY = gql`
query GetDIY($id: ID!) {
    DIY(_id: $id) {
      _id
      title
      description
      materialsUsed
      instructions
      images
      user {
        _id
        username
      }
     }
  }
`;

//a query to get a single user by their username
export const GET_USER_BY_USERNAME = gql`
query GetDIYsByUsername($username: String!) {
    DIYs(username: $username) {
      _id
      title
      description
      materialsUsed
      instructions
      images
      createdAt
      user {
        _id
        username
      }
      comments {
        _id
        content
        createdAt
        user {
          _id
          username
        }
      }
    }
  }
`;  

export const SEARCH_DIYS = gql`
  query searchDIYs($searchTerm: String!) {
    searchDIYs(searchTerm: $searchTerm) {
      _id
      title
      description
    }
  }
`;

//get all comments for a single DIY
export const GET_COMMENTS = gql`
query GetComments($DIYId: ID!) {
  getComments(DIYId: $DIYId) {
    _id
    content
    user {
      _id
      username
    }
  }
}
`;

// Get all Likes for a single DIY
export const GET_LIKES = gql`
  query GetLikes($DIYId: ID!) {
    getLikes(DIYId: $DIYId) {
      _id
      user {
        _id
      }
    }
  }
`;
// Get all liked users for a single DIY
export const GET_LIKED_USERS = gql`
  query GetLikedUsers($DIYId: ID!) {
    getLikedUsers(DIYId: $DIYId) {
      _id
      username
    }
  }
`;

//get all saved DIYs for a single user
export const GET_SAVED_DIYS = gql`
query GetSavedDIYs {
  getSavedDIYs {
    _id
    title
    description
    images
  }
}
`;
