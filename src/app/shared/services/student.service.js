(function() {

  var apiBaseRoute = "http://localhost:8080";

  var studentService = function($http) {
    /*
     - vpisna številka
     - priimek in ime
     - naslov stalnega bivališča
     - naslov za prejemanje pošte
     - telefonska številka
     - e-poštni naslov
     - podatki o vpisih:
       - študijsko leto
       - letnik
       - študijski program
       - vrsta vpisa
       - način študija
     */

    var searchStudents = function(searchValue) {
      return $http.get(apiBaseRoute+'/api/students/search/' + searchValue);
    };

    var getByStudentId = function(studentId) {
      return $http.get(apiBaseRoute+'/api/students/s/' + studentId);
      /*
      return {
        "vpisna": "12345",
        "ime": "AAA",
        "priimek": "BBB",
        "naslov1": "N1",
        "naslov2": "N2",
        "telefon": "000000",
        "eposta": "abc@def",
        "vpisi": [
          {
            "leto": "2017/2018",
            "letnik": "3",
            "program": "RI UNI",
            "vrsta": "redni",
            "nacin": "nekineki",
          },
          {
            "leto": "2016/2017",
            "letnik": "2",
            "program": "RI UNI",
            "vrsta": "redni",
            "nacin": "nekineki",
          },
        ]
      };
      */
    };

    return {
      searchStudents: searchStudents,
      getByStudentId: getByStudentId,
    };
  };

  angular
    .module('sis')
    .service('studentService', studentService);
})();