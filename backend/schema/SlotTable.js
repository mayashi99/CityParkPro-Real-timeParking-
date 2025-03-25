const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
    slotNumber: { type: Number, required: true, unique: true },
    description: { type: String, required: true }
});

const Slot = mongoose.model('Slot', slotSchema);

module.exports = Slot;