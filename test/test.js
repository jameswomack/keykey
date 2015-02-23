describe('keykey', function(){
  var expect = require('chai').expect;
  var keykey = require('../');

  it('should throw when what\'s passed is not an array', function(){
    [null, '', 1, {}].forEach(function(nonArray){
      expect(function(){
        keykey(nonArray);
      }).to.throw(TypeError);
    });
  });

  it('should return a mirror when what\'s passed is an array', function(){
    expect(keykey([null, '', 1, {}])).to.eql({
      "null": null,
      "": "",
      "1": 1,
      "[object Object]": {}
    });
  });
});
