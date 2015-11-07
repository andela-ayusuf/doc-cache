angular.module('dmsApp')
  .factory('UserService', ['$http', 'baseUrl', function($http, baseUrl) {
    var User = {};
    User.createUser = function(user) {
      return $http.post(baseUrl + '/api/users', user).then(function(res) {
        return res;
      });
    };
    User.login = function(user) {
      return $http.post(baseUrl + '/api/users/login', user).then(function(res) {
        return res;
      });
    };
    User.getUser = function(id) {
      return $http.get(baseUrl + '/api/users/' + id).then(function(res) {
        return res;
      });
    };
    User.editUser = function(id, user) {
      return $http.put(baseUrl + '/api/users/' + id, user).then(function(res) {
        return res;
      });
    };
    User.deleteUser = function(id) {
      return $http.delete(baseUrl + '/api/users/' + id).then(function(res) {
        return res;
      });
    };
    return User;
  }]);