(function() {
  var agreementListCtrl = function($scope, $routeParams, $location, $filter, $uibModal, agreementService, authenticationService) {
    var vm = this;

    /* Get role */
    vm.role = authenticationService.getRole();
    vm.loginId = authenticationService.getLoginId();

    vm.currentPage = 1;
    vm.limit = 20;

    vm.error = {};

    vm.toggleShowSlo = function(idxAgreement) {
      vm.searchResult[idxAgreement].toggleSlo = !vm.searchResult[idxAgreement].toggleSlo;

      vm.searchResult[idxAgreement].toggleMessageSlo = vm.searchResult[idxAgreement].toggleSlo? "[Manj]": "[...]";
    }

    vm.toggleShowEng = function(idxAgreement) {
      vm.searchResult[idxAgreement].toggleEng = !vm.searchResult[idxAgreement].toggleEng;

      vm.searchResult[idxAgreement].toggleMessageEng = vm.searchResult[idxAgreement].toggleEng? "[Less]": "[...]";
    }

    var trimIfNeeded = function(idxAgreementObj) {
      vm.searchResult[idxAgreementObj].fullContentSlovene = vm.searchResult[idxAgreementObj].contentSlovene;

      var splitContentSlovene = vm.searchResult[idxAgreementObj].fullContentSlovene.split(" ");
      var lastWordIdxSlo = splitContentSlovene.length > 10? 10: splitContentSlovene.length;

      // trim after 10th word...
      vm.searchResult[idxAgreementObj].hasMoreSlo = splitContentSlovene.length > 10;

      if(vm.searchResult[idxAgreementObj].hasMoreSlo)
        vm.searchResult[idxAgreementObj].toggleMessageSlo = "[...]";

      vm.searchResult[idxAgreementObj].contentSlovene = splitContentSlovene.slice(0, lastWordIdxSlo).join(" ");

      if(vm.searchResult[idxAgreementObj].contentEnglish != null) {
        vm.searchResult[idxAgreementObj].fullContentEnglish = vm.searchResult[idxAgreementObj].contentEnglish;
        var splitContentEnglish = vm.searchResult[idxAgreementObj].fullContentEnglish.split(" ");
        var lastWordIdxEng = splitContentEnglish.length > 10? 10: splitContentEnglish.length;

        vm.searchResult[idxAgreementObj].hasMoreEng = splitContentEnglish.length > 10;

        if(vm.searchResult[idxAgreementObj].hasMoreEng)
          vm.searchResult[idxAgreementObj].toggleMessageEng = "[...]";

        vm.searchResult[idxAgreementObj].contentEnglish = splitContentEnglish.slice(0, lastWordIdxEng).join(" ");
      }
    }

    vm.getAgreementList = function() {
      var selectedYr = vm.filterYearOfIssue === undefined ? null: vm.filterYearOfIssue;

      agreementService.getAgreements((vm.currentPage - 1) * vm.limit, vm.limit, selectedYr).then(
        function success(response) {
          vm.totalCount = response.headers('X-total-count');
          vm.searchResult = response.data;

          for(var i = 0; i < vm.searchResult.length; i++) {

            trimIfNeeded(i);


          }

          console.log(vm.searchResult);
        },
        function error(error) {
          console.log('Error loading agreements...');
        });
    };

    vm.getAgreementList();

    vm.deleteAgreement = function(agreement, index) {
      //showDeleteExamTermModal
      var modalInstance = $uibModal.open({
        templateUrl: 'shared/directives/agreementList/deleteAgreementModal.modalview.html',
        controller: 'deleteAgreementModalCtrl',
        controllerAs: 'vm',
        resolve: {
          resAgreement: function() {
            return agreement;
          },
          resUserLogin: function() {
            return vm.loginId;
          },
          resUserRole: function() {
            return vm.role;
          }
        }
      });

      // get result from modal after it's closed here
      modalInstance.result.then(
        function(result) {
          if(result == "deleted") {
            // remove exam term from the list
            vm.searchResult.splice(index, 1);
          }
        },
        function(closeInfo) {}
      );
    };

    vm.changedPage = function() {
      vm.getExamTermList();
    };

    vm.redirectToAgreementForm = function() {
      $location.path("/agreement");
    };

  };

  angular
  .module('sis')
  .controller('agreementListCtrl', agreementListCtrl);
})();
