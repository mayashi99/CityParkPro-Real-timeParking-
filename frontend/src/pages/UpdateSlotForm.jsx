import { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function UpdateSlotForm() {
  const [selectedFloor, setSelectedFloor] = useState(2);
  const [slots, setSlots] = useState([]);
  const [slotNumber, setSlotNumber] = useState("");

  useEffect(() => {
    axios
      .get(`/slots/floor/${selectedFloor}`)
      .then((response) => {
        setSlots(response.data);
      })
      .catch((error) => {
        console.error("Error fetching slots:", error);
      });
  }, [selectedFloor]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedSlot = {
      floorNumber: selectedFloor,
      numberofSlot: slotNumber,
    };

    axios
      .post("/slots", updatedSlot)
      .then((response) => {
        console.log("Slot updated successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error updating slot:", error);
      });
  };

  return (
    <Card className="p-4 max-w-md mx-auto mt-10">
      <CardContent>
        <h2 className="text-xl font-bold mb-4">Update Parking Slot</h2>
        <form onSubmit={handleSubmit}>
          <Label>Floor Number</Label>
          <Input
            type="number"
            value={selectedFloor}
            onChange={(e) => setSelectedFloor(Number(e.target.value))}
          />
          <Label className="mt-4">Slot Number</Label>
          <Input
            type="text"
            value={slotNumber}
            onChange={(e) => setSlotNumber(e.target.value)}
          />
          <Button type="submit" className="mt-4 w-full">
            Update Slot
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
