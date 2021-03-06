import React from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

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

const AddVideo = ({ mutate }) => {
  const handleKeyUp = evt => {
    if (evt.keyCode === 13) {
      evt.persist();
      mutate({
        variables: {
          input: {
            title: evt.target.value,
            duration: 300,
            watched: false,
            clientMutationId: "abcd"
          }
        },
        update: (store, { data: { createVideo } }) => {
          // Read the data from the cache for this query.
          const data = store.readQuery({ query: videosListQuery });
          // Add our video from the mutation to the end
          data.videos.edges.push(createVideo.videoEdge);
          // Write the data back to the cache
          store.writeQuery({ query: videosListQuery, data });
        },
        optimisticResponse: {
          createVideo: {
            __typename: "AddVideoPayload",
            videoEdge: {
              __typename: "VideoEdge",
              node: {
                __typename: "Video",
                title: evt.target.value,
                duration: 300,
                watched: false,
                id: Math.round(Math.random() * -1000000)
              }
            }
          }
        }
      }).then(res => {
        evt.target.value = "";
      });
    }
  };
  return <input type="text" placeholder="New Video" onKeyUp={handleKeyUp} />;
};

const addVideoMutation = gql`
  mutation AddVideoQuery($input: AddVideoInput!) {
    createVideo(input: $input) {
      videoEdge {
        node {
          id
          title
          watched
          duration
        }
      }
    }
  }
`;
const AddVideoWithMutation = graphql(addVideoMutation)(AddVideo);

export default AddVideoWithMutation;
