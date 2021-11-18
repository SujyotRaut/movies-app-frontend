import React, { useContext } from 'react';
import Button from 'react-bootstrap/esm/Button';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Nav from 'react-bootstrap/esm/Nav';
import Navbar from 'react-bootstrap/esm/Navbar';
import NavDropdown from 'react-bootstrap/esm/NavDropdown';
import Row from 'react-bootstrap/esm/Row';
import LinkContainer from 'react-router-bootstrap/lib/LinkContainer';
import Image from 'react-bootstrap/esm/Image';
import { authContext } from '../store/auth-context';

const MyNavbar: React.FC = () => {
  const { currentUser, logoutHandler } = useContext(authContext);
  return (
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
              {!currentUser && (
                <LinkContainer to='/login'>
                  <NavDropdown.Item>Login/Register</NavDropdown.Item>
                </LinkContainer>
              )}

              {/* show profile info and watch list if logged in */}
              {currentUser && (
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
                      <h5>{currentUser.name}</h5>
                      <h5>{currentUser.email}</h5>
                    </Col>
                    <Button onClick={logoutHandler}>Logout</Button>
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
  );
};

export default MyNavbar;
