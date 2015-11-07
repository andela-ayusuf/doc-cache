describe('DocumentService', function() {
  var httpBackend = null;
  var DocumentService = null;

  beforeEach(module('dmsApp'));

  beforeEach(function() {
    angular.mock.inject(function($injector) {
      httpBackend = $injector.get('$httpBackend');
      DocumentService = $injector.get('DocumentService');
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
  var doc = {
    ownerId: 1,
    title: 'The Bottled Leopard',
    content: 'Once upon a time'
  };
  it('should create a new document', function() {
    httpBackend.expectPOST('http://localhost:5000/api/documents', doc).respond({
      success: true,
      message: 'Document Created.',
      title: doc.title
    });
    DocumentService.createDoc(doc).then(function(res) {
      expect(res.data).toEqual(jasmine.objectContaining({
        success: true,
        message: 'Document Created.',
        title: 'The Bottled Leopard'
      }));
    });
    httpBackend.flush();   
  });

  it('should return all user documents', function() {
    var id = 1;
    httpBackend.expectGET('http://localhost:5000/api/users/' + id +'/documents').respond({
      success: true,
      message: 'Successful.',
      title: doc.title
    });
    DocumentService.getUserDocs(id).then(function(res) {
     expect(res.data).toEqual(jasmine.objectContaining({
        success: true,
        message: 'Successful.',
        title: 'The Bottled Leopard'
      }));
    });
    httpBackend.flush(); 
  });

  it('should get a single document details', function() {
    var id = 99;
    httpBackend.expectGET('http://localhost:5000/api/documents/' + id).respond({
      success: true,
      message: 'Successful.',
      title: doc.title,
      content: doc.content
    });
    DocumentService.getDoc(id).then(function(res) {
      expect(res.data.content).toEqual('Once upon a time');
    });
    httpBackend.flush(); 
  });

  it('should edit a document details', function() {
    var id = 99;
    var editedDoc = {
      title: 'Without a Silver Spoon',
      content: 'A story about Ure Chokwe'
    }
    httpBackend.expectPUT('http://localhost:5000/api/documents/' + id, editedDoc).respond({
      success: true,
      message: 'Document Updated!',
      title: editedDoc.title
    });
    DocumentService.editDoc(id, editedDoc).then(function(res) {
      expect(res.data.title).toEqual('Without a Silver Spoon');
    });
    httpBackend.flush(); 
  });


  it('should delete a document', function() {
    var id = 99;
    httpBackend.expectDELETE('http://localhost:5000/api/documents/' + id).respond({
      success: true,
      message: 'Document Deleted!'
    });
    DocumentService.deleteDoc(id).then(function(res) {
      expect(res.data).toEqual(jasmine.objectContaining({
        success: true,
        message: 'Document Deleted!'
      }));
    });
    httpBackend.flush(); 
  });

});
