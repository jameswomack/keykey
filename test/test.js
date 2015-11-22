// jscs:disable disallowQuotedKeysInObjects

describe('keykey', function () {
  const expect = require('chai').expect
  const keykey = require('../')

  // For time trial in last test
  var times = {}
  var lastTime = 0

  after(function () {
    console.log('Cached: ', times.cached, ' Uncached: ', times.firstRun)
  })

  it('should throw when passed a single non-array argument', function () {
    [null, '', 1, {}].forEach(function (nonArray) {
      expect(function () {
        keykey(nonArray)
      }).to.throw(TypeError)
    })
  })

  it('should use the final argument for a cache decision if boolean', function () {
    expect(keykey(null, '', 1, {}, false)).to.eql({
      'null'            : null,
      ''                : '',
      '1'               : 1,
      '[object Object]' : {}
    })
    expect(keykey(null, '', 1, {}, true)).to.eql({
      'null'            : null,
      ''                : '',
      '1'               : 1,
      '[object Object]' : {}
    })
  })

  it('should use booleans for keys if not in the final argument position', function () {
    expect(keykey(null, '', 1, true, {})).to.eql({
      'null'            : null,
      ''                : '',
      '1'               : 1,
      'true'            : true,
      '[object Object]' : {}
    })
  })


  it('should return a mirror when what\'s passed is an array', function () {
    expect(keykey([null, '', 1, {}])).to.eql({
      'null'            : null,
      ''                : '',
      '1'               : 1,
      '[object Object]' : {}
    })
  })

  it('should have a reset function', function () {
    expect(keykey.reset).to.be.a.function
  })

  it('should be faster on the second retrieval', function () {
    function start () {
        lastTime = process.hrtime()
    }

    function getElapsedTime (key) {
      times[key] = times[key] || 0

      // 3 decimal places
      const precision = 3
      // divide by a million to get nano to milli
      const elapsed = process.hrtime(lastTime)[1] / 1000000
      // print message + time

      times[key] += parseFloat(elapsed.toFixed(precision))
      return times[key]
    }

    const arrays = [
      [null, '', 7, {}],
      [null, '', 6, {}],
      [null, '', 5, {}],
      [null, '', 4, {}],
      [null, '', 3, {}],
      [null, '', 2, {}],
      [null, '', 1, {}]
    ]

    start()
    arrays.forEach(keykey)
    getElapsedTime('firstRun')

    start()
    arrays.forEach(keykey)
    getElapsedTime('cached')

    expect(times.firstRun).to.be.above(times.cached)
  })
})
