import React from 'react';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN, LOGOUT, REGISTER } from '../graphql/mutations';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContext {
  isAuthenticated: boolean;
  currentUser: User | null;
  registerHandler: (name: string, email: string, password: string) => void;
  loginHandler: (email: string, password: string) => void;
  logoutHandler: () => void;
}

export const authContext = React.createContext<AuthContext>({
  isAuthenticated: false,
  currentUser: null,
  registerHandler: (name: string, email: string, password: string) => {},
  loginHandler: (email: string, password: string) => {},
  logoutHandler: () => {},
});

export const AuthContextProvider: React.FC = (props) => {
  const user = localStorage.getItem('currentUser');
  const currentUser: User | null = user ? JSON.parse(user) : null;

  const [authState, setAuthState] = useState({
    isAuthenticated: user ? true : false,
    currentUser,
  });

  // register mutation
  const [register] = useMutation(REGISTER, {
    variables: {
      name: '',
      email: '',
      password: '',
    },
    onCompleted: (data) => {
      localStorage.setItem('accessToken', data.register.accessToken);
      localStorage.setItem('refreshToken', data.register.refreshToken);
      localStorage.setItem(
        'currentUser',
        JSON.stringify(data.register.currentUser)
      );
      setAuthState({
        isAuthenticated: true,
        currentUser: data.register.currentUser,
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  // login mutation
  const [login] = useMutation(LOGIN, {
    variables: {
      email: '',
      password: '',
    },
    onCompleted: (data) => {
      localStorage.setItem('accessToken', data.login.accessToken);
      localStorage.setItem('refreshToken', data.login.refreshToken);
      localStorage.setItem(
        'currentUser',
        JSON.stringify(data.login.currentUser)
      );
      setAuthState({
        isAuthenticated: true,
        currentUser: data.login.currentUser,
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  // logout mutation
  const [logout] = useMutation(LOGOUT, {
    variables: { refreshToken: '' },
    onCompleted: () => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('currentUser');
      setAuthState({
        isAuthenticated: false,
        currentUser: null,
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const registerHandler = (name: string, email: string, password: string) => {
    register({ variables: { name, email, password } });
  };

  const loginHandler = (email: string, password: string) => {
    login({ variables: { email, password } });
  };

  const logoutHandler = () => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken)
      return console.log('From logoutHandler: no refreshToken');
    logout({ variables: { refreshToken } });
  };

  const contextValue = {
    ...authState,
    registerHandler,
    loginHandler,
    logoutHandler,
  };

  return (
    <authContext.Provider value={contextValue}>
      {props.children}
    </authContext.Provider>
  );
};
