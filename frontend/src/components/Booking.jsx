import react, {useEffect,useState} from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";


function Booking(){           //for USER & GUEST
   const location = useLocation();
   const history = useHistory();
   var flag=false;
   var confirmbookingclicked=false;
   
   if (location.state!=null){           //checking if session exists (no url jumping) (if location.state has variables passed), if session exists -> extract state variables
    flag=true;   
    var x= location.state.email;   
       var rflightNo=location.state.returnFlightNo; var dflightNo= location.state.departureFlightNo; 
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
       if (flag==true){                                     //if session exists
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


    //let priceshow=false; //console.log(priceshow);
    
    function handleclick(event){
    history.push({
                pathname: '/SearchFlightsUser',
                state: {email : x}  
        }) 
       
    }

    function handleclick4(event){
        event.preventDefault();
       
        history.push({
        pathname: '/user',
        state: {email : x}
     });
     }

    //change departure flight (optional)

  function handleclick1(event){
   event.preventDefault();
  
   history.push({
   pathname: '/BookDepartureFlightUser',
   state: {email : x, departureFlightNo: dflightNo}
});
}

function handleclick2(event){ // booking functionality
  
    
    if (input.cabin!="" && (input.adults!="" || input.children!="")){
        

    if (  (input.adults!="" && input.adults<=0 )  ||  (input.children!="" &&  input.children<=0) ){
    alert("Please Reserve Atleast 1 Seat");
    setpriceshow(false); }
    else{
     
    var article4= {departureFlightNo: dflightNo, returnFlightNo: rflightNo, cabin: input.cabin,  
        adults: input.adults, children: input.children}

        axios.post('http://localhost:8000/booking',article4)
        .then(res =>{ 
            
            //if res.send (0) -> no seats & if res.send (1) -> seats available & setprice(res.data)
            if (res.data==0){
            alert("Seats Not Available");
            setpriceshow(false); }
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
        adults: input.adults, children: input.children, price: price, email: x};
    
        axios.post('http://localhost:8000/confirmBooking',article5)
       .then(res =>{ 
        if (res.data==1){
        alert("Booking Done Successful");
        history.push({
        pathname: '/User',
        state: {email : x}
         });   
        }
        
         })

 }
}
 

   return( <div className='container'>
       <h1>Book Flight</h1>
       
       <br></br>
       <button onClick={handleclick4}>Back To Main Page</button>
       &nbsp;&nbsp;&nbsp;
       <button onClick={handleclick}>Change Flights</button>
        <br></br><br></br>   <br></br>


       { flights1.map(flight =>
       <div>
        <h5 style={{color:"blue"}}>Departure Flight</h5>   
        <br/>
        <p> 
       <label style={{fontWeight:"bold"}} > {flight.From} &#10140; {flight.To} </label>    <br></br> 
        Flight No: {flight.Flight_No}  &nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp; Date: {flight.FlightDate.substr(0,10)} &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp; Departure Time: {flight.Departure}  &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp; Arrival Time: {flight.Arrival} &nbsp;&nbsp;&nbsp; |&nbsp;&nbsp;&nbsp; Duration: {flight.Duration}   <br></br>
        
        First Class: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Seats Available ({flight.First_Class_Seats}) | Baggage Allowance ({flight.First_Class_BaggageAllowance}) | Price ({flight.First_Class_Price}) <br></br>  
        Business Class: &nbsp;&nbsp;Seats Available ({flight.Business_Class_Seats}) | Baggage Allowance ({flight.Business_Class_BaggageAllowance}) | Price ({flight.Business_Class_Price})  <br></br> 
        Economy Class: &nbsp;Seats Available ({flight.Economy_Class_Seats}) | Baggage Allowance ({flight.Economy_Class_BaggageAllowance}) | Price ({flight.Economy_Class_Price})  <br></br> 
      
       <br></br>
       </p>
        </div>
       )}

   

       {flights2.map(flight =>
       <div>
        <h5 style={{color:"blue"}}>Return Flight</h5> 
        <br/>
       
       <p> 
       <label style={{fontWeight:"bold"}} > {flight.From} &#10140; {flight.To} </label>    <br></br> 
        Flight No: {flight.Flight_No}  &nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp; Date: {flight.FlightDate.substr(0,10)} &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp; Departure Time: {flight.Departure}  &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp; Arrival Time: {flight.Arrival} &nbsp;&nbsp;&nbsp; |&nbsp;&nbsp;&nbsp; Duration: {flight.Duration}   <br></br>
        
        First Class: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Seats Available ({flight.First_Class_Seats}) | Baggage Allowance ({flight.First_Class_BaggageAllowance}) | Price ({flight.First_Class_Price}) 
        <br></br>  
        Business Class: &nbsp;&nbsp;Seats Available ({flight.Business_Class_Seats}) | Baggage Allowance ({flight.Business_Class_BaggageAllowance}) | Price ({flight.Business_Class_Price})  
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <button onClick={handleclick1}>Change Return Flight</button><br></br> 
        Economy Class: &nbsp;Seats Available ({flight.Economy_Class_Seats}) | Baggage Allowance ({flight.Economy_Class_BaggageAllowance}) | Price ({flight.Economy_Class_Price})  <br></br> 
      
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

     {priceshow==true &&
     <div>
     <label style={{fontWeight:"bold"}}>Price: </label> 
     <label style={{fontWeight:"bold"}}>{price} </label> 
     
     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
     <button onClick={handleclick3} >Confirm Booking</button>
        
     </div>
    }   
   
   </div>

       

   
   );
}
export default Booking;