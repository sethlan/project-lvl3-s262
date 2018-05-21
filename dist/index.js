'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (url) {
  return new Promise(function (resolve, reject) {
    _axios2.default.get(url).then(function (response) {
      return resolve(response.data);
    }).catch(function (error) {
      return reject(error);
    });
  });
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImF4aW9zIiwiZ2V0IiwidXJsIiwidGhlbiIsInJlc3BvbnNlIiwiZGF0YSIsImNhdGNoIiwiZXJyb3IiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOzs7Ozs7a0JBRWU7QUFBQSxTQUFPLElBQUlBLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDckRDLG9CQUFNQyxHQUFOLENBQVVDLEdBQVYsRUFDR0MsSUFESCxDQUNRO0FBQUEsYUFBWUwsUUFBUU0sU0FBU0MsSUFBakIsQ0FBWjtBQUFBLEtBRFIsRUFFR0MsS0FGSCxDQUVTO0FBQUEsYUFBU1AsT0FBT1EsS0FBUCxDQUFUO0FBQUEsS0FGVDtBQUdELEdBSnFCLENBQVA7QUFBQSxDIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGF4aW9zIGZyb20gJ2F4aW9zJztcblxuZXhwb3J0IGRlZmF1bHQgdXJsID0+IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgYXhpb3MuZ2V0KHVybClcbiAgICAudGhlbihyZXNwb25zZSA9PiByZXNvbHZlKHJlc3BvbnNlLmRhdGEpKVxuICAgIC5jYXRjaChlcnJvciA9PiByZWplY3QoZXJyb3IpKTtcbn0pO1xuIl19