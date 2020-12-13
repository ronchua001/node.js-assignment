"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _sequelize = _interopRequireDefault(require("sequelize"));

var _database = _interopRequireDefault(require("../config/database"));

var Teacher = _database["default"].define('Teacher', {}, {
  timestamps: false
});

var Class = _database["default"].define('Class', {}, {
  timestamps: false
});

var Teacher_Class = _database["default"].define('Teacher_Class', {}, {
  timestamps: false
});

Teacher.belongsToMany(Class, {
  through: Teacher_Class,
  foreignKey: 'Teacher_teacher_id'
});
Class.belongsToMany(Teacher, {
  through: Teacher_Class
});
module.exports = Teacher;
module.exports = Class;
module.exports = Teacher_Class;