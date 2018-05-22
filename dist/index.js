'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _http = require('axios/lib/adapters/http');

var _http2 = _interopRequireDefault(_http);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import http from 'http';

exports.default = function (url) {
  return new Promise(function (resolve, reject) {
    _axios2.default.defaults.host = url;
    _axios2.default.defaults.adapter = _http2.default;
    _axios2.default.get('/').then(function (response) {
      resolve(response.data);
    }).catch(function (error) {
      // console.log(error);
      reject(error);
    });
    // http.get(url, (res) => {
    //   res.setEncoding('utf8');
    //   let rawData = '';
    //   res.on('data', (chunk) => { rawData += chunk; });
    //   res.on('end', () => {
    //     try {
    //       const data = JSON.parse(rawData);
    //       resolve(data);
    //     } catch (e) {
    //       reject(e.message);
    //     }
    //   });
    // }).on('error', (e) => {
    //   reject(e.message);
    // });
  });
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImF4aW9zIiwiZGVmYXVsdHMiLCJob3N0IiwidXJsIiwiYWRhcHRlciIsImh0dHBBZGFwdGVyIiwiZ2V0IiwidGhlbiIsInJlc3BvbnNlIiwiZGF0YSIsImNhdGNoIiwiZXJyb3IiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7OztBQUNBOztrQkFFZTtBQUFBLFNBQU8sSUFBSUEsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUNyREMsb0JBQU1DLFFBQU4sQ0FBZUMsSUFBZixHQUFzQkMsR0FBdEI7QUFDQUgsb0JBQU1DLFFBQU4sQ0FBZUcsT0FBZixHQUF5QkMsY0FBekI7QUFDQUwsb0JBQU1NLEdBQU4sQ0FBVSxHQUFWLEVBQ0dDLElBREgsQ0FDUSxVQUFDQyxRQUFELEVBQWM7QUFDbEJWLGNBQVFVLFNBQVNDLElBQWpCO0FBQ0QsS0FISCxFQUlHQyxLQUpILENBSVMsVUFBQ0MsS0FBRCxFQUFXO0FBQ2hCO0FBQ0FaLGFBQU9ZLEtBQVA7QUFDRCxLQVBIO0FBUUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0QsR0ExQnFCLENBQVA7QUFBQSxDIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGF4aW9zIGZyb20gJ2F4aW9zJztcbmltcG9ydCBodHRwQWRhcHRlciBmcm9tICdheGlvcy9saWIvYWRhcHRlcnMvaHR0cCc7XG4vLyBpbXBvcnQgaHR0cCBmcm9tICdodHRwJztcblxuZXhwb3J0IGRlZmF1bHQgdXJsID0+IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgYXhpb3MuZGVmYXVsdHMuaG9zdCA9IHVybDtcbiAgYXhpb3MuZGVmYXVsdHMuYWRhcHRlciA9IGh0dHBBZGFwdGVyO1xuICBheGlvcy5nZXQoJy8nKVxuICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgcmVzb2x2ZShyZXNwb25zZS5kYXRhKTtcbiAgICB9KVxuICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgIHJlamVjdChlcnJvcik7XG4gICAgfSk7XG4gIC8vIGh0dHAuZ2V0KHVybCwgKHJlcykgPT4ge1xuICAvLyAgIHJlcy5zZXRFbmNvZGluZygndXRmOCcpO1xuICAvLyAgIGxldCByYXdEYXRhID0gJyc7XG4gIC8vICAgcmVzLm9uKCdkYXRhJywgKGNodW5rKSA9PiB7IHJhd0RhdGEgKz0gY2h1bms7IH0pO1xuICAvLyAgIHJlcy5vbignZW5kJywgKCkgPT4ge1xuICAvLyAgICAgdHJ5IHtcbiAgLy8gICAgICAgY29uc3QgZGF0YSA9IEpTT04ucGFyc2UocmF3RGF0YSk7XG4gIC8vICAgICAgIHJlc29sdmUoZGF0YSk7XG4gIC8vICAgICB9IGNhdGNoIChlKSB7XG4gIC8vICAgICAgIHJlamVjdChlLm1lc3NhZ2UpO1xuICAvLyAgICAgfVxuICAvLyAgIH0pO1xuICAvLyB9KS5vbignZXJyb3InLCAoZSkgPT4ge1xuICAvLyAgIHJlamVjdChlLm1lc3NhZ2UpO1xuICAvLyB9KTtcbn0pO1xuIl19