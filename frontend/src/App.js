import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//import Home from "./pages/Home";
import ParkingSlotScreen from "./pages/ParkingSlotScreen";
import IOTupdate from "./pages/IOTupdate";
import BookingForm from './pages/BookingForm';
import UserProfile from './pages/UserProfile';
import ModifyBooking from './pages/ModifyBooking';
import CancelBooking from './pages/CancelBooking'

function App() {
  return (
      
    <BrowserRouter>
      <Routes>
       
          <Route index element={<ParkingSlotScreen />} />
         
          {/*<Route path="parkingslotscreen" element={<ParkingSlotScreen />} />*/}
          <Route path="iotupdate" element={<IOTupdate />} />
          <Route path="/book" element={<BookingForm />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/modify-booking/:slotId" element={<ModifyBooking />} />
          <Route path="/cancel-booking/:slotId" element={<CancelBooking />} />
        
      </Routes>
    </BrowserRouter>

  );
}

export default App;

