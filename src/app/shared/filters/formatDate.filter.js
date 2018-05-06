(function() {
/* global angular*/

var formatDate = function() {
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

    var hours = d.getHours();
    if(hours < 10) hours = "0" + hours;
    var minutes = d.getMinutes();
    if(minutes < 10) minutes = "0" + minutes;

    return day+'.'+month+'.'+year+' '+hours+':'+minutes;
  };
};

  angular
    .module('sis')
    .filter('formatDate', formatDate);
})();