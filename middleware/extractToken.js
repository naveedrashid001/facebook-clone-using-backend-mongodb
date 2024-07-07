const jwt = require('jsonwebtoken');
const {secret} = require('../constant')
const userModel = require("../public/profile");

function extractUserFromToken(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).send('Unauthorized: No token provided');
    }

    jwt.verify(token, secret, async (err, decoded) => {
        if (err) {
            return res.status(401).send('Unauthorized: Invalid token');
        }

        try {
            const user = await userModel.findOne({ email: decoded.email });
            if (!user) {
                return res.status(404).send('User not found');
            }

            req.user = user; // Attach user to request object
            next();
        } catch (error) {
            next(error);
        }
    });
}

module.exports = extractUserFromToken;
