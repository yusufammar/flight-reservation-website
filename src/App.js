const express = require("express");
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const Flight = require('../src/Models/Flights');
const { findByIdAndRemove } = require("../src/Models/Flights");


app.use(cors());
app.use(express.json());



const env = require("dotenv");
env.config(); 

const MongoURI = process.env.DB;  // database mongodb url



mongoose.connect(MongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => console.log("MongoDB is now connected"))
  .catch(err => console.log(err));

app.use("/", require("./Routes/Controller"));

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



const port = process.env.PORT || "8000";
app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});

