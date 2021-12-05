import react, {useEffect,useState} from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";



function BookDepartureFlightUser(){   // for USER & GUEST
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
   
   var flag=false;
   if (location.state!=null){ 
       flag=true;          //checking if session exists (no url jumping) (if location.state has variables passed)
   
       var departureFlightNo= location.state.departureFlightNo; 
         // searching creteria from search page
    var from1= location.state.from; var to1= location.state.to; var date1= location.state.date; var departure1= location.state.departure;
    var arrival1= location.state.arrival; var cabin1= location.state.cabin; var seats1= location.state.seats; var price1= location.state.price;  
   }
   else{
   alert("Please Select Departure & Return Flight First!");
   history.push({
       pathname: '/SearchFlightsUser' 
       });
   }

 
   
    const [flights , setflights] = useState([{ 
        Flight_No:"", From:"", To:"", FlightDate:"" , Departure:"" , Arrival:"", Duration:"", 
        First_Class_Seats:"",  Business_Class_Seats:"",   Economy_Class_Seats:"",
        First_Class_BaggageAllowance:"", Business_Class_BaggageAllowance:"",  Economy_Class_BaggageAllowance:"", 
        First_Class_Price:"", Business_Class_Price:"",  Economy_Class_Price:"" 
    }])
    
   

  
    
    useEffect(() => {
    if (flag==true){
    
    var dFrom; var dTo;

    const article = { departureFlightNo: departureFlightNo };
    axios.post('http://localhost:8000/selectReturnFlight', article)
    .then(res =>{ 
    dFrom= res.data.dFrom;  dTo=res.data.dTo;  
    console.log(dFrom);

    var article2= { dFrom: dFrom, dTo: dTo };
    axios.post('http://localhost:8000/selectReturnFlight2', article2)
    .then(jsonRes => {
        
        if (jsonRes.data == 1){
            alert("No Return Flights For The Selected Departure Flight, Please Select Another Departure Flight");
            history.push({
                pathname: '/SearchFlightsUser'
                     
            });
    }
        setflights(jsonRes.data)
   })
    });
}
}, [location]);

    function handleclick(event){
        event.preventDefault();
                              // redirects to user main page if email is user email
        history.push({
        pathname: '/user'
        })
    
    }
  function handleclick1(event){
   event.preventDefault();
  
   history.push({
   pathname: '/SearchResultsUser',
   state: {
    from: from1 , to: to1 , date: date1 , departure: departure1 , arrival: arrival1, 
    cabin: cabin1 , seats: seats1, price: price1}
});
}
function handleclick2(event){
    event.preventDefault();
    var flightNumber= event.target.id;
   // console.log(event.target.id);   // to get id of the button clicked (jsx/react/frontend)
    history.push({
    pathname: '/Booking',
    state: {returnFlightNo: flightNumber, departureFlightNo: departureFlightNo,
        from: from1 , to: to1 , date: date1 , departure: departure1 , arrival: arrival1, 
        cabin: cabin1 , seats: seats1, price: price1
    
    }
    
    
 });
 console.log({returnFlightNo: flightNumber, departureFlightNo: departureFlightNo});
 }

   return( <div className='container'>
       <h1>Select Return Flight</h1>
       
       <br></br>
       <button onClick={handleclick}>Back To Main Page</button> &nbsp;&nbsp;&nbsp;&nbsp;
        

        <button onClick={handleclick1}>Change Departure Flight</button>
        <br></br><br></br>

       {flights.map(flight =>
       <div>
        <br/>
        <p> 
       <label style={{fontWeight:"bold"}} > {flight.From} &#10140; {flight.To} </label>    <br></br> 
       Flight No: {flight.Flight_No}  &nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp; Date: {flight.FlightDate.substr(0,10)} &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp; Departure Time: {flight.Departure}  &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp; Arrival Time: {flight.Arrival} &nbsp;&nbsp;&nbsp; |&nbsp;&nbsp;&nbsp; Duration: {flight.Duration}   <br></br>        
        First Class: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Seats Available ({flight.First_Class_Seats}) | Baggage Allowance ({flight.First_Class_BaggageAllowance}) | Price ({flight.First_Class_Price}) <br></br>  
        
        
        Business Class: &nbsp;&nbsp;Seats Available ({flight.Business_Class_Seats}) | Baggage Allowance ({flight.Business_Class_BaggageAllowance}) | Price ({flight.Business_Class_Price}) 
        &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <button  id={flight.Flight_No} onClick={handleclick2}> Select Return Flight </button>    <br></br>        
        Economy Class: &nbsp;Seats Available ({flight.Economy_Class_Seats}) | Baggage Allowance ({flight.Economy_Class_BaggageAllowance}) | Price ({flight.Economy_Class_Price})  <br></br> 
      
       <br></br>
       </p>
</div>
       )}
   </div>

       

   
   );
}
export default BookDepartureFlightUser;