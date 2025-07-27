const express = require('express');
const router = express.Router();
const auth = require('../Middware/Auth');
const { User } = require('../Model/user');
const { Item } = require('../Model/Items');
const { Order, validateOrder } = require('../Model/order');
const mongoose = require('mongoose');
const Joi = require('joi');

router.post('/', auth, async (req, res) => {
    const { error } = validateOrder(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    try {
        const item = await Item.findById(req.body.items);
        if (!item) return res.status(400).send('Item not found');
        const order = new Order({
            user: req.user._id,
            items: req.body.items,
            total: req.body.total
        });
        await order.save();
        console.log(item);
        console.log(item.product.quantity);
        item.product.quantity -= req.body.total;
        await item.save();
        res.send(order);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.get('/', auth, async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id });
        if (orders.length === 0) return res.status(404).send('No orders found');
        res.send(orders);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;