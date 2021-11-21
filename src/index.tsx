import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
  fromPromise,
  from,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import React from 'react';
import App from './App';

import 'bootstrap/dist/css/bootstrap.min.css';
import store from './store';
import { authLogout, authRefresh } from './actions/auth-action';

export const graphqlUrl = 'http://localhost:4000/graphql';

const httpLink = createHttpLink({
  uri: graphqlUrl,
});

const authLink = setContext((_, { headers }) => {
  const accessToken = localStorage.getItem('accessToken');

  if (accessToken) {
    return {
      headers: {
        ...headers,
        authorization: `Bearer ${accessToken}`,
      },
    };
  }

  return { headers };
});

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        switch (err.extensions.code) {
          case 'TOKEN_EXPIRED':
            // Retry the request, returning the new observable
            const refreshToken = localStorage.getItem('refreshToken');
            if (!refreshToken) return console.log('no refresh Token');
            return fromPromise(
              store.dispatch(authRefresh()).catch((error) => {
                // Handle token refresh errors e.g clear stored tokens, redirect to login, ...
                console.log(error);
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                localStorage.removeItem('currentUser');
                store.dispatch(authLogout());
                return;
              })
            )
              .filter((value) => Boolean(value))
              .flatMap(() => forward(operation)); // Retry request

          // Remove invalid tokens and current user info
          case 'UNAUTHENTICATED':
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('currentUser');
        }
      }
    }

    // To retry on network errors, we recommend the RetryLink
    // instead of the onError link. This just logs the error.
    if (networkError) {
      console.log(`[Network error]: ${networkError}`);
    }
  }
);

const client = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
