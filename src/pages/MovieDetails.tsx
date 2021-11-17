import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import { MOVIE_DETAILS } from '../graphql/queries';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';

type P = {
  [id: string]: string;
};

interface I {
  [id: string]: string;
}

const MovieDetails: React.FC = (props) => {
  const { id } = useParams<{ id: string }>();

  const { loading, data, error } = useQuery(MOVIE_DETAILS, {
    variables: { movieId: id },
  });

  if (error) return <div>Error! Loading</div>;
  if (loading) return <div>Loading...</div>;

  return (
    <Container>
      <Row>
        <Col xs='12' sm='4'>
          <Image src={data.movie.image_url} style={{ width: '100%' }} />
        </Col>
        <Col>
          <span>{data.movie.title}</span>
        </Col>
      </Row>
      {/* <Image src={data.movie.image_url} />
      <span>{data.movie.title}</span> */}
    </Container>
  );
};

export default MovieDetails;
