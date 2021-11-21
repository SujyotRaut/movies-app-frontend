import { Reducer } from 'redux';
import { AuthAction, AuthTypes, User } from '../actions/auth-action';

interface AuthState {
  isAuthenticated: boolean;
  currentUser: User | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  currentUser: null,
};

export const authReducer: Reducer<AuthState, AuthAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case AuthTypes.LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        currentUser: action.currentUser,
      };
    case AuthTypes.LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        currentUser: null,
      };
    default:
      return state;
  }
};
