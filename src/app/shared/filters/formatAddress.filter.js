(function() {
/* global angular*/

var formatAddress = function() {
  return function(addressObject, showCountry) {
    if(!addressObject) return "/";

    var ab = "";
    // Append first line of address
    ab += addressObject.line1;
    // Append second line of address, if defined
    if(addressObject.line2 && addressObject.line2.trim().length > 0) {
        ab += "\n";
        ab += addressObject.line2;
    }
    // Append post number and post title
    // post.id <=> post number
    ab += "\n";
    if(addressObject.post) {
        ab += addressObject.post.id + " " + addressObject.post.name;
    } else {
        ab += "/";
    }

    // Append country, if defined
    if(showCountry && addressObject.country.trim().length > 0) {
        ab += "\n";
        ab += addressObject.line1;
    }

    return ab;
  };
};

  angular
    .module('sis')
    .filter('formatAddress', formatAddress);
})();