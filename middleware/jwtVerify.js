const jwt = require("jsonwebtoken");
const secretkey=require("../utlis/constants")

//Verifying the jsonwebtoken
const verifyToken = (req, res, next) => {

    // read the token from the header

    const token = req.headers['x-access-token'];

    // if no token provided

    if (!token) {
        return res.status(403).send({
            message: "No token provided"
        })
    }

    // if token is provided
    jwt.verify(token, secretkey.key, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorised"
            });
        }
        // I will read the userId from the decoded token and store in req object 
        req.userId = decoded.id;
        next();
    })
};

module.exports = {
    verifyToken : verifyToken
};