import { gql } from '@apollo/client';

export const MOVIE_DETAILS = gql`
  query MovieDetails($movieId: ID!) {
    movie(id: $movieId) {
      id
      title
      year
      popularity
      description
      content_rating
      movie_length
      rating
      created_at
      trailer
      image_url
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
      image_url
    }
  }
`;

export const POPULAR_MOVIES = gql`
  query PopularMovies($page: Int!) {
    movies(sort: popularity, order: desc, page: $page) {
      id
      title
      image_url
    }
  }
`;

export const RATED_MOVIES = gql`
  query RatedMovies($page: Int!) {
    movies(sort: rating, order: desc, page: $page) {
      id
      title
      image_url
    }
  }
`;
