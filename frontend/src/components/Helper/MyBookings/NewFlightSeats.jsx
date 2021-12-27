import react, {useEffect,useState} from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

import { css} from '@emotion/css'
import Checkbox from '@mui/material/Checkbox';


function NewFlightSeats(props){           //helper component of changeFlight
   const location = useLocation();
   const history = useHistory();
   axios.defaults.withCredentials = true;

   var flag=false;
   var confirmbookingclicked=false;
//-------------------------------------------

//Inputs needed (passed from ChangeFlight component)
  var passedVariable= props.state.passed;
  var newFlight=props.state.selectedFlight; 
  var search= props.state.search         
  
 //------------------------------------------------------- 
  //var data= location.state.searchResults; 
   //console.log(data);
   
  // var departureFlights=data.departureFlightsAndPrices;
//var returnFlights=data.returnFlightsAndPrices;
   
   var cabin= search.cabin;
   var totalseats= search.adultSeats + search.childrenSeats;


//---------------------------------------------------
var CabinSeatsArray; // cabin seats format array (that has indexes up to the max seats available on that cabin of all flights) (array of constant size, seats array gets aplied on it becuase to display cabin -> format should be the same for all flights)
var FlightSeatsArray; // seats array in every newFlight (that dictates the free (0) & occupied (1) seats) //Based on cabin (departureCabinSeatsArray & departureFlightSeatsArray {First,Business, or Economy})
var ChosenSeats=[];  // array of indexes of the chosen seats (checkboxes selected)


switch (cabin){
    case ("First"):{
    CabinSeatsArray=new Array(16+1).fill(0);              // 16 seats max on First Class Cabin on any newFlight
    FlightSeatsArray= newFlight.FlightDetails.First_Class_Seats;        //(first seats array of newFlight)

    } break;
    
    case ("Business"):{
    CabinSeatsArray=new Array(30+1).fill(0);            // 16 seats max on First Class Cabin on any newFlight
    FlightSeatsArray= newFlight.FlightDetails.Business_Class_Seats;        //(first seats array of newFlight)
 
    } break;
    
    case ("Economy"):{
    CabinSeatsArray=new Array(60+1).fill(0); // 16 seats max on First Class Cabin on any newFlight
    FlightSeatsArray= newFlight.FlightDetails.Economy_Class_Seats;        //(first seats array of newFlight)

    } break;

        
}

// Constructing cabin seats array (0-> free , 1-> occupied/not available) according to the newFlight seats array
  
for(var i=1; i < CabinSeatsArray.length; i++){  
    if (FlightSeatsArray[i]==0)
    CabinSeatsArray[i]=0;
    else if (FlightSeatsArray[i]==1) CabinSeatsArray[i]=1;
    else if (FlightSeatsArray[i]==undefined) CabinSeatsArray[i]=1;
}



function checkChange(event){ //(departure newFlight) returns an array of all indexes of seats that were chosen (checkboxes)
var id= event.target.id 
var checked=event.target.checked; 

if (checked==true) {
    ChosenSeats.push(id);
} 
if (checked==false){
    for (var i=0; i<ChosenSeats.length; i++)
    if (ChosenSeats[i]==id)     ChosenSeats.splice(i, 1);
}
console.log(ChosenSeats);
}


function handleClick(){   // confirm button of choosing seats --> make booking
    console.log(search);
    
    if (ChosenSeats.length!=totalseats)
    alert ("Make sure no. of chosen seats aren't exceeding or not equal to no. of seats required");
    else{ // make bookingUpdate post request
    //alert ("Booking Done Successfully");
    console.log(ChosenSeats);
    
    var article= {Booking: passedVariable.Booking, FlightDirection: passedVariable.FlightDirection, Flight: passedVariable.Flight, NewChosenSeats: ChosenSeats, newFlight: newFlight }
    // 1)update old newFlight seat (make them availabe)
    //needed-> Booking No(get chosenSeats from that -> based on(flightdirection)(to know which to update departure /return newFlight ( seat array (according to chosen seats) &  no. of seats available))

    //2)update booking with new departure/return newFlight & the chosen seats
    //Needed-> Booking No, flightdirection (to know which to update departure /return newFlight (newFlight no & chosen seats))
 console.log(article);
    axios.post('http://localhost:8000/changeFlight', article).then(
        alert("Flight Changed Successfully")
        );
        history.push({pathname:'MyBookings'});
}
}


//---------------------------------------------------

/*
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
*/
 

   return( 
    <div  >


   <div  name="content" className={css`
  position: absolute; left: 5%; top: 10%;  text-align: center; 
  font-family: 'Josefin Sans'; font-size: 15px; `
  }>

      <h1>Choose Seats</h1>

      <div name="SeatSelector">
          <label>Number of seats to  be chosen (per newFlight): {totalseats}</label>
      
      {cabin=="First" &&
      <div  name="First Class Format Seat Selector" style={{outline: '5px solid black', textAlign:'center', padding:'30px', borderRadius: '8px'}}>
       
       <img src="/F.jpg" /> <br></br> <br></br> <h3 >First Class</h3> <br></br> 
      
      
      <div style={{display:'flex', textAlign:'center',  width:'100%'}}>
       
        <div name="newFlight" style={{ width:'100%'}}>
        <br></br>
            
            {CabinSeatsArray.map((seat, i) => //Conditional Rendering with map function (used to iterate over arrays) | 
                                    //seat-> each entry of array that the function is applied on | i-> index of departureCabinSeatsArray array | function performed to every entry is what's between the curly braces after the '=>' operator
            { 
            if (i==0) return (""); // index -> 0  (seatArray starts from 1 so do nothing)   
            else if (i%4==0)   // index -> 4/8/12/16  (end of row)
            return (<a><Checkbox id={i} onChange={checkChange} disabled={seat==1}/> <img src="/window.png" /><br></br></a>)
            else if (i%2==0 && i%4!=0)   // index -> 2/6/10/14  (middle seat of row)
            return (<a><Checkbox id={i} onChange={checkChange} disabled={seat==1}/> &nbsp; &nbsp;&nbsp; &nbsp;  </a>)
            else if (i%4==1)   // index -> 1/5/9/13  (first seat of row)
            return (<a><img src="/window.png" /><Checkbox id={i} onChange={checkChange} disabled={seat==1}/>  </a>)
            else // (seat in same row) 
            return (<a><Checkbox id={i} onChange={checkChange} disabled={seat==1}/> </a>)
            }
      )} 
        </div>

      </div>

      <br></br> <br></br>
      <button className="btn btn-primary" onClick={handleClick}>Confirm</button>
      </div>
      
      
}

{cabin=="Business" &&
      <div  name="Business Class Format Seat Selector" style={{outline: '5px solid black', textAlign:'center', padding:'30px', borderRadius: '8px'}}>
       
       <img src="/B.jpg" /> <br></br> <br></br> <h3 >Business Class</h3> <br></br> 
      
    
      <div style={{display:'flex', textAlign:'center',  width:'100%'}}>
       
        <div name="newFlight"  style={{ width:'1000%'}}>
       <br></br>
            
            {CabinSeatsArray.map((seat, i) => //Conditional Rendering with map function (used to iterate over arrays) | 
                                    //seat-> each entry of array that the function is applied on | i-> index of departureCabinSeatsArray array | function performed to every entry is what's between the curly braces after the '=>' operator
            { 
            if (i==0) return (""); // index -> 0  (seatArray starts from 1 so do nothing)   
            
            else if (i%6==0)   // index -> 4/8/12/16  (end of row)
            return (<a><Checkbox id={i} onChange={checkChange} disabled={seat==1}/> <img src="/window.png" /><br></br></a>)
            
            else if ( (i%2==0 || i%4==0 )&& i%6!=0)   // index -> 2/6/10/14  (middle seat of row)
            return (<a><Checkbox id={i} onChange={checkChange} disabled={seat==1}/> &nbsp; &nbsp;&nbsp; &nbsp;  </a>)
            
            else if (i%6==1)   // index -> 1/5/9/13  (first seat of row)
            return (<a><img src="/window.png" /><Checkbox id={i} onChange={checkChange} disabled={seat==1}/>  </a>)
            
            else // (seat in same row) 
            return (<a><Checkbox id={i} onChange={checkChange} disabled={seat==1}/> </a>)
            }
      )} 
        </div>


      </div>

      <br></br> <br></br>
      <button className="btn btn-primary" onClick={handleClick}>Confirm</button>
      
      </div>
}

{cabin=="Economy" &&
      <div  name="Economy Class Format Seat Selector" style={{outline: '5px solid black', textAlign:'center', padding:'30px', borderRadius: '8px'}}>
       
       <img src="/E.jpg" /> <br></br> <br></br> <h3 >Economy Class</h3> <br></br> 
      
    
      <div style={{display:'flex', textAlign:'center', }}>
       
        <div name="newFlight"  style={{ width:'100%'}}>
         <br></br>
            
            {CabinSeatsArray.map((seat, i) => //Conditional Rendering with map function (used to iterate over arrays) | 
                                    //seat-> each entry of array that the function is applied on | i-> index of departureCabinSeatsArray array | function performed to every entry is what's between the curly braces after the '=>' operator
            { var m= i%10;
            if (i==0) return (""); // index -> 0  (seatArray starts from 1 so do nothing)   
            
            else if (m%10==0)   // index -> 4/8/12/16  (end of row)
            return (<a><Checkbox id={i} onChange={checkChange} disabled={seat==1}/> <img src="/window.png" /><br></br></a>)
            
            else if ( ((m%3==0 && m%6!=0 && m%9!=0) || m%7==0)&& m%10!=0)   // index -> 2/6/10/14  (middle seat of row)
            return (<a><Checkbox id={i} onChange={checkChange} disabled={seat==1}/> &nbsp; &nbsp;&nbsp; &nbsp;  </a>)
            
            else if (m%10==1)   // index -> 1/5/9/13  (first seat of row)
            return (<a><img src="/window.png" /><Checkbox id={i} onChange={checkChange} disabled={seat==1}/>  </a>)
            
            else // (seat in same row) 
            return (<a><Checkbox id={i} onChange={checkChange} disabled={seat==1}/> </a>)
            }
      )} 
        </div>

      </div>

      <br></br> <br></br>
      <button className="btn btn-primary" onClick={handleClick}>Confirm</button>
      
      </div>
}


      </div>
       
       
 

   



    </div>  
   
  

</div>
   

       

   
   );
}
export default NewFlightSeats;