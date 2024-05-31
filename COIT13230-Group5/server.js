const mongoose = require('mongoose');
require('dotenv').config({ path: './config.env' });

const databaseConnection = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_LOCAL, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    console.log('Database Connected...');
  } catch (err) {
    console.log('Something went wrong....');
  }
};

module.exports = databaseConnection;
