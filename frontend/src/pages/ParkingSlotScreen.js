import React, { useEffect, useState } from "react";
import api from "../config/apiRequest"; // Import the Axios instance
import "../styles/ParkingSlots.css";
import "../styles/Navbar.css";
//import Navbar from "../components/Navbar";

const ParkingSystem = () => {

  const [slots] = useState({
    P01: false, P02: true, P03: true, P04: true, P05: false, P06: false,
    P07: true, P08: false, P09: false, P010: false, P011: true, P012: false,
  });
 const [book,setbook ]= useState("")
  const [formData, setFormData] = useState({
    floor: "",
    date: "",
    checkIn: "",
    checkOut: "",
  });

  const [errors, setErrors] = useState({});

  const minDate = "2025-03-30";
  const maxDate = "2027-05-01";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.floor) newErrors.floor = "Please select a floor.";
    if (!formData.date) newErrors.date = "Please select a date.";
    if (!formData.checkIn) newErrors.checkIn = "Check-in time is required.";
    if (!formData.checkOut) newErrors.checkOut = "Check-out time is required.";
    if (formData.checkIn && formData.checkOut && formData.checkOut <= formData.checkIn) {
      newErrors.checkOut = "Check-out must be after check-in.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    api
      .get("/books") // Base URL is already set in api.js
      .then((response) => {
        console.log(response)
        setbook(response.data)
      })
      .catch((error) => {
        
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert("Form submitted successfully!");
      console.log(formData);
    }
  };

  return (
    <div className="snav">
      {/* <Navbar /> */}

      <div className="container">
        <div className="mycard">
          <div className="title">

            {book}
            <h1 className="title">CityParkPro Management System</h1>
          </div>
          <div className="layout">
            {/* Communication */}
            <div className="communication">
              <fieldset>
                <legend>Selecting Details</legend>

                <form onSubmit={handleSubmit}>
                  {/* Floor Selection */}
                  <div>
                    <label>Choose Floor:</label>
                    <select name="floor" className="input" onChange={handleChange} value={formData.floor}>
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
                    <label>   Check Out: </label>
                    <input type="time" name="checkOut" step="3600" onChange={handleChange} value={formData.checkOut} />
                  </div>
                  {errors.checkIn && <p className="error">{errors.checkIn}</p>}
                  {errors.checkOut && <p className="error">{errors.checkOut}</p>}

                  {/* Buttons */}
                  <div className="buttons">
                    <button type="submit" className="btn connect">Connect</button>
                    <button type="button" className="btn clear" onClick={() => setFormData({ floor: "", date: "", checkIn: "", checkOut: "" })}>Clear</button>
                    <button type="button" className="btn exit">Exit</button>
                  </div>
                </form>
              </fieldset>
            </div>

            {/* Status Description */}
            <div className="des">
              <fieldset>
                <legend> Lot Status Description</legend>
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
              <legend>Parking Lot Area</legend>
              <div className="grid">
                {Object.entries(slots).map(([slot, available]) => (
                  <div key={slot} className={`slot ${available ? "available" : "not-available"}`}>
                    {slot}
                  </div>
                ))}
              </div>
            </fieldset>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParkingSystem;
