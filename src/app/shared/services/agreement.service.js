(function () {

  var agreementService = function ($http) {

    var getAgreements = function(offset, limit, yearOfIssue) {
      // if any of the arguments won't be provided, they will be set to some default value
      offset = offset || 0;
      limit = limit || 0;
      yearOfIssue = yearOfIssue || 0;

      if(offset < 0)
        offset = 0;
      if(limit < 0)
        limit = 0;
      if(yearOfIssue < 0)
        yearOfIssue = 0;

      var offsetPart = offset != 0? '&offset=' + offset: '';
      var limitPart = limit != 0? '&limit=' + limit: '';
      var orderPart = '&order=issueDate DESC';

      return $http.get(apiBaseRoute + '/api/agreement?filter=deleted:EQ:false' + offsetPart + limitPart + orderPart);
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

    var deleteAgreement = function(agreementId) {
      return $http.delete(apiBaseRoute + '/api/agreement/' + agreementId);
    }

    return {
      getAgreements: getAgreements,
      getAgreementById: getAgreementById,
      getAgreementsForStudent: getAgreementsForStudent,
      insertAgreement: insertAgreement,
      updateAgreement: updateAgreement,
      deleteAgreement: deleteAgreement
    };
  };

  angular
    .module('sis')
    .service('agreementService', agreementService);
})();