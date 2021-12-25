import react, {useEffect,useState} from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

import { css} from '@emotion/css'
import Top from './Top';                     // rendering in return statement (responsible for session checking & returning of current user email)
import Checkbox from '@mui/material/Checkbox';

function DepartureFlights(){           //for USER & GUEST

    const location = useLocation();
    const history = useHistory();
    axios.defaults.withCredentials = true;
    
    var flag=false;
   
    if (location.state!=null){           //checking if user searched for a flight & variables were passed, //passed state variable (search criteria)
        flag=true;   
     }
   else{
   alert("Please search for a flight to book first");
   history.push({ pathname: '/user' });
   }

// --------------------------------------------------------------------------------------------------

var search= location.state.search // search input sent from user.jsx page
var data= location.state.matchedFlights; // flights (departure & return) that meet the search criteria (respone of post request on user.jsx) sent from  user.jsx
var departureFlights=data.departureFlightsAndPrices;
var returnFlights=data.returnFlightsAndPrices;



var cabin= search.cabin;
var totalseats= search.adultSeats + search.childrenSeats;



var selectedDepartureFlight;
var selectedReturnFlight;

function handleclick2(event){
    event.preventDefault();
    selectedDepartureFlight= departureFlights[event.target.id];
   // console.log(event.target.id);   // to get id of the button clicked (jsx/react/frontend)
   }
 
function handleclick3(event){
    event.preventDefault();
    selectedReturnFlight= returnFlights[event.target.id];
   // console.log(event.target.id);   // to get id of the button clicked (jsx/react/frontend)
   }
function handleclick4(event){
    event.preventDefault();

    if(selectedDepartureFlight!= undefined && selectedReturnFlight!= undefined ){
    console.log({selectedDepartureFlight: selectedDepartureFlight,  selectedReturnFlight: selectedReturnFlight });
    history.push({
        pathname: '/Booking',
        state: { 
            booking: {selectedDepartureFlight: selectedDepartureFlight,  selectedReturnFlight: selectedReturnFlight },
            search: search,
            searchResults: data
        }
     }); 
     console.log({ 
        booking: {selectedDepartureFlight: selectedDepartureFlight,  selectedReturnFlight: selectedReturnFlight },
        search: search,
        searchResults: data
    })
   }
   if(selectedDepartureFlight== undefined || selectedReturnFlight== undefined ){
   alert("Please make sure you have selected a departure flight & return flight");
   }
}

return (
<div>
    <Top/>
 
    <div  name="content" className={css`
    position: absolute; left: 10%; top: 10%; border-radius: 20px; padding: 20px; 
    font-family: 'Josefin Sans'; font-size: 15px; ` }>
    
    <h1 >Departure Flights</h1>
       {departureFlights.map((flight,i) =>
       <div>
       <button id={i} onClick={handleclick2} className={css`
       background-color: dodgerblue; border-radius: 20px; padding: 10px;
       font-family: 'Josefin Sans'; font-size: 15px; font-weight: normal;  &:hover{background-color: green;} &:focus{background-color: orange; `}>
        
        <label id={flight.FlightDetails.Flight_No} onClick={handleclick2} style={{fontWeight:"bold"}} > {flight.FlightDetails.From} &#10140; {flight.FlightDetails.To} </label>    <br></br> 
        FlightDetails No: {flight.FlightDetails.Flight_No}  &nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp; Date: {flight.FlightDetails.FlightDate.substr(0,10)} &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp; Departure Time: {flight.FlightDetails.Departure}  &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp; Arrival Time: {flight.FlightDetails.Arrival} &nbsp;&nbsp;&nbsp; |&nbsp;&nbsp;&nbsp; Duration: {flight.FlightDetails.Duration}   <br></br>        
        First Class: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Seats Available ({flight.FlightDetails.First_Class_Seats}) | Baggage Allowance ({flight.FlightDetails.First_Class_BaggageAllowance}) | Price ({flight.FlightDetails.First_Class_Price}) <br></br>        
        Business Class: &nbsp;&nbsp;Seats Available ({flight.FlightDetails.Business_Class_Seats}) | Baggage Allowance ({flight.FlightDetails.Business_Class_BaggageAllowance}) | Price ({flight.FlightDetails.Business_Class_Price})   <br></br> 
        Economy Class: &nbsp;Seats Available ({flight.FlightDetails.Economy_Class_Seats}) | Baggage Allowance ({flight.FlightDetails.Economy_Class_BaggageAllowance}) | Price ({flight.FlightDetails.Economy_Class_Price})  
     
</button>
<br></br>
</div>
       )}
	   <br></br>
       <h1 >Return Flights</h1>
       
       {returnFlights.map((flight,i) =>
       <div>
       <button id={i} onClick={handleclick3} className={css`
       background-color: dodgerblue; border-radius: 20px; padding: 10px;
       font-family: 'Josefin Sans'; font-size: 15px; font-weight: normal;  &:hover{background-color: green; } 
       &:focus{background-color: orange; } 
       }`}>
        
        <label id={flight.FlightDetails.Flight_No} onClick={handleclick3} style={{fontWeight:"bold"}} > {flight.FlightDetails.From} &#10140; {flight.FlightDetails.To} </label>    <br></br> 
        FlightDetails No: {flight.FlightDetails.Flight_No}  &nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp; Date: {flight.FlightDetails.FlightDate.substr(0,10)} &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp; Departure Time: {flight.FlightDetails.Departure}  &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp; Arrival Time: {flight.FlightDetails.Arrival} &nbsp;&nbsp;&nbsp; |&nbsp;&nbsp;&nbsp; Duration: {flight.FlightDetails.Duration}   <br></br>        
        First Class: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Seats Available ({flight.FlightDetails.First_Class_Seats}) | Baggage Allowance ({flight.FlightDetails.First_Class_BaggageAllowance}) | Price ({flight.FlightDetails.First_Class_Price}) <br></br>        
        Business Class: &nbsp;&nbsp;Seats Available ({flight.FlightDetails.Business_Class_Seats}) | Baggage Allowance ({flight.FlightDetails.Business_Class_BaggageAllowance}) | Price ({flight.FlightDetails.Business_Class_Price})   <br></br> 
        Economy Class: &nbsp;Seats Available ({flight.FlightDetails.Economy_Class_Seats}) | Baggage Allowance ({flight.FlightDetails.Economy_Class_BaggageAllowance}) | Price ({flight.FlightDetails.Economy_Class_Price})  
     
</button>
<br></br><br></br><br></br>

</div>
       )}

       <button onClick={handleclick4}>Choose Seats</button>
	   

    
   
       
     
    </div> 
 </div>

);
}
export default DepartureFlights;