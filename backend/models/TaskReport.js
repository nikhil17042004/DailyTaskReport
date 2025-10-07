const mongoose = require('mongoose');

const TaskReportSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  description: { type: String, required: true },
  hoursWorked: { type: Number, required: true, min: 0 },
  status: { type: String, enum: ['Pending','In Progress','Completed'], default: 'Pending' }
}, { timestamps: true });

module.exports = mongoose.model('TaskReport', TaskReportSchema);
