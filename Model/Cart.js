const mongoose = require('mongoose');
const JOi = require('joi');
JOi.objectId = require('joi-objectid')(JOi);

const CartModel = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    items:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Item',
        required:true
    }});

const Cart  = mongoose.model('Cart',CartModel);

function validateCart(cart){
    const schema = JOi.object({
        
        items:JOi.objectId().required(),
    });
    return schema.validate(cart);
}

module.exports = {
    Cart,
    validateCart
};

