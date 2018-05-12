(function() {
  /* global angular*/
  
  var formatOrganizers = function() {
    return function(courseOrganization) {
      var format = "";

      if(courseOrganization.organizer1 != null){
        format += courseOrganization.organizer1.firstName + " ";
        format += courseOrganization.organizer1.lastName1;
        if(courseOrganization.organizer1.lastName2 != null){
          format +=  " " +courseOrganization.organizer1.lastName2;
        }
      }
      
      if(courseOrganization.organizer2 != null){
        format += ", " + courseOrganization.organizer2.firstName + " ";
        format += courseOrganization.organizer2.lastName1;
        if(courseOrganization.organizer2.lastName2 != null){
          format += " " +courseOrganization.organizer2.lastName2;
        }
      }

      if(courseOrganization.organizer3 != null){
        format += ", " + courseOrganization.organizer3.firstName + " ";
        format += courseOrganization.organizer3.lastName1;
        if(courseOrganization.organizer3.lastName2 != null){
          format += " " +courseOrganization.organizer3.lastName2 + " ";
        }
      }

      return format;
    };
  };
  
    angular
      .module('sis')
      .filter('formatOrganizers', formatOrganizers);
  })();