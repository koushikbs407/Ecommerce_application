const express = require('express');
const router = express.Router();
const Joi = require('joi');
const mongoose = require('mongoose');
const { user, validateUser, generateAuthToken } = require('../Model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/',async(req,res)=>{
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    const data = await user.findOne({email: req.body.email});
    if(!data) return res.status(400).send("Invalid email ");
    const validPassword = await bcrypt.compare(req.body.password, data.password);
    if(!validPassword) return res.status(400).send("Invalid email or password");
    const token = generateAuthToken(data);
    console.log(token);
    
    res.header('Authorization', token).send({
        name: data.name,
        email: data.email,
    
    });
    
    

    
});

function validate(req){
    const schema = Joi.object({
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    });
    return schema.validate(req);

}

module.exports = router;