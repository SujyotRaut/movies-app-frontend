import { combineReducers } from 'redux';
import { authReducer } from './auth-reducer';
import { watchlistReducer } from './watchlist-reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  watchlist: watchlistReducer,
});

export default rootReducer;
