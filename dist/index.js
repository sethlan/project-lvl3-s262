'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (url) {
  return new Promise(function (resolve, reject) {
    _axios2.default.get(url, '/').then(function (response) {
      console.log(response);
      resolve(response);
    }).catch(function (error) {
      return reject(error);
    });
  });
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImF4aW9zIiwiZ2V0IiwidXJsIiwidGhlbiIsInJlc3BvbnNlIiwiY29uc29sZSIsImxvZyIsImNhdGNoIiwiZXJyb3IiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOzs7Ozs7a0JBRWU7QUFBQSxTQUFPLElBQUlBLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDckRDLG9CQUFNQyxHQUFOLENBQVVDLEdBQVYsRUFBZSxHQUFmLEVBQ0dDLElBREgsQ0FDUSxVQUFDQyxRQUFELEVBQWM7QUFDbEJDLGNBQVFDLEdBQVIsQ0FBWUYsUUFBWjtBQUNBTixjQUFRTSxRQUFSO0FBQ0QsS0FKSCxFQUtHRyxLQUxILENBS1M7QUFBQSxhQUFTUixPQUFPUyxLQUFQLENBQVQ7QUFBQSxLQUxUO0FBTUQsR0FQcUIsQ0FBUDtBQUFBLEMiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xuXG5leHBvcnQgZGVmYXVsdCB1cmwgPT4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICBheGlvcy5nZXQodXJsLCAnLycpXG4gICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XG4gICAgICByZXNvbHZlKHJlc3BvbnNlKTtcbiAgICB9KVxuICAgIC5jYXRjaChlcnJvciA9PiByZWplY3QoZXJyb3IpKTtcbn0pO1xuIl19