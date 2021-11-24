import { gql } from '@apollo/client';

export const REGISTER = gql`
  mutation Login($name: String!, $email: String!, $password: String!) {
    register(name: $name, email: $email, password: $password) {
      accessToken
      refreshToken
      currentUser {
        id
        name
        email
      }
    }
  }
`;

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      accessToken
      refreshToken
      currentUser {
        id
        name
        email
      }
    }
  }
`;

export const LOGOUT = gql`
  mutation Logout {
    logout
  }
`;

export const ADD_TO_WATCHLIST = gql`
  mutation AddToWatchlist($movieId: ID!) {
    addToWatchlist(id: $movieId)
  }
`;

export const REMOVE_FROM_WATCHLIST = gql`
  mutation RemoveFromWatchlist($movieId: ID!) {
    removeFromWatchlist(id: $movieId)
  }
`;
