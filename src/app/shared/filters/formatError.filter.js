(function() {
/* global angular*/

var formatError = function() {
  return function(elem) {
    // if it's not an object or it's null (because in js, null is a type of object...)
    if(typeof elem !== 'object' || !elem) return elem;

    // if it's an object and has key status and messages, format it
    if('status' in elem && 'messages' in elem) {
      // if messages is not an array, just display it
      if(!(elem.messages instanceof Array)) {
        return elem.status + ' : ' + elem.messages;
      } else {
        var bm = "";
        for(var i=0; i<elem.messages.length; i++) {
          bm += elem.messages[i];
          if(i < elem.messages.length - 1) bm += ", ";
        }
        return bm;
      }
      
    }
    
    return elem;
  };
};

  angular
    .module('sis')
    .filter('formatError', formatError);
})();