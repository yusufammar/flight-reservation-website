const express = require("express");
const mongoose = require('mongoose');
const MongoURI = 'mongodb+srv://Adham:1234@acl.tpg5t.mongodb.net/Airline?retryWrites=true&w=majority' ;  // database mongodb url

const app = express();
const port = process.env.PORT || "8000";
const flight = require('./models/Flights');


mongoose.connect(MongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(result =>console.log("MongoDB is now connected") )
.catch(err => console.log(err));


/*
Start of your code
*/

app.get("/Home", (req, res) => {
    res.status(200).send("You have everything installed !");
  });


app.get("/newFlight",(req,res)=>{
  const me = new flight({
  From  : "Cairo",
   To : "Berlin",
    Cabin : "Economy",
    FlightDate: 12-12-2021 ,
    Available_Seats_on_Flight : 21
});
  me.save();  });

  app.get("/SearchFlight",(req,res)=>{
    const readline1 = require('readline').createInterface({
      input: process.stdin,
    })
    const readline2 = require('readline').createInterface({
      input: process.stdin,
    })
    const readline3 = require('readline').createInterface({
      input: process.stdin,
    })
    
      flight.find({From:readline1},{To:readline2},{Available_Seats_on_Flight:readline3},function(err,item)
      {
        if(err){
          res.status(200).send("error");

        }
        else{
          res.status.apply(200).send(item);
          res.status.apply(200).send("\n");
        }

        })
      
    
      


  })



// Starting server
app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  });
