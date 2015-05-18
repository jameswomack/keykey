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
      'null': null,
      '': '',
      '1': 1,
      '[object Object]': {}
    });
  });

  it('should have a reset function', function(){
    expect(keykey.reset).to.be.a.function
  })

  it('should be faster on the second retrieval', function(){
    var arrayOfKeys,
        times = {},
        lastTime = 0

    function start() {
        lastTime = process.hrtime()
    }

    function getElapsedTime(key){
      times[key] = times[key] || 0

      // 3 decimal places
      var precision = 3;
      // divide by a million to get nano to milli
      var elapsed = process.hrtime(lastTime)[1] / 1000000;
      // print message + time

      times[key] += elapsed.toFixed(precision)
      return times[key]
    }

    arrayOfKeys = [null, '', 1, {}]

    start()
    keykey(arrayOfKeys)
    getElapsedTime('firstRun')

    start()
    keykey(arrayOfKeys)
    getElapsedTime('cached')

    expect(times.firstRun).to.be.above(times.cached)
  });
});
