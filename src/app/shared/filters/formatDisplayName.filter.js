(function() {
/* global angular*/

var formatDisplayName = function() {
  return function(elem) {
    // if it's not an object or it's null (because in js, null is a type of object...)
    if(typeof elem !== 'object' || !elem) return elem;

    // if it's an object and has key name, display only the name
    if('name' in elem) return elem.name;

    // if it has moduleName (POC), display module name. If it's null, display type
    if(elem.moduleName !== undefined) {
      if(elem.moduleName !== null) {
        return elem.moduleName;
      } else {
        return elem.type;
      }
    }

    return elem;
  };
};

  angular
    .module('sis')
    .filter('formatDisplayName', formatDisplayName);
})();