//schema/Booking.js
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    slotId: String,
    bookedBy: String, 
    bookingTime: Date,
    bookingDuration: Number, 
    floor: Number, 
    vehicleNumber: String, 
    ownerName: String, 
    nic: String, 
});

module.exports = mongoose.model('Booking', bookingSchema);