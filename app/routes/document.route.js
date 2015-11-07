var docCtrl = require('../controllers/document.controller');
var userCtrl = require('../controllers/user.controller');

function docRoutes(router) {
  router.route('/documents')
    .post(userCtrl.middleware, docCtrl.createDoc)
    .get(userCtrl.middleware, docCtrl.getAllDocs);

  router.route('/documents/:id')
    .get(userCtrl.middleware, docCtrl.getDoc)
    .put(userCtrl.middleware, docCtrl.editDoc)
    .delete(userCtrl.middleware, docCtrl.deleteDoc);

  router.route('/users/:id/documents')
    .get(userCtrl.middleware, docCtrl.getUserDocs);
}

module.exports = docRoutes;