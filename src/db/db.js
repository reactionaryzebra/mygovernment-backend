import mongoose from "mongoose";

const connectionString = process.env.MONGODB_CONNECTION_STRING;

mongoose.connect(
  connectionString,
  { useCreateIndex: true, useNewUrlParser: true, useFindAndModify: false }
);
mongoose.connection.on("connected", () => {
  console.log(`Mongoose connected to ${connectionString}`);
});

mongoose.connection.on("error", err => {
  console.log(`Mongoose connected error ${err}`);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected");
});
