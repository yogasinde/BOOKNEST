require('dotenv').config();
const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://106.200.25.68:27017/BookStore';

mongoose.connect(MONGO_URI)
.then(() => {
    console.log('MongoDB connection successful');
})
.catch((e) => {
    console.error('MongoDB connection error:', e);
});

mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to', MONGO_URI);
});

mongoose.connection.on('error', (err) => {
    console.error('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});

process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.log('Mongoose connection closed through app termination');
    process.exit(0);
});

