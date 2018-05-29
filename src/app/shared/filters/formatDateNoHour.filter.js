(function() {
/* global angular*/

var formatDateNoHour = function() {
  return function(date) {
    if(!date) return date;

    // formats a date given from backend
    // returns a formatted string NOT a Date object!!
    // input format: YYYY-MM-DDTHH:mm:ss
    // output format: DD.MM.YYYY HH:mm

    var d = new Date(date);

    var year = d.getFullYear();
    var month = d.getMonth() + 1;
    var day = d.getDate();

    return day+'.'+month+'.'+year
  };
};

  angular
    .module('sis')
    .filter('formatDateNoHour', formatDateNoHour);
})();