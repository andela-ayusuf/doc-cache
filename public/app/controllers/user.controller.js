angular.module('dmsApp')
  .controller('UserCtrl', ['$scope', '$rootScope', 'UserService', 'ToastService', '$location', '$resource', '$mdDialog', '$window', '$http', function($scope, $rootScope, UserService, ToastService, $location, $resource, $mdDialog, $window, $http) {

    // this function saves token and user id to the session storage
    $scope.saveSessStorage = function(id, token) {
      $window.sessionStorage.token = token;
      $window.sessionStorage.userId = id;
    };

    // this function creates a new user
    $scope.signup = function() {
      UserService.createUser($scope.user).then(function(res) {
        $scope.saveSessStorage(res.data.id, res.data.token);
        $scope.userId = res.data.id;
        $location.url('/dashboard');
        ToastService.showSimpleToast(res.data.message);
      }, function(err) {
        ToastService.showSimpleToast(err.data.message);
      });
    };

    // this function logs in a user
    $scope.login = function() {
      UserService.login($scope.user).then(function(res) {
        $scope.saveSessStorage(res.data.id, res.data.token);
        $location.url('/dashboard');
        ToastService.showSimpleToast(res.data.message);
      }, function(err) {
        ToastService.showSimpleToast(err.data.message);
      });
    };

    // this function logs out a user
    $scope.logout = function() {
      $window.sessionStorage.clear();
      $location.url('/home');
    };

    // this function returns a user details
    $scope.getUser = function() {
      var id = $window.sessionStorage.userId;
      UserService.getUser(id).then(function(res) {
        $scope.users = res.data;
      }, function(err) {
        ToastService.showSimpleToast(err.data.message);
      });
    };

    // this function returns a user id
    $scope.getUserId = function() {
      var id = $window.sessionStorage.userId;
      return id;
    };

    // this function allows a user to edit their details
    $scope.editUser = function(user) {
      var id = $window.sessionStorage.userId;
      UserService.editUser(id, user).then(function(res) {
        $scope.user = res;
        location.reload();
        ToastService.showSimpleToast(res.data.message);
      }, function(err) {
        ToastService.showSimpleToast(err.data.message);
      });
    };

    // this function shows the edit user details modal
    $scope.editUserEv = function(ev) {
      $mdDialog.show({
        controller: userEvCtrl,
        templateUrl: 'app/views/editProfile.view.html',
        parent: angular.element(document.body),
        targetEvent: ev
      });
    };

    // this function shows the delete user modal
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

    // this function deletes a user account 
    $scope.deleteUser = function() {
      var id = $window.sessionStorage.userId;
      UserService.deleteUser(id).then(function(res) {
        $window.sessionStorage.clear();
        $location.url('/home');
      }, function(err) {
        ToastService.showSimpleToast(err.data.message);
      });
    };

  }]);

