import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DeletedSlot = () => {
  const [selectedFloor, setSelectedFloor] = useState(1); // Default to Floor 1
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState('');

  // Fetch slots for the selected floor
  useEffect(() => {
    axios
      .get(`/slots/floor/${selectedFloor}`)
      .then((response) => {
        setSlots(response.data);
      })
      .catch((error) => {
        console.error('Error fetching slots:', error);
      });
  }, [selectedFloor]);

  // Handle slot deletion
  const handleDelete = (e) => {
    e.preventDefault();

    if (!selectedSlot) {
      alert('Please select a slot to delete.');
      return;
    }

    axios
      .delete(`/slots/${selectedSlot}`)
      .then(() => {
        // Remove the deleted slot from the UI
        setSlots(slots.filter((slot) => slot.numberofSlot !== selectedSlot));
        setSelectedSlot('');
      })
      .catch((error) => {
        console.error('Error deleting slot:', error);
      });
  };

  return (
    <div>
      <h2>Delete a Slot</h2>

      {/* Floor Selection */}
      <label>Select Floor:</label>
      <select
        value={selectedFloor}
        onChange={(e) => setSelectedFloor(Number(e.target.value))}
      >
        <option value={1}>Floor 1</option>
        <option value={2}>Floor 2</option>
        <option value={3}>Floor 3</option>
      </select>

      {/* Slot Selection */}
      <label>Select Slot to Delete:</label>
      <select
        value={selectedSlot}
        onChange={(e) => setSelectedSlot(e.target.value)}
      >
        <option value="">-- Select Slot --</option>
        {slots.map((slot) => (
          <option key={slot.numberofSlot} value={slot.numberofSlot}>
            {slot.numberofSlot}
          </option>
        ))}
      </select>

      {/* Delete Button */}
      <button onClick={handleDelete}>Delete Slot</button>
    </div>
  );
};

export default DeletedSlot;
