const nodemailer = require("nodemailer");
const express = require("express");

const cors = require('cors');

const { ConnectionPoolClosedEvent } = require("mongodb");

const router= express.Router();
const flight = require('../Models/Flights');
const user = require('../Models/User');
const booking = require('../Models/Booking');

router.use(express.json());

const session=require("express-session");
router.use(session({secret:'secret', resave:false , saveUninitialized:false}));

router.use(cors({                          // for axios post to not destroy session (credentials is where the sessions is saved as cookie)
  origin:['http://localhost:3000'],     // is the origin of the axios requests (frontend url port)
  methods:['GET','POST'],
  credentials: true // enable set cookie
}));

//--------------------------------------------------------------------------------------------

router.route("/logout").get((req, res) => {
  req.session.destroy();              // destroying session
   });

router.route("/SignIn").post((req, res) => {
var x = req.body.Email;  const y = req.body.Password;

 user.find({ Email : x , Password: y}).then(founduser => {  //all cases (actions) shoud be inside then statement (variable changes in then statement dont get apllied outside then statement)
   if (founduser.length!= 0 && founduser[0].type!="Guest") {
     //req.session.user = x; req.session.save();    //setting session (if admin or user) & saving session variable without sending it
     //res.send(req.session.user);
     switch (founduser[0].Type){
     case("Customer"): {req.session.email = x; req.session.type = founduser[0].Type; req.session.save();res.send("1"); break;};
     case("Admin"): {req.session.email = x; req.session.type = founduser[0].Type; req.session.save();res.send("2"); break;};
     default:  {res.send("0"); break;};
     }
   }
   else  
   res.send("0");  //user is guest or not found -> don't sign in 
   })
});

router.route("/currentUser").get((req, res) => {
   if (req.session.email){
     const user= {email: req.session.email, type: req.session.type  }
     res.send(user);  
   }
   else
   res.send("0");
   });




router.route("/addGuest").get((req,res) => { //get becuase no input
   user.find({ Type : "Guest"}).then(foundguests => {  //all cases (actions) shoud be inside then statement (variable changes in then statement dont get apllied outside then statement)
     var x = foundguests.length + 1;
     var guestEmail= "guest"+ x;
     //req.session.email= guestEmail;
   
     const newGuest = new user({
      Name : "Guest",
      Email : guestEmail,
      Password : "guest",
      Type: "Guest", 
      
       });

      newGuest.save();
      req.session.email = guestEmail; req.session.type="Guest"; res.send(req.session);
      //res.send(guestEmail); 
    })
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

;

router.route("/MyBookings").get((req, res) => {
  booking.find({Email : req.session.email})
    .then(foundBookings => res.send(foundBookings))
})

router.route("/getBooking").post((req, res) => {
  bookingNo= req.body.bookingNo;
  console.log(bookingNo);
  booking.find({BookingNo : bookingNo}).then(foundBookings => {
    res.send(foundBookings[0])
    console.log(foundBookings[0]);  
  })
  
})


router.route("/searchFlightUser").post((req, res) => {
var SPflag= false;

  const from= req.body.from;
  const to= req.body.to;
  const date= req.body.date;
  const departure= req.body.departure;
  const arrival= req.body.arrival;
  const cabin= req.body.cabin;
  const seats= req.body.seats;
  const price= req.body.price;

 var search={};
if (from.length!=0) 
search = { $and: [ search,  {From : from}  ] }; 

if (to.length!=0) 
search = { $and: [ search,  {To : to}  ] };

if (date.length!=0) 
search = { $and: [ search,  {FlightDate : date}  ] };

if (departure.length!=0) 
search = { $and: [ search,  {Departure : departure}  ] };

if (arrival.length!=0) 
search = { $and: [ search,  {Arrival : arrival}  ] };


//Note: when checking seats & price assume you user must select cabin

if (seats.length!=0){      
SPflag=true;                                        // seat/price input  

switch (cabin){
 
case ("First"):{
  search = { $and: [ search,  {First_Class_Seats : { $gte: seats}}  ] }; break;
};
case ("Business"):{
  search = { $and: [ search,  {Bussiness_Class_Seats : { $gte: seats}}  ] }; break;
}
case ("Economy"):{
  search = { $and: [ search,  {Economy_Class_Seats : { $gte: seats}}  ] }; break;
}
default: { res.send("0"); break;}                  // no cabin input -> error in frontend
}
}

if (price.length!=0){ 
 
  SPflag=true;                                     // seat/price input  


  switch (cabin){
  case ("First"):{
    search = { $and: [ search,  {First_Class_Price : { $lte: price}}  ] }; break;
  };
  case ("Business"):{
    search = { $and: [ search,  {Bussiness_Class_Price : { $lte: price}}  ] }; break;
  }
  case ("Economy"):{
    search = { $and: [ search,  {Economy_Class_Price : { $lte: price}}  ] }; break;
  }
  default: { res.send("0"); break;}                // no cabin input -> error in frontend
  }
  }

var s=false;                              //search statement used in find statement is by default empty

if ( Object.keys(search).length != 0){   // if the search statement isn't empty to catch no reults error
  var s=true;                             //search statement used in find statement isn't empty
  flight.find(search)
     .then(foundflights => {
      if (foundflights.length!=0)
      res.json(foundflights); 
      else
      res.send("1");
    });
    
    }

   if (SPflag==false && s==false)   // if search statement was empty & no seat/price input
    res.send("1");                  // no results (no search criteria was entered)
 })

 router.route("/selectReturnFlight").post((req, res) => {
  const dflightNo= req.body.departureFlightNo;

  flight.find({ Flight_No : dflightNo }).then(foundflights => {  //all cases (actions) shoud be inside then statement (variable changes in then statement dont get apllied outside then statement)
      dFrom= foundflights[0].From;   dTo= foundflights[0].To;
    res.send({dFrom:dFrom , dTo: dTo});
       });
 })

 router.route("/selectReturnFlight2").post((req, res) => {
  const dFrom= req.body.dFrom; const dTo= req.body.dTo;
  flight.find({ From : dTo, To: dFrom }).then(foundflights => {
        
          if (foundflights.length!=0)
          res.json(foundflights); 
          else
          res.send("1");   // no return flights available
        
 })
})

router.route("/getDFLight").post((req,res)=>{
  const departureFlightNo = req.body.DepartureFlightNo;

  flight.find({ Flight_No : departureFlightNo}).then(foundflights => {
    //console.log(foundflights);
    if (foundflights.length!=0)
    res.json(foundflights); 
    else
    res.send("0"); // not found
  })

});
router.route("/getRFLight").post((req,res)=>{
  const returnFlightNo = req.body.ReturnFlightNo;

  flight.find({ Flight_No : returnFlightNo}).then(foundflights => {
    //console.log(foundflights);
    if (foundflights.length!=0)
    res.json(foundflights); 
    else
    res.send("0"); // not found
  })

});

router.route("/booking").post((req,res)=>{ //check if seats available & calculate price
  const dFlightNo = req.body.departureFlightNo;
  const rFlightNo = req.body.returnFlightNo;
  const cabin = req.body.cabin;
  var adults = req.body.adults;
  var children = req.body.children;
  
  if (adults=="") adults=0; if (children=="") children=0;
  
    //check seats available then calculate price //check if seats available (& res.send(0))
var search= { $or: [{Flight_No: dFlightNo},{Flight_No: rFlightNo} ] }
  flight.find(search).then(foundflights => {
    //console.log(foundflights);
    
    var DFirstSeats = foundflights[0].First_Class_Seats;
    var DBusinessSeats = foundflights[0].Business_Class_Seats;
    var DEconomySeats = foundflights[0].Economy_Class_Seats;
    
    var RFirstSeats = foundflights[1].First_Class_Seats;
    var RBusinessSeats = foundflights[1].Business_Class_Seats;
    var REconomySeats = foundflights[1].Economy_Class_Seats;
   
    
    var DFirstPrice = foundflights[0].First_Class_Price;
    var DBusinessPrice = foundflights[0].Business_Class_Price;
    var DEconomyPrice = foundflights[0].Economy_Class_Price;
    
    var RFirstPrice = foundflights[1].First_Class_Price;
    var RBusinessPrice = foundflights[1].Business_Class_Price;
    var REconomyPrice = foundflights[1].Economy_Class_Price;

    var price;
    var seatsavailable=false;
    var seats= parseInt(adults) + parseInt(children);            //parseInt is used for int var from req.body to make sure they are read as int
    
    switch(cabin){
      case("First"):{
      if ( (seats <= DFirstSeats) && (seats <= RFirstSeats) ) {
        price = (adults*DFirstPrice)+(children*DFirstPrice*0.7)+(adults*RFirstPrice)+(children*RFirstPrice*0.7); 
        seatsavailable=true; }
        break;  }
      
        case("Business"):{
      if ((seats <= DBusinessSeats) && (seats <= RBusinessSeats))  { 
        price = (adults*DBusinessPrice)+(children*DBusinessPrice*0.7)+(adults*RBusinessPrice)+(children*RBusinessPrice*0.7); 
        seatsavailable=true; }
        break;  }

      case("Economy"):{
        if ( ( seats <= DEconomySeats ) && ( seats <= REconomySeats)  )  {   
        price = (adults*DEconomyPrice)+(children*DEconomyPrice*0.7)+(adults*REconomyPrice)+(children*REconomyPrice*0.7);
        seatsavailable=true;}
         break;  }

      }

      if (seatsavailable==true){
        //console.log(price);
        var price1= price+"";
        res.send(price1);   // seats available --> show price in frontend
      }
      else
      res.send("0");   // seats not available -> alert in frontend

      
    })

});

router.route("/confirmBooking").post((req,res)=>{ // update available seats in flights collection & make booking in booking collection
  const email= req.session.email;
  const dFlightNo = req.body.departureFlightNo;
  const rFlightNo = req.body.returnFlightNo;
  const cabin = req.body.cabin;
  var adults = req.body.adults;
  var children = req.body.children;
  const price = req.body.price;


  if (adults=="") adults=0; if (children=="") children=0;
  
  var bookingNo;
  booking.find().then(foundBookings => {
   if (foundBookings.length==0)
   bookingNo=1;
   else 
   bookingNo= foundBookings[foundBookings.length-1].BookingNo + 1; //ensures unique booking no (even when canceling bookings)
   
   const newBooking = new booking({
    BookingNo: bookingNo,
    Email: email, 
    DepartureFlightNo: dFlightNo ,
    ReturnFlightNo: rFlightNo ,
    Cabin: cabin,
    AdultSeats: adults ,
    ChildrenSeats: children,
    Price: price
    });
    newBooking.save();
    res.send("1"); // booking successful
    })

    

  var search= { $or: [{Flight_No: dFlightNo},{Flight_No: rFlightNo} ] }
  flight.find(search).then(foundflights => {
    var departureFlight={}; var returnFlight={};
    if (foundflights[0].Flight_No == dFlightNo) { departureFlight=foundflights[0]; returnFlight=foundflights[1]; }
    else { departureFlight=foundflights[1]; returnFlight=foundflights[0]; }
    //console.log(foundflights);
    
    var DFirstSeats = departureFlight.First_Class_Seats;
    var DBusinessSeats =departureFlight.Business_Class_Seats;
    var DEconomySeats =departureFlight.Economy_Class_Seats;
    
    var RFirstSeats =returnFlight.First_Class_Seats;
    var RBusinessSeats =returnFlight.Business_Class_Seats;
    var REconomySeats = returnFlight.Economy_Class_Seats;
   
    var seats= parseInt(adults) + parseInt(children);

    //console.log(seats);
    switch(cabin){
      case("First"):{
      var DFirstSeatsUpdate = DFirstSeats - seats;
      var RFirstSeatsUpdate = RFirstSeats - seats;
      
      flight.findOneAndUpdate({Flight_No:dFlightNo},{First_Class_Seats:DFirstSeatsUpdate},{ new: true, upsert: true }).then(res);
      flight.findOneAndUpdate({Flight_No:rFlightNo},{First_Class_Seats:RFirstSeatsUpdate},{ new: true, upsert: true }).then(res);
        break;  }
      
        case("Business"):{

          var DBusinessSeatsUpdate = DBusinessSeats - seats;
          var RBusinessSeatsUpdate = RBusinessSeats - seats;
          
          flight.findOneAndUpdate({Flight_No:dFlightNo},{Business_Class_Seats:DBusinessSeatsUpdate},{ new: true, upsert: true }).then(res);
          flight.findOneAndUpdate({Flight_No:rFlightNo},{Business_Class_Seats:RBusinessSeatsUpdate},{ new: true, upsert: true }).then(res);
   
        break;  }

      case("Economy"):{
        var DEconomySeatsUpdate = DEconomySeats - seats;
        var REconomySeatsUpdate = REconomySeats - seats;
        
        flight.findOneAndUpdate({Flight_No:dFlightNo},{Economy_Class_Seats:DEconomySeatsUpdate},{ new: true, upsert: true }).then(res);
        flight.findOneAndUpdate({Flight_No:rFlightNo},{Economy_Class_Seats:REconomySeatsUpdate},{ new: true, upsert: true }).then(res);
       
         break;  }

      }
    
         
    }) 
});

//------------------------------------------------------------------------------------------------------------------------
//adham
router.route("/UpdateBookingUser").post((req, res) => {
  //console.log("UpdateBookingUser");
 //console.log(email);

 const z = req.body.name;
 const d = req.body.password;
 const s = req.body.email;
 
 console.log(z);

 booking.find({Email : req.session.email}, function (err, docs) {
  //console.log("TEST BEFORE");
 //  console.log(docs);
  // console.log("TEST AFTER");
   for(let i = 0; i < docs.length; i++)
   {
     docs[i]["Email"] = s;
     docs[i].save();
   }
 
  
});
})


router.route("/Updateinfo").post((req, res) => {
  //console.log("updateinfo");
 //console.log(email);
 const z = req.body.name;
 const d = req.body.password;
 const s = req.body.email;




 user.findOne({Email: req.session.email}, function (err, user) {
  user.Name = z;
  user.Password = d;
  user.Email = s;
  
   user.save(function (err) {
      if(err) {
         // console.error('ERROR!');
      }
  });
  req.session.email=s; res.send("req.session.email");
});

})


//---------------------------------------------------------------------------------------------------------------------
//mayar & shorouk
router.route("/SendCancelEmail").post( async (req, res) => {

  const details = req.body.details;
  const From = req.body.From;
  const To = req.body.To;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'fakeEmailACL@gmail.com',
      pass: 'Fake1234' // naturally, replace both with your real credentials or an application-specific password
    }
  });
  
  let mess = "Your booking has been cancelled. \nBooking Number: "  + details.BookingNo + "\nRefund: " + details.Price;
  const mailOptions = {
    from: 'ACL_SAMYH_TEAM@GUC.com',
    to: details.Email,
    subject: 'Your cancelled reservation',
    text:mess 
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
    console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

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


router.route('/cancel').post(async(req, res) => {
  const idNum = req.body.ID;
  console.log(idNum);

  var booking1={};
  var departureFlight={}; var returnFlight={};
  
  await booking.findOne({_id : idNum}).then(res => booking1=res);

  var dFlightNo=booking1.DepartureFlightNo; var rFlightNo=booking1.ReturnFlightNo;
  var seats= booking1.AdultSeats + booking1.ChildrenSeats;
  
  var search= { $or: [{Flight_No: dFlightNo},{Flight_No: rFlightNo} ] }
  
  flight.find(search).then(res => {
    if (res[0].Flight_No == dFlightNo) { departureFlight=res[0]; returnFlight=res[1]; }
    else { departureFlight=res[1]; returnFlight=res[0]; }

    
    console.log(booking1); console.log("Departure Flight " + departureFlight); console.log("Return Flight " +returnFlight); 
  
   

  switch(booking1.Cabin){
  case("First"):{
  var DFirstSeatsUpdate = (departureFlight.First_Class_Seats) + seats;
  var RFirstSeatsUpdate = (returnFlight.First_Class_Seats) + seats;
  
 flight.findOneAndUpdate({Flight_No:dFlightNo},{First_Class_Seats:DFirstSeatsUpdate},{ new: true, upsert: true }).then(res);
 flight.findOneAndUpdate({Flight_No:rFlightNo},{First_Class_Seats:RFirstSeatsUpdate},{ new: true, upsert: true }).then(res);
    break;  }
  
    case("Business"):{

      var DBusinessSeatsUpdate = (departureFlight.Business_Class_Seats) + seats;
      var RBusinessSeatsUpdate = (returnFlight.Business_Class_Seats) + seats;
      
      flight.findOneAndUpdate({Flight_No:dFlightNo},{Business_Class_Seats:DBusinessSeatsUpdate},{ new: true, upsert: true }).then(res);
      flight.findOneAndUpdate({Flight_No:rFlightNo},{Business_Class_Seats:RBusinessSeatsUpdate},{ new: true, upsert: true }).then(res);

    break;  }

  case("Economy"):{
    var DEconomySeatsUpdate = (departureFlight.Economy_Class_Seats) + seats;
    var REconomySeatsUpdate = (returnFlight.Economy_Class_Seats) + seats;
    
    flight.findOneAndUpdate({Flight_No:dFlightNo},{Economy_Class_Seats:DEconomySeatsUpdate},{ new: true, upsert: true }).then(res);
    flight.findOneAndUpdate({Flight_No:rFlightNo},{Economy_Class_Seats:REconomySeatsUpdate},{ new: true, upsert: true }).then(res);
   
     break;  }

  }


booking.findOneAndDelete({_id : idNum}).then(res);

  });

});

//mayar & shorouk





//admin

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
});

//admin



/*
router.route("/addFlightManual").get((req,res) => {
  var d; var a;
 
  function duration(departure, arrival){         //function for calculating duration
    var x= departure.split(":"); var y= arrival.split(":");
    var h= (y[0]-x[0]) ;  var m;   
    
    if (x[1]>y[1]){
    h=h-1;
    m= (60-x[1]) + parseInt(y[1]);      
  }
    else
    m= (y[1]-x[1]); 
  
    h2=  h + ""; m2= m + "";
    
    if (h2.length<2) h2= "0" + h;   if (m2.length<2) m2= "0" + m;
    
    var duration= h2 + ":" + m2; 
    return duration;
    }
   
  d= "10:00"; a= "14:00";
    
    const newFlight1 = new flight({
    Flight_No: 1,
    From: "LAX",
    To: "JFK",
  
    FlightDate: "2022-01-12",
    Departure: d,
    Arrival: a,
    Duration: duration(d,a),
  
    First_Class_Seats: 6,
    Business_Class_Seats: 10,
    Economy_Class_Seats: 20,
  
    First_Class_BaggageAllowance: 4,
    Business_Class_BaggageAllowance: 3,
    Economy_Class_BaggageAllowance: 2,
  
    First_Class_Price: 5000,
    Business_Class_Price: 3000,
    Economy_Class_Price: 1500

  });
   newFlight1.save();

   d= "10:00"; a= "14:00";
   const newFlight2 = new flight({
    Flight_No: 2,
    From: "JFK",
    To: "LAX",
  
    FlightDate: "2022-01-22",
    Departure: d,
    Arrival: a,
    Duration: duration(d,a),
  
    First_Class_Seats: 16,
    Business_Class_Seats: 15,
    Economy_Class_Seats: 30,
  
    First_Class_BaggageAllowance: 4,
    Business_Class_BaggageAllowance: 3,
    Economy_Class_BaggageAllowance: 2,
  
    First_Class_Price: 5000,
    Business_Class_Price: 3000,
    Economy_Class_Price: 1500

  });
   newFlight2.save();

   d= "10:00"; a= "12:00";
   const newFlight3 = new flight({
    Flight_No: 3,
    From: "JFK",
    To: "LHR",
  
    FlightDate: "2022-02-21",
    Departure: d,
    Arrival: a,
    Duration: duration(d,a),
  
    First_Class_Seats: 5,
    Business_Class_Seats: 2,
    Economy_Class_Seats: 22,
  
    First_Class_BaggageAllowance: 4,
    Business_Class_BaggageAllowance: 3,
    Economy_Class_BaggageAllowance: 2,
  
    First_Class_Price: 2500,
    Business_Class_Price: 1500,
    Economy_Class_Price: 750

  });
   newFlight3.save();

   d= "10:00"; a= "12:00";
   const newFlight4 = new flight({
    Flight_No: 4,
    From: "LHR",
    To: "JFK",
  
    FlightDate: "2022-03-06",
    Departure: d,
    Arrival: a,
    Duration: duration(d,a),
  
    First_Class_Seats: 16,
    Business_Class_Seats: 26,
    Economy_Class_Seats: 43,
  
    First_Class_BaggageAllowance: 4,
    Business_Class_BaggageAllowance: 3,
    Economy_Class_BaggageAllowance: 2,
  
    First_Class_Price: 2500,
    Business_Class_Price: 1500,
    Economy_Class_Price: 750

  });
   newFlight4.save();

   res.send("success");
});
*/


module.exports = router;
