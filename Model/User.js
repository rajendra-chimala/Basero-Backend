const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'Please enter your full name'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Please enter your email'],
      unique: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, 'Invalid email format']
    },
    phone: {
      type: String,
      required: [true, 'Please enter your phone number'],
      match: [/^[0-9]{10}$/, 'Invalid phone number format']
    },
    password: {
      type: String,
      required: [true, 'Please enter a password'],
      minlength: [6, 'Password must be at least 6 characters']
    },
    role: {
      type: String,
      enum: ['user', 'vendor', 'admin'],
      default: 'user'
    },
    profilePicture: {
      type: String,
      default: 'https://via.placeholder.com/150'
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  });


  const User = mongoose.model('User',userSchema);

  module.exports = User