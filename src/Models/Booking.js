const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookingSchema = new Schema({
  userEmail: {
    type: String,
    required: true
  },
  bookingNo: {
    type: String,
    required: true
  },
  dFlightNo: {
    type: String,
    required: true,
  },
  rFlightNo: {
    type: String,
    required: true,
  },
  cabin: {
      type: String,
      require:true
  },
  adultSeats: {
      type: String,
      require: true     
  },
  childrenSeats:{
      type: String,
      require: true
  },
  Client_name:{
    type: String,
    require: true
},

 
}, { timestamps: true });

const booking = mongoose.model('bookings', BookingSchema);  
module.exports = booking;