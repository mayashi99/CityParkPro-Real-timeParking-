//routes/booking.js
const express = require('express');
const Slot = require('../schema/Slot');
const Booking = require('../schema/Booking');
const router = express.Router();

// Book a slot
router.post('/book', async (req, res) => {
    const { slotId, bookedBy, date, time, duration, floor, vehicleNumber, ownerName, nic } = req.body;

    // Validate required fields
    if (!slotId || !bookedBy || !date || !time || !duration || !floor || !vehicleNumber || !ownerName || !nic) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    if (duration % 15 !== 0) {
        return res.status(400).json({ message: 'Booking duration must be in 15-minute intervals' });
    }

    try {
        const bookingTime = new Date(time); 
        if (isNaN(bookingTime.getTime())) {
            return res.status(400).json({ message: 'Invalid date or time format' });
        }

        const slot = await Slot.findOne({ slotId });
        if (!slot) {
            return res.status(404).json({ message: 'Slot not found' });
        }

        const conflictingBooking = await Booking.findOne({
            slotId,
            bookingTime: {
                $lt: new Date(bookingTime.getTime() + duration * 60000),
            },
            $or: [
                {
                    bookingTime: {
                        $gte: bookingTime,
                    },
                },
                {
                    bookingTime: {
                        $lte: new Date(bookingTime.getTime() + duration * 60000),
                    },
                },
            ],
        });

        if (conflictingBooking) {
            return res.status(400).json({ message: 'Slot not available for the selected time and duration' });
        }

        // Create a new booking
        const booking = new Booking({
            slotId,
            bookedBy,
            bookingTime,
            bookingDuration: duration,
            floor,
            vehicleNumber,
            ownerName,
            nic,
        });

        await booking.save();
        res.json({ message: 'Booking successful!', booking });
    } catch (error) {
        console.error('Error in /api/book:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


// Get user's bookings
router.get('/user-bookings', async (req, res) => {
    const { username } = req.query;

    try {
        const bookings = await Booking.find({ bookedBy: username });
        res.json(bookings);
    } catch (error) {
        console.error('Error fetching user bookings:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


// Modify a booking
router.put('/modify-booking', async (req, res) => {
    const { slotId, date, time } = req.body;

    try {
        if (!slotId || !date || !time) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const datetimeString = `${date}T${time}`;
        const newBookingTime = new Date(datetimeString);

        if (isNaN(newBookingTime.getTime())) {
            return res.status(400).json({ message: 'Invalid date or time format' });
        }

        const booking = await Booking.findOne({ slotId });
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        const newBookingEndTime = new Date(newBookingTime.getTime() + booking.bookingDuration * 60000);

        const conflictingBooking = await Booking.findOne({
            slotId,
            _id: { $ne: booking._id }, 
            $or: [
                {
                    bookingTime: {
                        $lt: newBookingEndTime,
                        $gte: newBookingTime,
                    },
                },
                {
                    bookingTime: {
                        $lt: newBookingEndTime,
                        $gt: newBookingTime,
                    },
                },
                {
                    $and: [
                        { bookingTime: { $lte: newBookingTime } },
                        {
                            $expr: {
                                $gte: [
                                    { $add: ["$bookingTime", { $multiply: ["$bookingDuration", 60000] }] },
                                    newBookingEndTime,
                                ],
                            },
                        },
                    ],
                },
            ],
        });

        if (conflictingBooking) {
            return res.status(400).json({ message: 'Slot not available for the selected time and date' });
        }

        // Update the booking
        booking.bookingTime = newBookingTime;
        await booking.save();

        res.json({ message: 'Booking modified successfully!', booking });
    } catch (error) {
        console.error('Error modifying booking:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


// Enhanced Cancel Booking
router.delete('/cancel-booking', async (req, res) => {
    try {
        const { slotId } = req.body;
        
        if (!slotId) {
            return res.status(400).json({ message: 'Slot ID required' });
        }

        const result = await Booking.deleteOne({ slotId });
        
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        res.json({ 
            message: 'Booking cancelled successfully',
            cancelledSlot: slotId
        });
    } catch (error) {
        console.error('Cancellation error:', error);
        res.status(500).json({ message: 'Server error during cancellation' });
    }
});

module.exports = router;