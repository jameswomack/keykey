# KeyKey

[![Build Status via CodeShip](https://codeship.com/projects/a2a85c50-9d3b-0132-6acc-4ef4301ddd41/status?branch=master)](https://codeship.com)


KeyKey is a micro utility module which provides a default way to create constants. Although originally designed for
use with [Node.js](http://nodejs.org) and installable via `npm install keykey`,
it can also be used in the browser via browserify. KeyKey was influenced by `keyMirror` from Facebook's Flux.

## Quick Example

```javascript
keykey(['foo','bar','baz']); // result -> {foo:'foo',bar:'bar',baz:'baz'}
```