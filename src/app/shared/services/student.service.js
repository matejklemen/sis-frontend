(function() {

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
      return [
        {
          "vpisna": "12345",
          "ime": "AAA",
          "priimek": "BBB"
        },
        {
          "vpisna": "6789",
          "ime": "CCC",
          "priimek": "DDD"
        },
      ];
    };

    var getByStudentVpisna = function(vpisna) {
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
    };

    return {
      searchStudents: searchStudents,
      getByStudentVpisna: getByStudentVpisna,
    };
  };

  angular
    .module('sis')
    .service('studentService', studentService);
})();