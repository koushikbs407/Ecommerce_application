const express = require('express');
const router = express.Router();
const {Item,validateItem} = require('../Model/Items');
const {Category} = require('../Model/Category');
const {Product} = require('../Model/Product');
const auth = require('../Middware/Auth');

router.post('/',auth,async(req,res)=>{
    const {error} = validateItem(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const category = await Category.findById(req.body.category);
    if(!category) return res.status(400).send('Invalid category');
    const product = await Product.findById(req.body.product);
    if(!product) return res.status(400).send('Invalid product');

    try{
        const item = new Item({
            
            category:{
                _id: category._id,
                name: category.name
            },
            product:{
                _id: product._id,
                name: product.name,
                price: product.price,
                description: product.description,
                quantity: product.quantity
                
            }
        });
        await item.save();
        res.send(item);
    }catch(err){
        res.send(err.message);
    }

   
});
module.exports = router;