angular.module('dmsApp')
  .controller('DashboardCtrl', ['$scope', '$timeout', function($scope, $timeout) {
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
        name: 'Profile',
        icon: '../assets/imgs/account.svg',
        href: '/#/profile'
      }
    ];

  }]);