import React, { useEffect, useState } from "react";
import api from "../config/apiRequest"; // Import the Axios instance
import "../styles/ParkingSlots.css";
import "../styles/Navbar.css";

const ParkingSystem = () => {
  const [floor, setFloor] = useState(""); // Stores the selected floor
  const [slots, setSlots] = useState([]); // Stores available slots for the selected floor
  const [formData, setFormData] = useState({
    date: "",
    checkIn: "",
    checkOut: "",
  });

  const [errors, setErrors] = useState({});

  const minDate = "2025-03-26";
  const maxDate = "2027-05-01";

  // Fetch parking slots when floor changes or form is submitted
  const fetchSlots = (selectedFloor) => {
    if (selectedFloor) {
      api
        .get(`/slots/floor/${selectedFloor}`) // Fetch slots for the selected floor
        .then((response) => {
          const updatedSlots = response.data.map((slot) => ({
            ...slot,
            // Set the chooseSlot value based on availability (example condition)
            
          }));
          setSlots(updatedSlots);
        })
        .catch((error) => {
          console.error("Error fetching slots:", error);
        });
    }
  };
  

  useEffect(() => {
    fetchSlots(floor);
  }, [floor]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFloorChange = (e) => {
    setFloor(e.target.value);
    setSlots([]); // Reset slots when floor changes
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
      fetchSlots(floor); // Fetch updated slots after form submission
    }
  };

  const toggleSlotSelection = (slotId) => {
    const updatedSlots = slots.map((slot) => 
      slot.numberofSlot === slotId
        ? { ...slot, chooseSlot: !slot.chooseSlot }
        : slot
    );
    setSlots(updatedSlots);

    // Send POST request to update the chooseSlot status on the backend
    const selectedSlot = updatedSlots.find((slot) => slot.numberofSlot === slotId);
    api
      .post(`/slots/update`, {
        numberofSlot: slotId,
        chooseSlot: selectedSlot.chooseSlot,
      })
      .then((response) => {
        console.log("Slot updated successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error updating slot:", error);
      });
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
                  <div className="floor">
                   <h3> <label>Choose Floor:</label></h3>
                    <select name="floor" className="input" onChange={handleFloorChange} value={floor}>
                      <option value=""><h3>Choose Floor</h3></option>
                      <option value="1">Floor 01</option>
                      <option value="2">Floor 02</option>
                      <option value="3">Floor 03</option>
                    </select>
                    {errors.floor && <p className="error">{errors.floor}</p>}
                  </div>

                  {/* Date Selection */}
                  <div className="date">
                    <h3><label>Date: </label></h3>
                    <input type="date" name="date" min={minDate} max={maxDate} onChange={handleChange} value={formData.date} />
                    {errors.date && <p className="error">{errors.date}</p>}
                  </div>

                  {/* Time Selection */}
                  <div className="time">
                   <h3> <label>Check In: </label></h3>
                    <input type="time" name="checkIn" step="3600" onChange={handleChange} value={formData.checkIn} />
                   <h3> <label> Check Out: </label></h3>
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
                {slots.map((slot) => (
                  <div
                    key={slot.numberofSlot}
                    onClick={() => toggleSlotSelection(slot.numberofSlot)}
                    className={`slot ${slot.chooseSlot ? "available" : "not-available"}`}
                  >
                    {slot.numberofSlot} 
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
