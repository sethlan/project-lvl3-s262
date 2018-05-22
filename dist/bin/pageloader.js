#!/usr/bin/env node
'use strict';

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _fs = require('mz/fs');

var _fs2 = _interopRequireDefault(_fs);

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _package = require('../../package.json');

var _package2 = _interopRequireDefault(_package);

var _ = require('..');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_commander2.default.version(_package2.default).usage('[options] <url> <whereToSafe>').arguments('<path> <url>').parse(process.argv);
(0, _2.default)(_commander2.default.url).then(function (data) {
  var _url$parse = _url2.default.parse(_commander2.default.url),
      hostname = _url$parse.hostname,
      pathname = _url$parse.pathname;

  var filename = hostname.replace(/\//g, '-') + '-' + pathname.replace(/\//g, '-') + '.html';
  var pathForSave = _path2.default.resolve(_commander2.default.path, filename);
  return _fs2.default.writeFile(pathForSave, data);
}).catch(function (error) {
  return console.log(error);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9iaW4vcGFnZWxvYWRlci5qcyJdLCJuYW1lcyI6WyJwcm9ncmFtIiwidmVyc2lvbiIsInVzYWdlIiwiYXJndW1lbnRzIiwicGFyc2UiLCJwcm9jZXNzIiwiYXJndiIsInVybCIsInRoZW4iLCJkYXRhIiwiaG9zdG5hbWUiLCJwYXRobmFtZSIsImZpbGVuYW1lIiwicmVwbGFjZSIsInBhdGhGb3JTYXZlIiwicGF0aCIsInJlc29sdmUiLCJmcyIsIndyaXRlRmlsZSIsImNhdGNoIiwiY29uc29sZSIsImxvZyIsImVycm9yIl0sIm1hcHBpbmdzIjoiOztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUFBLG9CQUNHQyxPQURILENBQ1dBLGlCQURYLEVBRUdDLEtBRkgsQ0FFUywrQkFGVCxFQUdHQyxTQUhILENBR2EsY0FIYixFQUlHQyxLQUpILENBSVNDLFFBQVFDLElBSmpCO0FBS0EsZ0JBQVNOLG9CQUFRTyxHQUFqQixFQUNHQyxJQURILENBQ1EsVUFBQ0MsSUFBRCxFQUFVO0FBQUEsbUJBQ2lCRixjQUFJSCxLQUFKLENBQVVKLG9CQUFRTyxHQUFsQixDQURqQjtBQUFBLE1BQ05HLFFBRE0sY0FDTkEsUUFETTtBQUFBLE1BQ0lDLFFBREosY0FDSUEsUUFESjs7QUFFZCxNQUFNQyxXQUFjRixTQUFTRyxPQUFULENBQWlCLEtBQWpCLEVBQXdCLEdBQXhCLENBQWQsU0FBOENGLFNBQVNFLE9BQVQsQ0FBaUIsS0FBakIsRUFBd0IsR0FBeEIsQ0FBOUMsVUFBTjtBQUNBLE1BQU1DLGNBQWNDLGVBQUtDLE9BQUwsQ0FBYWhCLG9CQUFRZSxJQUFyQixFQUEyQkgsUUFBM0IsQ0FBcEI7QUFDQSxTQUFPSyxhQUFHQyxTQUFILENBQWFKLFdBQWIsRUFBMEJMLElBQTFCLENBQVA7QUFDRCxDQU5ILEVBT0dVLEtBUEgsQ0FPUztBQUFBLFNBQVNDLFFBQVFDLEdBQVIsQ0FBWUMsS0FBWixDQUFUO0FBQUEsQ0FQVCIsImZpbGUiOiJwYWdlbG9hZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5cbmltcG9ydCBwcm9ncmFtIGZyb20gJ2NvbW1hbmRlcic7XG5pbXBvcnQgZnMgZnJvbSAnbXovZnMnO1xuaW1wb3J0IHVybCBmcm9tICd1cmwnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgdmVyc2lvbiBmcm9tICcuLi8uLi9wYWNrYWdlLmpzb24nO1xuaW1wb3J0IHBhZ2Vsb2FkIGZyb20gJy4uJztcblxucHJvZ3JhbVxuICAudmVyc2lvbih2ZXJzaW9uKVxuICAudXNhZ2UoJ1tvcHRpb25zXSA8dXJsPiA8d2hlcmVUb1NhZmU+JylcbiAgLmFyZ3VtZW50cygnPHBhdGg+IDx1cmw+JylcbiAgLnBhcnNlKHByb2Nlc3MuYXJndik7XG5wYWdlbG9hZChwcm9ncmFtLnVybClcbiAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICBjb25zdCB7IGhvc3RuYW1lLCBwYXRobmFtZSB9ID0gdXJsLnBhcnNlKHByb2dyYW0udXJsKTtcbiAgICBjb25zdCBmaWxlbmFtZSA9IGAke2hvc3RuYW1lLnJlcGxhY2UoL1xcLy9nLCAnLScpfS0ke3BhdGhuYW1lLnJlcGxhY2UoL1xcLy9nLCAnLScpfS5odG1sYDtcbiAgICBjb25zdCBwYXRoRm9yU2F2ZSA9IHBhdGgucmVzb2x2ZShwcm9ncmFtLnBhdGgsIGZpbGVuYW1lKTtcbiAgICByZXR1cm4gZnMud3JpdGVGaWxlKHBhdGhGb3JTYXZlLCBkYXRhKTtcbiAgfSlcbiAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUubG9nKGVycm9yKSk7XG4iXX0=