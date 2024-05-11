const express = require('express');
require('dotenv').config({ path: './config.env' });
const databaseConnection = require('./server');
const userRouter = require('./routes/userRouter');
const productRouter = require('./routes/productRouter');
const reviewRouter = require('./routes/reviewRouter');
const categoryRouter = require('./routes/categoryRoutes');
const app = express();

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
