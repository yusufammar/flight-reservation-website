import react, {useEffect,useState} from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

import { css} from '@emotion/css'
import Top from './Top';                     // rendering in return statement (responsible for session checking & returning of current user email)



function Booking(){           //for USER & GUEST
   const location = useLocation();
   const history = useHistory();
   axios.defaults.withCredentials = true;

   var flag=false;
   var confirmbookingclicked=false;
   
    if (location.state!=null){           //checking if user searched for a flight & selected a departure flight & variables were passed, no url
    flag=true;   
    var rflightNo=location.state.returnFlightNo; var dflightNo= location.state.departureFlightNo; 
   }
   else{
   alert("Please search for a flight to book first!");
   history.push({
       pathname: '/user' 
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
const [priceshow , setpriceshow] = useState(false);   // initialing priceshow=false
const [price , setprice] = useState(); 

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
    
    
    

   useEffect(() => {
       if (flag==true){                                     //if user select departure & return flights
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

       } 
    }, [location]);


function handleclick2(event){ // booking functionality
    if (input.cabin=="Cabin") input.cabin="";
    if (input.adults==0) input.adults="";  if (input.children==0) input.children="";

     if (input.cabin!=""  && (input.adults!="" || input.children!="")){
        

    if (  input.adults<0   ||  input.children<0 ){
    alert("Number of seats can't be a negative number");
    setpriceshow(false); }
    else{
     
    var article4= {departureFlightNo: dflightNo, returnFlightNo: rflightNo, cabin: input.cabin,  
        adults: input.adults, children: input.children}

        axios.post('http://localhost:8000/booking',article4)
        .then(res =>{ 
            
            //if res.send (0) -> no seats & if res.send (1) -> seats available & setprice(res.data)
            if (res.data==0){
            setpriceshow(false);
            alert("Seats Not Available");
            }
            else{
            setpriceshow(true); 
            setprice(res.data); }
            
        })
    }
     }

    if (input.cabin=="" && (input.children!="" || input.adults!="")){
    setpriceshow(false); alert("Please Select Cabin");  } 

    if (input.adults=="" && input.children=="" && input.cabin!=""){
    setpriceshow(false); alert("Please Reserve Atleast 1 Seat");  }
    
    if (input.adults=="" && input.children=="" && input.cabin==""){
    setpriceshow(false); alert("Please Select Cabin & Reserve Atleast 1 Seat"); setpriceshow(false); }
}    
function handleclick3(event){
    if (confirmbookingclicked==false){  //to avoid registering the boooking more than once if the user clicked on booking button more than once
        confirmbookingclicked=true;
    var article5= {departureFlightNo: dflightNo, returnFlightNo: rflightNo, cabin: input.cabin,  
        adults: input.adults, children: input.children, price: price};
    
        axios.post('http://localhost:8000/confirmBooking',article5)
       .then(res =>{ 
        if (res.data==1){
        alert("Booking Done Successfully");
        history.push({
        pathname: '/myFlights'
         });   
        }
        
         })

 }
}
 

   return( 
    <div  className={css`
    color: white;
   height: 1920px;
   height: 1080px; 
   `} style={{backgroundImage: 'url("/wallpaper.jpg")'}}>

   <Top/>

   <div  name="content" className={css`
  position: absolute; left: 5%;  width: 50%; 
  font-family: 'Josefin Sans'; font-size: 15px; `
  }>
       
       
       {flights1.map(flight =>
       <div>
        <h1>Departure Flight</h1>   
       <div id={flight.Flight_No} onClick={handleclick2} className={css`
       background-color: green; border-radius: 20px; padding: 10px;`}>
        
        <label style={{fontWeight:"bold"}} > {flight.From} &#10140; {flight.To} </label>    <br></br> 
        Flight No: {flight.Flight_No}  &nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp; Date: {flight.FlightDate.substr(0,10)} &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp; Departure Time: {flight.Departure}  &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp; Arrival Time: {flight.Arrival} &nbsp;&nbsp;&nbsp; |&nbsp;&nbsp;&nbsp; Duration: {flight.Duration}   <br></br>        
        First Class: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Seats Available ({flight.First_Class_Seats}) | Baggage Allowance ({flight.First_Class_BaggageAllowance}) | Price ({flight.First_Class_Price}) <br></br>        
        Business Class: &nbsp;&nbsp;Seats Available ({flight.Business_Class_Seats}) | Baggage Allowance ({flight.Business_Class_BaggageAllowance}) | Price ({flight.Business_Class_Price})   <br></br> 
        Economy Class: &nbsp;Seats Available ({flight.Economy_Class_Seats}) | Baggage Allowance ({flight.Economy_Class_BaggageAllowance}) | Price ({flight.Economy_Class_Price})  
     
</div>
<br></br>
</div>
       )}

   

{flights2.map(flight =>
       <div>
        <h1>Return Flight</h1>   
       <div id={flight.Flight_No} onClick={handleclick2} className={css`
       background-color: green; border-radius: 20px; padding: 10px;`}>
        
        <label style={{fontWeight:"bold"}} > {flight.From} &#10140; {flight.To} </label>    <br></br> 
        Flight No: {flight.Flight_No}  &nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp; Date: {flight.FlightDate.substr(0,10)} &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp; Departure Time: {flight.Departure}  &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp; Arrival Time: {flight.Arrival} &nbsp;&nbsp;&nbsp; |&nbsp;&nbsp;&nbsp; Duration: {flight.Duration}   <br></br>        
        First Class: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Seats Available ({flight.First_Class_Seats}) | Baggage Allowance ({flight.First_Class_BaggageAllowance}) | Price ({flight.First_Class_Price}) <br></br>        
        Business Class: &nbsp;&nbsp;Seats Available ({flight.Business_Class_Seats}) | Baggage Allowance ({flight.Business_Class_BaggageAllowance}) | Price ({flight.Business_Class_Price})   <br></br> 
        Economy Class: &nbsp;Seats Available ({flight.Economy_Class_Seats}) | Baggage Allowance ({flight.Economy_Class_BaggageAllowance}) | Price ({flight.Economy_Class_Price})  
     
</div>
<br></br>
</div>
       )}
<br></br><br></br>

<div style={{display:"flex"}}>
    <h1>Seats</h1> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    
<select class="form-control" style={{width:"125px"}} name="cabin" value={input.cabin} onChange={handleChange}>
<option style={{fontWeight:"bold"}}> Cabin </option>
  <option > First </option>
  <option > Business </option>
  <option > Economy </option>
</select> 
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <input class="form-control" placeholder="Adults" type="number" name="adults" value={input.adults}  onChange={handleChange} style={{width:"125px"}}></input>  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <input  class="form-control" placeholder="Children" type="number" name="children" style={{width:"125px"}} value={input.children} onChange={handleChange}></input> 
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

   

   <button class= "btn btn-success btn-lg" onClick={handleclick2} style={{fontSize:"30px", width:"125px"}} >BOOK</button>
        <br></br><br></br>
    
    </div>

    <br></br>
     {priceshow==true &&
     <div style={{fontWeight:"bold",fontSize:"30px"}} className={css`
     position: absolute; left: 20%; background-color: white; border-radius: 20px; padding: 20px; 
     font-family: 'Josefin Sans'; font-size: 15px; font-weight: bold;`
     }>
       
     <label style={{color:"black"}}>Price: </label> &nbsp;
     <label style={{color:"red"}}>{price} </label> 
     
     &nbsp;&nbsp;&nbsp;&nbsp;
     <button class= "btn btn-success btn-lg" onClick={handleclick3} >Confirm</button>
        
     </div>
    } 
    </div>  
   
  

</div>
   

       

   
   );
}
export default Booking;