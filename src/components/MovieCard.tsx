import { useMutation } from '@apollo/client';
import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/esm/Button';
import { LinkContainer } from 'react-router-bootstrap';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { ADD_TO_WATCHLIST, REMOVE_FROM_WATCHLIST } from '../graphql/mutations';
import Movie from '../models/Movie';
import { useAppSelector } from '../store';

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

const MovieCard: React.FC<{ movie: Movie }> = (props) => {
  const [imgUrl, setImgUrl] = useState(props.movie.imageUrl);
  const [addedToWatchlist, setAddedToWatchlist] = useState(
    props.movie.addedToWatchlist ? true : false
  );

  const history = useHistory();

  const { isAuthenticated } = useAppSelector((state) => state.auth);

  // Add to watchlist Mutation
  const [addToWatchList, { loading: adding }] = useMutation(ADD_TO_WATCHLIST, {
    variables: { movieId: props.movie.id },
    onCompleted: () => setAddedToWatchlist(true),
  });

  // Remove from watchlist Mutation
  const [removeFromWatchList, { loading: removing }] = useMutation(
    REMOVE_FROM_WATCHLIST,
    {
      variables: { movieId: props.movie.id },
      onCompleted: () => setAddedToWatchlist(false),
    }
  );

  const addHandler = () => {
    if (!isAuthenticated) return history.push('/login');
    addToWatchList();
  };

  const removeHandler = () => {
    if (!isAuthenticated) return history.push('/login');
    removeFromWatchList();
  };

  return (
    <Card style={{ height: '100%', cursor: 'pointer' }}>
      <LinkContainer to={`/movie/${props.movie.id}`}>
        <StyledCardImage
          variant='top'
          src={imgUrl}
          alt={props.movie.title}
          onError={() => setImgUrl('/movie-cover-placeholder.png')}
        />
      </LinkContainer>
      <Card.Body>
        <StyledCardTitle>{props.movie.title}</StyledCardTitle>
        {addedToWatchlist ? (
          <Button onClick={removeHandler}>Remove</Button>
        ) : (
          <Button onClick={addHandler}>Add</Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default MovieCard;
