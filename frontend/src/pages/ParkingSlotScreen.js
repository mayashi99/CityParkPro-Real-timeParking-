import { useState } from "react"; // Remove useEffect if unused
import '../styles/ParkingSlots.css';
import '../styles/Navbar.css'; // Ensure this file exists (correct name)
import '../components/Navbar'; // Import Navbar from the correct path


const ParkingSystem = () => {
  const [slots, setSlots] = useState({ P1: false, P2: false, P3: true, P4: true });

  return (
    
    <div className="container">
      <div className="card">
        <h1 className="title">Parking Management System</h1>
        <div className="layout">
          {/* Parking Slots */}
          <div>
            <h2 className="subtitle">Parking Lot Area</h2>
            <div className="grid">
              {Object.entries(slots).map(([slot, available]) => (
                <div key={slot} className={`slot ${available ? 'available' : 'not-available'}`}>
                  {slot}
                </div>
              ))}
            </div>
          </div>

          {/* Status Description */}
          <div>
            <h2 className="subtitle">Status Description</h2>
            <div className="status">
              <div className="status-item available">Available</div>
              <div className="status-item not-available">Not Available</div>
            </div>
          </div>
        </div>

        {/* ZigBee Communication */}
        <div className="communication">
          <h2 className="subtitle">ZigBee Communication Port</h2>
          <select className="input">
            <option>Choose COM Port</option>
          </select>
          <input type="text" className="input" placeholder="Baud Rate" />
          <div className="buttons">
            <button className="btn connect">Connect</button>
            <button className="btn close">Close</button>
            <button className="btn exit">Exit</button>
          </div>
        </div>
      </div>
    </div>
  );
};




export default ParkingSystem;
