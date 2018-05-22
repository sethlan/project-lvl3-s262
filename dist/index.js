'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _http = require('axios/lib/adapters/http');

var _http2 = _interopRequireDefault(_http);

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import http from 'http';

exports.default = function (addr) {
  return new Promise(function (resolve, reject) {
    var _url$parse = _url2.default.parse(addr),
        pathname = _url$parse.pathname,
        hostname = _url$parse.hostname;

    _axios2.default.defaults.host = hostname;
    _axios2.default.defaults.adapter = _http2.default;
    _axios2.default.get(pathname).then(function (response) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInVybCIsInBhcnNlIiwiYWRkciIsInBhdGhuYW1lIiwiaG9zdG5hbWUiLCJheGlvcyIsImRlZmF1bHRzIiwiaG9zdCIsImFkYXB0ZXIiLCJodHRwQWRhcHRlciIsImdldCIsInRoZW4iLCJyZXNwb25zZSIsImRhdGEiLCJjYXRjaCIsImVycm9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUNBOztrQkFFZTtBQUFBLFNBQVEsSUFBSUEsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUFBLHFCQUN2QkMsY0FBSUMsS0FBSixDQUFVQyxJQUFWLENBRHVCO0FBQUEsUUFDOUNDLFFBRDhDLGNBQzlDQSxRQUQ4QztBQUFBLFFBQ3BDQyxRQURvQyxjQUNwQ0EsUUFEb0M7O0FBRXREQyxvQkFBTUMsUUFBTixDQUFlQyxJQUFmLEdBQXNCSCxRQUF0QjtBQUNBQyxvQkFBTUMsUUFBTixDQUFlRSxPQUFmLEdBQXlCQyxjQUF6QjtBQUNBSixvQkFBTUssR0FBTixDQUFVUCxRQUFWLEVBQ0dRLElBREgsQ0FDUSxVQUFDQyxRQUFELEVBQWM7QUFDbEJkLGNBQVFjLFNBQVNDLElBQWpCO0FBQ0QsS0FISCxFQUlHQyxLQUpILENBSVMsVUFBQ0MsS0FBRCxFQUFXO0FBQ2hCO0FBQ0FoQixhQUFPZ0IsS0FBUDtBQUNELEtBUEg7QUFRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDRCxHQTNCc0IsQ0FBUjtBQUFBLEMiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xuaW1wb3J0IGh0dHBBZGFwdGVyIGZyb20gJ2F4aW9zL2xpYi9hZGFwdGVycy9odHRwJztcbmltcG9ydCB1cmwgZnJvbSAndXJsJztcbi8vIGltcG9ydCBodHRwIGZyb20gJ2h0dHAnO1xuXG5leHBvcnQgZGVmYXVsdCBhZGRyID0+IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgY29uc3QgeyBwYXRobmFtZSwgaG9zdG5hbWUgfSA9IHVybC5wYXJzZShhZGRyKTtcbiAgYXhpb3MuZGVmYXVsdHMuaG9zdCA9IGhvc3RuYW1lO1xuICBheGlvcy5kZWZhdWx0cy5hZGFwdGVyID0gaHR0cEFkYXB0ZXI7XG4gIGF4aW9zLmdldChwYXRobmFtZSlcbiAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgIHJlc29sdmUocmVzcG9uc2UuZGF0YSk7XG4gICAgfSlcbiAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAvLyBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICByZWplY3QoZXJyb3IpO1xuICAgIH0pO1xuICAvLyBodHRwLmdldCh1cmwsIChyZXMpID0+IHtcbiAgLy8gICByZXMuc2V0RW5jb2RpbmcoJ3V0ZjgnKTtcbiAgLy8gICBsZXQgcmF3RGF0YSA9ICcnO1xuICAvLyAgIHJlcy5vbignZGF0YScsIChjaHVuaykgPT4geyByYXdEYXRhICs9IGNodW5rOyB9KTtcbiAgLy8gICByZXMub24oJ2VuZCcsICgpID0+IHtcbiAgLy8gICAgIHRyeSB7XG4gIC8vICAgICAgIGNvbnN0IGRhdGEgPSBKU09OLnBhcnNlKHJhd0RhdGEpO1xuICAvLyAgICAgICByZXNvbHZlKGRhdGEpO1xuICAvLyAgICAgfSBjYXRjaCAoZSkge1xuICAvLyAgICAgICByZWplY3QoZS5tZXNzYWdlKTtcbiAgLy8gICAgIH1cbiAgLy8gICB9KTtcbiAgLy8gfSkub24oJ2Vycm9yJywgKGUpID0+IHtcbiAgLy8gICByZWplY3QoZS5tZXNzYWdlKTtcbiAgLy8gfSk7XG59KTtcbiJdfQ==