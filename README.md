# KeyKey


[![Build Status via CodeShip](https://codeship.com/projects/a2a85c50-9d3b-0132-6acc-4ef4301ddd41/status?branch=master)](https://codeship.com)
[![Build Status](https://travis-ci.org/jameswomack/keykey.svg?branch=master)](https://travis-ci.org/jameswomack/keykey)
[![bitHound Overalll Score](https://www.bithound.io/github/jameswomack/keykey/badges/score.svg)](https://www.bithound.io/github/jameswomack/keykey)
[![bitHound Dependencies](https://www.bithound.io/github/jameswomack/keykey/badges/dependencies.svg)](https://www.bithound.io/github/jameswomack/keykey/master/dependencies/npm)
[![bitHound Dev Dependencies](https://www.bithound.io/github/jameswomack/keykey/badges/devDependencies.svg)](https://www.bithound.io/github/jameswomack/keykey/master/dependencies/npm)
[![bitHound Code](https://www.bithound.io/github/jameswomack/keykey/badges/code.svg)](https://www.bithound.io/github/jameswomack/keykey)


## The shaman's KeyMirror-alternative. 
* Create enumerations
* Functional-programming friendly (pass keys individually or as an array)
* Performs well in hot code paths
* Works in Node and browsers via Browerify

```javascript
> require('keykey')( 'FOO', 'BAR', 'BAZ' )

{
	FOO: 'FOO',
	BAR: 'BAR',
	BAZ: 'BAZ'
}
```

KeyKey is a *micro utility module* which provides a consistent way to declare constants. KeyKey achieves a very simple task, but it tries to do so in a way that will encourage innovative use. KeyKey offers functional programming capabilities by allowing keys to be passed individually or via an array. KeyKey makes constants not just from strings, but also from any JavaScript object. It caches the resulting key mirrors, making subsequent calls faster. And this cache is accessible if needed, which could provide an interesting look into constants across your application. Check out the performance test in `/test`. 

Plus, hey—no unnecessary `null`s.

## Install
`npm install keykey`

## Quick Start
### Create constants with caching
```javascript
const keykey = require('keykey')

// Arrays of keys
keykey(['foo','bar','baz']) // result -> {foo:'foo',bar:'bar',baz:'baz'}

// Individual keys
keykey('foo',true,'baz') // bools, if not in the final position, are treated as keys
```
### Bypass the cache
```javascript
keykey(['foo','bar','baz'], false) // no get/set
keykey('foo','bar','baz', false) // bools in the final position are treated as a cache switch
```

### Clear the entire cache
```javascript
keykey.reset() // or 
keykey.resetCache()
```
