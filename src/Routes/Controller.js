const express = require("express");

const router= express.Router();
//const flight = require('../Models/Flights.js');
const flight = require('../Models/Flights.js');


router.route("/addFlight").post((req,res) => {
  const flightNo= req.body.flightNo;
  const from= req.body.from;
  const to= req.body.to;
  const date= req.body.date;
  const departure= req.body.departure;
  const arrival= req.body.arrival;
  const firstSeats= req.body.firstSeats;
  const businessSeats= req.body.businessSeats;
  const economySeats= req.body.economySeats;

  const newFlight= new flight({
    Flight_No: flightNo, 
    From: from,
    To: to,
    FlightDate: date, 
    Departure: departure,
    Arrival: arrival,
    First_Class_Seats: firstSeats,
    Business_Class_Seats: businessSeats,
    Economy_Class_Seats:  economySeats
   
  });

  newFlight.save();
});


router.route("/getFlightByNo").post((req, res) => {
  const x = req.body.flightNo;
  console.log(x);
   flight.find({ Flight_No : x }).then(foundflights => res.send(foundflights))
  });

router.route("/getFlightByFrom").post((req, res) => {
  const x = req.body.from;
  console.log(x);
  flight.find({ From : x}).then(foundflights => res.send(foundflights))
  });

  router.route("/getFlightByTo").post((req, res) => {
    const x = req.body.to;
    console.log(x);
    flight.find({ To : x}).then(foundflights => res.send(foundflights))
    });

    router.route("/getFlightByDate").post((req, res) => {
      const x = req.body.date;
      console.log(x);
      flight.find({ FlightDate : x}).then(foundflights => res.send(foundflights))
      });

      router.route("/getFlightByDeparture").post((req, res) => {
        const x = req.body.departure;
        console.log(x);
        flight.find({ Departure : x}).then(foundflights => res.send(foundflights))
        });

        router.route("/getFlightByArrival").post((req, res) => {
          const x = req.body.arrival;
          console.log(x);
          flight.find({ Arrival : x}).then(foundflights => res.send(foundflights))
          });

router.route("/FlightsList").get((req,res)=>{
  flight.find()
  .then(foundflights => res.json(foundflights))
})


module.exports= router;

/*
app.get("/newFlight",(req,res)=>{
  const me = new flight({
  From  : "Cairo",
   To : "Berlin",
    Cabin : "Economy",
    FlightDate: 12-12-2021 ,
    Available_Seats_on_Flight : 21
});
  me.save();  });
*/

