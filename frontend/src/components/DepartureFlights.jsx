import react, {useEffect,useState} from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

import { css} from '@emotion/css'
import Top from './Top';                     // rendering in return statement (responsible for session checking & returning of current user email)


function DepartureFlights(){           //for USER & GUEST
    const location = useLocation();
    const history = useHistory();
    axios.defaults.withCredentials = true;
    
    var flag=false;
   
   if (location.state!=null){           //checking if user searched for a flight & variables were passed, 
    flag=true;   
 //passed state variable (search criteria)
    var from1= location.state.from; var to1= location.state.to; var date1= location.state.date; var departure1= location.state.departure;
   var arrival1= location.state.arrival; var cabin1= location.state.cabin; var seats1= location.state.seats; var price1= location.state.price;   
   }
   else{
   alert("Please search for a flight to book first");
   history.push({
       pathname: '/user' 
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
        const article = { from: from1 , to: to1 , date: date1 , departure: departure1 , arrival: arrival1, 
      cabin: cabin1 , seats: seats1, price: price1 };
      //console.log(article);
    axios.post('http://localhost:8000/searchFlightUser', article)
    .then(jsonRes =>{ 
         if (jsonRes.data == 1){
            alert("No results, Please Search again");
            history.push({
                pathname: '/user'
                     
            });
    }
        setflights(jsonRes.data) }
    
    );
}
    }, [location]);


function handleclick2(event){
    event.preventDefault();
    var flightNumber= event.target.id;
   // console.log(event.target.id);   // to get id of the button clicked (jsx/react/frontend)
    history.push({
    pathname: '/ReturnFlights',
    state: {departureFlightNo: flightNumber, 
        from: from1 , to: to1 , date: date1 , departure: departure1 , arrival: arrival1, 
        cabin: cabin1 , seats: seats1, price: price1}
    
 });
 }

   return( 
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
       <h1 >Departure Flights</h1>
       {flights.map(flight =>
       <div>
       <div id={flight.Flight_No} onClick={handleclick2} className={css`
       background-color: dodgerblue; border-radius: 20px; padding: 10px;
       font-family: 'Josefin Sans'; font-size: 15px; font-weight: normal;  &:hover{background-color: green;}`}>
        
        <label id={flight.Flight_No} onClick={handleclick2} style={{fontWeight:"bold"}} > {flight.From} &#10140; {flight.To} </label>    <br></br> 
        Flight No: {flight.Flight_No}  &nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp; Date: {flight.FlightDate.substr(0,10)} &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp; Departure Time: {flight.Departure}  &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp; Arrival Time: {flight.Arrival} &nbsp;&nbsp;&nbsp; |&nbsp;&nbsp;&nbsp; Duration: {flight.Duration}   <br></br>        
        First Class: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Seats Available ({flight.First_Class_Seats}) | Baggage Allowance ({flight.First_Class_BaggageAllowance}) | Price ({flight.First_Class_Price}) <br></br>        
        Business Class: &nbsp;&nbsp;Seats Available ({flight.Business_Class_Seats}) | Baggage Allowance ({flight.Business_Class_BaggageAllowance}) | Price ({flight.Business_Class_Price})   <br></br> 
        Economy Class: &nbsp;Seats Available ({flight.Economy_Class_Seats}) | Baggage Allowance ({flight.Economy_Class_BaggageAllowance}) | Price ({flight.Economy_Class_Price})  
     
</div>
<br></br>
</div>
       )}
    </div>

</div>
       

   
   );
}
export default DepartureFlights;