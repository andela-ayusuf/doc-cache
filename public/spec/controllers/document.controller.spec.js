describe('Document Controller', function() {
  var scope, docCtrl, httpBackend, location;

  beforeEach(module('dmsApp'));
  beforeEach(inject(function(_$httpBackend_, $rootScope, $controller, $location, $window) {
    scope = $rootScope.$new();
    httpBackend = _$httpBackend_;
    location = $location;
    win = $window;
    var docCtrl = $controller('DocumentCtrl', {$scope: scope});
  }));

  var user = {
    _id: 50,
    username: 'bobmarley',
    name: {
      first: 'bob',
      last: 'marley'
    },
    email: 'bobmarley@gmail.com',
    password: 'bobmarley'
  };
  var userId = user._id;
  var doc1 = {
    _id: 23,
    ownerId: userId,
    title: 'exodus',
    content: 'movement of the people'
  };
  var doc2 = {
    _id: 24,
    ownerId: userId,
    title: 'the heathen',
    content: 'back dey pon the wall'
  };

  it('should create a new document', function() {
    httpBackend.expectPOST('http://localhost:5000/api/documents', doc1).respond({});
    scope.createDoc(doc1);
    expect(scope.createDoc).toBeDefined();
  });

  it('should return a user documents', function() {
    var id = win.sessionStorage.userId;

    httpBackend.expectGET('http://localhost:5000/api/users/' + id + '/documents').respond([doc1, doc2]);
    scope.getUserDocs(id);
    expect(scope.getUserDocs).toBeDefined();
    expect(doc1.title).toBe('exodus');
    expect(doc2.title).toBe('the heathen');
    httpBackend.flush();  
  });

  it('should return a single document', function() {
    var docId = doc1._id;
    var id = win.sessionStorage.docId;
    
    httpBackend.expectGET('http://localhost:5000/api/documents/' + id).respond({});
    scope.getDoc(id);
    expect(scope.getDoc).toBeDefined();
    expect(doc1.title).toBe('exodus');
    httpBackend.flush();
  });

  it('should show that editDocEv() is defined', function() {
    scope.editDocEv();
    expect(scope.editDocEv).toBeDefined();
  });

  it('should show that deleteDocEv() is defined', function() {
    scope.deleteDocEv();
    expect(scope.deleteDocEv).toBeDefined();
  });

  it('should edit a single document', function() {
    var docId = doc1._id;
    var id = win.sessionStorage.docId;

    httpBackend.expectPUT('http://localhost:5000/api/documents/' + id, doc1).respond({});
    scope.editDoc(id);
    expect(scope.editDoc).toBeDefined();
  });

  it('should delete a single document', function() {
    var docId = doc1._id;
    var id = win.sessionStorage.docId;

    httpBackend.expectDELETE('http://localhost:5000/api/documents/' + id).respond({});
    scope.deleteDoc(id);
    expect(scope.deleteDoc).toBeDefined();
  });

});
