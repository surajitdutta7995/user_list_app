// Simple test script to verify MongoDB connection and basic functionality
const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mern_crud_demo';

console.log('Testing MongoDB connection...');
console.log('MongoDB URI:', MONGODB_URI);

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ MongoDB connected successfully');
  
  // Test user schema
  const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
    city: String
  }, { timestamps: true });
  
  const User = mongoose.model('TestUser', userSchema);
  
  console.log('✅ User model created successfully');
  
  // Close connection
  mongoose.connection.close();
  console.log('✅ Connection closed');
  process.exit(0);
})
.catch(err => {
  console.error('❌ MongoDB connection error:', err.message);
  process.exit(1);
});