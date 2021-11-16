import styled from 'styled-components';
import Card from 'react-bootstrap/Card';
import Movie from '../models/Movie';
import { LinkContainer } from 'react-router-bootstrap';
import { useState } from 'react';

const StyledCardTitle = styled(Card.Title)`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const StyledCardImage = styled(Card.Img)`
  object-fit: cover;
  aspect-ratio: 3 / 4;
  background: url('/movie-cover-placeholder.png');
`;

const MovieCard: React.FC<{ movie: Movie; to: string }> = (props) => {
  const [imgUrl, setImgUrl] = useState(props.movie.image_url);

  return (
    <LinkContainer to={props.to} style={{ height: '100%', cursor: 'pointer' }}>
      <Card>
        <StyledCardImage
          variant='top'
          src={imgUrl}
          alt={props.movie.title}
          onError={() => setImgUrl('/movie-cover-placeholder.png')}
        />
        <Card.Body>
          <StyledCardTitle>{props.movie.title}</StyledCardTitle>
        </Card.Body>
      </Card>
    </LinkContainer>
  );
};

export default MovieCard;
