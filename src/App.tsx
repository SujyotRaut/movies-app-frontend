import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Image,
  Row,
  Col,
  Button,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Route, Switch } from 'react-router-dom';
import UpcomingMovies from './pages/UpcomingMovies';
import PopularMovies from './pages/PopularMovies';
import MovieDetails from './pages/MovieDetails';
import RatedMovies from './pages/RatedMovies';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import Login from './pages/Login';
import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { USER } from './graphql/queries';
import React from 'react';
import { LOGOUT } from './graphql/mutations';

export const authContext = React.createContext<{
  isAuthenticated?: boolean;
  setIsAuthenticated?: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  isAuthenticated: undefined,
  setIsAuthenticated: undefined,
});

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const { data, loading } = useQuery(USER, { pollInterval: 500 });
  console.log(data);

  const [logout] = useMutation(LOGOUT, {
    variables: { refreshToken: '' },
    onCompleted: () => {
      localStorage.setItem('accessToken', '');
      localStorage.setItem('refreshToken', '');
      setIsAuthenticated(false);
    },
  });
  return (
    <div>
      <authContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
        <Navbar collapseOnSelect bg='light' expand={false} className='mb-2'>
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
                <NavDropdown title='Profile' id='collasible-nav-dropdown'>
                  {/* show login/register if not logged in */}
                  {!isAuthenticated && (
                    <LinkContainer to='/login'>
                      <NavDropdown.Item>Login/Register</NavDropdown.Item>
                    </LinkContainer>
                  )}

                  {/* show profile info and watch list if logged in */}
                  {isAuthenticated && !loading && (
                    <>
                      <Row>
                        <Col xs='4'>
                          <Image
                            src='/logo192.png'
                            roundedCircle
                            style={{ width: '100%' }}
                          />
                        </Col>
                        <Col>
                          <h5>{data.me.name}</h5>
                          <h5>{data.me.email}</h5>
                        </Col>
                        <Button
                          onClick={() => {
                            logout({
                              variables: {
                                refreshToken:
                                  localStorage.getItem('refreshToken') || '',
                              },
                            });
                          }}
                        >
                          Logout
                        </Button>
                      </Row>

                      <NavDropdown.Divider />

                      <LinkContainer to='/watchlist'>
                        <NavDropdown.Item>Watchlist</NavDropdown.Item>
                      </LinkContainer>
                    </>
                  )}
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Switch>
          <Route path='/' exact children={<Home />} />
          <Route path='/login' children={<Login />} />
          <Route path='/movie/:id' children={<MovieDetails />} />
          <Route path='/upcoming-movies' children={<UpcomingMovies />} />
          <Route path='/popular-movies' children={<PopularMovies />} />
          <Route path='/rated-movies' children={<RatedMovies />} />
          <Route path='*' children={<NotFound />} />
        </Switch>
      </authContext.Provider>
    </div>
  );
}

export default App;
