# Matter
<p align="center">
  <!-- Npm Version -->
  <a href="https://npmjs.org/package/kyper-matter">
    <img src="https://img.shields.io/npm/v/kyper-matter.svg" alt="npm version">
  </a>
  <!-- Build Status -->
  <a href="https://travis-ci.org/KyperTech/matter">
    <img title="Build Status" src="https://travis-ci.org/KyperTech/matter.svg">
  </a>
  <!-- Dependency Status -->
  <a href="https://david-dm.org/KyperTech/matter">
    <img src="https://david-dm.org/KyperTech/matter.svg" alt="dependency status">
  </a>
  <!-- Codeclimate -->
  <a href="https://codeclimate.com/github/KyperTech/matter">
    <img src="https://codeclimate.com/github/KyperTech/matter/badges/gpa.svg" alt="codeclimate">
  </a>
  <!-- Coverage -->
  <a href="https://codeclimate.com/github/KyperTech/matter">
    <img src="https://codeclimate.com/github/KyperTech/matter/badges/coverage.svg" alt="Coverage">
  </a>
  <!-- Documentation Coverage -->
  <a href="http://cdn.kyper.io/js/matter/latest/docs/class/src/matter.js~Matter.html">
    <img src="http://cdn.kyper.io/js/matter/latest/docs/badge.svg" alt="Docs Coverage"
  </a>
  <!-- License -->
  <a href="https://github.com/KyperTech/matter/blob/master/LICENSE">
    <img src="https://img.shields.io/npm/l/kyper-matter.svg" alt="license">
  </a>
</p>
> *What are the minimal tools I need to make an app* **matter**?

Matter is a Javascript library that provides common web application functionality such as user authentication and local/session/token storage. This library communicates with [Tessellate](https://github.com/KyperTech/tessellate) for application data, but custom server setups are on the roadmap.

Matter is Isomorphic, which means it will work well in both Browser and NodeJS environments. ES6 functionality is also available through importing and/or extending Matter (more details below).

## Quick Start

Using Matter requires having created an application on [Tessellate](http://tessellate.elasticbeanstalk.com) or [running your own Tessellate server]().

### Browser
1. Include the Matter library using one of the following:

  #### CDN

  To use the CDN, add the following script tag to your `index.html`:

    ```html
    <!-- Matter Library Bundle -->
    <script src="http://cdn.kyper.io/js/matter/0.1.7/matter.js"></script>
    ```
  #### Bower
  Run `bower install --save kyper-matter`

1. Start using Matter by providing the name of the app you created on [Tessellate](http://tessellate.elasticbeanstalk.com).

  ```javascript
  //New Matter object with the application name 'exampleApp'
  var matter = new Matter('exampleApp');

  //Login to account with username "test" and password "test"
  matter.login({username:"test", password:"test"}).then(function(user){
      console.log('User logged into exampleApp:', user);
  });
  ```

### ES6 or NodeJS
1. Run `npm install --save kyper-matter`
2. Start using matter:
```javascript
//New matter object with the application name 'exampleApp'
var matter = new Matter('exampleApp');
//Login to account with username "test" and password "test"
matter.login({username:"test", password:"test"}).then(function(user){
    console.log('User logged into exampleApp:', user);
});
```

## Docs

### [API Documentation](http://cdn.kyper.io/js/matter/latest/docs/class/src/matter.js~Matter.html)

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
