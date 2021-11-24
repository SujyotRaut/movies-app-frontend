import { useState } from 'react';
import MoviesList from '../components/MoviesList';
import Container from 'react-bootstrap/Container';
import { RATED_MOVIES } from '../graphql/queries';
import { useQuery } from '@apollo/client';
import Movie from '../models/Movie';

const RatedMovies: React.FC = (props) => {
  const [page, setPage] = useState(1);
  const { loading, data, error } = useQuery(RATED_MOVIES, {
    variables: { page: page },
  });

  if (error) return <div>Error! Loading</div>;
  if (loading) return <div>Loading...</div>;

  let movies: Array<Movie> = [];
  const watchlist: Array<string> = data.me?.watchlist.map(
    (movie: Movie) => movie.id
  );

  if (watchlist) {
    movies = data.movies.map((movie: Movie) => {
      const m = {
        ...movie,
        addedToWatchlist: watchlist.includes(movie.id),
      };
      return m;
    });
  } else movies = data.movies;

  return (
    <Container>
      <MoviesList movies={movies} />
    </Container>
  );
};

export default RatedMovies;
