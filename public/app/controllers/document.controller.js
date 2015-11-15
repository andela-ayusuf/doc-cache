angular.module('dmsApp')
  .controller('DocumentCtrl', ['DocumentService', 'ToastService', '$window', '$scope', '$mdDialog', '$location', '$localStorage', function(DocumentService, ToastService, $window, $scope, $mdDialog, $location, $localStorage) {

    // this function creates a new document
    $scope.createDoc = function() {
      DocumentService.createDoc($scope.docs).then(function(res) {
        location.reload();
        ToastService.showSimpleToast(res.data.message);
      }, function(err) {
        ToastService.showSimpleToast('Please Fill The Required Fields!');
      });
    };

    // this function returns all user documents
    $scope.getUserDocs = function() {
      var id = $window.sessionStorage.userId;
      DocumentService.getUserDocs(id).then(function(res) {
        $scope.userDocs = res.data;
      }, function(err) {
      });
    };

    // this function returns a documents id
    $scope.getDocId = function() {
      var id = $window.sessionStorage.docId;
      return id;
    };

    // this function returns a single document
    $scope.getDoc = function(id) {
      $window.sessionStorage.docId = id;
      DocumentService.getDoc(id).then(function(res) {
        $location.url('/document');
        $scope.docs = res.data;
      }, function(err) {
      });
    };

    // this function enables the editing of documents
    $scope.editDoc = function(doc) {
      var id = $window.sessionStorage.docId;
      DocumentService.editDoc(id, doc).then(function(res) {
        location.reload();
        $location.url('/document');
        ToastService.showSimpleToast(res.data.message);
      }, function(err) {
        ToastService.showSimpleToast('Please Fill The Required Fields!');
      });
    };

    // this function shows the edit document modal
    $scope.editDocEv = function(ev) {
      $mdDialog.show({
        controller: docEvCtrl,
        templateUrl: 'app/views/editDoc.view.html',
        parent: angular.element(document.body),
        targetEvent: ev
      });
    };

    // this function shows the delete document modal
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

    // this function deletes a document
    $scope.deleteDoc = function(id) {
      id = $window.sessionStorage.docId;
      DocumentService.deleteDoc(id).then(function(res) {
        location.reload();
        $location.url('/dashboard');
        ToastService.showSimpleToast(res.data.message);
      }, function(err) {
      });
    };
    
  }]);

