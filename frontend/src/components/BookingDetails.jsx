import React from 'react';
import {useEffect,useState} from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { css} from '@emotion/css'
import Top from './Top';   
import 'bootstrap/dist/css/bootstrap.min.css';                  // rendering in return statement (responsible for session checking & returning of current user email)
import { Modal} from 'react-bootstrap';
require("react-bootstrap/ModalHeader");

function BookingDetails() {

const location = useLocation();
const history = useHistory();
axios.defaults.withCredentials = true;

const depFlights= location.state.depFlights;               // all flights
const bookingNo=location.state.bookingNo;                    //booking no of booking selected (passed by previous page: Myflght.jsx)

const [bookingActive, setBookingActive] = useState({});   // booking selected
const [isChecked, setIsChecked] = useState(false);         // status of confirm cancel checkbox 



useEffect(() => {

console.log(bookingNo);
var article= {bookingNo: bookingNo};
axios.post('http://localhost:8000/getBooking',article).        // gets booking selected
then(res =>{  setBookingActive(res.data);  })
console.log(depFlights);  console.log(bookingNo);
console.log(bookingActive);

}, [location]);


function GetFlight(FlightNumber) {                  // get flight using flight no (from all flights)
    var element = depFlights.find(({ Flight_No }) => Flight_No === FlightNumber);
    for (let i = 0; i < depFlights.length; i++) {
        if (depFlights[i].Flight_No == FlightNumber)
            return depFlights[i]
    }
    return [];
}


function handleChange(event){                      // handles change of cancellation checkbox
    setIsChecked(event.target.checked);
}

        
function deleteFlight(event){                        // deletes booking and send email to user
    event.preventDefault();
    var x=bookingActive.BookingNo;

    if (isChecked) {
    var art= {bookingNo: x};
    axios.post(`http://localhost:8000/cancel`,art);           // removes booking from booking collection & update flight collection with new available seats

    const article = { booking: bookingActive};               // sends cancellation email
    axios.post('http://localhost:8000/SendCancelEmail', article).then(res => {
    if (res.data==1){
    alert("Booking Canceled Successfully \nYou'll recieve an email with the cancelation details along with the refund amount");
    history.push({ pathname: '/MyFlights'});
    }
    });
    
    }
    else 
    alert("Make sure confirmation checkbox is checked, to cancel booking!");
}

function handleChangeSeats(event){
    var id=event.target.id;
    var article= {Flight: GetFlight(bookingActive.DepartureFlightNo) , Booking: bookingActive, FlightDirection: id};
    console.log(article);
    /*
   
if (id=="DepartureFlight"){
    var article= {Flight: GetFlight(bookingActive.DepartureFlightNo) , Booking: bookingActive, FlightDirection: id};
    console.log(article);
    axios.post('http://localhost:8000/changeSeats',article);
}
*/
}

function handleChangeDepartureFlight(event){
    

}

return (
<div>

<Top/>

<div  name="content" className={css` position: absolute; left: 10%; top: 10%; width: 100%; padding: 20px; 
font-family: 'Josefin Sans'; font-size: 15px; font-weight: bold;`}>

<h1>Booking Details</h1> <br></br>
    Booking No: {bookingActive.BookingNo}<br />  Cabin: {bookingActive.Cabin}  <br />  Seats: {bookingActive.AdultSeats>0 && bookingActive.AdultSeats + " (Adults)"} {(bookingActive.AdultSeats>0 && bookingActive.ChildrenSeats>0) && " | " } {bookingActive.ChildrenSeats>0 && bookingActive.ChildrenSeats + " (Children)"} 
    <br />Price: {bookingActive.Price}
    <br></br><br /> <br></br>

<div style={{display:'flex'}}>

    <div>
    <h5>Departure Flight</h5>
    Flight No: {GetFlight(bookingActive.DepartureFlightNo).Flight_No}  &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp; Date: { (""+GetFlight(bookingActive.DepartureFlightNo).FlightDate).substr(0,10)}<br></br>
    From: {GetFlight(bookingActive.DepartureFlightNo).From}  <br></br>
    To: {GetFlight(bookingActive.DepartureFlightNo).To} <br/>
    Departure: {GetFlight(bookingActive.DepartureFlightNo).Departure} &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp; Arrival: {GetFlight(bookingActive.DepartureFlightNo).Arrival} &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
    Duration: {GetFlight(bookingActive.DepartureFlightNo).Duration} <br/>
    Baggage Allowance:  &nbsp; 
    {bookingActive.Cabin=="First" && GetFlight(bookingActive.DepartureFlightNo).First_Class_BaggageAllowance}
    {bookingActive.Cabin=="Business" && GetFlight(bookingActive.DepartureFlightNo).Business_Class_BaggageAllowance}
    {bookingActive.Cabin=="Economy" && GetFlight(bookingActive.DepartureFlightNo).Economy_Class_BaggageAllowance}
    </div>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    
    <div>    <br></br>
    <button class="btn btn-primary" id="DepartureFlight" onClick={handleChangeSeats}> Change Seats </button>  <br></br> <br></br><br></br>
    <button class="btn btn-primary" id="DepartureFlight" onClick={handleChangeDepartureFlight} > Change Departure Flight </button>
    </div>
 
 </div>

<br /><br /> <br></br>
    
  <div>
    <h5>Return Flight</h5>
    Flight No: {GetFlight(bookingActive.ReturnFlightNo).Flight_No}  &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp; Date: { (""+GetFlight(bookingActive.ReturnFlightNo).FlightDate).substr(0,10)}<br></br>
    From: {GetFlight(bookingActive.ReturnFlightNo).From}  <br></br>
    To: {GetFlight(bookingActive.ReturnFlightNo).To} <br/>
    Departure: {GetFlight(bookingActive.ReturnFlightNo).Departure} &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp; Arrival: {GetFlight(bookingActive.ReturnFlightNo).Arrival} &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
    Duration: {GetFlight(bookingActive.ReturnFlightNo).Duration} <br/>
    Baggage Allowance:  &nbsp; 
    {bookingActive.Cabin=="First" && GetFlight(bookingActive.ReturnFlightNo).First_Class_BaggageAllowance}
    {bookingActive.Cabin=="Business" && GetFlight(bookingActive.ReturnFlightNo).Business_Class_BaggageAllowance}
    {bookingActive.Cabin=="Economy" && GetFlight(bookingActive.ReturnFlightNo).Economy_Class_BaggageAllowance}
  </div>
  

<div>         
                               
<br /><br></br> <br></br> 

<label> Are you sure you want to cancel this booking?</label> &nbsp; &nbsp; 
<input  type="checkbox"  onChange={handleChange}/>  
               
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
<button class="btn btn-danger"  onClick={deleteFlight}> Cancel Booking </button> 
                    
                                
</div>


</div>

</div>

);
}
export default BookingDetails;