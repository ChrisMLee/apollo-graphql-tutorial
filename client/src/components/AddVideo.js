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
        variables: { title: evt.target.value },
        refetchQueries: [{ query: videosListQuery }]
      }).then(res => {
        evt.target.value = "";
      });
    }
  };
  return <input type="text" placeholder="New Video" onKeyUp={handleKeyUp} />;
};

const addVideoMutation = gql`
  mutation createVideo($title: String!) {
    createVideo(video: { title: $title, duration: 300, watched: false }) {
      id
      title
    }
  }
`;
const AddVideoWithMutation = graphql(addVideoMutation)(AddVideo);

export default AddVideoWithMutation;
