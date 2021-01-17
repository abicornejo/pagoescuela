import 'react-app-polyfill/ie11';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { store } from './_helpers';
import './App.scss';
import App  from './App/App';
import * as serviceWorker from './serviceWorker';
import { HashRouter, BrowserRouter } from 'react-router-dom'
import ScrollToTop from './ScrollToTop';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';

// const client = new ApolloClient({
//     uri: 'http://18.192.6.172:8000/graphql',
//     cache: new InMemoryCache()
// })

import {client} from './client/client';

render(
    <Provider store={store}>
        <HashRouter>
            <ScrollToTop>
                <ApolloProvider client={client}>
                <App />
                </ApolloProvider>
            </ScrollToTop>
        </HashRouter>
    </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
