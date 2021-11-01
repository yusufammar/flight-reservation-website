const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FlightsSchema = new Schema({
  From: {
    type: String,
    required: true,
  },
  To: {
    type: String,
    required: true
  },
  FlightDate: {
    type: Date,
    required: true,
  },
  Cabin: {
    type: String ,
    required: true
  },
  Available_Seats_on_Flight: {
    type: Number ,
    required: true
  },
 
}, { timestamps: true }, { collection: 'Flights' });

const Flights = mongoose.model('Flights', FlightsSchema);
module.exports = Flights;