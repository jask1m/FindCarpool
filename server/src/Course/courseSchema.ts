const mongoose = require('mongoose');

const course = new mongoose.Schema({
  name: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  departureAddress: { type: String },
  departureCity: { type: String },
  departureZip: { type: String },
  departureDateTime: { type: Date },
  destinationAddress: { type: String },
  destinationCity: { type: String },
  destinationZip: { type: String },
  destinationDateTime: { type: Date },
});

export default mongoose.model('Course', course);