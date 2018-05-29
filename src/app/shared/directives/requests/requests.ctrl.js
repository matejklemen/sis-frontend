(function() {
  var requestsCtrl = function($scope, exporterService) {
    var vm = this;
    vm.currentPageEnrolment = 1;
    vm.currentPageCourses = 1;
    
    getEnrolmentRequests(1)
    getCoursesRequests(1)

    /* HELPERS */
    function getEnrolmentRequests(page){
      var limit = 20;
      var offset = (page-1) * limit;

      exporterService.getAllRequsts(offset, limit,"enrolment").then(
        function success(response){
          vm.enrolmentRequests = response.data
          vm.enrolmentTotalCount = response.headers("X-total-count");
        },
        function error(error){
          console.log("Oh no...", error)
        }
      )
    }

    function getCoursesRequests(page){
      var limit = 20;
      var offset = (page-1) * limit;

      exporterService.getAllRequsts(offset, limit,"courses").then(
        function success(response){
          vm.coursesRequests = response.data
          vm.coursesTotalCount = response.headers("X-total-count");
        },
        function error(error){
          console.log("Oh no...", error)
        }
      )
    }
    

    vm.deleteRequest = function(request, index, type){
      if(confirm("Ste prepričani, da želite izbristi izbrano prošnjo?")){
        exporterService.deleteRequest(request.id).then(
          function success(response){
            console.log("uspešno zbrisano")
            if(type === "enrolment"){
              vm.enrolmentRequests.splice(index, 1)
            }else{
              vm.coursesRequests.splice(index, 1)
            }
            
          },
          function error(error){
            console.log("Oh no...", error)
          }
        );
      }
    }

    /* GET PDF's */
    vm.getEnrolmentConformation = function(request){
      if(request.student.id != undefined){
        studentId = request.student.id;
      }else{
        studentId = request.student;
      }
      exporterService.getPdfEnrolmentConformation(studentId);
    }

    vm.getDigitalIndex = function(request){
      if(request.student.id != undefined){
        studentId = request.student.id;
      }else{
        studentId = request.student;
      }
      exporterService.getDigitalIndexPdf(studentId);
    }

    /* Change page */
    vm.changedPageEnrolment = function() {
      getEnrolmentRequests(vm.currentPageEnrolment);
    };

    vm.changedPageCourses = function() {
      getCoursesRequests(vm.currentPageCourses);
    };
  };

  angular
    .module('sis')
    .controller('requestsCtrl', requestsCtrl);
})();