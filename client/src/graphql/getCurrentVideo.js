import gql from "graphql-tag";

export default gql`
  query {
    currentVideo @client {
      title
      duration
      watched
    }
  }
`;
