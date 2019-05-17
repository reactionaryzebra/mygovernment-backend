import express from "express";
import expressGraphQL from "express-graphql";
import mongoose from "mongoose";
import cors from "cors";
import 'babel-polyfill';
require("dotenv").config();

import schema from "./graphql/";

const PORT = process.env.PORT || "4000";
const app = express();
require("./db/db");

const corsOptions = {
 origin: 'https://my-government.herokuapp.com',
 credentials: true,
 optionsSuccessStatus: 200 // some legacy browsers, and options requests
};

app.use(
  "/graphql",
  cors(corsOptions),
  express.json(),
  expressGraphQL({ schema, graphiql: true })
);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
