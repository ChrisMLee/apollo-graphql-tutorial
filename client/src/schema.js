export const typeDefs = `
type Channel {
  id: ID!
  name: String
}

type Query{
  channels: [Channel]
}

query ChannelsListQuery {
  channels{
    id
    name
  }
}`;
