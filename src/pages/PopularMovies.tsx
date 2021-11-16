import Container from 'react-bootstrap/Container';
import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { POPULAR_MOVIES } from '../graphql/queries';
import MoviesList from '../components/MoviesList';

const PopularMovies: React.FC = () => {
  const [page, setPage] = useState(1);
  const { loading, data, error } = useQuery(POPULAR_MOVIES, {
    variables: { page: page },
  });

  if (error) return <div>Error! Loading</div>;
  if (loading) return <div>Loading...</div>;

  return (
    <Container>
      <MoviesList movies={data.movies} />
    </Container>
  );
};

export default PopularMovies;
