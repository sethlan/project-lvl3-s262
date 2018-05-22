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

var pathDir = void 0;
var addr = void 0;
_commander2.default.version(_package2.default).usage('[options] <url> <whereToSafe>').arguments('<pathForSave> <address>').action(function (pathForSave, address) {
  pathDir = pathForSave;
  addr = address;
}).parse(process.argv);
(0, _2.default)(addr).then(function (data) {
  var _url$parse = _url2.default.parse(_commander2.default.url),
      hostname = _url$parse.hostname,
      pathname = _url$parse.pathname;

  var filename = hostname.replace(/\//g, '-') + '-' + pathname.replace(/\//g, '-') + '.html';
  var pathForSave = _path2.default.resolve(pathDir, filename);
  return _fs2.default.writeFile(pathForSave, data);
}).catch(function (error) {
  return console.log(error);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9iaW4vcGFnZWxvYWRlci5qcyJdLCJuYW1lcyI6WyJwYXRoRGlyIiwiYWRkciIsInByb2dyYW0iLCJ2ZXJzaW9uIiwidXNhZ2UiLCJhcmd1bWVudHMiLCJhY3Rpb24iLCJwYXRoRm9yU2F2ZSIsImFkZHJlc3MiLCJwYXJzZSIsInByb2Nlc3MiLCJhcmd2IiwidGhlbiIsImRhdGEiLCJ1cmwiLCJob3N0bmFtZSIsInBhdGhuYW1lIiwiZmlsZW5hbWUiLCJyZXBsYWNlIiwicGF0aCIsInJlc29sdmUiLCJmcyIsIndyaXRlRmlsZSIsImNhdGNoIiwiY29uc29sZSIsImxvZyIsImVycm9yIl0sIm1hcHBpbmdzIjoiOztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFBSUEsZ0JBQUo7QUFDQSxJQUFJQyxhQUFKO0FBQ0FDLG9CQUNHQyxPQURILENBQ1dBLGlCQURYLEVBRUdDLEtBRkgsQ0FFUywrQkFGVCxFQUdHQyxTQUhILENBR2EseUJBSGIsRUFJR0MsTUFKSCxDQUlVLFVBQUNDLFdBQUQsRUFBY0MsT0FBZCxFQUEwQjtBQUNoQ1IsWUFBVU8sV0FBVjtBQUNBTixTQUFPTyxPQUFQO0FBQ0QsQ0FQSCxFQVFHQyxLQVJILENBUVNDLFFBQVFDLElBUmpCO0FBU0EsZ0JBQVNWLElBQVQsRUFDR1csSUFESCxDQUNRLFVBQUNDLElBQUQsRUFBVTtBQUFBLG1CQUNpQkMsY0FBSUwsS0FBSixDQUFVUCxvQkFBUVksR0FBbEIsQ0FEakI7QUFBQSxNQUNOQyxRQURNLGNBQ05BLFFBRE07QUFBQSxNQUNJQyxRQURKLGNBQ0lBLFFBREo7O0FBRWQsTUFBTUMsV0FBY0YsU0FBU0csT0FBVCxDQUFpQixLQUFqQixFQUF3QixHQUF4QixDQUFkLFNBQThDRixTQUFTRSxPQUFULENBQWlCLEtBQWpCLEVBQXdCLEdBQXhCLENBQTlDLFVBQU47QUFDQSxNQUFNWCxjQUFjWSxlQUFLQyxPQUFMLENBQWFwQixPQUFiLEVBQXNCaUIsUUFBdEIsQ0FBcEI7QUFDQSxTQUFPSSxhQUFHQyxTQUFILENBQWFmLFdBQWIsRUFBMEJNLElBQTFCLENBQVA7QUFDRCxDQU5ILEVBT0dVLEtBUEgsQ0FPUztBQUFBLFNBQVNDLFFBQVFDLEdBQVIsQ0FBWUMsS0FBWixDQUFUO0FBQUEsQ0FQVCIsImZpbGUiOiJwYWdlbG9hZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5cbmltcG9ydCBwcm9ncmFtIGZyb20gJ2NvbW1hbmRlcic7XG5pbXBvcnQgZnMgZnJvbSAnbXovZnMnO1xuaW1wb3J0IHVybCBmcm9tICd1cmwnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgdmVyc2lvbiBmcm9tICcuLi8uLi9wYWNrYWdlLmpzb24nO1xuaW1wb3J0IHBhZ2Vsb2FkIGZyb20gJy4uJztcblxubGV0IHBhdGhEaXI7XG5sZXQgYWRkcjtcbnByb2dyYW1cbiAgLnZlcnNpb24odmVyc2lvbilcbiAgLnVzYWdlKCdbb3B0aW9uc10gPHVybD4gPHdoZXJlVG9TYWZlPicpXG4gIC5hcmd1bWVudHMoJzxwYXRoRm9yU2F2ZT4gPGFkZHJlc3M+JylcbiAgLmFjdGlvbigocGF0aEZvclNhdmUsIGFkZHJlc3MpID0+IHtcbiAgICBwYXRoRGlyID0gcGF0aEZvclNhdmU7XG4gICAgYWRkciA9IGFkZHJlc3M7XG4gIH0pXG4gIC5wYXJzZShwcm9jZXNzLmFyZ3YpO1xucGFnZWxvYWQoYWRkcilcbiAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICBjb25zdCB7IGhvc3RuYW1lLCBwYXRobmFtZSB9ID0gdXJsLnBhcnNlKHByb2dyYW0udXJsKTtcbiAgICBjb25zdCBmaWxlbmFtZSA9IGAke2hvc3RuYW1lLnJlcGxhY2UoL1xcLy9nLCAnLScpfS0ke3BhdGhuYW1lLnJlcGxhY2UoL1xcLy9nLCAnLScpfS5odG1sYDtcbiAgICBjb25zdCBwYXRoRm9yU2F2ZSA9IHBhdGgucmVzb2x2ZShwYXRoRGlyLCBmaWxlbmFtZSk7XG4gICAgcmV0dXJuIGZzLndyaXRlRmlsZShwYXRoRm9yU2F2ZSwgZGF0YSk7XG4gIH0pXG4gIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmxvZyhlcnJvcikpO1xuIl19