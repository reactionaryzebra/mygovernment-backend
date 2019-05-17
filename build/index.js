"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _expressGraphql = require("express-graphql");

var _expressGraphql2 = _interopRequireDefault(_expressGraphql);

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _cors = require("cors");

var _cors2 = _interopRequireDefault(_cors);

var _graphql = require("../graphql/");

var _graphql2 = _interopRequireDefault(_graphql);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require("dotenv").config();

var PORT = process.env.PORT || "4000";
var app = (0, _express2.default)();
require("./db/db");

app.use("/graphql", (0, _cors2.default)(), _express2.default.json(), (0, _expressGraphql2.default)({ schema: _graphql2.default, graphiql: true }));

app.listen(PORT, function () {
  return console.log("Server running on port " + PORT);
});
//# sourceMappingURL=index.js.map