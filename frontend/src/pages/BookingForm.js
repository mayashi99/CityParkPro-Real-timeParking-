//BookingForm.js
import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/Booking.css";

const BookingForm = () => {
    // Get state passed from the previous component (SlotGrid)
    const location = useLocation();
    const { slotId, date, time, duration, floor } = location.state;

    // State for form inputs
    const [vehicleNumber, setVehicleNumber] = useState("");
    const [ownerName, setOwnerName] = useState("");
    const [nic, setNic] = useState("");

    // Navigation hook
    const navigate = useNavigate();

    const handleBookSlot = async () => {
        try {
            // Convert time to 24-hour format and create a valid Date object
            const bookingTime = new Date(`${date}T${convertTo24Hour(time)}:00`);
    
            // Send booking data to the backend
            const response = await axios.post("http://localhost:5002/api/book", {
                slotId,
                bookedBy: ownerName,
                date,
                time: bookingTime.toISOString(), // Send as ISO string
                duration,
                floor,
                vehicleNumber,
                ownerName,
                nic,
            });
    
            alert(response.data.message);
            navigate("/user-profile");
        } catch (error) {
            console.error("Error booking slot:", error);
            alert("Failed to book slot. Please try again.");
        }
    };

    // Helper function to convert 12-hour time to 24-hour time
    const convertTo24Hour = (time12Hour) => {
        const [time, modifier] = time12Hour.split(" ");
        let [hours, minutes] = time.split(":");
        if (hours === "12") {
            hours = "00";
        }
        if (modifier === "PM") {
            hours = parseInt(hours, 10) + 12;
        }
        return `${hours}:${minutes}`;
    };

    return (
        <div className="booking-form-container">
            <h2>Book Slot: {slotId}</h2>
            <div className="form-section">
                {/* Read-Only Fields */}
                <div className="form-details">
                    <div className="detail-item">
                        <label>Date:</label>
                        <input type="text" value={date} readOnly />
                    </div>
                    <div className="detail-item">
                        <label>Time:</label>
                        <input type="text" value={time} readOnly />
                    </div>
                    <div className="detail-item">
                        <label>Duration (minutes):</label>
                        <input type="text" value={duration} readOnly />
                    </div>
                    <div className="detail-item">
                        <label>Floor:</label>
                        <input type="text" value={floor} readOnly />
                    </div>
                    <div className="detail-item">
                        <label>Slot:</label>
                        <input type="text" value={slotId} readOnly />
                    </div>
                </div>

                {/* Editable Fields */}
                <div className="form-inputs">
                    <div className="input-group">
                        <label>Vehicle Number:</label>
                        <input
                            type="text"
                            value={vehicleNumber}
                            onChange={(e) => setVehicleNumber(e.target.value)}
                            placeholder="Enter vehicle number"
                        />
                    </div>
                    <div className="input-group">
                        <label>Owner Name:</label>
                        <input
                            type="text"
                            value={ownerName}
                            onChange={(e) => setOwnerName(e.target.value)}
                            placeholder="Enter owner name"
                        />
                    </div>
                    <div className="input-group">
                        <label>NIC:</label>
                        <input
                            type="text"
                            value={nic}
                            onChange={(e) => setNic(e.target.value)}
                            placeholder="Enter NIC number"
                        />
                    </div>
                </div>
            </div>

            {/* Book Now Button */}
            <button onClick={handleBookSlot}>Book Now</button>
        </div>
    );
};

export default BookingForm;