const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  Name: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true
  },
  Password: {
    type: String,
    required: true
  },
  Type: {
    type: String,
    required: true,
  },
  GuestNo: {
    type: Number,
    required: false,
  }
}, { timestamps: false });

const User = mongoose.model('users', userSchema);  
module.exports = User;