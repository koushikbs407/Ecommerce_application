const mongoose = require('mongoose');
const JOi = require('joi');
JOi.objectId = require('joi-objectid')(JOi);

const Item =  mongoose.model('Item',new mongoose.Schema({
    category: new mongoose.Schema({
        name:{
            type:String,
            required:true,
            minlength:3,
            maxlength:50
        }
    }),
    product: new mongoose.Schema({
        name: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 50
        },
        price: {
            type: Number,
            required: true,
            min: 0
        },
        description: {
            type: String,
            required: true,
            minlength: 10,
            maxlength: 1000
        },
        quantity: {
            type: Number,
            required: true,
            min: 0
        }
        
    }),
    
    
}));

function validateItem(item){
    const schema = JOi.object({
        category:JOi.objectId().required(),
        product:JOi.objectId().required(),
     
    });
    return schema.validate(item);
}

module.exports = {
    Item,
    validateItem
};