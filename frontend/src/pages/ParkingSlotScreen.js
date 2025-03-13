import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/ParkingSlots.css';
import '../styles/Navbar.css'; // Ensure this file exists (correct name)
import Navbar from '../components/Navbar'; // Import Navbar from the correct path




const ParkingSlot = () => {
  const [floors, setFloors] = useState([]);

  useEffect(() => {
      axios.get('http://localhost:5000/api/floors')
          .then(response => {
              setFloors(response.data);
          })
          .catch(error => {
              console.error('There was an error fetching the floors!', error);
          });
  }, []);

  return (
      <div>
          <h1>Select Floors</h1>
          <ul>
              {floors.map(floor => (
                  <li key={floor._id}>{floor.floorNumber}</li>
              ))}
          </ul>
          <button>Continue</button>
      </div>
  );
};


const App = () => {
  return (
    <div>
      <Navbar />
      <ParkingSlot />
    </div>
  );
};

export default App;
