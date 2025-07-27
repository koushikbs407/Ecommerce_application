const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
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
    
});

const Product = mongoose.model('Product', productSchema);

function validateProduct(product) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        category: Joi.objectId().required(),
        price: Joi.number().min(0).required(),
        description: Joi.string().min(10).max(1000).required(),
        quantity: Joi.number().min(0).required()
    });
    return schema.validate(product);
}

module.exports = {
    Product,
    validateProduct
};