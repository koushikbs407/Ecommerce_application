const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY || 'your_stripe_secret_key_here');
const { Product } = require('../Model/Product');
const path = require('path');

const router = express.Router();

router.use(express.static('view'));
router.use(express.json());
router.use(express.urlencoded({ extended: true })); // To parse URL-encoded bodies

const BASE_URL = 'http://localhost:3000'; // Set base URL manually

router.get('/', (req, res) => {
    res.render('index.ejs');
});

router.post('/checkout', async (req, res) => {
    const productId = req.body.productid;
    const productData = await Product.findById(productId);
    if (!productData) return res.status(400).send('Product not found');

    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: productData.name
                    },
                    unit_amount: productData.price * 100
                },
                quantity: 1
            }
        ],
        mode: 'payment',
        shipping_address_collection: {
            allowed_countries: ['US', 'BR']
        },
        success_url: `${BASE_URL}/complete?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${BASE_URL}/cancel`
    });

    res.redirect(session.url);
});

router.get('/complete', async (req, res) => {
    const result = await Promise.all([
        stripe.checkout.sessions.retrieve(req.query.session_id, { expand: ['payment_intent.payment_method'] }),
        stripe.checkout.sessions.listLineItems(req.query.session_id)
    ]);

    console.log(JSON.stringify(result));

    res.sendFile(path.join(__dirname, '../public/succes.html'));
});

router.get('/cancel', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/failure.html'));
});

module.exports = router;