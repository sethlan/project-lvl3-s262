'use strict';

var _package = require('../../package.json');

var _package2 = _interopRequireDefault(_package);

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _mz = require('mz');

var _mz2 = _interopRequireDefault(_mz);

var _ = require('..');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_commander2.default.version(_package2.default).usage('[options] <url> <whereToSafe>').arguments('<path> <url>').parse(process.argv);
console.dir(_commander2.default);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9iaW4vcGFnZWxvYWRlci5qcyJdLCJuYW1lcyI6WyJwcm9ncmFtIiwidmVyc2lvbiIsInVzYWdlIiwiYXJndW1lbnRzIiwicGFyc2UiLCJwcm9jZXNzIiwiYXJndiIsImNvbnNvbGUiLCJkaXIiXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBQSxvQkFDR0MsT0FESCxDQUNXQSxpQkFEWCxFQUVHQyxLQUZILENBRVMsK0JBRlQsRUFHR0MsU0FISCxDQUdhLGNBSGIsRUFJR0MsS0FKSCxDQUlTQyxRQUFRQyxJQUpqQjtBQUtBQyxRQUFRQyxHQUFSLENBQVlSLG1CQUFaIiwiZmlsZSI6InBhZ2Vsb2FkZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdmVyc2lvbiBmcm9tICcuLi8uLi9wYWNrYWdlLmpzb24nO1xuaW1wb3J0IHByb2dyYW0gZnJvbSAnY29tbWFuZGVyJztcbmltcG9ydCBteiBmcm9tICdteic7XG5pbXBvcnQgcGFnZWxvYWQgZnJvbSAnLi4nO1xuXG5wcm9ncmFtXG4gIC52ZXJzaW9uKHZlcnNpb24pXG4gIC51c2FnZSgnW29wdGlvbnNdIDx1cmw+IDx3aGVyZVRvU2FmZT4nKVxuICAuYXJndW1lbnRzKCc8cGF0aD4gPHVybD4nKVxuICAucGFyc2UocHJvY2Vzcy5hcmd2KTtcbmNvbnNvbGUuZGlyKHByb2dyYW0pO1xuIl19