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

import html2canvas from 'html2canvas';     //  save html into an image
import { jsPDF } from 'jspdf';            // for generating pdf files (of elements in a fontend/react page/component)


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
    var id=event.target.id;  // FlightDirection -> "DepartureFlight" or "ReturnFlight"
    
    if (id=='DepartureFlight')
    var article= {Flight: GetFlight(bookingActive.DepartureFlightNo) , Booking: bookingActive, FlightDirection: id};
    else
    var article= {Flight: GetFlight(bookingActive.ReturnFlightNo) , Booking: bookingActive, FlightDirection: id};
    
    history.push({
        pathname:"/ChangeSeats",
       state:article
    });
}

function handleChangeFlight(event){
var id=event.target.id;  // FlightDirection -> "DepartureFlight" or "ReturnFlight"
var departureFlight= GetFlight(bookingActive.DepartureFlightNo);
var returnFlight= GetFlight(bookingActive.ReturnFlightNo);
 
if (id=="DepartureFlight"){
var passedVariable= {Flight: departureFlight, Booking: bookingActive, FlightDirection: id};
var input= {from: departureFlight.From , to: departureFlight.To , date: departureFlight.FlightDate,
cabin: bookingActive.Cabin , adultSeats: bookingActive.AdultSeats, childrenSeats: bookingActive.ChildrenSeats };
}
else{
    var passedVariable= {Flight: returnFlight, Booking: bookingActive, FlightDirection: id};
    var input= {from: returnFlight.From , to: returnFlight.To , date: returnFlight.FlightDate,
    cabin: bookingActive.Cabin , adultSeats: bookingActive.AdultSeats, childrenSeats: bookingActive.ChildrenSeats };
    }

//Getting matching flights & price for each all at once (passed to other front end pages using history.push)
    axios.post('http://localhost:8000/getMatchingFlights', input).then(res =>{ 
        var data1= res.data; // array of objects {FlightDetails: x, TotalPrice: x} ->flights that meet the search criteria (FlightDetails & Price) sent from  bookingDetails (when change flight is pressed)
        var data=[];
        var oldFlightNo= passedVariable.Flight.Flight_No; 

        for (var i=0; i<data1.length; i++){            // excluding the flight you want to change from the matched flights result
            if (data1[i].FlightDetails.Flight_No!= oldFlightNo)
            data.push(data1[i]);
        }

        if (data.length!=0) {        
         //console.log(res.data);  // res.send(FlightsAndPrices);  // array of objects [ {FlightDetails: x , TotalPrice: x } ]
         
         history.push({
          pathname: '/ChangeFlight',
          state: {matchedFlights: res.data, search: input, passed: passedVariable}
        });
    }
    else alert ("No matching flights");
       
    
    })

}

const printRef = React.useRef();

async function SendItineraryPDF(event){
  const element = printRef.current;
  const canvas = await html2canvas(element);
  const data = canvas.toDataURL('image/png');

  const pdf = new jsPDF();
  const imgProperties = pdf.getImageProperties(data);
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight =
    (imgProperties.height * pdfWidth) / imgProperties.width;

  pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
    
  var pdfFile = pdf.output('blob');      //formdata (for sending files) takes only blob (binary large object) item (the 2nd parameter of append must be blob)
                                      // blob format : blob is an object with many attrbutes , but most important is "data" attribute (is a buffer that holds  the data of file)  
  var file2=new FormData(); 
  file2.append('file',pdfFile);
  //console.log(pdfFile);
  axios.post('http://localhost:8000/SendEmail', file2).then(res => {
      if (res.data==1) alert ("Intinerary sent to your email")
      //add loading while waiting for email to be sent
  })
  
};


return (
<div>

<Top/>

<div name="content" className={css` position: absolute; left: 10%; top: 10%; width: 100%; padding: 20px; 
font-family: 'Josefin Sans'; font-size: 15px; font-weight: bold;`}>

<div style={{display:'flex'}} name="flexBig">

<div ref={printRef} name="Itinerary">
<h1>Booking Details</h1> <br></br>
    Booking No: {bookingActive.BookingNo}<br />  Cabin: {bookingActive.Cabin}  <br />  Seats: {bookingActive.AdultSeats>0 && bookingActive.AdultSeats + " (Adults)"} {(bookingActive.AdultSeats>0 && bookingActive.ChildrenSeats>0) && " | " } {bookingActive.ChildrenSeats>0 && bookingActive.ChildrenSeats + " (Children)"} 
    <br />Price: {bookingActive.Price}
    <br></br><br /> <br></br>


    <div name="DepartureFlight">
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

    <br></br><br /> <br></br>

    <div name="ReturnFlight">
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



</div>

<div name="Buttons" style={{paddingLeft:"50px"}}>

<br></br> <br></br><br></br><br></br> <br></br><br></br><br></br> <br></br><br></br><br></br>
<button class="btn btn-primary" id="DepartureFlight" onClick={handleChangeSeats}> Change Seats </button>  <br></br><br></br> 
<button class="btn btn-primary" id="DepartureFlight" onClick={handleChangeFlight} > Change Departure Flight </button> <br></br> <br></br><br></br>

<br></br> <br></br><br></br>
<button class="btn btn-primary" id="ReturnFlight" onClick={handleChangeSeats}> Change Seats </button>  <br></br><br></br> 
<button class="btn btn-primary" id="ReturnFlight" onClick={handleChangeFlight} > Change Return Flight </button>
         
</div>

</div>

<div name="Cancel & Send Button">         
                               
<br /> 
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
<button  class="btn btn-success" onClick={SendItineraryPDF}>Send Itineray By Email </button> <br></br> <br></br> <br></br>

&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
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