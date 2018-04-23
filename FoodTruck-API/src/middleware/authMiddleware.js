import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';

const TOKENTIME = 60*60*24*30; // 30 days
const SECRET = "w3 Hav3 th3 kn0w h0w";

// Token is your identity account,
// you can access the website using your token if you logged in
// then you get a token

let authenticate = expressJwt({ secret : SECRET});

let generateAccessToken = (req, res, next) => {
    req.token = req.token || {};
    req.token = jwt.sign({
        id: req.user.id,
    }, SECRET, {
        expiresIn: TOKENTIME
    });
    next();
}

let respond = (req, res) => {
    res.status(200).json({
        user: req.user.username,
        token: req.token
    });
}

module.exports = {
    authenticate,
    generateAccessToken,
    respond
}