 
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
        fetch("/FlighsList").then(res=>{
            if(res.ok){
                return res.json();
            }
        }).then(jsonRes => setflights(jsonRes));

    }
    )

   return <div className='container'>
       <h1>ShowFlights</h1>
      
       {flights.map(flight =>
       <div>
       <h1> (flight.Flight_No) </h1>
       <h1> (flight.form) </h1>
       <h1> (flight.To) </h1>
       <h1> (flight.FlightDate) </h1>
       <h1> (flight.Departure) </h1>
       <h1> (flight.Arrival) </h1>
       <h1> (flight.First_Class_Seats) </h1>
       <h1> (flight.Business_Class_Seats) </h1>
       <h1> (flight.Economy_Class_Seats) </h1>
</div>
       )}
   </div>

       

   

}
export default FlightsList