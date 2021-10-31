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

const Flight = mongoose.model('flights', FlightsSchema);   
// first paramter is the collection name where the document/entry will be added it to || Note: the collection name must be in lowercase letters (if you entered uppercase letters the will changed to be all lowercase letters, & if it didn't find the collection specified it will create a new collection)
//2nd paramater is the schema object that you have done (that has the schema you want to apply when adding entries in the collection specified in the 1st parameter)
module.exports = Flight;