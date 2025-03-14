
const  User = require('../Model/User');
const  bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const register = async (req, res) => {
  try {
    const { name, email, phone, password, role } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      role: role || 'user'
    });

    // Create JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token
    });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
}



//User login 


const login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Check for user
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: 'Invalid credentials' });
      }
  
      // Verify password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: 'Invalid credentials' });
      }
  
      // Create JWT token
      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );
  
      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        token
      });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  }


  const logout = (req, res) => {
    res.status(200).json({ message: 'Logout successful' });
  }


  const getAll = async (req, res) =>{
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  }
module.exports = { register ,login, logout,getAll};