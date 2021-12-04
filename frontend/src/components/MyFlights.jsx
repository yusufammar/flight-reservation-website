import react, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import { Route, Redirect, useLocation } from "react-router-dom";


import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';
require("react-bootstrap/ModalHeader")





var flightSelected = 0;

function SendMail(details, From, To) {


    const article = { details: details, From: From, To: To };
    axios.post('http://localhost:8000/SendCancelEmail', article)
}

function UpdateFlight(idOfFlight) {
    const article = { id: idOfFlight };
    axios.post('http://localhost:3000/FlightsListVal', article)
        .then();
    window.location.href = "/UpdatePage";

}

let isChecked = false;
let idDeleted = "";



function handleChange(e, id) {
    isChecked = e.target.checked;
    idDeleted = id;
    console.log(idDeleted);
    // do whatever you want with isChecked value
}


function MyFlights() {



    const location = useLocation();
    const history = useHistory();

    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);


    const deleteFlight = (event, id, details, from, to) => {

        if (isChecked && idDeleted == id) {
            axios.delete(`http://localhost:3000/cancel/${id}`)

            var x = location.state.email;
            event.preventDefault();
            history.push({
                pathname: '/MyFlights',
                state: { email: x }
            });
            SendMail(details, from, to);
        }
    };

    function Redirect(event) {
        var x = location.state.email;
        event.preventDefault();
        history.push({
            pathname: '/User',
            state: { email: x }
        });
    }


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

        var element = depFlights.find(({ Flight_No }) => Flight_No === FlightNumber);
        for (let i = 0; i < depFlights.length; i++) {
            if (depFlights[i].Flight_No == FlightNumber)
                return depFlights[i]

        }
        return [];
    }

    return <div className='container'>
        <h1>My Flights</h1>
        <br></br>
        <button onClick={Redirect}>Back To Main Page</button>
        <br></br><br></br>

        {flights.map(flight =>
            <div>
                <br />
                <p>
                    Booking No.: {flight.BookingNo}
                    <br></br>
                    Departure Flight From : {GetFlight(flight.DepartureFlightNo).From}  ||  To: {GetFlight(flight.DepartureFlightNo).To}
                    <br />
                    Return Flight From : {GetFlight(flight.ReturnFlightNo).From}   || To: {GetFlight(flight.ReturnFlightNo).To}
                </p>
                <label>
                    Are you sure you want to cancel this flight?
                    <input
                        name="isClicked"
                        type="checkbox"
                        onChange={e => handleChange(e, flight._id)}
                    />
                </label>
                <br></br>



                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Flight Number {flight.BookingNo} Details</Modal.Title>
                    </Modal.Header>

                    <Modal.Body> Booking No.: {flight.BookingNo}<br />  Cabin: {flight.Cabin}  <br /> Adult Seats: {flight.AdultSeats} |  Children Seats: {flight.ChildrenSeats}

                        <br />Price: {flight.Price}<br></br>
                        <br />
                        <h5>Departure Flight</h5>
                        Flight Date: {GetFlight(flight.DepartureFlightNo).FlightDate}<br></br>
                        Departure Flight From : {GetFlight(flight.DepartureFlightNo).From}  ||  To: {GetFlight(flight.DepartureFlightNo).To}<br />
                        Departure Time: {GetFlight(flight.DepartureFlightNo).Departure}<br></br>
                        Arrival Time: {GetFlight(flight.DepartureFlightNo).Arrival}<br></br>
                        <br />

                        <br />
                        <h5>Return Flight</h5>
                        Flight Date: {GetFlight(flight.ReturnFlightNo).FlightDate}<br></br>
                        Return Flight From : {GetFlight(flight.ReturnFlightNo).From}   || To: {GetFlight(flight.ReturnFlightNo).To}<br />
                        Departure Time: {GetFlight(flight.ReturnFlightNo).Departure}<br></br>
                        Arrival Time: {GetFlight(flight.ReturnFlightNo).Arrival}<br></br>
                        <br />
                    </Modal.Body>
                    <Modal.Footer>
                        <button variant="secondary" onClick={handleClose}>
                            Close
                        </button>
                    </Modal.Footer>
                </Modal>

                <div  >
                    <button style={{marginRight : '20px'}}  onClick={handleShow}>
                        Views Details</button>

                    <button
                        id="removeBtn1"
                        onClick={(e) => {
                            deleteFlight(e, flight._id, flight, GetFlight(flight.DepartureFlightNo), GetFlight(flight.ReturnFlightNo));
                        }}
                    >
                        Cancel </button>
                </div>
            </div>

        )}
    </div>



}
export default MyFlights;