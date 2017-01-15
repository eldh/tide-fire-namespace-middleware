'use strict';

exports.__esModule = true;
exports.default = namespaceMiddleware;

var _tideFire = require('tide-fire');

function namespaceMiddleware(fn, name, obj) {
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return getNewFn(fn, getNamespace(fn, obj), args);
  };
}

function getNamespace(fn, obj) {
  return fn.__namespace || obj.__namespace || [];
}

function getNewFn(fn, namespace, _ref) {
  var data = _ref[0],
      _ref$ = _ref[1],
      get = _ref$.get,
      set = _ref$.set,
      tide = _ref$.tide;

  var _get = function _get(path) {
    return get([].concat(namespace, path));
  };
  var _set = (0, _tideFire.curry)(function (path, val) {
    return set([].concat(namespace, path), val);
  });
  return fn(data, { get: _get, set: _set, tide: tide, getGlobal: get, setGlobal: set });
}
