const express = require('express');
require('dotenv').config({ path: './config.env' });
const databaseConnection = require('./server');
const userRouter = require('./routes/userRouter');
const productRouter = require('./routes/productRouter');
const reviewRouter = require('./routes/reviewRouter');
const categoryRouter = require('./routes/categoryRoutes');
const orderRouter = require('./routes/orderRoutes');
const cookieParser = require('cookie-parser');

const path = require('path');
const bodyParser = require('body-parser');

const app = express();
//app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.urlencoded({ extended: true }));

// Set bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Cookie parser
app.use(cookieParser());

// View engine
app.use(express.static('views'));
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

// Connect Apllication with database
databaseConnection();

app.use(express.json());

// TODO -- All Router
app.use('/user', userRouter);
app.use('/product', productRouter);
app.use('/review', reviewRouter);
app.use('/category', categoryRouter);
app.use('/order', orderRouter);

// Global Error handling middleware..
app.use((err, req, res, next) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
  });
});

// app.all('*', (req, res, next) => {
//   res.status(404).json({
//     status: 'Failed',
//     message: 'Page not Found..',
//   });
// });

// TODO -- Server Running on port
app.listen(process.env.PORT, () => {
  console.log(`Server is start running on this ${process.env.PORT} number`);
});

/* User Sign-up / Login / Logout */
app.get('/main', (req, res) => {
  res.render('index.html');
});

app.get('/loginPage', (req, res) => {
  res.render('login.html');
});

app.get('/signupPage', (req, res) => {
  res.render('signup.html');
});

app.get('/logout', (req, res) => {
  res.render('index.html');
});

app.get('/updateProfilePage', (req, res) => {
  res.render('userProfile.html');
});

/* Cart */
app.get('/cart', (req, res) => {
  res.render('cart.html');
});

/* Payment */
app.get('/payment', (req, res) => {
  res.render('shipping.html');
});

app.get('/orderDetail', (req, res) => {
  res.render('orderDetails.html');
});

/* Admin */

app.get('/admin', (req, res) => {
  res.render('adminIndex.html');
});
