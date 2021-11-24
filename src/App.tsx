import { Redirect, Route, Switch } from 'react-router-dom';
import MyNavbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import MovieDetails from './pages/MovieDetails';
import NotFound from './pages/NotFound';
import PopularMovies from './pages/PopularMovies';
import RatedMovies from './pages/RatedMovies';
import UpcomingMovies from './pages/UpcomingMovies';
import Watchlist from './pages/Watchlist';
import { useAppSelector } from './store';

function App() {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  return (
    <div>
      <MyNavbar />
      <Switch>
        {isAuthenticated && <Redirect from='/login' to='/' />}
        {isAuthenticated && (
          <Route path='/watchlist' children={<Watchlist />} />
        )}
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
