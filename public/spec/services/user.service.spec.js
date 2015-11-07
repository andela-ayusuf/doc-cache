describe('UserService', function() {
  var httpBackend = null;
  var UserService = null;

  beforeEach(module('dmsApp'));

  beforeEach(function() {
    angular.mock.inject(function($injector) {
      httpBackend = $injector.get('$httpBackend');
      UserService = $injector.get('UserService');
    });
  });
  var user = {
    username: 'burnaboy',
    name: {
      first: 'burna',
      last: 'boy'
    },
    email: 'burnaboy@gmail.com',
    password: 'burnaboy'
  };
  it('should create a new user on signup', function() {
    httpBackend.expectPOST('http://localhost:5000/api/users', user).respond({
      success: true,
      message: 'User Created.'
    });
    UserService.createUser(user).then(function(res) {
      expect(res.data).toEqual(jasmine.objectContaining({
        success: true,
        message: 'User Created.'
      }));
    });
    httpBackend.flush();   
  });

  it('should login a user', function() {
    var userDetails = {
      username: user.username,
      password: user.password
    }
    httpBackend.expectPOST('http://localhost:5000/api/users/login', userDetails).respond({
      success: true,
      message: 'Logged in.'
    });
    UserService.login(userDetails).then(function(res) {
      expect(res.data).toEqual(jasmine.objectContaining({
        success: true,
        message: 'Logged in.'
      }));
    });
    httpBackend.flush();   
  });

  it('should get a user details', function() {
    var id = 1;
    httpBackend.expectGET('http://localhost:5000/api/users/' + id).respond({
      success: true,
      message: 'Successful.',
      username: user.username
    });
    UserService.getUser(id).then(function(res) {
      expect(res.data.username).toEqual('burnaboy');
    });
    httpBackend.flush(); 
  });

  it('should edit a user details', function() {
    var id = 1;
    var editedUser = {
      username: 'patoranking',
      name: {
        first: 'pato',
        last: 'ranking'
      }
    }
    httpBackend.expectPUT('http://localhost:5000/api/users/' + id, editedUser).respond({
      success: true,
      message: 'User Updated!',
      username: editedUser.username
    });
    UserService.editUser(id, editedUser).then(function(res) {
      expect(res.data.username).toEqual('patoranking');
    });
    httpBackend.flush(); 
  });


  it('should delete a user', function() {
    var id = 1;
    httpBackend.expectDELETE('http://localhost:5000/api/users/' + id).respond({
      success: true,
      message: 'User Deleted!'
    });
    UserService.deleteUser(id).then(function(res) {
      expect(res.data).toEqual(jasmine.objectContaining({
        success: true,
        message: 'User Deleted!'
      }));
    });
    httpBackend.flush(); 
  });

});
