import React from "react";
import { graphql, compose } from "react-apollo";
import getCurrentVideo from "../graphql/getCurrentVideo";

const FeaturedVideo = props => {
  return (
    <div>
      <h3>Featured Video: {props.currentVideo.title}</h3>
      <p>watched: {String(props.currentVideo.watched)}</p>
      <p>duration: {props.currentVideo.duration}</p>
    </div>
  );
};
export default compose(
  graphql(getCurrentVideo, {
    props: ({ data: { currentVideo } }) => ({
      currentVideo
    })
  })
)(FeaturedVideo);
