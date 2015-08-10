(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : global.Matter = factory();
})(this, function () {
  'use strict';

  var Matter = {
    greet: function greet() {
      return 'hello';
    }
  };

  var matter_library = Matter;

  return matter_library;
});
//# sourceMappingURL=matter-library.js.map