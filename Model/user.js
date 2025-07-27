const mongoose = require('mongoose');
const Joi = require('joi');
const JWT = require('jsonwebtoken');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength: 255
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024,
        
    },
    
});
const user = mongoose.model("User", userSchema); 

function generateAuthToken(user) {
    const token = JWT.sign({ _id: user._id }, "jwtPrivateKey");
    return token;
}


function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    });

    return schema.validate(user);
}  




module.exports = {
    user,
    validateUser,
    generateAuthToken
};