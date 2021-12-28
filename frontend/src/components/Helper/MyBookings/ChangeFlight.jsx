import react, {useEffect,useState} from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

import { css} from '@emotion/css'
import Checkbox from '@mui/material/Checkbox';
import NewFlightSeats from "./NewFlightSeats";



function ChangeFlight(props){           //helperComponent of BookingDetails
console.log(props);
//Needed Inputs   (passed form BookingDetails page)
var passedVariable= props.state.passed;
var search= props.state.search; // search input sent from user.jsx page
var data1= props.state.matchedFlights; // array of objects {FlightDetails: x, TotalPrice: x} ->flights that meet the search criteria (FlightDetails & Price) sent from  bookingDetails (when change flight is pressed)


//-----------

//Derived Inputs
var oldFlightNo= passedVariable.Flight.Flight_No; 
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
 
	const [clicked,setClicked]= useState(false); 
	const [state1,setState1]= useState({});

function handleclick4(event){ // choose seats button
    event.preventDefault();

    if(selectedFlight!= undefined){

      var data4={ 
         selectedFlight: selectedFlight,
         search: search,
         searchResults: data,
         passed: passedVariable
     };			// state passed (as object) passed to location.state (previously)
    
    setHelperShow(true);
    setState1(data4);         // set data first to ensure redering wont occur with empty data
    setClicked(true);


/*  history.push({                          // remove & call in return & pass props to NewFlightSeats 
        pathname: '/BookingUpdate',
        state: { 
            selectedFlight: selectedFlight,
            search: search,
            searchResults: data,
            passed: passedVariable
        }
     });  */
     
   // console.log({selectedFlight: selectedFlight, search: search, searchResults: data});
   }
   else
   alert("Please select a flight");
   

}
const [helperShow,setHelperShow]=useState(false);
return (
<div>

   { helperShow==false &&
   <div name="Similar Flights" >
    <h3>Similar Flights</h3> <br></br>
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
      <button class="btn btn-primary" onClick={handleclick4}>Choose Seats</button>
   </div>
}
       { clicked  && 
        <div name="helperDialog" > 
       
        <div className={css` height:600px; overflow:auto; `}>
        <NewFlightSeats state={state1}/>
        </div>

        </div>
        }
	   
       </div> 
);
}
export default ChangeFlight;