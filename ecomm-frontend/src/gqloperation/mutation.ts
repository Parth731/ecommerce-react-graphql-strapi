import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation Login($input: UsersPermissionsLoginInput!) {
    login(input: $input) {
      jwt
      user {
        id
        email
        username
        blocked
      }
    }
  }
`;

export const SIGNUP_USER = gql`
  mutation Register($input: UsersPermissionsRegisterInput!) {
    register(input: $input) {
      jwt
      user {
        id
        username
        email
        confirmed
      }
    }
  }
`;
