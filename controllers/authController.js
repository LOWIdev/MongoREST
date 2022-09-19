const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require("dotenv").config();

const handleLogin = async (req, res) => {
    const { user, pwd } = req.body;
    console.log("authController user pwd", user ,pwd );
    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });

    const foundUser = await User.findOne({ username: user }).exec();
    console.log("foundUser ", foundUser);
    if (!foundUser) return res.status(401).json({ 'message': 'Kein User' }); //Unauthorized 
    
    // evaluate password 
    const match = await bcrypt.compare(pwd, foundUser.password);
    console.log("match", match);
    if (match) {
        const roles = Object.values(foundUser.roles).filter(Boolean);
        console.log("roles ", roles);
        console.log("processAccesTokSec ", process.env.ACCESS_TOKEN_SECRET);
        // create JWTs
        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "username": foundUser.username,
                    "roles": roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '50s' }
        );
        console.log("accessToken ", accessToken);
        const refreshToken = jwt.sign(
            { "username": foundUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );
        // Saving refreshToken with current user
        foundUser.refreshToken = refreshToken;
        const result = await foundUser.save();
        console.log(result);
        console.log(roles);

        // Creates Secure Cookie with refresh token
        res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });

        // Send authorization roles and access token to user
        res.json({ roles, accessToken });

    } else {
        res.sendStatus(401);
    }
}

module.exports = { handleLogin };