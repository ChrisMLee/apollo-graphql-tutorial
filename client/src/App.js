import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

import { ApolloClient } from "apollo-client";
import gql from "graphql-tag";

import { graphql, ApolloProvider } from "react-apollo";

import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import VideosListWithData from "./components/VideosListWithData";
import FeaturedVideo from "./components/FeaturedVideo";
import { withClientState } from "apollo-link-state";
import { ApolloLink } from "apollo-link";

const cache = new InMemoryCache();

const defaultState = {
  currentVideo: {
    __typename: "CurrentVideo",
    title: "Untitled",
    duration: 0,
    watched: false
  }
};

const stateLink = withClientState({
  cache,
  defaults: defaultState,
  resolvers: {
    Mutation: {
      updateVideo: (_, { title, duration, watched }, { cache }) => {
        const query = gql`
          query GetCurrentVideo {
            currentVideo @client {
              title
              duration
              watched
            }
          }
        `;
        const data = {
          currentVideo: {
            __typename: "CurrentVideo",
            title: title,
            duration: duration,
            watched: watched
          }
        };
        cache.writeQuery({ query, data });
      }
    }
  }
});

const client = new ApolloClient({
  // By default, this client will send queries to the
  //  `/graphql` endpoint on the same host
  link: ApolloLink.from([
    stateLink,
    new HttpLink({
      uri: "/graphql"
    })
  ]),
  cache
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to Apollo</h1>
          </header>
          <FeaturedVideo />
          <VideosListWithData />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
