import { Reducer } from 'redux';
import { AuthAction, AuthTypes, User } from '../actions/auth-action';

interface AuthState {
  isAuthenticated: boolean;
  currentUser: User | null;
}

const user = localStorage.getItem('currentUser');
const currentUser = user ? (JSON.parse(user) as User) : null;

const initialState: AuthState = {
  isAuthenticated: user ? true : false,
  currentUser,
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
