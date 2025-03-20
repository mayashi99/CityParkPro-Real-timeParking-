import React from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const CancelBooking = () => {
    const { slotId } = useParams();
    const navigate = useNavigate();

    const handleCancelBooking = async () => {
        try {
            const response = await axios.delete('http://localhost:5002/api/cancel-booking', {
                data: { slotId } 
            });
            alert(response.data.message);
            navigate('/user-profile');
        } catch (error) {
            console.error('Error canceling booking:', error);
            if (error.response) {
                alert(error.response.data.message || 'Failed to cancel booking');
            } else {
                alert('Network error. Please try again.');
            }
        }
    };

    return (
        <div className="cancel-booking-container">
            <h2>Cancel Booking: {slotId}</h2>
            <div className="confirmation">
                <p>Are you sure you want to cancel this booking?</p>
                <div className="button-group">
                    <button className="confirm-btn" onClick={handleCancelBooking}>
                        Yes, Cancel Booking
                    </button>
                    <button className="cancel-btn" onClick={() => navigate('/user-profile')}>
                        No, Go Back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CancelBooking;