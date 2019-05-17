"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mergeGraphqlSchemas = require("merge-graphql-schemas");

var _user = _interopRequireDefault(require("./user"));

var _representative = _interopRequireDefault(require("./representative"));

var _article = _interopRequireDefault(require("./article"));

var _bill = _interopRequireDefault(require("./bill"));

var _channel = _interopRequireDefault(require("./channel"));

var _committee = _interopRequireDefault(require("./committee"));

var _authToken = _interopRequireDefault(require("./authToken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var typeDefs = [_user["default"], _representative["default"], _article["default"], _bill["default"], _channel["default"], _committee["default"], _authToken["default"]];

var _default = (0, _mergeGraphqlSchemas.mergeTypes)(typeDefs, {
  all: true
});

exports["default"] = _default;