angular.module('dmsApp')
  .controller('UserCtrl', ['$scope', '$rootScope', 'UserService', '$location', '$resource', '$mdDialog', '$window', '$http', function($scope, $rootScope, UserService, $location, $resource, $mdDialog, $window, $http) {

    $scope.saveSessStorage = function(id, token) {
      $window.sessionStorage.token = token;
      $window.sessionStorage.userId = id;
    };
    $scope.signup = function() {
      UserService.createUser($scope.user).then(function(res) {
        $scope.saveSessStorage(res.data.id, res.data.token);
        $scope.userId = res.data.id;
        $location.url('/dashboard');
      }, function(err) {
        console.log(err);
      });
    };
    $scope.login = function() {
      UserService.login($scope.user).then(function(res) {
        $scope.saveSessStorage(res.data.id, res.data.token);
        $location.url('/dashboard');
      }, function(err) {
      });
    };
    $scope.logout = function() {
      $window.sessionStorage.clear();
      $location.url('/home');
    };
    $scope.getUser = function() {
      var id = $window.sessionStorage.userId;
      UserService.getUser(id).then(function(res) {
        $scope.users = res.data;
      }, function(err) {
      });
    };
    $scope.getUserId = function() {
      var id = $window.sessionStorage.userId;
      return id;
    };
    $scope.editUser = function(user) {
      var id = $window.sessionStorage.userId;
      UserService.editUser(id, user).then(function(res) {
        $scope.user = res;
        location.reload();
      }, function(err) {
      });
    };
    $scope.editUserEv = function(ev) {
      $mdDialog.show({
        controller: userEvCtrl,
        templateUrl: 'app/views/editProfile.view.html',
        parent: angular.element(document.body),
        targetEvent: ev
      });
    };
    $scope.deleteUserEv = function(ev) {
      $mdDialog.show({
        controller: userEvCtrl,
        templateUrl: 'app/views/deleteProfile.view.html',
        parent: angular.element(document.body),
        targetEvent: ev
      });
    };
    function userEvCtrl($scope, $mdDialog) {
      $scope.hide = function() {
        $mdDialog.hide();
      };
      $scope.cancel = function() {
        $mdDialog.cancel();
      };
    }
    $scope.deleteUser = function() {
      var id = $window.sessionStorage.userId;
      UserService.deleteUser(id).then(function(res) {
        $window.sessionStorage.clear();
        $location.url('/home');
      }, function(err) {
      });
    };

  }]);
