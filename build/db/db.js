"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var connectionString = process.env.MONGODB_CONNECTION_STRING;

_mongoose["default"].connect(connectionString, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false
});

_mongoose["default"].connection.on("connected", function () {
  console.log("Mongoose connected to ".concat(connectionString));
});

_mongoose["default"].connection.on("error", function (err) {
  console.log("Mongoose connected error ".concat(err));
});

_mongoose["default"].connection.on("disconnected", function () {
  console.log("Mongoose disconnected");
});