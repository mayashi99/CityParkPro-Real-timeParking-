import React, { useEffect, useState } from "react";
import api from "../config/apiRequest"; // Import the Axios instance
import "../styles/ParkingSlots.css";
import "../styles/Navbar.css";

const ParkingSystem = () => {
  const [floor, setFloor] = useState(""); // Stores the selected floor
  const [slots, setSlots] = useState({}); // Stores available slots for the selected floor
  const [formData, setFormData] = useState({
    date: "",
    checkIn: "",
    checkOut: "",
  });

  const [errors, setErrors] = useState({});

  const minDate = "2025-03-30";
  const maxDate = "2027-05-01";

  // Fetch parking slots when floor changes
  useEffect(() => {
    if (floor) {
      api
        .get(`/slots?floor=${floor}`) // Fetch slots for the selected floor
        .then((response) => {
          setSlots(response.data);
        })
        .catch((error) => {
          console.error("Error fetching slots:", error);
        });
    }
  }, [floor]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFloorChange = (e) => {
    setFloor(e.target.value);
    setSlots({}); // Reset slots when floor changes
  };

  const validateForm = () => {
    let newErrors = {};
    if (!floor) newErrors.floor = "Please select a floor.";
    if (!formData.date) newErrors.date = "Please select a date.";
    if (!formData.checkIn) newErrors.checkIn = "Check-in time is required.";
    if (!formData.checkOut) newErrors.checkOut = "Check-out time is required.";
    if (formData.checkIn && formData.checkOut && formData.checkOut <= formData.checkIn) {
      newErrors.checkOut = "Check-out must be after check-in.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert("Form submitted successfully!");
      console.log(formData);
    }
  };

  return (
    <div className="snav">
      <div className="container">
        <div className="mycard">
          <div className="title">
            <h1 className="title">CityParkPro Management System</h1>
          </div>
          <div className="layout">
            {/* Floor Selection & Booking Form */}
            <div className="communication">
              <fieldset>
                <legend>Selecting Details</legend>
                <form onSubmit={handleSubmit}>
                  {/* Floor Selection */}
                  <div>
                    <label>Choose Floor:</label>
                    <select name="floor" className="input" onChange={handleFloorChange} value={floor}>
                      <option value="">Choose Floor</option>
                      <option value="Floor 01">Floor 01</option>
                      <option value="Floor 02">Floor 02</option>
                      <option value="Floor 03">Floor 03</option>
                    </select>
                    {errors.floor && <p className="error">{errors.floor}</p>}
                  </div>

                  {/* Date Selection */}
                  <div>
                    <label>Date: </label>
                    <input type="date" name="date" min={minDate} max={maxDate} onChange={handleChange} value={formData.date} />
                    {errors.date && <p className="error">{errors.date}</p>}
                  </div>

                  {/* Time Selection */}
                  <div className="time">
                    <label>Check In: </label>
                    <input type="time" name="checkIn" step="3600" onChange={handleChange} value={formData.checkIn} />
                    <label> Check Out: </label>
                    <input type="time" name="checkOut" step="3600" onChange={handleChange} value={formData.checkOut} />
                  </div>
                  {errors.checkIn && <p className="error">{errors.checkIn}</p>}
                  {errors.checkOut && <p className="error">{errors.checkOut}</p>}

                  {/* Buttons */}
                  <div className="buttons">
                    <button type="submit" className="btn connect">Connect</button>
                    <button type="button" className="btn clear" onClick={() => setFormData({ date: "", checkIn: "", checkOut: "" })}>Clear</button>
                    <button type="button" className="btn exit">Exit</button>
                  </div>
                </form>
              </fieldset>
            </div>

            {/* Status Description */}
            <div className="des">
              <fieldset>
                <legend>Lot Status Description</legend>
                <div className="status">
                  <div className="status-item available">Available</div>
                  <div className="status-item not-available">Not Available</div>
                </div>
              </fieldset>
            </div>
          </div>

          {/* Parking Slots */}
          <div className="pslot">
            <fieldset>
              <legend>Parking Lot Area - {floor}</legend>
              {floor ? (
                <div className="grid">
                  {Object.entries(slots).map(([slot, available]) => (
                    <div key={slot} className={`slot ${available ? "available" : "not-available"}`}>
                      {slot}
                    </div>
                  ))}
                </div>
              ) : (
                <p>Please select a floor to view available slots.</p>
              )}
            </fieldset>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParkingSystem;

