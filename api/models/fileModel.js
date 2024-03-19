const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  filename: String,
  contentType: String,
  url: String,
  json: [{ header: String, key: String }]
}, { timestamps: true });

module.exports = mongoose.model('File', fileSchema);
