import react, {useEffect,useState} from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";


function SearchResults(){
    
    const location = useLocation();
   
    const [flights , setflights] = useState([{ 
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
    
    
    
    useEffect(() => {
   
        var type= location.state.type;  
   console.log(type);
    
    if (type=="flightNo"){
    var x= location.state.flightNo;
    const article = { flightNo: x };
    axios.post('http://localhost:8000/getFlightByNo', article)
    .then(jsonRes => (setflights(jsonRes.data)) );
    }

    if (type=="from"){
        var x= location.state.from;
        const article = { from : x };
        axios.post('http://localhost:8000/getFlightByFrom', article)
        .then(jsonRes => (setflights(jsonRes.data)) );
     }

    if (type=="to"){
        var x= location.state.to;
        const article = { to : x };
        axios.post('http://localhost:8000/getFlightByTo', article)
        .then(jsonRes => (setflights(jsonRes.data)) );
     }

     if (type=="date"){
        var x= location.state.date;
        const article = { date : x };
        console.log(article);
        axios.post('http://localhost:8000/getFlightByDate', article)
        .then(jsonRes => (setflights(jsonRes.data)) );
     }
     if (type=="departure"){
        var x= location.state.departure;
        const article = { departure : x };
        console.log(article);
        axios.post('http://localhost:8000/getFlightByDeparture', article)
        .then(jsonRes => (setflights(jsonRes.data)) );
     }
     if (type=="arrival"){
        var x= location.state.arrival;
        const article = { arrival : x };
        console.log(article);
        axios.post('http://localhost:8000/getFlightByArrival', article)
        .then(jsonRes => (setflights(jsonRes.data)) );
     }

    }, [location]);


   return( <div className='container'>
       <h1>Search Results</h1>
       
       <br></br>
       <button><Link to="/admin">Back To Admin Page</Link></button>
        <br></br><br></br>

        <button><Link to="/SearchFlight"> Search Again </Link></button>
        <br></br><br></br>

       {flights.map(flight =>
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

       

   
   );
}
export default SearchResults;