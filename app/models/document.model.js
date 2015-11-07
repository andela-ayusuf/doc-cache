var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var docSchema = new Schema({
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  title: {
    type: String,
    required: true,
    unique: true
  },
  content: {
    type: String,
    required: true
  },
  dateCreated: {
    type: Date,
    default: Date.now
  },
  lastModified: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Document', docSchema);