const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
        required: true
    },
    total: {
        type: Number,
        required: true,
        min: 0
    },
    
});

const Order = mongoose.model('Order', orderSchema);

function validateOrder(order) {
    const schema = Joi.object({
        items: Joi.objectId().required(),
        total: Joi.number().min(0).required()
    });
    return schema.validate(order);
}

module.exports = {
    Order,
    validateOrder
};