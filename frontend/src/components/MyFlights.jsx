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

function MyFlights() {

    const location = useLocation();
    const history = useHistory();
    axios.defaults.withCredentials = true;
    
    const [isChecked, setIsChecked] = useState(false);
    const [bookings, setbookings] = useState([{}]) //bookings found for user
    const [depFlights, setDepFlights] = useState([]);
    const [bookingActive, setBookingActive] = useState({});
    
    const [show, setShow] = useState(false);

    useEffect(() => {
        fetch("/MyBookings").then(res => {
            if (res.ok) {
                return res.json();
            }
        }).then(jsonRes => {setbookings(jsonRes);});

        fetch("/FlightsList").then(res => {
            if (res.ok) {
                return res.json();
            }
        }).then(jsonRes => setDepFlights(jsonRes));
    }, [location]);
    
    function GetFlight(FlightNumber) {
        var element = depFlights.find(({ Flight_No }) => Flight_No === FlightNumber);
        for (let i = 0; i < depFlights.length; i++) {
            if (depFlights[i].Flight_No == FlightNumber)
                return depFlights[i]
        }
        return [];
    }

function SendMail(booking) {
   
}

function deleteFlight(event){
   event.preventDefault();
    
     var x=bookingActive.BookingNo;
     console.log(x);
     
     if (isChecked) {
         var art= {bookingNo: x};
         axios.post(`http://localhost:3000/cancel`,art);
       
        

         const article = { booking: bookingActive};
         axios.post('http://localhost:8000/SendCancelEmail', article).then(res => {
             if (res.data==1)
             {
                alert("Booking Canceled Successfully \nYou'll recieve an email with the cancelation details along with the refund amount");
                setShow(false);   
                history.push({
                    pathname: '/MyFlights'
                });
             }
         });
        
     }
     else 
     alert("Make sure confirmation checkbox is checked, to cancel booking!");
 };


 function handleShow(event){             // modal view of booking details
    event.preventDefault();
    setIsChecked(false);
    setShow(true);
    var bookingNumber= event.target.id;
    var article= {bookingNo: bookingNumber}
    axios.post('http://localhost:8000/getBooking',article).then(res =>{  setBookingActive(res.data);  console.log(bookingActive); console.log(isChecked);   })
   
    
    }
   

    function handleClose(event){
       // event.preventDefault();
        setShow(false);
        setIsChecked(false);
        console.log(isChecked);
    }
   

    function handleChange(event){
    setIsChecked(event.target.checked);
    console.log(bookingActive);
    console.log(event.target.checked);
    }


     
return (
    <div  className={css`
    color: white;
   height: 1920px;
   height: 1080px; 
   `} style={{backgroundImage: 'url("/wallpaper.jpg")'}}>

    <Top/>

    <div  name="content" className={css`
  position: absolute; left: 5%; border-radius: 20px; width: 50%; padding: 20px; 
  font-family: 'Josefin Sans'; font-size: 15px; font-weight: bold;`
  }>
        <h1>Bookings</h1>
        
        
        {bookings.length==0 &&  <h6> <br></br> No Bookings To Show! </h6>}
        <div>
        {bookings.map(booking =>
           
<div>
            <div id={booking.BookingNo} onClick={handleShow} className={css`
            background-color: dodgerblue; border-radius: 20px; padding: 10px; 
            font-family: 'Josefin Sans'; font-size: 15px; font-weight: normal;  &:hover{background-color: green;}`}>
            
            <label id={booking.BookingNo} onClick={handleShow} style={{fontWeight:"bold"}} >{GetFlight(booking.DepartureFlightNo).From}  &#8596; {GetFlight(booking.DepartureFlightNo).To} </label> 
            <br />
            Booking No: {booking.BookingNo}   &nbsp;&nbsp;&nbsp;|  &nbsp;&nbsp;&nbsp; Departure Date: {(""+ GetFlight(booking.DepartureFlightNo).FlightDate).substr(0,10)}  &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp; Return Date: {(""+ GetFlight(booking.ReturnFlightNo).FlightDate).substr(0,10)}
            <br />



           </div>
           


          

            
          <br></br>  
            
            
             
        <Modal show={show}  onHide={handleClose} >
        <div className={css` color: white `} style={{backgroundImage: 'url("/ticket2.jpg")'}}>
                        
                        <Modal.Header closeButton>
                            <Modal.Title>Round-Trip Details</Modal.Title>
                            <button style={{position:"absolute", right:"5px",fontWeight:"bold"}} class="btn btn-secondary"  onClick={handleClose}>
                                X
                            </button>
                        </Modal.Header>
        
                        <Modal.Body > 
                            Booking No: {bookingActive.BookingNo}<br />  Cabin: {bookingActive.Cabin}  <br />  Seats: {bookingActive.AdultSeats>0 && bookingActive.AdultSeats + " (Adults)"} {(bookingActive.AdultSeats>0 && bookingActive.ChildrenSeats>0) && " | " } {bookingActive.ChildrenSeats>0 && bookingActive.ChildrenSeats + " (Children)"} 
        
                            <br />Price: {bookingActive.Price}<br></br>
                            <br />
                            
                            <br />
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
                            <br />
        
                            <br />
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
                            <br />
        
                           
                               
                        </Modal.Body>
                        <Modal.Footer>
                        <label style={{position:"absolute",left:"50px", width:"200px"}}> Are you sure you want to cancel this booking?</label> <input style={{position:"absolute",left:"230px", bottom:"10px"}} name="isClicked" type="checkbox"  onChange={handleChange}/>  
               
                        <br></br>
                        <br></br>
               <button class="btn btn-danger"  onClick={deleteFlight}>
                               Cancel Booking </button> 
                        </Modal.Footer>
                        </div>
                    </Modal>    

           </div>        
        )}
        </div>
        
        

        
    </div>
 </div> 


);
}
export default MyFlights;