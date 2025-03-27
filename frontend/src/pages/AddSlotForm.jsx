import React, { useState, useEffect } from "react";
import axios from "axios";

const DeletedParkingSlots = () => {
  const [selectedFloor, setSelectedFloor] = useState(2); // Default floor
  const [slots, setSlots] = useState([]);

  // Fetch slots for the selected floor
  useEffect(() => {
    axios
      .get(`/slots/floor/${selectedFloor}`)
      .then((response) => {
        setSlots(response.data);
      })
      .catch((error) => console.error("Error fetching slots:", error));
  }, [selectedFloor]);

  // Delete a slot by ID
  const deleteSlot = (slotId) => {
    axios
      .delete(`/slots/${slotId}`)
      .then(() => {
        setSlots(slots.filter((slot) => slot.id !== slotId));
      })
      .catch((error) => console.error("Error deleting slot:", error));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Parking Slots (Floor {selectedFloor})</h2>

      <div>
        <label className="font-semibold">Select Floor:</label>
        <select
          value={selectedFloor}
          onChange={(e) => setSelectedFloor(e.target.value)}
          className="ml-2 p-2 border rounded"
        >
          <option value={1}>Floor 1</option>
          <option value={2}>Floor 2</option>
          <option value={3}>Floor 3</option>
        </select>
      </div>

      <ul className="mt-4">
        {slots.length > 0 ? (
          slots.map((slot) => (
            <li key={slot.id} className="flex justify-between p-2 bg-white shadow mb-2 rounded">
              <span>Slot: {slot.numberofSlot}</span>
              <button
                onClick={() => deleteSlot(slot.id)}
                className="bg-red-500 text-white px-4 py-1 rounded"
              >
                Delete
              </button>
            </li>
          ))
        ) : (
          <p>No slots available on this floor.</p>
        )}
      </ul>
    </div>
  );
};

export default DeletedParkingSlots;
