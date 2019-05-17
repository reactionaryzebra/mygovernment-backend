"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _lodash = require("lodash");

var _user = _interopRequireDefault(require("./user"));

var _representative = _interopRequireDefault(require("./representative"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var resolvers = (0, _lodash.merge)(_user["default"], _representative["default"]);
var _default = resolvers;
exports["default"] = _default;