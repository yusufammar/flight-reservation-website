import react, {useEffect,useState} from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

import { css} from '@emotion/css'
import Top from './Top';                     // rendering in return statement (responsible for session checking & returning of current user email)
import Checkbox from '@mui/material/Checkbox';


function Booking(){           //for USER & GUEST
   const location = useLocation();
   const history = useHistory();
   axios.defaults.withCredentials = true;

   var flag=false;
   var confirmbookingclicked=false;
   
    if (location.state!=null){           //checking if user searched for a flight & selected a departure flight & variables were passed, no url
    flag=true;   
    
   }
   else{
   alert("Please search for a flight to book first!");
   history.push({
       pathname: '/user' 
       });
   }

   //-------------------------------------------

   var Flight=location.state.booking.selectedReturnFlight;   //needs flight
   var cabin= search.cabin;                                     // needs cabin
   var totalseats= search.adultSeats + search.childrenSeats;    //needs total seats

  
   var search= location.state.search // search input sent from user.jsx page
 
   
  


//---------------------------------------------------
var CabinSeatsArray; // cabin seats format array (that has indexes up to the max seats available on that cabin of all flights) (array of constant size, seats array gets aplied on it becuase to display cabin -> format should be the same for all flights)


var FlightSeatsArray; // seats array in every flight (that dictates the free (0) & occupied (1) seats) //Based on cabin (departureCabinSeatsArray & departureFlightSeatsArray {First,Business, or Economy})


var ChosenSeats=[];  // array of indexes of the chosen seats (checkboxes selected) (that will be chosen in this page)


switch (cabin){
    case ("First"):{
    
    CabinSeatsArray =new Array(16+1).fill(0);              // 16 seats max on First Class Cabin on any flight
    FlightSeatsArray= Flight.First_Class_Seats;        //(first seats array of flight)

    } break;
    
    case ("Business"):{
 
        CabinSeatsArray =new Array(30+1).fill(0);              // 16 seats max on First Class Cabin on any flight
        FlightSeatsArray= Flight.Business_Class_Seats;        //(first seats array of flight)
    } break;
    
    case ("Economy"):{

        CabinSeatsArray =new Array(60+1).fill(0);              // 16 seats max on First Class Cabin on any flight
        FlightSeatsArray= Flight.Economy_Class_Seats;        //(first seats array of flight)
    } break;

        
}

// Constructing cabin seats array (0-> free , 1-> occupied/not available) according to the flight seats array
  
for(var i=1; i < CabinSeatsArray.length; i++){  
    if (FlightSeatsArray[i]==0)
    CabinSeatsArray[i]=0;
    else if (FlightSeatsArray[i]==1) CabinSeatsArray[i]=1;
    else if (FlightSeatsArray[i]==undefined) CabinSeatsArray[i]=1;
}




function checkChange(event){ //( flight) returns an array of all indexes of seats that were chosen (checkboxes)
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
return ChosenSeats; //console.log(ChosenSeats);
}

//-------------------------------------------------

function handleClick(){   // confirm button of choosing seats --> make booking
    console.log(search);
    if (ChosenSeats.length!=totalseats )
    alert ("Make sure no. of chosen seats aren't exceeding or not equal to no. of seats required");
    else{ // make booking post request
    alert ("Seat Change Done Successfully");
    //console.log("Departure Chosen Seats: " + departureChosenSeats +"\nReturn Chosen Seats " + returnChosenSeats);
    
    var article= {
    dFlightNo: departureFlight.FlightDetails.Flight_No,
    rFlightNo: returnFlight.FlightDetails.Flight_No,
    cabin: cabin,
    adults: search.adultSeats,
    children: search.childrenSeats,
    price: departureFlight.TotalPrice + returnFlight.TotalPrice,
    departureChosenSeats: departureChosenSeats,
    returnChosenSeats: returnChosenSeats,
};
  axios.post('http://localhost:8000/confirmBooking', article).then(
      history.push({pathname:"user"})
  );
}
}


//---------------------------------------------------
  return( 
    <div  >

   <Top/>

   <div  name="content" className={css`
  position: absolute; left: 5%; top: 10%;  text-align: center; 
  font-family: 'Josefin Sans'; font-size: 15px; `
  }>

      <h1>Choose Seats</h1>

      <div name="SeatSelector">
          <label>Number of seats to  be chosen: {totalseats}</label>
      
      {cabin=="First" &&
      <div  name="First Class Format Seat Selector" style={{outline: '5px solid black', textAlign:'center', padding:'30px', borderRadius: '8px'}}>
       
       <img src="/F.jpg" /> <br></br> <br></br> <h3 >First Class</h3> <br></br> 
      
      
      
       
        <div name="Flight" style={{ width:'50%'}}>
        <label>Flight</label> <br></br>
            
            {departureCabinSeatsArray.map((seat, i) => //Conditional Rendering with map function (used to iterate over arrays) | 
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
     
}

{cabin=="Business" &&
      <div  name="Business Class Format Seat Selector" style={{outline: '5px solid black', textAlign:'center', padding:'30px', borderRadius: '8px'}}>
       
       <img src="/B.jpg" /> <br></br> <br></br> <h3 >Business Class</h3> <br></br> 
      
    
      <div style={{display:'flex', textAlign:'center',  width:'100%'}}>
       
        <div name="departureFlight"  style={{ width:'50%'}}>
        <label>Departure Flight</label> <br></br>
            
            {departureCabinSeatsArray.map((seat, i) => //Conditional Rendering with map function (used to iterate over arrays) | 
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
       
        <div name="departureFlight"  style={{ width:'50%'}}>
        <label>Departure Flight</label> <br></br>
            
            {departureCabinSeatsArray.map((seat, i) => //Conditional Rendering with map function (used to iterate over arrays) | 
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

        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; 
        <div className= {css`border-left: 6px solid #2C85B8;; height: 100%px;`}></div>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;           

        <div name="returnFlight" style={{ width:'50%'}}>
        <label>Return Flight</label> <br></br> 
        
         {returnCabinSeatsArray.map((seat, i) => //Conditional Rendering with map function (used to iterate over arrays) | 
                                    //seat-> each entry of array that the function is applied on | i-> index of departureCabinSeatsArray array | function performed to every entry is what's between the curly braces after the '=>' operator
                                    { var m= i%10;
                                        if (i==0) return (""); // index -> 0  (seatArray starts from 1 so do nothing)   
                                        
                                        else if (m%10==0)   // index -> 4/8/12/16  (end of row)
                                        return (<a><Checkbox id={i} onChange={checkChange2} disabled={seat==1}/> <img src="/window.png" /><br></br></a>)
                                        
                                        else if ( ((m%3==0 && m%6!=0 && m%9!=0) || m%7==0)&& m%10!=0)   // index -> 2/6/10/14  (middle seat of row)
                                        return (<a><Checkbox id={i} onChange={checkChange2} disabled={seat==1}/> &nbsp; &nbsp;&nbsp; &nbsp;  </a>)
                                        
                                        else if (m%10==1)   // index -> 1/5/9/13  (first seat of row)
                                        return (<a><img src="/window.png" /><Checkbox id={i} onChange={checkChange2} disabled={seat==1}/>  </a>)
                                        
                                        else // (seat in same row) 
                                        return (<a><Checkbox id={i} onChange={checkChange2} disabled={seat==1}/> </a>)
                                        }
      )} 
        </div>


      </div>

      <br></br> <br></br>
      <button className="btn btn-primary" onClick={handleClick}>Confirm</button>
      
      </div>
}

<br></br> <br></br>
      <button className="btn btn-primary" onClick={handleClick}>Confirm</button>
      </div>
       
       
 

   



    </div>  
   
  

</div>
   

       

   
   );
}
export default Booking;