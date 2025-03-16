const jwt = require('jsonwebtoken');

// Middleware to authenticate user and check if the role is admin
const adminAuthMiddleware = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ message: 'Access Denied: No Token Provided' });
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access Denied: Admins Only' });
        }
        
        next(); 
    } catch (error) {
        res.status(400).json({ message: 'Invalid Token' });
    }
};

module.exports = adminAuthMiddleware;
