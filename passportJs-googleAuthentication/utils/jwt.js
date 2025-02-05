const jwt = require("jsonwebtoken");

const generateAccessToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            avatar: user.avatar,
            profileCompleted:user.profileCompleted
        },
        process.env.JWT_ACCESS_SECRET, // Ensure this key is set in your environment
        { expiresIn: "15m" }
    );
};

const generateRefreshToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            avatar: user.avatar,
            profileCompleted:user.profileCompleted
        },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: "7d" } // Refresh token expires in 7 days
    );
};

module.exports = { generateAccessToken, generateRefreshToken };
