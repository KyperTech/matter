# Matter

[![npm version](https://img.shields.io/npm/v/kyper-matter.svg?style=flat-square)](https://www.npmjs.com/package/kyper-matter)
[![npm downloads](https://img.shields.io/npm/dm/kyper-matter.svg?style=flat-square)](https://www.npmjs.com/package/kyper-matter)
[![build status](https://img.shields.io/travis/KyperTech/matter/master.svg?style=flat-square)](https://travis-ci.org/KyperTech/matter)
[![dependencies status](https://img.shields.io/david/KyperTech/matter/master.svg?style=flat-square)](https://david-dm.org/KyperTech/matter)
[![codeclimate](https://img.shields.io/codeclimate/github/KyperTech/matter.svg?style=flat-square)](https://codeclimate.com/github/KyperTech/matter)
[![coverage](https://img.shields.io/codeclimate/coverage/github/KyperTech/matter.svg?style=flat-square)](https://codeclimate.com/github/KyperTech/matter)
[![license](https://img.shields.io/npm/l/kyper-matter.svg?style=flat-square)](https://github.com/KyperTech/matter/blob/master/LICENSE)

> *What are the minimal tools I need to make an app* **matter**?

Matter is a Javascript library that provides common web application functionality such as user authentication and local/session/token storage. This library is built to communicate with a [Tessellate Server](https://github.com/KyperTech/tessellate) such as [Tessellate](http://tessellate.kyper.io) for application data, but custom server setups are on the roadmap.

Matter is Isomorphic, which means it will work well in both Browser and NodeJS environments. ES6 functionality is also available through importing and/or extending Matter (more details below).

## Quick Start

Using Matter requires having created an application on [Build](http://build.kyper.io), [Tessellate](http://tessellate.kyper.io) or on [your own Tessellate server](https://github.com/KyperTech/tessellate/wiki/Run-Your-Own).

### Browser
1. Include the Matter library using one of the following:

  #### CDN

  To use the CDN, add the following script tag to your `index.html`:

    ```html
    <!-- Matter Library Bundle -->
    <script src="http://cdn.kyper.io/js/matter/0.2.2/matter.js"></script>
    ```
  #### Bower
  Run `bower install --save kyper-matter`

2. Start using Matter by providing the name of the app you created on [Build](http://build.kyper.io) or [Tessellate](http://tessellate.kyper.io):
  ```javascript
  //New Matter object with the application name 'exampleApp'
  var matter = new Matter('exampleApp');
  ```
3. Start using Matter:
```javascript
//Login to account with username "test" and password "test"
matter.login({username:"test", password:"test"}).then(function(user){
    console.log('User logged into exampleApp:', user);
});
```

### ES6
  1. Run `npm install --save kyper-matter`
  2. Import Matter library
```javascript
import Matter from 'kyper-matter';
```
  3. Create a new matter application object:
```javascript
//New matter object with the application name 'exampleApp'
let matter = new Matter('exampleApp');
//Login to account with username "test" and password "test"
matter.login({username:"test", password:"test"}).then((user) => {
  console.log('User logged into exampleApp:', user);
}, (err) => {
  console.error('Error logging in:', err);
});
```
  4. Use [Matter methods](http://cdn.kyper.io/js/matter/latest/docs/class/src/index.js~Matter.html)

### NodeJS
  1. Run `npm install --save kyper-matter`
  2. Import Matter library
  ```javascript
  var Matter = require('kyper-matter');
  ```
  3. Create a new matter application object:
  ```javascript
  //New matter object with the application name 'exampleApp'
  var matter = new Matter('exampleApp');
  //Login to account with username "test" and password "test"
  matter.login({username:"test", password:"test"}).then(function(user) {
    console.log('User logged into exampleApp:', user);
  }, function(err) {
    console.error('Error logging in:', err);
  });
  ```

## Options
When creating a new matter object, you can provide an options object as the second argument:

```javascript
//New matter object with the application name 'exampleApp'
var optionsObj = {
  localServer: false,
  logLevel: 'trace'
}
var matter = new Matter('exampleApp', optionsObj);
```
Availble options:
* `logLevel` - Level of logging (error, warn, info, debug, or trace)
* `localServer` - Boolean of whether or not to use local tessellate server


## Docs

### [API Documentation](http://cdn.kyper.io/js/matter/latest/docs/index.html)

### [Examples](https://github.com/KyperTech/matter/tree/master/examples)

## More Information
For more details please visit the [Matter Wiki](https://github.com/KyperTech/matter/wiki).

## Test

Tests are located in test folder and can be run via `gulp test` or `gulp coverage` commands.

`index.html` has been added as a bare bones test page similar to browser example (`/examples/browser/index.html).

## TODO
* Run tests git pre-push
* More local storage capabilities
* Version release gulp task
