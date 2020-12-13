"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _HealthcheckController = _interopRequireDefault(require("./controllers/HealthcheckController"));

var _Registration = _interopRequireDefault(require("./controllers/Registration"));

var _Model = _interopRequireDefault(require("./models/Model"));

var router = _express["default"].Router();

router.post('/register', _Registration["default"].postRegistration);
router.use('/', _HealthcheckController["default"]);
var _default = router;
exports["default"] = _default;