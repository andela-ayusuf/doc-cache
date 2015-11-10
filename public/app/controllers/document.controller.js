angular.module('dmsApp')
  .controller('DocumentCtrl', ['DocumentService', '$window', '$scope', '$mdDialog', '$location', '$localStorage', function(DocumentService, $window, $scope, $mdDialog, $location, $localStorage) {

    $scope.createDoc = function() {
      DocumentService.createDoc($scope.docs).then(function(res) {
        location.reload();
      }, function(err) {
      });
    };
    $scope.getUserDocs = function() {
      var id = $window.sessionStorage.userId;
      DocumentService.getUserDocs(id).then(function(res) {
        $scope.userDocs = res.data;
      }, function(err) {
      });
    };
    $scope.getDocId = function() {
      var id = $window.sessionStorage.docId;
      return id;
    };
    $scope.getDoc = function(id) {
      $window.sessionStorage.docId = id;
      DocumentService.getDoc(id).then(function(res) {
        $scope.docs = res.data;
      }, function(err) {
      });
    };
    $scope.editDoc = function(doc) {
      var id = $window.sessionStorage.docId;
      DocumentService.editDoc(id, doc).then(function(res) {
        location.reload();
        $location.url('/dashboard');
      }, function(err) {
        console.log(err);
      });
    };
    $scope.editDocEv = function(ev) {
      $mdDialog.show({
        controller: docEvCtrl,
        templateUrl: 'app/views/editDoc.view.html',
        parent: angular.element(document.body),
        targetEvent: ev
      });
    };
    $scope.deleteDocEv = function(ev) {
      $mdDialog.show({
        controller: docEvCtrl,
        templateUrl: 'app/views/deleteDoc.view.html',
        parent: angular.element(document.body),
        targetEvent: ev
      });
    };
    function docEvCtrl($scope, $mdDialog) {
      $scope.hide = function() {
        $mdDialog.hide();
      };
      $scope.cancel = function() {
        $mdDialog.cancel();
      };
    }
    $scope.deleteDoc = function(id) {
      id = $window.sessionStorage.docId;
      console.log(id);
      DocumentService.deleteDoc(id).then(function(res) {
        location.reload();
        $location.url('/dashboard');
      }, function(err) {
      });
    };
    
  }]);