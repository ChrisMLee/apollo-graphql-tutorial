import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

import { ApolloClient } from "apollo-client";
import gql from "graphql-tag";

import { graphql, ApolloProvider } from "react-apollo";

import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

const link = new HttpLink({
  uri: "/graphql"
});

const client = new ApolloClient({
  // By default, this client will send queries to the
  //  `/graphql` endpoint on the same host
  link,
  cache: new InMemoryCache()
});

const videosListQuery = gql(`
  query VideosListQuery {
    videos{
      edges{
        node{
          id
          watched
          duration
          title
        }
      }
    }
  }
`);

const VideosList = ({ data: { loading, error, videos } }) => {
  console.log("videos", videos);
  if (loading) {
    return <p>Loading ...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }
  return (
    <ul>{videos.edges.map(e => <li key={e.node.id}>{e.node.title}</li>)}</ul>
  );
};

const VideosListWithData = graphql(videosListQuery)(VideosList);

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
          <VideosListWithData />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
