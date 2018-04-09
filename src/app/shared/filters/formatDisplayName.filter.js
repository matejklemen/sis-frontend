(function() {
/* global angular*/

var formatDisplayName = function() {
  return function(elem) {
    // if it's not an object or it's null (because in js, null is a type of object...)
    if(typeof elem !== 'object' || !elem) return elem;

    // if it's an object and has key name, display only the name
    if('name' in elem) return elem.name;

    return elem;
  };
};

  angular
    .module('sis')
    .filter('formatDisplayName', formatDisplayName);
})();