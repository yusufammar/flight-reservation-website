import react, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import { Route, Redirect, useLocation } from "react-router-dom";


var flightSelected = 0;

function UpdateFlight(idOfFlight) {
    const article = { id: idOfFlight };
    axios.post('http://localhost:3000/FlightsListVal', article)
        .then();
    window.location.href = "/UpdatePage";
}

let isChecked = false;
let idDeleted = "";

const deleteFlight = (id) => {


    if (isChecked && idDeleted == id) {
        axios.delete(`http://localhost:3000/delete/${id}`)
        window.location.reload();
    }
};

function handleChange(e, id) {
    isChecked = e.target.checked;
    idDeleted = id;

    // do whatever you want with isChecked value
}


function MyFlights() {



    const [flights, setflights] = useState([{
        _id: "",
        Flight_No: "",
        From: "",
        To: "",
        FlightDate: "",
        Departure: "",
        Arrival: "",
        First_Class_Seats: "",
        Business_Class_Seats: "",
        Economy_Class_Seats: "",


    }])

    const [depFlights, setDepFlights] = useState([]);


    useEffect(() => {
        fetch("/MyBookings").then(res => {
            if (res.ok) {
                return res.json();
            }
        }).then(jsonRes => setflights(jsonRes));

        fetch("/FlightsList").then(res => {
            if (res.ok) {
                return res.json();
            }
        }).then(jsonRes => setDepFlights(jsonRes));



    }
    )

    function GetFlight(FlightNumber) {
        var From;
        var To;
        var element = depFlights.find(({ Flight_No }) => Flight_No === FlightNumber);
        for (let i =0 ;i  < depFlights.length; i++)
        {
            if(depFlights[i].Flight_No == FlightNumber)
            {
                console.log(depFlights[i].Flight_No);
                return [depFlights[i].From, depFlights[i].To]
            }
        }
        return [];
    }

    //   function Redirect(event)
    //   {
    //       const location = useLocation();
    //       const history = useHistory();
    //       var x= location.state.email;    
    //       event.preventDefault();
    //       history.push({
    //       pathname: '/User',
    //       state: {email : x}
    //   });     
    //   }


    return <div className='container'>
        <h1>My Flights</h1>
        <br></br>
        <button onClick={Redirect}>Back To Main Page</button>
        <br></br><br></br>

        {flights.map(flight =>
            <div>
                <br />
                <p>
                    Booking No.: {flight.BookingNo}  <br /> Cabin: {flight.Cabin}  <br /> Adult Seats: {flight.AdultSeats} |  Children Seats: {flight.ChildrenSeats}
                    <br></br>
                    Departure Flight From : { GetFlight(flight.DepartureFlightNo)[0]}  ||  To: { GetFlight(flight.DepartureFlightNo)[1]}
                    <br/>
                    Return Flight From : { GetFlight(flight.ReturnFlightNo)[0]}   || To: { GetFlight(flight.ReturnFlightNo)[1]}
                    <br/>
                    Price: {flight.Price}<br></br>
                    Created At ({flight.createdAt}) | Updated At ({flight.updatedAt})
                    <br></br>
                </p>
                <label>
                    Are you sure you want to cancel this flight?
                    <input
                        name="isGoing"
                        type="checkbox"
                        onChange={e => handleChange(e, flight._id)}
                    />
                </label>
                <br></br>

                <button
                    id="removeBtn"
                    onClick={(e) => {
                        deleteFlight(flight._id);
                    }}
                >
                    Cancel </button>


            </div>
        )}
    </div>



}
export default MyFlights;