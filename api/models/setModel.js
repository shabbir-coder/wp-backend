const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  message: String,
  messageType: String,
  imageUrl: String,
  url: String,
  timeStamp: String,
  mediaFile: {
    type: mongoose.Schema.Types.Mixed,
  },  
  extraButton: {
    type: mongoose.Schema.Types.Mixed,
  },
});

const setDataSchema = new mongoose.Schema({
  keywords: [String],
  answer: answerSchema,
});

const setSchema = new mongoose.Schema({
  setName: String,
  status: String,
  instanceStatus: {type:String, default:'pending'},
  instances: [String],
  setData: [setDataSchema],
  createdBy: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const SetModel = mongoose.model('setModel', setSchema);

module.exports = SetModel;
