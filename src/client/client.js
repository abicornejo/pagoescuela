import {ApolloClient, ApolloLink, InMemoryCache, HttpLink } from "@apollo/client";
let config = require('./../_config/config');
const httpLink = new HttpLink({ uri: config.urlDevelopment });
const authLink = new ApolloLink((operation, forward) => {
    // Retrieve the authorization token from local storage.
    const token = localStorage.getItem('user');
    let user = JSON.parse(localStorage.getItem('user'));
    // Use the setContext method to set the HTTP headers.
    operation.setContext({
        headers: {
            authorization: user && user.token ? `Bearer ${user.token}` : ''
        }
    });

    // Call the next link in the middleware chain.
    return forward(operation);
});


export const client = new ApolloClient({
    link: authLink.concat(httpLink), // Chain it with the HttpLink
    cache: new InMemoryCache(),
})


export default client;
