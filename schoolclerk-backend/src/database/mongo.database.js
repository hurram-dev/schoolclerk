const mongoose = require('mongoose');

// Connection URL for MongoDB
// Replace 'your_database' with your actual database name
const mongoURI = process.env.DB_URL || 'mongodb://localhost:27017/schoolClerk-database';

// Connect to MongoDB
mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.error(err));