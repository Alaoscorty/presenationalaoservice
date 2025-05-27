const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  service: String,
  message: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Reservation', ReservationSchema);
