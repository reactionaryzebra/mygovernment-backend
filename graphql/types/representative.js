export default `
type Representative {
  office: String!
  name: String!
  party: String!
  phones: [String!]!
  urls: [String!]!
  photoUrl: String!
  channels: [Channel!]!
  roles: [Committee!]
  bills: [Bill!]
  news: [Article]
}

type Query {
  representatives: [Representatives!]!
}
`;
