"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _channel = _interopRequireDefault(require("./channel"));

var _committee = _interopRequireDefault(require("./committee"));

var _bill = _interopRequireDefault(require("./bill"));

var _article = _interopRequireDefault(require("./article"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = "\ntype Representative {\n  office: String!\n  name: String!\n  party: String\n  phones: [String]\n  urls: [String]\n  photoUrl: String\n  division: String\n  proPublicaId: String\n  channels: [Channel]\n  committees: [Committee]\n  bills: [Bill]\n  news: [Article]\n}\n\ntype Query {\n  representatives(address: String!): [Representative!]!\n  representative(address: String!, name: String!): Representative\n}\n";
exports["default"] = _default;