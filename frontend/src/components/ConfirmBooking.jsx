import react, {useEffect,useState} from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";



function ConfirmBooking(){           //for USER & GUEST
   const location = useLocation();
   const history = useHistory();
   
   if (location.state!=null){           //checking if session exists (no url jumping) (if location.state has variables passed)
       var x= location.state.email;    
   }
   else{
   alert("Access Denied, Please Sign In first!");
   history.push({
       pathname: '/SignIn' 
       });
   }

   
    const [flights1 , setflights1] = useState([{ 
        Flight_No:"", From:"", To:"", FlightDate:"" , Departure:"" , Arrival:"", Duration:"", 
        First_Class_Seats:"",  Business_Class_Seats:"",   Economy_Class_Seats:"",
        First_Class_BaggageAllowance:"", Business_Class_BaggageAllowance:"",  Economy_Class_BaggageAllowance:"", 
        First_Class_Price:"", Business_Class_Price:"",  Economy_Class_Price:"" 
    }])

    const [flights2 , setflights2] = useState([{ 
        Flight_No:"", From:"", To:"", FlightDate:"" , Departure:"" , Arrival:"", Duration:"", 
        First_Class_Seats:"",  Business_Class_Seats:"",   Economy_Class_Seats:"",
        First_Class_BaggageAllowance:"", Business_Class_BaggageAllowance:"",  Economy_Class_BaggageAllowance:"", 
        First_Class_Price:"", Business_Class_Price:"",  Economy_Class_Price:"" 
    }])
    
    
    var adults = location.state.adults; var children = location.state.children; var cabin = location.state.cabin;
    var rflightNo=location.state.returnFlightNo; var dflightNo= location.state.departureFlightNo;
    console.log(rflightNo);

   useEffect(() => {
    const article1 = {DepartureFlightNo: dflightNo};
    axios.post('http://localhost:8000/getDFLight', article1)
    .then(jsonRes =>{
        (setflights1(jsonRes.data)) 
    })
    const article2 = {ReturnFlightNo: rflightNo};
    axios.post('http://localhost:8000/getrFLight', article2)
    .then(jsonRes =>{
        (setflights2(jsonRes.data)) 
    })
    const article3 = {departureFlightNo: dflightNo, returnFlightNo: rflightNo, adults: adults,
        children: children, cabin: cabin};

    axios.post('http://localhost:8000/getPrice', article3)
    .then(res =>{
        
    })


    }, [location]);

    function handleclick(event){
        event.preventDefault();
       
            history.push({
                pathname: '/SearchFlightsUser',
                state: {email : x}  
        })
       
    }

    //change departure flight (optional)

  function handleclick1(event){
   event.preventDefault();
  
   history.push({
   pathname: '/BookDepartureFlightUser',
   state: {email : x, departureFlightNo: dflightNo}
});
}

function handleclick2(event){
    event.preventDefault();
    var flightNumber= event.target.id;
   // console.log(event.target.id);   // to get id of the button clicked (jsx/react/frontend)
    history.push({
    pathname: '/BookDepartureFlightUser',
    state: {email : x, departureFlightNo: flightNumber}
    
 });
 }
 

   return( <div className='container'>
       <h1>Confirm Booking</h1>
       
       { flights1.map(flight =>
       <div>
        <h5>Departure Flight</h5>   
        <br/>
       <p> 
        Flight No: {flight.Flight_No}  | From: {flight.From}  | To: {flight.To}  | Date: {flight.FlightDate}  <br></br> 
        Departure Time: {flight.Departure}  | Arrival Time: {flight.Arrival}  | Duration: {flight.Duration}   <br></br>
        
        First Class: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Seats Available ({flight.First_Class_Seats}) | Baggage Allowance ({flight.First_Class_BaggageAllowance}) | Price ({flight.First_Class_Price}) <br></br>  
        
        
        Business Class: &nbsp;&nbsp;Seats Available ({flight.Business_Class_Seats}) | Baggage Allowance ({flight.Business_Class_BaggageAllowance}) | Price ({flight.Business_Class_Price})  <br></br>
                
        Economy Class: &nbsp;&nbsp;Seats Available ({flight.Economy_Class_Seats}) | Baggage Allowance ({flight.Economy_Class_BaggageAllowance}) | Price ({flight.Economy_Class_Price})  <br></br> 
      
       <br></br>
       </p>
        </div>
       )}

   

       {flights2.map(flight =>
       <div>
        <h5>Return Flight</h5> 
        <br/>
       <p> 
        Flight No: {flight.Flight_No}  | From: {flight.From}  | To: {flight.To}  | Date: {flight.FlightDate}  <br></br> 
        Departure Time: {flight.Departure}  | Arrival Time: {flight.Arrival}  | Duration: {flight.Duration}   <br></br>
        
        First Class: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Seats Available ({flight.First_Class_Seats}) | Baggage Allowance ({flight.First_Class_BaggageAllowance}) | Price ({flight.First_Class_Price})
        
        Business Class: &nbsp;&nbsp;Seats Available ({flight.Business_Class_Seats}) | Baggage Allowance ({flight.Business_Class_BaggageAllowance}) | Price ({flight.Business_Class_Price})  <br></br>
                
        Economy Class: &nbsp;&nbsp;Seats Available ({flight.Economy_Class_Seats}) | Baggage Allowance ({flight.Economy_Class_BaggageAllowance}) | Price ({flight.Economy_Class_Price})  <br></br> 
       
       <br></br>
       </p>
</div>

       )}


    <label style={{fontWeight:"bold"}}>Seats</label> <br></br>
    <label>Cabin ({cabin}) </label>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <label>Adults ({adults}) </label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <label>Children ({children}) </label>
    
    <br></br> 
    <h5>Price (Total) : { } </h5>
    
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

   

   <button onClick={handleclick2}>Confirm</button>
        <br></br><br></br>
   
   </div>

       

   
   );
}
export default ConfirmBooking;