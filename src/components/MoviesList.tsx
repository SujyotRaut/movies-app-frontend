import { useQuery } from '@apollo/client';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { WATCHLIST } from '../graphql/queries';
import Movie from '../models/Movie';
import MovieCard from './MovieCard';

const MoviesList: React.FC<{ movies: Movie[] }> = (props) => {
  return (
    <Row xs={2} sm={2} md={4} lg={5} className='g-4'>
      {props.movies.map((movie) => (
        <Col key={movie.id}>
          <MovieCard movie={movie} />
        </Col>
      ))}
    </Row>
  );
};

export default MoviesList;
