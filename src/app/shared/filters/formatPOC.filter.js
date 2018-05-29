(function() {
/* global angular*/

  var formatPOC = function() {
    
    return function(pocObject) {
      if(!pocObject) return pocObject;

      switch (pocObject.type) {
        case 'obv': return "▶ Obvezni predmet";
        case 'piz': return "◆ Prosto-izbirni predmet";
        case 'siz': return "■ Strokovno-izbirni predmet";
        case 'mod': return pocObject.moduleName;
        default: return "?";
      }
    };

  };

  angular
    .module('sis')
    .filter('formatPOC', formatPOC);
})();