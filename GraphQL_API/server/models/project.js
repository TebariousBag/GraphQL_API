// require mongoose
const mongoose = require('mongoose');
// schema
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  title: String,
  weight: Number,
  description: String,
});

// and export it
module.exports = mongoose.model('Project', taskSchema);
