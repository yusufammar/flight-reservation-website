// External variables
const express = require("express");
const mongoose = require('mongoose');
// THIS IS WRONG NEVER DO THAT !! Only for the task we put the DB Link here!! NEVER DO THAAAT AGAIN !!
const MongoURI = 'mongodb+srv://Adham:1234@acl.tpg5t.mongodb.net/myFirstDatabase?retryWrites=true&w=majority' ;


//App variables
const app = express();
const port = process.env.PORT || "8000";
const Flights = require('./models/Flights');
// #Importing the userController


// configurations
// Mongo DB
mongoose.connect(MongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(result =>console.log("MongoDB is now connected") )
.catch(err => console.log(err));


/*
                                                    Start of your code
*/
app.get("/Home", (req, res) => {
    res.status(200).send("You have everything installed !");
  });

// #Routing to usercontroller here  



app.get("/newFlight",(req,res)=>{
  const me = new Flights({
  From  : "Cairo",
   To : "Berlin",
    Cabin : "Economy",
    FlightDate: 12-12-2021 ,
    Available_Seats_on_Flight : 21

   
  });
  me.save();
}) ;




/*
                                                    End of your code
*/

// Starting server
app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  });
