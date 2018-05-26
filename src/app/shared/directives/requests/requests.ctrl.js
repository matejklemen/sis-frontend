(function() {
  var requestsCtrl = function($scope, exporterService) {
    var vm = this;
    vm.currentPage = 1;
    
    getRequests(1)


    /* HELPERS */
    function getRequests(page){
      var limit = 20;
      var offset = (page-1) * limit;

      exporterService.getAllRequsts(offset, limit).then(
        function success(response){
          console.log("response data: ",response.data);
          vm.requests = response.data
          vm.totalCount = response.headers("X-total-count");
        },
        function error(error){
          console.log("Oh no...", error)
        }
      )
    }

    vm.getEnrolmentConformation = function(request){
      if(request.student.id != undefined){
        studentId = request.student.id;
      }else{
        studentId = request.student;
      }
      exporterService.getPdfEnrolmentConformation(studentId);
    }

    vm.deleteRequest = function(request, index){
      if(confirm("Ste prepričani, da želite izbristi izbrano prošnjo?")){
        exporterService.deleteRequest(request.id).then(
          function success(response){
            console.log("uspešno zbrisano")
            vm.requests.splice(index, 1)
          },
          function error(error){
            console.log("Oh no...", error)
          }
        );
      }
    }

    vm.changedPage = function() {
      // load a new page of entries
      getRequests(vm.currentPage);
    };
  };

  angular
    .module('sis')
    .controller('requestsCtrl', requestsCtrl);
})();