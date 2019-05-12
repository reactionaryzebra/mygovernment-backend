import mongoose from "mongoose";

const connectionString = "mongodb://localhost/testing";

mongoose.connect(
  connectionString,
  { useCreateIndex: true, useNewUrlParser: true }
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
