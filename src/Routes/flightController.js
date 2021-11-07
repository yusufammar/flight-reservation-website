const router = require ('express').Router();
let Flights = require ('..models/Flights');
const { default: FlightsList } = require('../../frontend/src/components/FlightsList');
const { update } = require('../models/Flights');

router.route('/getAllFlights').get(async(req,res)=>{
    const flights = await Flights.find()
    try{
        console.log(flights);
    }
    catch(err){
        res.status(8000).send(err);
    }
} );

router.patch('/:Id',async(req,res,next) => {
    try{
        const Id= req.params.Id;
        const toUpdate=req.body;
        const result = await Flights.findByIdAndUpdate({_id:req.params.id},toUpdate,{new:true});
        res.send(result);
    }
    catch(err){
        console.log(err.message);
    }

})

module.exports=router;