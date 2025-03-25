import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [floor, setFloor] = useState('');
  const [slot, setSlot] = useState('');

  const handleBook = async () => {
    try {
      const response = await axios.post('/api/book', { floor, slot });
      if (response.data.success) {
        alert('Booking successful!');
      } else {
        alert('Slot already booked');
      }
    } catch (error) {
      console.error('Error booking slot:', error);
    }
  };

  return (
    <div>
      <h1>CityParkPro</h1>
      <input type="text" placeholder="Floor" value={floor} onChange={(e) => setFloor(e.target.value)} />
      <input type="text" placeholder="Slot" value={slot} onChange={(e) => setSlot(e.target.value)} />
      <button onClick={handleBook}>Book Slot</button>
    </div>
  );
}

export default App;
