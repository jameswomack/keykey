"use strict";

var _require = require('util'),
    inspect = _require.inspect;

var LRU = require('lru-cache');

var WHITESPACE_X = /\s+/g;

function vaccuum(string) {
  return string.replace(WHITESPACE_X, '');
}

function hash(object) {
  return vaccuum(inspect(object, {
    depth: Infinity,
    showHidden: true
  }));
}

var cache = new LRU({
  max: 100
});

function validate(anArrayOfKeys) {
  var moduleOutputPrefix = '[keykey]';

  if (!Array.isArray(anArrayOfKeys)) {
    throw new TypeError(moduleOutputPrefix + ' Must call with an array.');
  }
}

function reduce(anArrayOfKeys, each) {
  var subObject = {};
  anArrayOfKeys.forEach(each.bind(each, subObject, anArrayOfKeys));
  return subObject;
}

function set(anArrayOfKeys) {
  var key = hash(anArrayOfKeys);
  return cache.set(key, anArrayOfKeys);
}

function create(anArrayOfKeys, bypassCache) {
  validate(anArrayOfKeys);
  var creation = reduce(anArrayOfKeys, function (result, _, key) {
    result[key] = key;
  });
  !bypassCache && set(creation);
  return creation;
}

function get(anArrayOfKeys) {
  return cache.get(hash(anArrayOfKeys)) || create(anArrayOfKeys);
}

function isUndef(o) {
  return typeof o === 'undefined';
}

function isBool(o) {
  return typeof o === 'boolean';
}

function last(a) {
  return a[a.length - 1];
}

function notUndefOrBool(o) {
  return !isUndef(o) && !isBool(o);
}

function KeyKey(anArrayOfKeys, bypassCache) {
  // Allow non-array input while maintaining cache decision-point
  if (notUndefOrBool(bypassCache)) {
    anArrayOfKeys = [].slice.call(arguments);
    var lastKey = last(anArrayOfKeys);

    if (isBool(lastKey)) {
      bypassCache = lastKey;
      anArrayOfKeys.pop();
    } else {
      bypassCache = false;
    }
  }

  return bypassCache ? create(anArrayOfKeys, bypassCache) : get(anArrayOfKeys);
}

module.exports = KeyKey;

module.exports.reset = function () {
  return cache.reset();
};

module.exports.resetCache = module.exports.reset;

module.exports.cacheKeys = function () {
  return cache.keys();
};

module.exports.cacheValues = function () {
  return cache.values();
};