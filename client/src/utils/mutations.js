import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_DIY = gql`
  mutation addDIY(
    $title: String!
    $description: String!
    $materialsUsed: [String]
    $instructions: String!
    $images: [String]) 
    {
    addDIY(
      title: $title
      description: $description
      materialsUsed: $materialsUsed
      instructions: $instructions
      images: $images
    ) {
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


export const ADD_COMMENT = gql`

    mutation addComment($DIYId: ID!, $content: String!) {
        addComment(DIYId: $DIYId, content: $content) {
            _id
            content
            createdAt
            user {
                _id
                username
            }
        }
    }
`;

export const REMOVE_COMMENT = gql`
    mutation removeComment($DIYId: ID!, $commentId: ID!) {
        removeComment(DIYId: $DIYId, commentId: $commentId) {
            _id
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

export const SAVE_DIY = gql`
    mutation saveDIY($DIYId: ID!) {
        saveDIY(DIYId: $DIYId) {
            _id
            username
            savedDIYs {
                _id
                title
                description
                materialsUsed
                instructions
                images
            }
        }
    }
`;

export const REMOVE_DIY = gql`
    mutation removeDIY($DIYId: ID!) {
        removeDIY(DIYId: $DIYId) {
            _id
            username
            savedDIYs {
                _id
                title
                description
                materialsUsed
                instructions
                images
            }
        }
    }
`;

