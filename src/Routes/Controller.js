const express = require("express");
const { ConnectionPoolClosedEvent } = require("mongodb");

const router= express.Router();
const flight = require('../Models/Flights');
const User = require("../Models/User");
const user = require('../Models/User');


var iduser;
var email ;
var password = "";
router.route("/Currentuserr").post((req,res) => { 
  console.log("currentuserr");
  const x = req.body.Email;
  const y = req.body.password;
//email = req.body.Email;
//password = req.body.password;
console.log(x);
console.log(y);
email = x ;
console.log(email);
// user.find({ Email : x , Password: y}).then(founduser => {
//  iduser = founduser[0].id
//  console.log(iduser);
});


router.route("/Updateinfo").post((req, res) => {
  console.log("updateinfo");
 console.log(email);
 const z = req.body.Name;
 const d = req.body.Password;
 const s = req.body.Email;
 const v = req.body.Type;
 console.log(z);
if(v!="admin"){
 User.findOne({Email: email}, function (err, user) {
  user.Name = z;
  user.Password = d;
  user.Email = s;
  user.Type = v;

 
  user.save(function (err) {
      if(err) {
          console.error('ERROR!');
      }
  });
});
}


//  let doc = user.findOneAndUpdate({Email:email}, {$set:{Name:z}},{
//   new: true})

//   doc.save;
  // User.findById(iduser , function (err, docs) {
  //   console.log(docs);
  //   var uservar = req.body;

    
  //     docs["Email"] = uservar.Email;

    
  //     docs["Password"] = uservar.Password;


  
  //     docs["Type"] = uservar.Type;

  //     docs["Name"] = uservar.Name;

   

  //   docs.save();
  // });
  
// const x = flight.find({Email:email});
// x.Name = req.body.Name

});


router.route("/addUser").post((req,res) => {
  const name= req.body.name;
  const email= req.body.email;
  const password= req.body.password;

  user.find({ Email : email}).then(founduser => {  //all cases (actions) shoud be inside then statement (variable changes in then statement dont get apllied outside then statement)
   if (founduser.length!= 0) 
    res.send("1"); 
   else {
    
    res.send("0"); 
    const newUser = new user({
      Name : name,
      Email : email,
      Password : password,
      Type: "Customer" 
       });
      newUser.save();
      
    }  
  
  })
 });

var userid;
router.route("/SignIn").post((req, res) => {
  const x = req.body.Email;  const y = req.body.Password;
  console.log(x);
   
  user.find({ Email : x , Password: y}).then(founduser => {  //all cases (actions) shoud be inside then statement (variable changes in then statement dont get apllied outside then statement)
 
    
    if (founduser.length!= 0) {
    
    if (founduser[0].Type =="Admin"){
    res.send("2");            // admin found -> sign in as admin
    console.log("found admin");     
  }
    else{
     res.send("1");    //user found -> sign in as user
    console.log("found user");
    console.log(founduser[0].id);
    userid = founduser[0].id;
     }
    }
     else  
     res.send("0");  //user not found -> don't sign in
  })

  });

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

 
  const newFlight = new flight({
    Flight_No: flightNo,
    From: from,
    To: to,
    FlightDate: date,
    Departure: departure,
    Arrival: arrival,
    First_Class_Seats: firstSeats,
    Business_Class_Seats: businessSeats,
    Economy_Class_Seats: economySeats

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


          


router.route("/FlightsList").get((req, res) => {
  flight.find()
    .then(foundflights => res.json(foundflights))
})

var selectedFlightID = "";
router.route('/FlightsListVal').post((req, res) => {
  selectedFlightID = req.body.id;
  console.log(selectedFlightID);
});




router.route('/UpdatePage').post((req, res) => {
  console.log(selectedFlightID);
  flight.findById(selectedFlightID, function (err, docs) {
    console.log(docs);
    var flightVar = req.body;

    if (flightVar.FlightNo_.length != 0)
      docs["Flight_No"] = flightVar.FlightNo_;

    if (flightVar.FlightFrom_.length != 0)
      docs["From"] = flightVar.FlightFrom_;


    if (flightVar.FlightTo_.length != 0)
      docs["To"] = flightVar.FlightTo_;

    if (flightVar.FlightDate_.length != 0)
      docs["FlightDate"] = flightVar.FlightDate_;

    if (flightVar.FlightDep_.length != 0)
      docs["Departure"] = flightVar.FlightDep_;

    if (flightVar.FlightArr_.length != 0)
      docs["Arrival"] = flightVar.FlightArr_;

    if (flightVar.FlightFirst_.length != 0)
      docs["First_Class_Seats"] = flightVar.FlightFirst_;

    if (flightVar.FlightBus_.length != 0)
      docs["Business_Class_Seats"] = flightVar.FlightBus_;

    if (flightVar.FlightEco_.length != 0)
      docs["Economy_Class_Seats"] = flightVar.FlightEco_;

    docs.save();
  });
});



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



module.exports = router;
