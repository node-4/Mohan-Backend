const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    description: { type: String, required: true },
    type: { type: String,  required: true },
    status: { type: String, enum: ['pending', 'resolved'], default: 'pending' },
    createdAt: { type: Date, default: Date.now }
  });

  const Report = mongoose.model('Report', reportSchema);

  module.exports = Report