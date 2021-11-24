import { Action, ActionCreator } from 'redux';

//#region Watchlist Action Types
export enum WatchlistTypes {
  ADD = 'watchlist/add',
  REMOVE = 'watchlist/remove',
}

interface AddAction extends Action {
  type: WatchlistTypes.ADD;
  movieId: string;
}

interface RemoveAction extends Action {
  type: WatchlistTypes.REMOVE;
  movieId: string;
}

export type WatchlistAction = AddAction | RemoveAction;
//#endregion

export const addToWatchlist: ActionCreator<WatchlistAction> = (
  movieId: string
) => {
  return {
    type: WatchlistTypes.ADD,
    movieId,
  };
};

export const removeFromWatchlist: ActionCreator<WatchlistAction> = (
  movieId: string
) => {
  return {
    type: WatchlistTypes.REMOVE,
    movieId,
  };
};
