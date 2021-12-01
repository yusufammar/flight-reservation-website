import react, {useEffect,useState} from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";



function Booking(){           //for USER & GUEST
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

    
   const [input, setInput] = useState({
    cabin: "", adults: "",  children: ""  
})


function handleChange(event){
const {name,value}=event.target;

setInput(prevInput => {
    return {
        ...prevInput,
        [name]:value
    }
})

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
    
    
    var rflightNo=location.state.returnFlightNo; var dflightNo= location.state.departureFlightNo;

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
   state: {email : x, departureFlightNo: dflightNo, returnFlightNo: rflightNo}
});
}

function handleclick2(event){
    event.preventDefault();
    history.push({
    pathname: '/ConfirmBooking',
    state: {email : x, departureFlightNo: dflightNo, returnFlightNo: rflightNo, adults: input.adults,
        children: input.children, cabin: input.cabin}
    
 });
 }
 

   return( <div className='container'>
       <h1>Book Flight</h1>
       
       <br></br>
       <button onClick={handleclick}>Change Flights</button>
        <br></br><br></br>   <br></br>


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
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <button onClick={handleclick1}>Change Return Flight</button>
        <br></br>
        
        Business Class: &nbsp;&nbsp;Seats Available ({flight.Business_Class_Seats}) | Baggage Allowance ({flight.Business_Class_BaggageAllowance}) | Price ({flight.Business_Class_Price})  <br></br>
                
        Economy Class: &nbsp;&nbsp;Seats Available ({flight.Economy_Class_Seats}) | Baggage Allowance ({flight.Economy_Class_BaggageAllowance}) | Price ({flight.Economy_Class_Price})  <br></br> 
       
       <br></br>
       </p>
</div>

       )}


    <label style={{fontWeight:"bold"}}>Seats</label> <br></br>
    <label> Cabin <br></br> 
<select name="cabin" value={input.cabin} onChange={handleChange}>
<option >  </option>
  <option > First </option>
  <option > Business </option>
  <option > Economy </option>
</select> 
</label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <label>Adults <br></br><input type="number" name="adults" value={input.adults}  onChange={handleChange} style={{width:"75px"}}></input> </label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <label>Children <br></br> <input type="number" name="children" style={{width:"75px"}} value={input.children} onChange={handleChange}></input> </label>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

   

   <button onClick={handleclick2}>Book</button>
        <br></br><br></br>
   
   </div>

       

   
   );
}
export default Booking;