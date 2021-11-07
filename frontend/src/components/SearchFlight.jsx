
import react, {useEffect,useState} from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function SearchFlight(){
    const [input, setInput] = useState({
        flightNo:"", from: "" , to: "" , date: "", departure: "", arrival: "", firstSeats: "", businessSeats: "" , economySeats: ""  
    })


function handleChange(event){
    const {name,value}=event.target;

    setInput(prevInput => {
        return {
            ...prevInput,
            [name]:value
        }
    })
    
}

function handleclick(event){
    event.preventDefault();
    console.log(input);
    const newFlight1= {flightNo: input.flightNo, from: input.from , to: input.to , date: input.date , departure: input.departure, arrival: input.arrival, firstSeats: input.firstSeats, businessSeats: input.businessSeats , economySeats: input.economySeats }  ;
    axios.get('http://localhost:8000/addFlight', newFlight1);
}


    


const [flights1 , setflights] = useState([{
    Flight_No:"",
    From:"",
    To:"",
    FlightDate:"",
    Departure:"",
    Arrival:"",
    First_Class_Seats:"",
    Business_Class_Seats:"",
    Economy_Class_Seats: "",


}])

useEffect(() =>{
    // setLoading(true);
     fetch("/SearchFlight").then(res=>{
         if(res.ok){
             return res.json();
         }
     }).then(jsonRes => setflights(jsonRes));

 }
 )




return (
<div>
<h1>SearchFlight</h1>

<br></br>


<form>
<label>Flight No. <input onChange={handleChange} name="flightNo" type="number" value={input.flightNo} />  </label> <br></br> <br></br>
      <label>From <input onChange={handleChange} name="from" type="text" value={input.from} />  </label> <br></br> <br></br>
      <label>To   <input onChange={handleChange} name="to" type="text" value={input.to}/>  </label> <br></br> <br></br> <br></br> 
     

      <input type="submit" value="Search" onClick={handleclick} /> 
</form>


 <h1>Filtered Flights</h1>
      
    {flights1.map(flight =>
      <div>
       <br/>
      <p> 
       Flight No: {flight.Flight_No}  | From: {flight.From}  | To: {flight.To} <br></br>
       Date: {flight.FlightDate} <br></br>
       Departure: {flight.Departure} | Arrival: {flight.Arrival} <br></br>
       Available Seats: First Class ({flight.First_Class_Seats}) | Business Class ({flight.Business_Class_Seats}) | Economy Class ({flight.Economy_Class_Seats})
      <br></br>
      </p>
</div>
    

      )}  
 


</div>

)}

export default SearchFlight;
