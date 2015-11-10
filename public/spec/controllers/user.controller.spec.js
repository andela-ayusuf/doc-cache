describe('User Controller', function() {
  var scope, userCtrl, httpBackend, location;

  beforeEach(module('dmsApp'));
  beforeEach(inject(function(_$httpBackend_, $rootScope, $controller, $location, $window) {
    scope = $rootScope.$new();
    httpBackend = _$httpBackend_;
    location = $location;
    win = $window;
    var userCtrl = $controller('UserCtrl', {$scope: scope});
  }));

  var user = {
    _id: 100,
    username: 'bobmarley',
    name: {
      first: 'bob',
      last: 'marley'
    },
    email: 'bobmarley@gmail.com',
    password: 'bobmarley'
  };
  var userId = user._id;

  it('should sign up a new user', function() {

    scope.user = user;
    httpBackend.expectPOST('http://localhost:5000/api/users', user).respond({});
    scope.signup();
    expect(scope.signup).toBeDefined();
    spyOn(location, 'url')
    httpBackend.flush();
    expect(location.url).toHaveBeenCalledWith('/dashboard');
  });

  it('should login a user', function() {
    userDetails = {
      username: user.username,
      password: user.password
    };
    scope.user = userDetails;
    httpBackend.expectPOST('http://localhost:5000/api/users/login', userDetails).respond({});
    scope.login();
    expect(scope.login).toBeDefined();
    spyOn(location, 'url')
    httpBackend.flush();
    expect(location.url).toHaveBeenCalledWith('/dashboard');
  });

  it('should log a user out', function() {
    expect(win.sessionStorage.userId).toBeDefined();
    scope.logout();
    expect(scope.logout).toBeDefined();
    expect(win.sessionStorage.userId).not.toBeDefined();
  });

  it('should get a user detail',  function(){
    var id = win.sessionStorage.userId;
    httpBackend.expectGET('http://localhost:5000/api/users/' + id).respond({
      username: user.username,
      firstname: name.first,
      lastname: name.last
    });
    scope.getUser(id);
    httpBackend.flush();
    expect(scope.users).toBeDefined();
    expect(scope.users).toBeTruthy();
    expect(scope.users.username).toBe('bobmarley');
  });

  it('should edit a single user details', function() {
    var id = win.sessionStorage.userId;

    httpBackend.expectPUT('http://localhost:5000/api/users/' + id, user).respond({});
    scope.editUser(id);
    expect(scope.editUser).toBeDefined();
  });

  it('should show that editUserEv() is defined', function() {
    scope.editUserEv();
    expect(scope.editUserEv).toBeDefined();
  });

  it('should show that deleteUserEv() is defined', function() {
    scope.deleteUserEv();
    expect(scope.deleteUserEv).toBeDefined();
  });

  it('should delete a user', function() {
    var id = win.sessionStorage.userId;
    httpBackend.expectDELETE('http://localhost:5000/api/users/' + id).respond({});
    scope.deleteUser(id);
    spyOn(location, 'url')
    httpBackend.flush();
    expect(location.url).toHaveBeenCalledWith('/home');
  });

});
