import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { graphqlUrl } from '..';
import { RootState } from '../store';

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
export const authLogin: ActionCreator<AuthAction> = (
  accessToken: string,
  refreshToken: string,
  currentUser: User
) => {
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
  localStorage.setItem('currentUser', JSON.stringify(currentUser));
  return {
    type: AuthTypes.LOGIN,
    currentUser,
  };
};

export const authLogout: ActionCreator<AuthAction> = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('currentUser');
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
      refresh(refreshToken: "${token}") {
        accessToken
        refreshToken
        currentUser {
          id
          name
          email
        }
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

  if (!jsonResponse.data) return dispatch(authLogout());

  const { accessToken, refreshToken, currentUser } = jsonResponse.data.refresh;

  // Dispatch login action with accessToken, refreshToken and current user
  return dispatch(authLogin(accessToken, refreshToken, currentUser));
};
