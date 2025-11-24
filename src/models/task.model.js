
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  status: { type: String, enum: ['pending','in_progress','done'], default: 'pending' },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
  isDeleted: { type: Boolean, default: false } 
}, { timestamps: true });

module.exports.Task = mongoose.model('Task', taskSchema);
