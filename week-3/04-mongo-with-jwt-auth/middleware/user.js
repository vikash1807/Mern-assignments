const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config')

async function userMiddleware(req, res, next) {
    const obj = req.headers.authorization;
    const token = obj.split(" ")[1];
    try {
        const decoded = await jwt.verify(token, JWT_SECRET);
        if(decoded.username) {
            req.username = decoded.username;
            next();
        }
    } catch(e) {
        res.json('invalid user credintials');
    }
}
module.exports = userMiddleware;