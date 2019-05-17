"use strict";

var _express = _interopRequireDefault(require("express"));

var _expressGraphql = _interopRequireDefault(require("express-graphql"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _cors = _interopRequireDefault(require("cors"));

require("babel-polyfill");

var _graphql = _interopRequireDefault(require("./graphql/"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

require("dotenv").config();

var PORT = process.env.PORT || "4000";
var app = (0, _express["default"])();

require("./db/db");

app.use("/graphql", (0, _cors["default"])(), _express["default"].json(), (0, _expressGraphql["default"])({
  schema: _graphql["default"],
  graphiql: true
}));
app.listen(PORT, function () {
  return console.log("Server running on port ".concat(PORT));
});