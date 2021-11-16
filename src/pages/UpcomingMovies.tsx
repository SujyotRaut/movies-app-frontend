import { useState } from 'react';
import MoviesList from '../components/MoviesList';
import Container from 'react-bootstrap/Container';
import { UPCOMING_MOVIES } from '../graphql/queries';
import { useQuery } from '@apollo/client';

const UpcomingMovies: React.FC = (props) => {
  const [page, setPage] = useState(1);
  const { loading, error, data } = useQuery(UPCOMING_MOVIES, {
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

export default UpcomingMovies;
