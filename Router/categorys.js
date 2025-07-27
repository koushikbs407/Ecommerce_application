const express = require('express');
const router = express.Router();
const Joi = require('joi');
const mongoose = require('mongoose');
const { Category, validateCategory } = require('../Model/Category');
const auth = require('../Middware/Auth');


router.post('/',auth,async(req,res)=>{
    const {error} = validateCategory(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    try{
        let data = new Category({
            name: req.body.name
        });
        data = await data.save();
        res.send(data);
    }catch(err){
        res.status(500).send(err.message);
    }
});

router.get('/',auth,async(req, res)=>{
    try{
        const data = await Category.find();
        res.send(data);
    }catch(err){
        res.status(500).send(err.message);
    }
});

module.exports = router;