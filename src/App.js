const express = require("express");
const app = express();
const mongoose = require('mongoose');

const nodemailer = require("nodemailer");
const Flight = require('../src/Models/Flights');
const Booking = require('../src/Models/Booking');
const User = require('../src/Models/User');

const { findByIdAndRemove } = require("../src/Models/Flights");

app.use("/", require("./Routes/Controller"));
app.use(express.json());

/*
const cors = require('cors');
const session=require("express-session");
app.use(session({secret:'secret', resave:false , saveUninitialized:false}));

app.use(cors({                          // for axios post to not destroy session (credentials is where the sessions is saved as cookie)
  origin:['http://localhost:3000'],     // is the origin of the axios requests (frontend url port)
  methods:['GET','POST'],
  credentials: true // enable set cookie
}));

*/

app.get("/Home", (req, res) => {
  res.status(200).send("You have everything installed !");
});


app.delete('/delete/:id', async (req, res) => {
  const idNum = req.params.id;
   await Flight.findOneAndDelete({_id : idNum}, function (err, docs) {
    console.log(err);
   });
  res.send("deleted");
});

/*

app.get("/addAdmin",(req,res)=>{   //adding Admin to user database (one time thing)
  const me = new User({
   Name : "Admin",
   Email : "admin",
   Password : "admin",
   Type: "Admin" 
 });
  me.save();  });

app.get("/addUsers",(req,res)=>{
  const me = new User({
  Name : "Yousif",
  Email : "yousif@gmail.com",
  Password : "yousif1223",
  Type: "Customer" 
   });
    me.save();  });
*/

const MongoURI = 'mongodb+srv://Adham:1234@acl.tpg5t.mongodb.net/Airline?retryWrites=true&w=majority' ;  // database mongodb url

mongoose.connect(MongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => console.log("MongoDB is now connected"))
  .catch(err => console.log(err));

const port = process.env.PORT || "8000";
app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});

