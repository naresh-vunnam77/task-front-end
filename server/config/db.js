const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const connectionOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    const connection = await mongoose.connect("mongodb://127.0.0.1:27017/test", connectionOptions);

    // Log connection status
    console.log(`Connected to MongoDB: ${connection.connection.host}`);
  } catch (error) {
    // Log any connection errors
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
