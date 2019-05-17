"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _graphqlTools = require("graphql-tools");

var _index = _interopRequireDefault(require("./types/index"));

var _index2 = _interopRequireDefault(require("./resolvers/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var schema = (0, _graphqlTools.makeExecutableSchema)({
  typeDefs: _index["default"],
  resolvers: _index2["default"]
});
var _default = schema;
exports["default"] = _default;