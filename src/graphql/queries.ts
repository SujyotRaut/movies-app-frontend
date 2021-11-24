import { gql } from '@apollo/client';

export const USER = gql`
  query Me {
    me {
      id
      name
      email
    }
  }
`;

export const WATCHLIST = gql`
  query Query {
    me {
      watchlist {
        id
        title
        imageUrl
      }
    }
  }
`;

export const MOVIE_DETAILS = gql`
  query MovieDetails($movieId: ID!) {
    movie(id: $movieId) {
      id
      title
      year
      popularity
      description
      contentRating
      movieLength
      rating
      createdAt
      trailer
      imageUrl
      release
      plot
      banner
      type
      genres {
        id
        genre
      }
      keywords {
        id
        keyword
      }
    }
  }
`;

export const UPCOMING_MOVIES = gql`
  query UpcomingMovies($page: Int!) {
    movies(sort: popularity, order: desc, page: $page) {
      id
      title
      imageUrl
    }

    me {
      watchlist {
        id
      }
    }
  }
`;

export const POPULAR_MOVIES = gql`
  query PopularMovies($page: Int!) {
    movies(sort: popularity, order: desc, page: $page) {
      id
      title
      imageUrl
    }
  }
`;

export const RATED_MOVIES = gql`
  query RatedMovies($page: Int!) {
    movies(sort: rating, order: desc, page: $page) {
      id
      title
      imageUrl
    }
  }
`;
