import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//import Home from "./pages/Home";
import ParkingSlotScreen from "./pages/ParkingSlotScreen";
import AddSlotForm from "./pages/AddSlotForm";
import IOTupdate from "./pages/IOTupdate";
import DeletedSlot from "./pages/DeletedSlot";
import BookingForm from './pages/BookingForm';
import UserProfile from './pages/UserProfile';
import ModifyBooking from './pages/ModifyBooking';
import CancelBooking from './pages/CancelBooking'
//import SlotsTable from "./pages/";



function App() {
  return (
      
    <BrowserRouter>
      <Routes>
       
          <Route index element={<ParkingSlotScreen />} />
         
          {/*<Route path="parkingslotscreen" element={<ParkingSlotScreen />} />*/}
          <Route path="iotupdate" element={<IOTupdate />} />
          <Route path="addslotform" element={<AddSlotForm />} />
          <Route path="deletedslotm" element={<DeletedSlot />} />
          <Route path="bookingform" element={<BookingForm />} />
          <Route path="cancelbooking" element={<CancelBooking />} />
          <Route path="userprofile" element={<UserProfile />} />
        
      </Routes>
    </BrowserRouter>

  );
}

export default App;

