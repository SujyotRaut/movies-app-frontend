import { Redirect, Route, Switch } from 'react-router-dom';
import UpcomingMovies from './pages/UpcomingMovies';
import PopularMovies from './pages/PopularMovies';
import MovieDetails from './pages/MovieDetails';
import RatedMovies from './pages/RatedMovies';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import Login from './pages/Login';
import MyNavbar from './components/Navbar';
import { useContext } from 'react';
import { authContext } from './store/auth-context';

function App() {
  const { currentUser } = useContext(authContext);

  return (
    <div>
      <MyNavbar />
      <Switch>
        {currentUser && <Redirect from='/login' to='/' />}
        <Route path='/' exact children={<Home />} />
        <Route path='/login' children={<Login />} />
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
