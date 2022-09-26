const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const secretkey=require("../utlis/constants")

/**
 * controller for signup/registration
 */
exports.signup = async (req, res) => {

    const userObj = {
        name: req.body.name,
        userId: req.body.userId,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
    }
    /**
     * Insert this user to DB
     */
    try {
        const userCreated = await User.create(userObj);
        // --> Return the response
        const userCreationResponse = {
            name: userCreated.name,
            userId: userCreated.userId,
            email: userCreated.email,
            createdAt: userCreated.createdAt,
            updatedAt: userCreated.updatedAt
        }
        res.status(201).send(userCreationResponse);
    } catch (err) {
        console.error("Error while creating new user", err.message);
        res.status(500).send({
            message: "Some internal error while inserting new user."
        })
    }
}

/**
 * controller for signin
 */
exports.signin = async (req, res) => {
    // Search the user if it exist
    try{
    var user = await User.findOne({ userId: req.body.userId });
    }catch(err){
        console.log(err.message);
    }
    if (user == null) {
        return res.status(400).send({
            message: "Failed! user doesn't exist"
        })
    }
    
    //user is existing, so now we will do the password matching
    const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);
    if (!isPasswordValid) {
        return res.status(401).send({
            message: "invalid Password"
        })
    }
    // Successfully login
    //I need to generate access token now
    const token = jwt.sign({ id: user.userId }, secretkey.key, { expiresIn: 600 });

    // send the response back
    res.status(200).send({
        name: user.name,
        userId: user.userId,
        email: user.email,
        accessToken: token
    })
}