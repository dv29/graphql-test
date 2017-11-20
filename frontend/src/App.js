import React, { Component } from 'react';
import Search from './components/search/Search'
import { ApolloClient, createNetworkInterface, ApolloProvider } from 'react-apollo';

const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: `http://localhost:${process.env.REACT_APP_SERVER_PORT}/graphql`,
    batchInterval: 10,
  }),
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Search />
      </ApolloProvider>
    );
  }
}

export default App;
