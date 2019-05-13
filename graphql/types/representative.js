import Channel from "./channel";
import Committee from "./committee";
import Bill from "./bill";
import Article from "./article";

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
  representatives(address: String!): [Representative!]!
}
`;
