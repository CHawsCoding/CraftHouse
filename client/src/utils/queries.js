import { gql } from "@apollo/client";

//a query to get the logged in user's data
export const GET_ME = gql`
    query me {
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
                createdAt
            }
            comments {
                _id
                content
                createdAt
                DIY {
                    _id
                    title
                }
            }
        }
    }
`;

//a query to get all DIYs
export const QUERY_DIYS = gql`
    query getDIYs($username: String) {
        DIYs(username: $username) {
            _id
            title
            description
            materialsUsed
            instructions
            images
            createdAt
        }
    }
`;
//a query to get a single DIY by its _id
export const QUERY_DIY = gql`
    query getDIY($id: ID!) {
        DIY(_id: $id) {
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
                createdAt
                content
                user {
                    _id
                    username
                }
            }
        }
    }
`;

