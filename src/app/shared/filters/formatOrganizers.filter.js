(function() {
  /* global angular*/
  
  var formatOrganizers = function() {
    return function(courseOrganization, makeNewLines) {
      var format = "";

      if(courseOrganization == null){
        //console.log("courseOrganization == null");
        return format;
      }

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

      if(makeNewLines) {
        format = format.replace(/(, )/g, ",\n");
      }

      return format;
    };
  };
  
  var formatOrganizer = function() {
    return function(organizer) {
      if(!organizer) return organizer;

      var format = "";

      if(organizer.firstName && organizer.firstName != null) {
        format += organizer.firstName + " ";
      }

      if(organizer.lastName1 && organizer.lastName1 != null) {
        format += organizer.lastName1 + " ";
      }

      if(organizer.lastName2 && organizer.lastName2 != null) {
        format += organizer.lastName2 + " ";
      }
      
      return format;
    };
  };

  angular
    .module('sis')
    .filter('formatOrganizers', formatOrganizers)
    .filter('formatOrganizer', formatOrganizer);
})();