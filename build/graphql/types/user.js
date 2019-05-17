"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = "\ntype User {\n  id: String!\n  username: String!\n  password: String!\n  eMail: String!\n  address: String!\n  verified: Boolean!\n}\ntype Query {\n  user(id: String!): User\n}\ntype Mutation {\n\n  editUser(\n    id: String,\n    username: String,\n    password: String,\n    eMail: String,\n    address: String,\n    verified: Boolean\n    ): User\n\n  deleteUser(\n    id: String\n    ): Boolean\n\n  register(username: String!, email: String!, password: String!, confirmPassword: String!, address: String!): AuthToken,\n  login(username: String!, password: String!): AuthToken\n}\n";
exports["default"] = _default;