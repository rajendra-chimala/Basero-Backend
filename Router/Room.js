const express = require("express");
const upload = require('../Middlewares/Uploads')
const router = express.Router();
const { createRoom, getAllRooms, getRoomById, deleteRoom } = require("../Controller/Room");
const adminAuthMiddleware = require("../Middlewares/Auth");

// Route to create a new room
router.post("/create",upload.single("image"), adminAuthMiddleware,createRoom);

// Route to get all rooms
router.get("/all", getAllRooms);

// Route to get a room by ID
router.get("/:id", getRoomById);

// Route to delete a room
router.delete("/:id",adminAuthMiddleware, deleteRoom);

module.exports = router;
