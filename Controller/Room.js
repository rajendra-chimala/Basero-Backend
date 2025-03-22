const Room = require("../Model/Room");

const createRoom = async (req, res) => {
    try {
        const { title, description, price, location, size, amenities } = req.body;
        const ownerID = req.user._id;

        const newRoom = new Room({
            title,
            description,
            price,
            location,
            size,
            amenities: amenities ? amenities.split(",") : [],
            images: req.file ? [req.file.path] : [], // Save uploaded image path
            owner:ownerID
        });

        await newRoom.save();
        res.status(201).json({ success: true, message: "Room created successfully", room: newRoom });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


 const getAllRooms = async (req, res) => {
    try {
        const rooms = await Room.find().populate("owner", "name email");
        res.status(200).json({ success: true, rooms });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get a room by ID
const getRoomById = async (req, res) => {
    try {
        const room = await Room.findById(req.params.id).populate("owner", "name email");
        if (!room) {
            return res.status(404).json({ success: false, message: "Room not found" });
        }
        res.status(200).json({ success: true, room });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Delete a room
const deleteRoom = async (req, res) => {
    try {
        const room = await Room.findByIdAndDelete(req.params.id);
        if (!room) {
            return res.status(404).json({ success: false, message: "Room not found" });
        }
        res.status(200).json({ success: true, message: "Room deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


module.exports = { createRoom, getAllRooms, getRoomById, deleteRoom };
