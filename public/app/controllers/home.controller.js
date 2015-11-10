angular.module('dmsApp')
  .controller('HomeCtrl', ['$scope', '$timeout', function($scope, $timeout) {
    var self = this;
    self.isOpen = false;
  
    $scope.$watch('demo.isOpen', function(isOpen) {
      if (isOpen) {
        $timeout(function() {
          $scope.tooltipVisible = self.isOpen;
        }, 600);
      } else {
        $scope.tooltipVisible = self.isOpen;
      }  
    });
    self.items = [
      {
        name: 'Signup',
        icon: '../assets/imgs/account-plus.svg',
        href: '/#/signup'
      },
      {
        name: 'Login',
        icon: '../assets/imgs/login.svg',
        href: '/#/login'
      }
    ];

  }]);