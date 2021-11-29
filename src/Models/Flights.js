const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FlightsSchema = new Schema({
  
  Flight_No: {
    type: Number ,
    required: true
  },
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
  Departure: {
    type: String ,
    required: true
  },
  Arrival: {
    type: String ,
    required: true
  },
  Duration: {
    type: String ,
    required: true
  },

  First_Class_Seats: {
    type: Number ,
    required: true
  },
  Business_Class_Seats: {
    type: Number ,
    required: true
  },
  Economy_Class_Seats: {
    type: Number ,
    required: true
  },

  First_Class_BaggageAllowance: {
    type: Number ,
    required: true
  },
  Business_Class_BaggageAllowance: {
    type: Number ,
    required: true
  },
  Economy_Class_BaggageAllowance: {
    type: Number ,
    required: true
  },

  First_Class_Price: {
    type: Number ,
    required: true
  },
  Business_Class_Price: {
    type: Number ,
    required: true
  },
  Economy_Class_Price: {
    type: Number ,
    required: true
  }

}, { timestamps: false });

const Flight = mongoose.model('flights', FlightsSchema);   
// first paramter is the collection name where the document/entry will be added it to || Note: the collection name must be in lowercase letters (if you entered uppercase letters the will changed to be all lowercase letters & plural form (if not the mongoose will make it plural form, adding s/es). If mongoose didn't find the collection specified it will create a new collection
//2nd paramater is the schema object that you have done (that has the schema you want to apply when adding entries in the collection specified in the 1st parameter)
module.exports = Flight;