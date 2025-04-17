const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Database connected ${conn.connection.host}`);
  } catch (error) {
    console.log(`Database connection error: ${error.message}`);
  }
};

module.exports = connectDB;
