(function() {

  var navbarCtrl = function($location,$route,$scope) {
    var navvm = this;

    navvm.user = {
      name: "Miša",
      surname: "Novak"
    };
    
  };

  angular
    .module('sis')
    .controller('navbarCtrl', navbarCtrl);
})(); 
