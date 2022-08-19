const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recording = new Schema({
    fileName: { type: String, required: true },
    duration: { type: Number, required: true },
    uploadedTime: { type: Number, required: true },
    fileContent: { type: Object, required: true },
});

module.exports = mongoose.model('Recording', recording);