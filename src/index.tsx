import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  from,
  fromPromise,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { authLogout, authRefresh } from './actions/auth-action';
import App from './App';
import store from './store';

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
            return fromPromise(store.dispatch(authRefresh()))
              .filter((value) => Boolean(value))
              .flatMap(() => forward(operation)); // Retry request

          // Remove invalid tokens and current user info
          case 'UNAUTHENTICATED':
            store.dispatch(authLogout());
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
    <Provider store={store}>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ApolloProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
