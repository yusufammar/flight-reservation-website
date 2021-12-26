import react, {useEffect,useState} from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

import { css} from '@emotion/css'
import Top from './Top';                     // rendering in return statement (responsible for session checking & returning of current user email)
import Checkbox from '@mui/material/Checkbox';

function ChangeFlight(){           //for USER & GUEST

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

var passedVariable= location.state.passed;
var oldFlightNo= passedVariable.Flight.Flight_No; 

//Needed Inputs
var search= location.state.search; // search input sent from user.jsx page
var data1= location.state.matchedFlights; // array of objects {FlightDetails: x, TotalPrice: x} ->flights that meet the search criteria (FlightDetails & Price) sent from  bookingDetails (when change flight is pressed)
var data=[];

for (var i=0; i<data1.length; i++){
    if (data1[i].FlightDetails.Flight_No!= oldFlightNo)
    data.push(data1[i]);
}

//Derived
var Flights=data;
var cabin= search.cabin;
var totalseats= search.adultSeats + search.childrenSeats;


var selectedFlight;


function handleclick2(event){ //select flight
    event.preventDefault();
    selectedFlight= Flights[event.target.id];
   // console.log(event.target.id);   // to get id of the button clicked (jsx/react/frontend)
   }
 

function handleclick4(event){ // choose seats button
 event.preventDefault();

    if(selectedFlight!= undefined){
 history.push({
        pathname: '/BookingUpdate',
        state: { 
            selectedFlight: selectedFlight,
            search: search,
            searchResults: data,
            passed: passedVariable
        }
     }); 
     
   // console.log({selectedFlight: selectedFlight, search: search, searchResults: data});
   }
   else
   alert("Please select a flight");
   

}

return (
<div>
    <Top/>
 
    <div  name="content" className={css`
    position: absolute; left: 10%; top: 10%; border-radius: 20px; padding: 20px; 
    font-family: 'Josefin Sans'; font-size: 15px; ` }>
    
    <h1 >Matching Flights</h1> <br></br>
       {Flights.map((flight,i) =>
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
<br></br><br></br><br></br>
</div>
       )}
	   <br></br>
   

       <button onClick={handleclick4}>ChooseSeats</button>
	   

    
   
       
     
    </div> 
 </div>

);
}
export default ChangeFlight;