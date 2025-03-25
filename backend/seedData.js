const mongoose = require('mongoose');
const Slot = require('./schema/Slot'); 
const Booking = require('./schema/Booking'); 

const seedDatabase = async () => {
    // Clear existing data
    await Slot.deleteMany({});
    await Booking.deleteMany({});

    // // Create slots
    // const slots = [];
    // for (let floor = 1; floor <= 5; floor++) {
    //     for (let i = 1; i <= 20; i++) {
    //         const slotId = `F${floor}${String(i).padStart(2, '0')}`; // Ensures 2-digit slot number
    //         slots.push({ slotId, floor });
    //     }
    // }
    // await Slot.insertMany(slots);

    
    // Create sample bookings
    const sampleBookings = [
        {
            slotId: 'F101',
            bookedBy: 'Vindi',
            bookingTime: new Date('2025-03-20T10:00:00'),
            bookingDuration: 60,
            floor: 1,
            vehicleNumber: 'ABC-1234',
            ownerName: 'Vindi',
            nic: '123456789V',
        },
        {
            slotId: 'F102',
            bookedBy: 'Vindi',
            bookingTime: new Date('2025-03-20T10:00:00'),
            bookingDuration: 120,
            floor: 1,
            vehicleNumber: 'XYZ-5678',
            ownerName: 'Vindi',
            nic: '987654321V',
        },
    ];
    await Booking.insertMany(sampleBookings);

    console.log('Database seeded with sample data!');
};

module.exports = seedDatabase;