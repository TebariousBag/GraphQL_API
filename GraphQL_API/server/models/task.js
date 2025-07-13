// require mongoose
const mongoose = require('mongoose');
// schema
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  title: String,
  weight: Number,
  description: String,
});

// and export it
module.exports = mongoose.model('Task', taskSchema);
