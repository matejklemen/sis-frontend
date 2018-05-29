(function () {

  var agreementService = function ($http) {

    var getAgreements = function() {
      return $http.get(apiBaseRoute + '/api/agreement');
    }

    var getAgreementById = function(agreementId) {
      return $http.get(apiBaseRoute + '/api/agreement/' + agreementId);
    }

    var getAgreementsForStudent = function(studentId) {
      return $http.get(apiBaseRoute + '/api/agreement/student?studentid=' + studentId);
    }

    var insertAgreement = function(agreementObject) {
      return $http.put(apiBaseRoute + '/api/agreement', agreementObject);
    }

    var updateAgreement = function(newAgreementObject) {
      return $http.post(apiBaseRoute + '/api/agreement', newAgreementObject);
    }

    return {
      getAgreements: getAgreements,
      getAgreementById: getAgreementById,
      getAgreementsForStudent: getAgreementsForStudent,
      insertAgreement: insertAgreement,
      updateAgreement: updateAgreement
    };
  };

  angular
    .module('sis')
    .service('agreementService', agreementService);
})();