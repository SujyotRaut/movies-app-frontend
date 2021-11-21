import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store';
import { graphqlUrl } from '..';

//#region Auth Action Types
export interface User {
  id: string;
  name: string;
  email: string;
}

export enum AuthTypes {
  LOGIN = 'auth/login',
  LOGOUT = 'auth/logout',
}

interface LoginAction extends Action {
  type: AuthTypes.LOGIN;
  currentUser: User;
}

interface LogoutAction extends Action {
  type: AuthTypes.LOGOUT;
}

export type AuthAction = LoginAction | LogoutAction;
//#endregion

//#region Synchronous Acton Creators
// Login action creator
export const authLogin: ActionCreator<AuthAction> = (currentUser: User) => {
  return {
    type: AuthTypes.LOGIN,
    currentUser,
  };
};

// Logout action creator
export const authLogout: ActionCreator<AuthAction> = () => {
  return {
    type: AuthTypes.LOGOUT,
  };
};
//#endregion

// Refresh tokens async action creator
export const authRefresh: ActionCreator<
  ThunkAction<Promise<AuthAction>, RootState, undefined, AuthAction>
> = () => async (dispatch, getState) => {
  const token = localStorage.getItem('refreshToken') || '';
  const refreshTokenQuery = {
    query: `
    mutation {
      refresh_token(refresh_token: \"${token}\") {
        accessToken
        refreshToken
        currentUser
      }
    }
  `,
  };

  // Send refresh token request
  const response = await fetch(graphqlUrl, {
    // mode: 'no-cors',
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(refreshTokenQuery),
  });

  const jsonResponse = await response.json();

  const { accessToken, refreshToken, currentUser } =
    jsonResponse.data.refresh_token;

  // Save new tokens to local storage
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
  localStorage.setItem('currentUser', JSON.stringify(currentUser));

  // Dispatch login action with current user
  return dispatch(authLogin(currentUser));
};
