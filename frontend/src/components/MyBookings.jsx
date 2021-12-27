import React from 'react';
import {useEffect,useState} from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { css} from '@emotion/css'
import NavBar from './Helper/NavBar';   
import 'bootstrap/dist/css/bootstrap.min.css';                  // rendering in return statement (responsible for session checking & returning of current user email)
import { Modal} from 'react-bootstrap';

import BookingDetails from './Helper/MyBookings/BookingDetails';

require("react-bootstrap/ModalHeader");


function MyBookings() {

const location = useLocation();
const history = useHistory();
axios.defaults.withCredentials = true;

const [bookings, setbookings] = useState([]);       //bookings found for user
const [depFlights, setDepFlights] = useState([]);     // all flights

  
useEffect(() => {
    axios.get('http://localhost:8000/MyBookings').then(jsonRes => {
    console.log(jsonRes.data); setbookings(jsonRes.data); console.log(bookings)});

    fetch("/FlightsList").then(res => {              // gets all flights (& sets it to depFlights)
        if (res.ok) {
            return res.json();
        }
    }).then(jsonRes => setDepFlights(jsonRes));

}, [location]);
    

function GetFlight(FlightNumber) {             // get flights with flightNo from all flights (depFlights)
    var element = depFlights.find(({ Flight_No }) => Flight_No === FlightNumber);
    for (let i = 0; i < depFlights.length; i++) {
        if (depFlights[i].Flight_No == FlightNumber)
            return depFlights[i]
    }
    return [];
}

const [clicked,setClicked]= useState(false); 
const [state1,setState1]= useState({});

function handleShow(event){             // redirect to page to show  booking details of booking selected (gets it by bokking no passed by id)
    event.preventDefault();
    var bookingNumber= event.target.id;
    var data4={bookingNo: bookingNumber, depFlights: depFlights} // state (as object) passed to location.state (previously)
    setState1(data4);
    setClicked(true);
    
}



 
 

     
return (
<div>

<NavBar state1="Page"/>

  <div name="content" className={css`
  position: absolute; left: 10%; top: 10%; border-radius: 20px; width: 50%; padding: 20px; 
  font-family: 'Josefin Sans'; font-size: 15px; font-weight: bold; `
  }>
        <h1>Bookings</h1>
        
        
        {bookings.length==0 &&  <h6> <br></br> No Bookings To Show! </h6>}
        
       
        {bookings[0] !=undefined && bookings.map(booking =>
           
        <div>
            <div id={booking.BookingNo} onClick={handleShow} className={css`
            background-color: dodgerblue; border-radius: 20px; padding: 10px; 
            font-family: 'Josefin Sans'; font-size: 15px; font-weight: normal;  &:hover{background-color: green;}`}>
            
            <label id={booking.BookingNo} onClick={handleShow} style={{fontWeight:"bold"}} >{GetFlight(booking.DepartureFlightNo).From}  &#8596; {GetFlight(booking.DepartureFlightNo).To} </label> 
            <br />
            Booking No: {booking.BookingNo}   &nbsp;&nbsp;&nbsp;|  &nbsp;&nbsp;&nbsp; Departure Date: {(""+ GetFlight(booking.DepartureFlightNo).FlightDate).substr(0,10)}  &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp; Return Date: {(""+ GetFlight(booking.ReturnFlightNo).FlightDate).substr(0,10)}
            <br />

        </div><br></br> 
         { clicked && <BookingDetails state={state1}/>
}
        </div>  
     
)}
         
     </div>
    

 </div> 


);
}
export default MyBookings;