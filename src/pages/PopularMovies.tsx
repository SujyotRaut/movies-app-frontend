import Container from 'react-bootstrap/Container';
import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { POPULAR_MOVIES } from '../graphql/queries';
import MoviesList from '../components/MoviesList';
import Movie from '../models/Movie';

const PopularMovies: React.FC = () => {
  const [page, setPage] = useState(1);
  const { loading, data, error } = useQuery(POPULAR_MOVIES, {
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

export default PopularMovies;
