// Create a Mongoose model for Slotss
const mongoose = require('mongoose');

// Define the  schema
const slotsSchema = new mongoose.Schema({
    floorNumber: String,
    numberofSlot: String,
    date:String,
    checkin:String,
    checkout:String,
    chooseSlot:String


});

// Create the Floor model
const Slots = mongoose.model('Slots', slotsSchema);

// Export the model
exports.Slots = Slots;
