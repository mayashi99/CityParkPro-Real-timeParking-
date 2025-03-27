import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ModifyBooking = () => {
    const { slotId } = useParams();
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const navigate = useNavigate();

    // Fetch booking details
    useEffect(() => {
        const fetchBooking = async () => {
            try {
                const response = await axios.get('http://localhost:5002/api/user-bookings', {
                    params: { username: 'Vindi' }, // Default user
                });
                const booking = response.data.find((b) => b.slotId === slotId);
                if (booking) {
                    const bookingDate = new Date(booking.bookingTime);
                    setDate(bookingDate.toISOString().split('T')[0]); 
                    setTime(bookingDate.toTimeString().split(' ')[0]); 
                }
            } catch (error) {
                console.error('Error fetching booking:', error);
            }
        };
        fetchBooking();
    }, [slotId]);

    const handleModifyBooking = async () => {
        try {
            const formattedTime = time.includes(':') ? time : `${time}:00`;

            const response = await axios.put('http://localhost:5002/api/modify-booking', {
                slotId,
                date,
                time: formattedTime,
            });

            alert(response.data.message);
            navigate('/user-profile');
        } catch (error) {
            console.error('Error modifying booking:', error);
            if (error.response) {
                alert(error.response.data.message || 'Failed to modify booking. Please try again.');
            } else {
                alert('Network error. Please check your connection and try again.');
            }
        }
    };

    return (
        <div className="modify-booking-container">
            <h2>Modify Booking: {slotId}</h2>
            <div className="form">
                <label>
                    Date:
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </label>
                <label>
                    Time:
                    <input
                        type="time"
                        value={time.split(':').slice(0, 2).join(':')} 
                        onChange={(e) => setTime(e.target.value + ':00')} 
                        step="300" 
                    />
                </label>
                <button onClick={handleModifyBooking}>Confirm Changes</button>
            </div>
        </div>
    );
};

export default ModifyBooking;