const express = require('express');
const router = express.Router();
const Joi = require('joi');
const mongoose = require('mongoose');
const { Product, validateProduct } = require('../Model/Product'); // Corrected path
const { Category } = require('../Model/Category');
const auth = require('../Middware/Auth');

router.post('/',auth, async (req, res) => {
    const { error } = validateProduct(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const categoryId = mongoose.Types.ObjectId.isValid(req.body.category);
    if (!categoryId) return res.status(400).send('Invalid category ID');

    const category = await Category.findById(req.body.category);
    if (!category) return res.status(400).send('Invalid category');

    try {
        let data = new Product({
            name: req.body.name,
            category: req.body.category,
            price: req.body.price,
            description: req.body.description,
            quantity: req.body.quantity
        });
        data = await data.save();
        res.send(data);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.get('/',auth,async(req,res)=>{
    try{
        const data = await Product.find();
        if(data.length===0) return res.status(404).send("No products found");
        res.send(data);
    }catch(err){
        res.status(500).send(err.message);
    }       
    }
);

module.exports = router;