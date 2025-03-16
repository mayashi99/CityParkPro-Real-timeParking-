import { useState } from "react"; // Remove useEffect if unused
import "../styles/ParkingSlots.css";
import "../styles/Navbar.css"; // Ensure this file exists (correct name)
import Navbar from "../components/Navbar"; // Import Navbar from the correct path

const ParkingSystem = () => {
  const [slots, setSlots] = useState({
    P01: false,
    P02: true,
    P03: true,
    P04: true,
    P05: false,
    P06: false,
    P07: true,
    P08: false,
    P09: false,
    P010: false,
    P011: true,
    P012: false,
  });

  return (
    <div>
    <Navbar/>

    <div className="container">
      <div className="mycard">
        <h1 className="title">CityParkPro Management System</h1>
        <div className="layout">
          {/*Communication */}

          <div className="communication">
            <fieldset>
              <legend>Selecting Details</legend>
              <h2 className="subtitle">Selecting Details</h2>
              <select className="input">
                <option>Choose Floor</option>
                <option>Floor 01</option>
                <option>Floor 02</option>
                <option>Floor 03</option>
              </select>
              <div>
                <label for="Date">Date: </label>
                <input type="date" id="Date" name="Date" />
              </div>
              <div className="time">
                <label for="appt">Check In: </label>
                <input type="time" id="appt" name="appt" />
                ..............................
                <label for="appt">Check Out: </label>
                <input type="time" id="appt" name="appt" />
              </div>

              <div className="buttons">
                <button className="btn connect">Connect</button>
                <button className="btn close">Close</button>
                <button className="btn exit">Exit</button>
              </div>
            </fieldset>
          </div>

          {/* Status Description */}
          <div className="des">
            <fieldset>
              <legend>Parking Lot Status Description</legend>
              <h2 className="subtitle">Status Description</h2>
              <div className="status">
                <div className="status-item available">Available</div>
                <div className="status-item not-available">Not Available</div>
              </div>
            </fieldset>
          </div>
        </div>
        {/* Parking Slots */}
        <div className=" pslot">
          <fieldset>
            <legend>Parking Lot Status</legend>
            <h2 className="subtitle">Parking Lot Area</h2>
            <div className="grid">
              {Object.entries(slots).map(([slot, available]) => (
                <div
                  key={slot}
                  className={`slot ${
                    available ? "available" : "not-available"
                  }`}
                >
                  {slot}
                </div>
              ))}
            </div>
            <h3>Select a Slot</h3>
            <div className="lot">
              <select className="input">
                <option>Choose Slot</option>
                <option>Slot number P01</option>
                <option>Slot number P02</option>
                <option>Slot number P03</option>
                <option>Slot number P04</option>
                <option>Slot number P05</option>
                <option>Slot number P06</option>
                <option>Slot number P07</option>
                <option>Slot number P08</option>
                <option>Slot number P09</option>
                <option>Slot number P10</option>
                <option>Slot number P11</option>
                <option>Slot number P12</option>
              </select>
            </div>
            <div className="button">
              <button className="btn connect">Next</button>
            </div>
          </fieldset>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ParkingSystem;
