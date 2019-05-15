import { makeExecutableSchema } from "graphql-tools";

import typeDefs from "./types/index";
import resolvers from "./resolvers/user";

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

export default schema;
