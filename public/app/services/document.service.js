angular.module('dmsApp')
  .factory('DocumentService', ['$http', 'baseUrl', function($http, baseUrl) {
    var Document = {};
    Document.createDoc = function(doc) {
      return $http.post(baseUrl + '/api/documents', doc).then(function(res) {
        return res;
      });
    };
    Document.getUserDocs = function(id) {
      return $http.get(baseUrl + '/api/users/' + id +'/documents').then(function(res) {
        return res;
      });
    };
    Document.getDoc = function(id) {
      return $http.get(baseUrl + '/api/documents/' + id).then(function(res) {
        return res;
      });
    };
    Document.editDoc = function(id, doc) {
      return $http.put(baseUrl + '/api/documents/' + id, doc).then(function(res) {
        return res;
      });
    };
    Document.deleteDoc = function(id) {
      return $http.delete(baseUrl + '/api/documents/' + id).then(function(res) {
        return res;
      });
    };
    return Document;
  }]);