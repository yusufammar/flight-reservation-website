import react, {useEffect,useState} from "react";


function FlightsList(){
    const [flights , setflights] = useState([{
        Flight_No:"",
        From:"",
        To:"",
        FlightDate:"",
        Departure:"",
        Arrival:"",
        First_Class_Seats:"",
        Business_Class_Seats:"",
        Economy_Class_Seats: "",


    }])

    useEffect(() =>{
       // setLoading(true);
        fetch("/FlightsList").then(res=>{
            if(res.ok){
                return res.json();
            }
        }).then(jsonRes => setflights(jsonRes));

    }
    )

   return <div className='container'>
       <h1>All Flights</h1>
      
       {flights.map(flight =>
       <div>
        <br/>
       <p> 
        Flight No: {flight.Flight_No}  | From: {flight.From}  | To: {flight.To} <br></br>
        Date: {flight.FlightDate} <br></br>
        Departure: {flight.Departure} | Arrival: {flight.Arrival} <br></br>
        Available Seats: First Class ({flight.First_Class_Seats}) | Business Class ({flight.Business_Class_Seats}) | Economy Class ({flight.Economy_Class_Seats})
       <br></br>
       </p>
</div>
       )}
   </div>

       

   

}
export default FlightsList;