//UserProfile.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
    const username = 'Vindi'; 
    const [bookings, setBookings] = useState([]);
    const navigate = useNavigate();

    // Fetch user's bookings
    const fetchBookings = async () => {
        try {
            const response = await axios.get('http://localhost:5002/api/user-bookings', {
                params: { username },
            });
            setBookings(response.data);
        } catch (error) {
            console.error('Error fetching bookings:', error);
        }
    };

    // Fetch bookings on component mount
    useEffect(() => {
        fetchBookings();
    }, []);

    // Handle booking modification
    const handleModifyBooking = (slotId) => {
        navigate(`/modify-booking/${slotId}`);
    };

    // Handle booking cancellation
    const handleCancelBooking = async (slotId) => {
        try {
            const response = await axios.delete('http://localhost:5002/api/cancel-booking', {
                data: { slotId },
            });
            alert(response.data.message);
            fetchBookings();
        } catch (error) {
            console.error('Error canceling booking:', error);
        }
    };

    return (
        <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', backgroundImage: 'none' }}>
            <h1 style={{ textAlign: 'center', color: '#333' }}>User Profile</h1>
            <div style={{ marginBottom: '20px' }}>
                <p><strong>Username:</strong> {username}</p>
            </div>
            <div>
                <h2 style={{ textAlign: 'center', color: '#333' }}>Your Bookings</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    {bookings.map((booking) => (
                        <div key={booking._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', backgroundColor: '#e3f2fd', borderRadius: '10px' }}>
                            <div>
                                <p><strong>Slot:</strong> {booking.slotId}</p>
                                <p><strong>Date:</strong> {new Date(booking.bookingTime).toLocaleDateString()}</p>
                                <p><strong>Time:</strong> {new Date(booking.bookingTime).toLocaleTimeString()}</p>
                                <p><strong>Duration:</strong> {booking.bookingDuration} minutes</p>
                                <p><strong>Floor:</strong> {booking.floor}</p>
                                <p><strong>Vehicle Number:</strong> {booking.vehicleNumber}</p>
                                <p><strong>Owner Name:</strong> {booking.ownerName}</p>
                                <p><strong>NIC:</strong> {booking.nic}</p>
                            </div>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <button style={{ padding: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }} onClick={() => handleModifyBooking(booking.slotId)}>Modify</button>
                                <button style={{ padding: '10px', backgroundColor: '#FF5252', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }} onClick={() => handleCancelBooking(booking.slotId)}>Cancel</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UserProfile;