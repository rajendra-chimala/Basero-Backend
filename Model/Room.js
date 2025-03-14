const  mongoose  = require("mongoose");

const roomSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please enter the room title"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Please provide a room description"]
    },
    price: {
        type: Number,
        required: [true, "Please enter the room price per month"],
        min: [0, "Price cannot be negative"]
    },
    location: {
        type: String,
        required: [true, "Please enter the room location"]
    },
    size: {
        type: Number,
        required: [true, "Please enter the room size in square feet"]
    },
    amenities: {
        type: [String], 
        default: [] // ["WiFi", "Parking", "AC"]
    },
    
    images: {
        type: [String], 
        default: ["https://via.placeholder.com/150"]
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
