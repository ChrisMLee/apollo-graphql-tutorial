import React from "react";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import AddVideo from "./AddVideo.js";
import updateVideo from "../graphql/updateVideo";

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

const VideosList = ({ data: { loading, error, videos }, updateVideoFn }) => {
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
      {videos && (
        <ul>
          {videos.edges.map(e => (
            <li
              className={"video " + (e.node.id < 0 ? "optimistic" : "")}
              key={e.node.id}
              onClick={() =>
                updateVideoFn({
                  variables: {
                    title: e.node.title,
                    watched: e.node.watched,
                    duration: e.node.duration
                  }
                })
              }
            >
              {e.node.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

/* POLLING */
// export default graphql(videosListQuery, {
//   options: { pollInterval: 5000 }
// })(VideosList);

/* NON-POLLING */
const VideosListWithData = graphql(videosListQuery)(VideosList);

export default compose(
  graphql(updateVideo, { name: "updateVideoFn" }),
  graphql(videosListQuery)
)(VideosList);
