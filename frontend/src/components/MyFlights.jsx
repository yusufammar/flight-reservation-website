import react, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import { Route, Redirect, useLocation } from "react-router-dom";


import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';
require("react-bootstrap/ModalHeader")







function MyFlights() {

    const location = useLocation();
    const history = useHistory();

    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get('http://localhost:8000/currentUser').then(res =>{ 
        if (res.data=="0" || res.data.type=="Admin"){
        alert("Access Denied, Please Sign In First");
        history.push({pathname:"/SignIn"});
        }
       //else go to page
     })
    }, [location]);

    var flightSelected = 0;

function SendMail(details, From, To) {


    const article = { details: details, From: From, To: To };
    axios.post('http://localhost:8000/SendCancelEmail', article)
}

function UpdateFlight(idOfFlight) {
    const article = { id: idOfFlight };
    axios.post('http://localhost:3000/FlightsListVal', article)
        .then();
    window.location.href = "/UpdatePage";

}

let isChecked = false;
let idDeleted = "";



function handleChange(e, id) {
    isChecked = e.target.checked;
    idDeleted = id;
    console.log(idDeleted);
    // do whatever you want with isChecked value
}


    var [bookingActive, setBookingActive] = useState({});


    const [show, setShow] = useState(false);
    
    function handleShow(event){
    var bookingNumber= event.target.id;
    var article= {bookingNo: bookingNumber}
    axios.post('http://localhost:8000/getBooking',article)
        .then(res =>{ 
            
        setBookingActive(res.data);
              setShow(true); 
        })
        
    }
    const handleClose = () => setShow(false);


    const deleteFlight = (event, id, details, from, to) => {

        if (isChecked && idDeleted == id) {
            var art= {ID: id};
            axios.post(`http://localhost:3000/cancel`,art);

            
            event.preventDefault();
            history.push({
                pathname: '/MyFlights'
            });
            SendMail(details, from, to);
            alert("Booking Canceled Successfully \nYou'll recieve an email with the cancelation details along with the refund amount");    
        }
        else 
        alert("Make sure confirmation checkbox is checked, to cancel booking!");
    };

    function Redirect(event) {
      
        event.preventDefault();
        history.push({
            pathname: '/User'
        });
    }


    const [bookings, setbookings] = useState([{}]) //bookings found for user

    const [depFlights, setDepFlights] = useState([]);


    useEffect(() => {
        fetch("/MyBookings").then(res => {
            if (res.ok) {
                return res.json();
            }
        }).then(jsonRes => {setbookings(jsonRes); console.log(bookings)});

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
  //var x= GetFlight(bookings.DepartureFlightNo).FlightDate +"";
   //console.log(x.substr(0,10));
  


    return <div className='container'>
        <h1>Bookings</h1>
        <br></br>
        <button onClick={Redirect}>Back To Main Page</button>
        <br></br><br></br>
        {bookings.length==0 &&  <h6> <br></br> No Bookings To Show! </h6>}
        {bookings.map(booking =>
            <div>
                <br />
                <p>
                    <label style={{fontWeight:"bold"}} >{GetFlight(booking.DepartureFlightNo).From}  &#8596; {GetFlight(booking.DepartureFlightNo).To} </label> 
                    <br />
                   
                    Booking No: {booking.BookingNo}   &nbsp;&nbsp;&nbsp;|  &nbsp;&nbsp;&nbsp; Departure Date: {(""+ GetFlight(booking.DepartureFlightNo).FlightDate).substr(0,10)}  &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp; Return Date: {(""+ GetFlight(booking.ReturnFlightNo).FlightDate).substr(0,10)}
                    
               </p>
                <label>
                    Are you sure you want to cancel this booking?
                    <input
                        name="isClicked"
                        type="checkbox"
                        onChange={e => handleChange(e, booking._id)}
                    />
                </label>  &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
                <button id="removeBtn1" onClick={(e) => {
                            deleteFlight(e, booking._id, booking, GetFlight(booking.DepartureFlightNo), GetFlight(booking.ReturnFlightNo));}}>
                Cancel Booking </button> &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
                <button style={{marginRight : '20px'}} id={booking.BookingNo} onClick={handleShow}>More Details</button>
                <br></br>

       

                <div  >
                 

                   
                </div>
            </div>

        )}

         
        <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Booking Details</Modal.Title>
                    </Modal.Header>

                    <Modal.Body> 
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
                        <button variant="secondary" onClick={handleClose}>
                            Close
                        </button>
                    </Modal.Footer>
                </Modal>
              
           

             
    </div>



}
export default MyFlights;