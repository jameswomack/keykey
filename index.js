module.exports = function(anArrayOfKeys){
  var moduleOutputPrefix = '[keykey]';

  var isArray = Array.isArray(anArrayOfKeys);
  if(!isArray){
    throw new TypeError(moduleOutputPrefix + ' Must call with an array.');
  }

  return anArrayOfKeys.reduce(function(result, key){
    result[key] = key;
    return result;
  }, {});
};
