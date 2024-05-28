const express = require('express');
require('dotenv').config({ path: './config.env' });
const databaseConnection = require('./server');
const userRouter = require('./routes/userRouter');
const productRouter = require('./routes/productRouter');
const reviewRouter = require('./routes/reviewRouter');
const categoryRouter = require('./routes/categoryRoutes');
const wishlistRouter = require('./routes/wishListRoutes');
const cartRouter = require('./routes/cartRoutes');
const orderRouter = require('./routes/orderRoutes');
const app = express();
const path = require('path');

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Serving a Static file
app.use(express.static(path.join(__dirname, 'assets')));

// Connect Apllication with database
databaseConnection();

// Global middle ware

app.use(express.json());

// View Routes
app.get('/view', (req, res) => {
  res.status(200).sendFile('index');
});

// TODO -- All Router
app.use('/user', userRouter);
app.use('/product', productRouter);
app.use('/review', reviewRouter);
app.use('/category', categoryRouter);
app.use('/wishlist', wishlistRouter);
app.use('/cart', cartRouter);
app.use('/order', orderRouter);

// Global Error handling middleware..
app.use((err, req, res, next) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
  });
});

app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'Failed',
    message: 'Page not Found..',
  });
});

// TODO -- Server Running on port
app.listen(process.env.PORT, () => {
  console.log(`Server is start running on this ${process.env.PORT} number`);
});
