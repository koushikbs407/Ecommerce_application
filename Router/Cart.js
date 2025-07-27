const exprees = require('express');
const router = exprees.Router();
const Joi = require('joi');
const mongoose = require('mongoose');
const { Cart, validateCart } = require('../Model/Cart');
const{Item} = require('../Model/Items');
const { user } = require('../Model/user');
const auth = require('../Middware/Auth');


router.post('/',auth,async(req,res)=>{
    const {error} = validateCart(req.body);
   if(error) return res.status(400).send(error.details[0].message);
    const userid = req.user._id;
    const userdata = await user.findById(userid);
    console.log(userdata);
    if(!userdata) return res.status(400).send('Invalid user');
    const item = await Item.findById(req.body.items);
    if(!item) return res.status(400).send('Invalid item');

    try{
        const cart = new Cart({
           user:{
            _id: userdata._id,
            name: userdata.name,
            email: userdata.email

            
           },
           items:{
            _id: item._id,
            category: item.category,
            product: item.product

            
           }
        });
        await cart.save();
        res.send(cart);
    }catch(err){
        res.send(err.message);
    }
});

router.get('/',auth,async(req,res)=>{
    const userId = req.user._id;
    const userData = await user.findById(userId);
    if (!userData) return res.status(400).send('Invalid user');

    const cartdata = await Cart.find({ user: userId }).populate('items');
    if (!cartdata) return res.status(400).send('Cart not found');
    res.send(cartdata);

});

router.delete('/:id',auth,async(req,res)=>{
    const cart = await Cart.findByIdAndDelete(req.params.id);
    if(!cart) return res.status(400).send('Cart not found');
    res.send(cart);
});







module.exports = router;
