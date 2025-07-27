const express = require('express');
const router = express.Router();
const Joi = require('joi');
const mongoose = require('mongoose');
const { user, validateUser } = require('../Model/user');
const bcrypt = require('bcrypt');

/* router.post('/', (req, res) => {
    // Handle registration logic here
    res.send('Registration successful');
}); */

router.post('/', async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const email = await user.findOne({ email: req.body.email });
    if (email) return res.status(400).send("User already registered");

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    try {
        let data = new user({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        });
        data = await data.save();
        res.send(data);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;