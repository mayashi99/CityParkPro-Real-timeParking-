var express = require("express");
var router = express.Router();
const { Slots } = require("../schema/Slots"); // Import the Slots model

/* GET all slots */
router.get("/", async function (req, res, next) {
  try {
    const slots = await Slots.find();
    res.status(200).json(slots);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/* GET slots by floor number */
router.get("/floor/:floorNumber", async function (req, res, next) {
  try {
    const { floorNumber } = req.params;
    const slots = await Slots.find({ floorNumber });
    if (slots.length === 0)
      return res.status(404).json({ error: "No slots found for this floor" });
    res.status(200).json(slots);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/* POST - Add a new slot */
router.post("/", async function (req, res, next) {
  const { floorNumber, numberofSlot, date, checkin, checkout, chooseSlot } =
    req.body;

  const newSlot = new Slots({
    floorNumber,
    numberofSlot,
    date,
    checkin,
    checkout,
    chooseSlot,
  });

  try {
    await newSlot.save();
    res.status(201).json(newSlot);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/* GET a single slot by ID */
router.get("/:id", async function (req, res, next) {
  try {
    const slot = await Slots.findById(req.params.id);
    if (!slot) return res.status(404).json({ error: "Slot not found" });
    res.status(200).json(slot);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/* PUT - Update a slot by ID */
router.put("/:id", async function (req, res, next) {
  try {
    const updatedSlot = await Slots.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedSlot) return res.status(404).json({ error: "Slot not found" });
    res.status(200).json(updatedSlot);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/* DELETE a slot */
router.delete("/:id", async function (req, res, next) {
  try {
    const deletedSlot = await Slots.findByIdAndDelete(req.params.id);
    if (!deletedSlot) return res.status(404).json({ error: "Slot not found" });
    res.status(200).json({ message: "Slot deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
