import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//import Home from "./pages/Home";
import ParkingSlotScreen from "./pages/ParkingSlotScreen";
import IOTupdate from "./pages/IOTupdate";
import SlotsTable from "./pages/SlotsTable";



function App() {
  return (
      
    <BrowserRouter>
      <Routes>
       
          <Route index element={<ParkingSlotScreen />} />
         
          {/*<Route path="parkingslotscreen" element={<ParkingSlotScreen />} />*/}
          <Route path="iotupdate" element={<IOTupdate />} />
           <Route path="slotstable" element={<SlotsTable />} />

        
      </Routes>
    </BrowserRouter>

  );
}

export default App;

