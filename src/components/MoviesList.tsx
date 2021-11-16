import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Movie from '../models/Movie';
import MovieCard from './MovieCard';

const MoviesList: React.FC<{ movies: Movie[] }> = (props) => {
  return (
    <Row xs={2} sm={2} md={4} lg={5} className='g-4'>
      {props.movies.map((movie) => (
        <Col key={movie.id}>
          <MovieCard movie={movie} to={`/movie/${movie.id}`} />
        </Col>
      ))}
    </Row>
  );
};

export default MoviesList;
