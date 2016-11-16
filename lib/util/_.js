'use strict';

exports.__esModule = true;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.has = has;
exports.isShallowEqual = isShallowEqual;
exports.find = find;
exports.chunk = chunk;
exports.splat = splat;

function eql(a, b) {
  return a === b;
}

/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 */
function _shallowEqual(objA, objB) {
  if (objA == null || objB == null) return false;

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) return false;

  for (var i = 0; i < keysA.length; i++) {
    if (!has(objB, keysA[i]) || !eql(objA[keysA[i]], objB[keysA[i]])) return false;
  }return true;
}

function has(o, k) {
  return o ? Object.prototype.hasOwnProperty.call(o, k) : false;
}

var result = exports.result = function result(value) {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return typeof value === 'function' ? value.apply(undefined, args) : value;
};

function isShallowEqual(a, b) {
  if (a === b) return true;
  if (a instanceof Date && b instanceof Date) return a.getTime() === b.getTime();
  if ((typeof a === 'undefined' ? 'undefined' : _typeof(a)) !== 'object' && (typeof b === 'undefined' ? 'undefined' : _typeof(b)) !== 'object') return a === b;
  if ((typeof a === 'undefined' ? 'undefined' : _typeof(a)) !== (typeof b === 'undefined' ? 'undefined' : _typeof(b))) return false;
  return _shallowEqual(a, b);
}

function find(arr, cb) {
  var result = void 0;
  arr.every(function (val, idx) {
    if (cb(val, idx, arr)) {
      result = val;
      return false;
    }
    return true;
  });
  return result;
}

function chunk(array, chunkSize) {
  var index = 0,
      length = array ? array.length : 0,
      result = [];

  chunkSize = Math.max(+chunkSize || 1, 1);

  while (index < length) {
    result.push(array.slice(index, index += chunkSize));
  }return result;
}

function splat(obj) {
  return obj == null ? [] : [].concat(obj);
}