const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookingSchema = new Schema({
  BookingNo: {
    type: String,
    required: true
  },
  Email: {
    type: String,
    required: true
  },
  DepartureFlightNo: {
    type: String,
    required: true,
  },
  ReturnFlightNo: {
    type: String,
    required: true,
  },
  Cabin: {
      type: String,
      require:true
  },
  AdultSeats: {
      type: String,
      require: true     
  },
  ChildrenSeats:{
      type: String,
      require: true
  },
  Price:{
    type: String,
    require: true
},

 
}, { timestamps: true });

const booking = mongoose.model('bookings', BookingSchema);  
module.exports = booking;