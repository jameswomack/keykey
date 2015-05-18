var Util = require('util'),
    LRU  = require('lru-cache')

var WHITESPACE_X = /\s+/g

function vaccuum(string) {
  return string.replace(WHITESPACE_X, '')
}

function hash(object) {
  return vaccuum(Util.inspect(object, {
          depth:      Infinity,
          showHidden: true
        }))
}

var cache = LRU(100)

function validate(anArrayOfKeys) {
  var moduleOutputPrefix = '[keykey]';

  var isArray = Array.isArray(anArrayOfKeys);
  if(!isArray){
    throw new TypeError(moduleOutputPrefix + ' Must call with an array.');
  }
}

function reduce(anArrayOfKeys, each) {
  var subObject = {}
  anArrayOfKeys.forEach(each.bind(each, subObject, anArrayOfKeys))
  return subObject
}

function set(anArrayOfKeys) {
  var key = hash(anArrayOfKeys)
  return cache.set(key, anArrayOfKeys)
}

function create(anArrayOfKeys, bypassCache){
  validate(anArrayOfKeys)
  var creation = reduce(anArrayOfKeys, function(result, anArrayOfKeys, key){
    result[key] = key
  })
  !bypassCache && (set(creation))
  return creation
}

function get(anArrayOfKeys) {
  var key = hash(anArrayOfKeys)
  var object = cache.get(key)
  if(!object) {
    return create(anArrayOfKeys)
  }
  return object
}


function KeyKey(anArrayOfKeys, bypassCache){
  return bypassCache ? create(anArrayOfKeys, bypassCache) : get(anArrayOfKeys)
}

module.exports = KeyKey

module.exports.reset = function () {
  return cache.reset()
}
