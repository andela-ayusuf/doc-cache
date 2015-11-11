angular.module('dmsApp')
  .factory('ToastService', ['$mdToast', function($mdToast) {
    var Toast = {};
    Toast.showSimpleToast = function(message) {
      $mdToast.show(
        $mdToast.simple()
          .content(message)
          .position('right')
          .hideDelay(3000)
      );
    };
   return Toast;
  }]);
