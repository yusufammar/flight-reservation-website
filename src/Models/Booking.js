const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  BookingNo: {
    type: Number,
    required: true
  },
  Email: {
    type: String,
    required: true,
  }, 
  DepartureFlightNo: {
    type: Number,
    required: true,
  },
  ReturnFlightNo: {
    type: Number,
    required: true,
  },
  Cabin: {
      type: String,
      require:true
  },
  AdultSeats: {
      type: Number,
      require: true     
  },
  ChildrenSeats:{
      type: Number,
      require: true
  },
  Price:{
    type: Number,
    require: true
} 
}, { timestamps: true });

const Booking = mongoose.model('bookings', bookingSchema);  
module.exports = Booking;