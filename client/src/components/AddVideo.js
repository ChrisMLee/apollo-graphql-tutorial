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
          console.log("data.videos.edges", data.videos.edges);
          console.log("createVideo", createVideo.video);
          // Add our video from the mutation to the end
          data.videos.edges.push(createVideo.video);
          // Write the data back to the cache
          store.writeQuery({ query: videosListQuery, data });
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
      video {
        id
        title
        __typename
      }
    }
  }
`;
const AddVideoWithMutation = graphql(addVideoMutation)(AddVideo);

export default AddVideoWithMutation;
