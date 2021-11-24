import { Reducer } from 'redux';
import { WatchlistAction, WatchlistTypes } from '../actions/watchlist-action';

interface WatchlistState {
  watchlist: Array<string>;
}

const initialState: WatchlistState = {
  watchlist: [],
};

export const watchlistReducer: Reducer<WatchlistState, WatchlistAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case WatchlistTypes.ADD:
      return {
        watchlist: state.watchlist.concat(action.movieId),
      };
    case WatchlistTypes.REMOVE:
      return {
        watchlist: state.watchlist.filter(
          (movieId) => movieId !== action.movieId
        ),
      };
    default:
      return state;
  }
};
