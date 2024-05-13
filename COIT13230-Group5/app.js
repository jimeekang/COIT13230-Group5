const express = require('express');
require('dotenv').config({ path: './config.env' });
const databaseConnection = require('./server');
const userRouter = require('./routes/userRouter');
const productRouter = require('./routes/productRouter');
const reviewRouter = require('./routes/reviewRouter');
const categoryRouter = require('./routes/categoryRoutes');

const path = require('path');

const app = express();
//app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.urlencoded({ extended: true }));

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

/* Admin */
app.get('/adminMain', (req, res) => {
  res.render('adminIndex.html');
});

app.get('/addProduct', (req, res) => {
  res.render('addProduct.html');
});
