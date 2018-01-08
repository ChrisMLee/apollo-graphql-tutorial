import gql from "graphql-tag";

export default gql`
  mutation updateVideo($title: String!, $duration: Int!, $watched: Boolean!) {
    updateVideo(title: $title, duration: $duration, watched: $watched) @client {
      title
      duration
      watched
    }
  }
`;
