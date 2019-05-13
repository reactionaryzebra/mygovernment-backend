import { mergeTypes } from "merge-graphql-schemas";
import User from "./user";
import Representative from "./representative";
import Article from "./article";
import Bill from "./bill";
import Channel from "./channel";
import Committee from "./committee";

const typeDefs = [User, Representative, Article, Bill, Channel, Committee];

export default mergeTypes(typeDefs, { all: true });
