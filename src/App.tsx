import { Navbar, Container, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Route, Switch } from 'react-router-dom';
import UpcomingMovies from './pages/UpcomingMovies';
import PopularMovies from './pages/PopularMovies';
import MovieDetails from './pages/MovieDetails';
import RatedMovies from './pages/RatedMovies';
import NotFound from './pages/NotFound';
import Home from './pages/Home';

function App() {
  return (
    <div className='App'>
      <Navbar collapseOnSelect bg='light' expand={false} className='mb-4'>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>Movies</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav>
              <LinkContainer to='/' exact>
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
              <LinkContainer to='/upcoming-movies'>
                <Nav.Link>Upcoming</Nav.Link>
              </LinkContainer>
              <LinkContainer to='/popular-movies'>
                <Nav.Link>Popular</Nav.Link>
              </LinkContainer>
              <LinkContainer to='/rated-movies'>
                <Nav.Link>Rated</Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Switch>
        <Route path='/' exact children={<Home />} />
        <Route path='/movie/:id' children={<MovieDetails />} />
        <Route path='/upcoming-movies' children={<UpcomingMovies />} />
        <Route path='/popular-movies' children={<PopularMovies />} />
        <Route path='/rated-movies' children={<RatedMovies />} />
        <Route path='*' children={<NotFound />} />
      </Switch>
    </div>
  );
}

export default App;
