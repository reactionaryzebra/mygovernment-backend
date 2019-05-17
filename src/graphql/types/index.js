import { mergeTypes } from "merge-graphql-schemas";
import User from "./user";
import Representative from "./representative";
import Article from "./article";
import Bill from "./bill";
import Channel from "./channel";
import Committee from "./committee";
import AuthToken from './authToken'

const typeDefs = [User, Representative, Article, Bill, Channel, Committee, AuthToken];

export default mergeTypes(typeDefs, { all: true });
