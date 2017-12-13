import React from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import AddVideo from "./AddVideo.js";

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
    <div>
      <AddVideo />
      <ul>{videos.edges.map(e => <li key={e.node.id}>{e.node.title}</li>)}</ul>
    </div>
  );
};

const VideosListWithData = graphql(videosListQuery)(VideosList);

export default VideosListWithData;
