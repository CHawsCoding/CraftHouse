import { gql } from '@apollo/client';

// Define a unique subscription operation name for each subscription
export const NEW_DIY_SUBSCRIPTION = gql`
  subscription NewDIY {
    newDIY {
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

// export const NEW_COMMENT_SUBSCRIPTION = gql`
export const NEW_COMMENT_SUBSCRIPTION = gql`
  subscription NewComment($DIYId: ID!) {
    newComment(DIYId: $DIYId) {
      _id
      content
      user {
        _id
        username
      }
    }
  }
`;

export const NEW_LIKE_SUBSCRIPTION = gql`
  subscription NewLike($DIYId: ID!) {
    newLike(DIYId: $DIYId) {
      _id
      user {
        _id
        username
      }
    }
  }
`;

export const SAVED_DIY_SUBSCRIPTION = gql`
  subscription SavedDIY($DIYId: ID!) {
    savedDIY(DIYId: $DIYId) {
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
