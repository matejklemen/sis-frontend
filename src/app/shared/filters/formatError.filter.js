(function() {
/* global angular*/

var formatError = function() {
  return function(elem) {
    // if it's not an object or it's null (because in js, null is a type of object...)
    if(typeof elem !== 'object' || !elem) return elem;

    // if it's an object and has key status and message, format it
    if('status' in elem && 'message' in elem) {
      return elem.status + ' : ' + elem.message;
    }
    
    return elem;
  };
};

  angular
    .module('sis')
    .filter('formatError', formatError);
})();