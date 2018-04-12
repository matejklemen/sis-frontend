(function() {
  var codelistEntryCtrl = function($scope, $uibModalInstance, codelistService, resModeEdit, resCodelist) {
    // if resModeEdit is false, we are adding a new entry.
    // if resModeEdit contains an object, we are editing it!

    var vm = this;

    vm.sendStatus = false;
    
    if(!resModeEdit) {
      vm.entry = {};
    } else {
      vm.entry = resModeEdit;
      vm.editMode = true;
    }

    console.log(vm.entry);

    vm.name = resCodelist.displayName;

    vm.columnNames = resCodelist.columnNames;
    vm.columnTypes = resCodelist.columnTypes;

    vm.columnOptions = {};

    vm.columnTypes.forEach(function(element, index) {
      if(element.length > 2) {
        codelistService.getCodelist(element).then(
          function success(response) {
            vm.columnOptions[element] = response.data;
            // fix for poc type -> name
            if(element == "poc") {
              console.log(element);
              vm.columnOptions[element].forEach(function(el) {
                if(el.moduleName != null)
                  el.name = el.moduleName;
                else
                  el.name = el.type;
              });
            }
          },
          function error(response) {
            console.error("Oh no... ", response);
          }
        );
      }
    });

    vm.saveEntry = function() {
      // update/add studyDegree.name field
      if('studyDegree' in vm.entry) {
        vm.columnOptions.studydegrees.some(function(item) {
          if(item.id == vm.entry.studyDegree.id) {
            vm.entry.studyDegree.name = item.name;
            return true;
          }
        });
      }
      // update/add type & moduleName field if POC
      if('poc' in vm.entry) {
        vm.columnOptions.poc.some(function(item) {
          if(item.id == vm.entry.poc.id) {
            vm.entry.poc.moduleName = item.moduleName;
            vm.entry.poc.type = item.type;
          }
        });
      }

      // update/add idCourse.name field
      if('idCourse' in vm.entry) {
        vm.columnOptions.courses.some(function(item) {
          if(item.id == vm.entry.idCourse.id) {
            vm.entry.idCourse.name = item.name;
            return true;
          }
        });
      }

      // update/add idStudyProgram.name field
      if('idStudyProgram' in vm.entry) {
        vm.columnOptions.studyprograms.some(function(item) {
          if(item.id == vm.entry.idStudyProgram.id) {
            vm.entry.idStudyProgram.name = item.name;
            return true;
          }
        });
      }

      // update/add studyYear.name field
      if('studyYear' in vm.entry) {
        vm.columnOptions.studyyears.some(function(item) {
          if(item.id == vm.entry.studyYear.id) {
            vm.entry.studyYear.name = item.name;
            return true;
          }
        });
      }        

      if(!resModeEdit) {
          codelistService.putEntry(resCodelist.endpoint, vm.entry).then(
          function success(response) {
            $uibModalInstance.close(response.data);
          },
          function error(error) {
            vm.sendStatus = error.data;
          }
        );
      } else {
        codelistService.postEntry(resCodelist.endpoint, vm.entry).then(
          function success(response) {
            $uibModalInstance.close(response.data);
          },
          function error(error) {
            vm.sendStatus = error.data;
          }
        );
      }
      
    };

    vm.deleteEntry = function() {
      codelistService.deleteEntry(resCodelist.endpoint, vm.entry).then(
        function success(response) {
          $uibModalInstance.close("deleted");
        },
        function error(error) {
          vm.sendStatus = error.data;
        }
      );
    };

    vm.close = function() {
      $uibModalInstance.dismiss();
    };

  };

  angular
    .module('sis')
    .controller('codelistEntryCtrl', codelistEntryCtrl);
})();
