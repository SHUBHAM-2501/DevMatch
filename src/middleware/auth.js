const jwt = require('jsonwebtoken');
const User = require('../models/user');


const userAuth = async (req, res, next) => {
    const {token} = req.cookies;
    if (!token) {
        return res.status(401).send("Please login");
    }
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(401).send("User not found!");
        }
        req.user = user;
        next();
    } catch (err) {
        res.status(400).send("Invalid Token");
    }
};

module.exports = userAuth;