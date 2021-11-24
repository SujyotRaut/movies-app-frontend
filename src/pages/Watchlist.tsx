import { useQuery } from '@apollo/client';
import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import MoviesList from '../components/MoviesList';
import { WATCHLIST } from '../graphql/queries';
import Movie from '../models/Movie';

const Watchlist: React.FC = (props) => {
  const [page, setPage] = useState(1);
  const { loading, data, error } = useQuery(WATCHLIST);

  if (error) return <div>Error! Loading</div>;
  if (loading) return <div>Loading...</div>;

  let movies: Array<Movie> =
    data.me?.watchlist.map((movie: Movie) => ({
      ...movie,
      addedToWatchlist: true,
    })) ?? Array<Movie>();

  return (
    <Container>
      <MoviesList movies={movies} />
    </Container>
  );
};

export default Watchlist;
