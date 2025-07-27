const express = require('express');
const path = require('path');

const Categoryrouter = require('./Router/categorys');
const app = express();
app.use(express.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/category', Categoryrouter);
const Productrouter = require('./Router/Products');
const items = require('./Router/Items');
const register = require('./Router/registration');
console.log('Registration router loaded');
const AuthRouter = require('./Router/Auth');
const cartRouter = require('./Router/Cart');
const paymentRouter = require('./Router/payment'); // Add payment router
const ordersRouter = require('./Router/Orders'); 

app.use('/api/product', Productrouter);
app.use('/api/item', items);
app.use('/api/registration', (req, res, next) => {
    console.log('Received request at /api/registration');
    next();
}, register);
app.use('/api/auth', AuthRouter);
app.use('/api/cart', cartRouter);
app.use('/', paymentRouter); // Use payment router
app.use('/api/orders', ordersRouter);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});