"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema;
var userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  eMail: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  verified: {
    type: Boolean,
    "default": false
  }
});

userSchema.methods.hashPassword = function (password) {
  return _bcryptjs["default"].hashSync(password, _bcryptjs["default"].genSaltSync(10));
};

userSchema.methods.validatePassword = function (password) {
  return _bcryptjs["default"].compareSync(password, this.password);
};

userSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    this.password = this.hashPassword(this.password);
  }

  next();
});

var User = _mongoose["default"].model("User", userSchema);

var _default = User;
exports["default"] = _default;