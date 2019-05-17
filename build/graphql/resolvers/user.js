"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _User = _interopRequireDefault(require("../../models/User"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _default = {
  Query: {
    user: function () {
      var _user = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(root, args) {
        var foundUser;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _User["default"].findById(args.id);

              case 3:
                foundUser = _context.sent;
                return _context.abrupt("return", foundUser);

              case 7:
                _context.prev = 7;
                _context.t0 = _context["catch"](0);
                throw new Error(_context.t0);

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 7]]);
      }));

      function user(_x, _x2) {
        return _user.apply(this, arguments);
      }

      return user;
    }()
  },
  Mutation: {
    editUser: function () {
      var _editUser = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(root, args) {
        var updatedUser;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return _User["default"].findByIdAndUpdate(args.id, args, {
                  "new": true
                });

              case 3:
                updatedUser = _context2.sent;
                return _context2.abrupt("return", updatedUser);

              case 7:
                _context2.prev = 7;
                _context2.t0 = _context2["catch"](0);
                throw new Error(_context2.t0);

              case 10:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 7]]);
      }));

      function editUser(_x3, _x4) {
        return _editUser.apply(this, arguments);
      }

      return editUser;
    }(),
    deleteUser: function () {
      var _deleteUser = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(root, args) {
        var deletedUser;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return _User["default"].findByIdAndDelete(args.id);

              case 3:
                deletedUser = _context3.sent;
                return _context3.abrupt("return", true);

              case 7:
                _context3.prev = 7;
                _context3.t0 = _context3["catch"](0);
                throw new Error(_context3.t0);

              case 10:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 7]]);
      }));

      function deleteUser(_x5, _x6) {
        return _deleteUser.apply(this, arguments);
      }

      return deleteUser;
    }(),
    register: function () {
      var _register = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(root, args) {
        var authToken, foundUser, newUser;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                authToken = {
                  logged: false,
                  message: "",
                  address: ""
                };
                _context4.next = 4;
                return _User["default"].findOne({
                  username: args.username
                });

              case 4:
                foundUser = _context4.sent;

                if (!foundUser) {
                  _context4.next = 9;
                  break;
                }

                authToken.message = "This Username is already taken";
                _context4.next = 18;
                break;

              case 9:
                if (!(args.password === args.confirmPassword)) {
                  _context4.next = 17;
                  break;
                }

                _context4.next = 12;
                return _User["default"].create({
                  username: args.username,
                  password: args.password,
                  eMail: args.email,
                  address: args.address
                });

              case 12:
                newUser = _context4.sent;
                authToken.logged = true;
                authToken.user = newUser;
                _context4.next = 18;
                break;

              case 17:
                authToken.message = "Passwords do not match";

              case 18:
                return _context4.abrupt("return", authToken);

              case 21:
                _context4.prev = 21;
                _context4.t0 = _context4["catch"](0);
                throw new Error(_context4.t0);

              case 24:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[0, 21]]);
      }));

      function register(_x7, _x8) {
        return _register.apply(this, arguments);
      }

      return register;
    }(),
    login: function () {
      var _login = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(root, args) {
        var authToken, foundUser, success;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                authToken = {
                  logged: false,
                  message: "",
                  address: ""
                };
                _context5.next = 4;
                return _User["default"].findOne({
                  username: args.username
                });

              case 4:
                foundUser = _context5.sent;

                if (!foundUser) {
                  _context5.next = 12;
                  break;
                }

                _context5.next = 8;
                return foundUser.validatePassword(args.password);

              case 8:
                success = _context5.sent;

                if (success) {
                  authToken.logged = true;
                  authToken.user = foundUser;
                } else {
                  authToken.message = "Incorrect password";
                }

                _context5.next = 13;
                break;

              case 12:
                authToken.message = "This username does not exist";

              case 13:
                return _context5.abrupt("return", authToken);

              case 16:
                _context5.prev = 16;
                _context5.t0 = _context5["catch"](0);
                throw new Error(_context5.t0);

              case 19:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[0, 16]]);
      }));

      function login(_x9, _x10) {
        return _login.apply(this, arguments);
      }

      return login;
    }()
  }
};
exports["default"] = _default;