import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import {ApolloClient} from "apollo-client"
import gql from 'graphql-tag';

import {
  graphql,
  ApolloProvider
} from "react-apollo"

import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const client = new ApolloClient({
  // By default, this client will send queries to the
  //  `/graphql` endpoint on the same host
  link: new HttpLink(),
  cache: new InMemoryCache()
});

const channelsListQuery = gql(`
  query ChannelsListQuery {
    channels{
      id
      name
    }
  }
`)

const ChannelsList = ({ data: {loading, error, channels }}) => {
  if (loading) {
    return <p>Loading ...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }
  return <ul>
    { channels.map( ch => <li key={ch.id}>{ch.name}</li> ) }
  </ul>;
};

const ChannelsListWithData = graphql(channelsListQuery)(ChannelsList)

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to Apollo</h1>
          </header>
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
          <ChannelsListWithData />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
