"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _representative2 = _interopRequireDefault(require("../types/representative"));

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

require("dotenv").config();

var googleRoot = "https://www.googleapis.com/civicinfo/v2/representatives";
var googleKey = process.env.GOOGLE_KEY;
var propublicaRoot = "https://api.propublica.org/congress/v1";
var propublicaKey = process.env.PRO_PUBLICA_KEY;
var propublicaHeaders = {
  "X-API-Key": "".concat(propublicaKey)
};
var newsRoot = "https://newsapi.org/v2/everything";
var newsKey = process.env.NEWS_KEY;
var newsHeaders = {
  "X-API-Key": "".concat(newsKey)
};

var fetchData =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(address) {
    var googleData, officials, offices;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _axios["default"].get("https://www.googleapis.com/civicinfo/v2/representatives?key=".concat(googleKey, "&address=").concat(encodeURI(address)));

          case 3:
            googleData = _context.sent;
            officials = googleData.data.officials;
            offices = googleData.data.offices;
            return _context.abrupt("return", {
              officials: officials,
              offices: offices
            });

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](0);
            throw new Error(_context.t0);

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 9]]);
  }));

  return function fetchData(_x) {
    return _ref.apply(this, arguments);
  };
}();

var mergeOffice = function mergeOffice(officials, offices) {
  offices.forEach(function (office) {
    office.officialIndices.forEach(function (officialIndex) {
      if (officials[officialIndex]) {
        officials[officialIndex].office = office.name;
        officials[officialIndex].division = office.divisionId;
      }
    });
  });
  return officials;
};

var tagCongress =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(officials) {
    var senateData, houseData, senateList, houseList, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _loop, _iterator, _step;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _axios["default"].get("".concat(propublicaRoot, "/115/senate/members.json"), {
              headers: propublicaHeaders
            });

          case 3:
            senateData = _context2.sent;
            _context2.next = 6;
            return _axios["default"].get("".concat(propublicaRoot, "/115/house/members.json"), {
              headers: propublicaHeaders
            });

          case 6:
            houseData = _context2.sent;
            senateList = senateData.data.results[0].members;
            houseList = houseData.data.results[0].members;
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context2.prev = 12;

            _loop = function _loop() {
              var official = _step.value;

              if (official.office.includes("United States Senate")) {
                senateList.forEach(function (senator) {
                  if (official.name.includes(senator.first_name) && official.name.includes(senator.last_name)) {
                    official.proPublicaId = senator.id;
                  }
                });
              } else if (official.office.includes("United States House")) {
                houseList.forEach(function (rep) {
                  if (official.name.includes(rep.first_name) && official.name.includes(rep.last_name)) {
                    official.proPublicaId = rep.id;
                  }
                });
              }
            };

            for (_iterator = officials[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              _loop();
            }

            _context2.next = 21;
            break;

          case 17:
            _context2.prev = 17;
            _context2.t0 = _context2["catch"](12);
            _didIteratorError = true;
            _iteratorError = _context2.t0;

          case 21:
            _context2.prev = 21;
            _context2.prev = 22;

            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }

          case 24:
            _context2.prev = 24;

            if (!_didIteratorError) {
              _context2.next = 27;
              break;
            }

            throw _iteratorError;

          case 27:
            return _context2.finish(24);

          case 28:
            return _context2.finish(21);

          case 29:
            return _context2.abrupt("return", officials);

          case 32:
            _context2.prev = 32;
            _context2.t1 = _context2["catch"](0);
            throw new Error(_context2.t1);

          case 35:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 32], [12, 17, 21, 29], [22,, 24, 28]]);
  }));

  return function tagCongress(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

var mergeCommittees =
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(officials) {
    var _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, official, propublicaData;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _iteratorNormalCompletion2 = true;
            _didIteratorError2 = false;
            _iteratorError2 = undefined;
            _context3.prev = 4;
            _iterator2 = officials[Symbol.iterator]();

          case 6:
            if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
              _context3.next = 16;
              break;
            }

            official = _step2.value;

            if (!official.proPublicaId) {
              _context3.next = 13;
              break;
            }

            _context3.next = 11;
            return _axios["default"].get("".concat(propublicaRoot, "/members/").concat(official.proPublicaId), {
              headers: propublicaHeaders
            });

          case 11:
            propublicaData = _context3.sent;
            official.committees = propublicaData.data.results[0].roles[0].committees;

          case 13:
            _iteratorNormalCompletion2 = true;
            _context3.next = 6;
            break;

          case 16:
            _context3.next = 22;
            break;

          case 18:
            _context3.prev = 18;
            _context3.t0 = _context3["catch"](4);
            _didIteratorError2 = true;
            _iteratorError2 = _context3.t0;

          case 22:
            _context3.prev = 22;
            _context3.prev = 23;

            if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
              _iterator2["return"]();
            }

          case 25:
            _context3.prev = 25;

            if (!_didIteratorError2) {
              _context3.next = 28;
              break;
            }

            throw _iteratorError2;

          case 28:
            return _context3.finish(25);

          case 29:
            return _context3.finish(22);

          case 30:
            return _context3.abrupt("return", officials);

          case 33:
            _context3.prev = 33;
            _context3.t1 = _context3["catch"](0);
            throw new Error(_context3.t1);

          case 36:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 33], [4, 18, 22, 30], [23,, 25, 29]]);
  }));

  return function mergeCommittees(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

var mergeBills =
/*#__PURE__*/
function () {
  var _ref4 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(officials) {
    var _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, official, propublicaData;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _iteratorNormalCompletion3 = true;
            _didIteratorError3 = false;
            _iteratorError3 = undefined;
            _context4.prev = 4;
            _iterator3 = officials[Symbol.iterator]();

          case 6:
            if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
              _context4.next = 16;
              break;
            }

            official = _step3.value;

            if (!official.proPublicaId) {
              _context4.next = 13;
              break;
            }

            _context4.next = 11;
            return _axios["default"].get("".concat(propublicaRoot, "/members/").concat(official.proPublicaId, "/bills/cosponsored.json"), {
              headers: propublicaHeaders
            });

          case 11:
            propublicaData = _context4.sent;
            official.bills = propublicaData.data.results[0].bills;

          case 13:
            _iteratorNormalCompletion3 = true;
            _context4.next = 6;
            break;

          case 16:
            _context4.next = 22;
            break;

          case 18:
            _context4.prev = 18;
            _context4.t0 = _context4["catch"](4);
            _didIteratorError3 = true;
            _iteratorError3 = _context4.t0;

          case 22:
            _context4.prev = 22;
            _context4.prev = 23;

            if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
              _iterator3["return"]();
            }

          case 25:
            _context4.prev = 25;

            if (!_didIteratorError3) {
              _context4.next = 28;
              break;
            }

            throw _iteratorError3;

          case 28:
            return _context4.finish(25);

          case 29:
            return _context4.finish(22);

          case 30:
            return _context4.abrupt("return", officials);

          case 33:
            _context4.prev = 33;
            _context4.t1 = _context4["catch"](0);
            throw new Error(_context4.t1);

          case 36:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 33], [4, 18, 22, 30], [23,, 25, 29]]);
  }));

  return function mergeBills(_x4) {
    return _ref4.apply(this, arguments);
  };
}();

var mergeNews =
/*#__PURE__*/
function () {
  var _ref5 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5(officials) {
    var _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, official, newsData;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _iteratorNormalCompletion4 = true;
            _didIteratorError4 = false;
            _iteratorError4 = undefined;
            _context5.prev = 4;
            _iterator4 = officials[Symbol.iterator]();

          case 6:
            if (_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done) {
              _context5.next = 15;
              break;
            }

            official = _step4.value;
            _context5.next = 10;
            return _axios["default"].get("".concat(newsRoot, "?q=").concat(encodeURI(official.name)), {
              headers: newsHeaders
            });

          case 10:
            newsData = _context5.sent;
            official.news = newsData.data.articles;

          case 12:
            _iteratorNormalCompletion4 = true;
            _context5.next = 6;
            break;

          case 15:
            _context5.next = 21;
            break;

          case 17:
            _context5.prev = 17;
            _context5.t0 = _context5["catch"](4);
            _didIteratorError4 = true;
            _iteratorError4 = _context5.t0;

          case 21:
            _context5.prev = 21;
            _context5.prev = 22;

            if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
              _iterator4["return"]();
            }

          case 24:
            _context5.prev = 24;

            if (!_didIteratorError4) {
              _context5.next = 27;
              break;
            }

            throw _iteratorError4;

          case 27:
            return _context5.finish(24);

          case 28:
            return _context5.finish(21);

          case 29:
            return _context5.abrupt("return", officials);

          case 32:
            _context5.prev = 32;
            _context5.t1 = _context5["catch"](0);
            throw new Error(_context5.t1);

          case 35:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 32], [4, 17, 21, 29], [22,, 24, 28]]);
  }));

  return function mergeNews(_x5) {
    return _ref5.apply(this, arguments);
  };
}();

var makeCleanList =
/*#__PURE__*/
function () {
  var _ref6 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee6(officials, offices) {
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return mergeOffice(officials, offices);

          case 2:
            officials = _context6.sent;
            return _context6.abrupt("return", officials);

          case 4:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function makeCleanList(_x6, _x7) {
    return _ref6.apply(this, arguments);
  };
}();

var makeCleanRepresentative =
/*#__PURE__*/
function () {
  var _ref7 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee7(officials) {
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            _context7.next = 3;
            return tagCongress(officials);

          case 3:
            officials = _context7.sent;
            _context7.next = 6;
            return mergeCommittees(officials);

          case 6:
            officials = _context7.sent;
            _context7.next = 9;
            return mergeBills(officials);

          case 9:
            officials = _context7.sent;
            _context7.next = 12;
            return mergeNews(officials);

          case 12:
            officials = _context7.sent;
            return _context7.abrupt("return", officials);

          case 16:
            _context7.prev = 16;
            _context7.t0 = _context7["catch"](0);
            throw new Error(_context7.t0);

          case 19:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[0, 16]]);
  }));

  return function makeCleanRepresentative(_x8) {
    return _ref7.apply(this, arguments);
  };
}();

var _default = {
  Query: {
    representatives: function () {
      var _representatives = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee8(root, args) {
        var data;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.prev = 0;
                _context8.next = 3;
                return fetchData(args.address);

              case 3:
                data = _context8.sent;
                return _context8.abrupt("return", makeCleanList(data.officials, data.offices));

              case 7:
                _context8.prev = 7;
                _context8.t0 = _context8["catch"](0);
                throw new Error(_context8.t0);

              case 10:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, null, [[0, 7]]);
      }));

      function representatives(_x9, _x10) {
        return _representatives.apply(this, arguments);
      }

      return representatives;
    }(),
    representative: function () {
      var _representative = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee9(root, args) {
        var data, officials, official;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.prev = 0;
                _context9.next = 3;
                return fetchData(args.address);

              case 3:
                data = _context9.sent;
                _context9.next = 6;
                return mergeOffice(data.officials, data.offices);

              case 6:
                officials = _context9.sent;
                official = [officials.find(function (official) {
                  return official.name === args.name;
                })];
                _context9.next = 10;
                return makeCleanRepresentative(official);

              case 10:
                official = _context9.sent;
                return _context9.abrupt("return", official[0]);

              case 14:
                _context9.prev = 14;
                _context9.t0 = _context9["catch"](0);
                throw new Error(_context9.t0);

              case 17:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, null, [[0, 14]]);
      }));

      function representative(_x11, _x12) {
        return _representative.apply(this, arguments);
      }

      return representative;
    }()
  }
};
exports["default"] = _default;