import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios'
import { BrowserRouter as Router, useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import {Link} from "react-router-dom";

const UpdatePage = () => {


    const [FlightNo, setFlightNo] = useState("");
    const [FlightFrom, setFlightFrom] = useState("");
    const [FlightTo, setFlightTo] = useState("");
    const [FlightDate, setFlightDate] = useState("");
    const [FlightDep, setFlightDep] = useState("");
    const [FlightArr, setFlightArr] = useState("");
    const [FlightFirst, setFlightFirst] = useState("");
    const [FlightBus, setFlightBus] = useState("");
    const [FlightEco, setFlightEco] = useState("");
    const [checked, setChecked] = useState(false);

    let { id } = useParams();
    const baseURL = `http://localhost8000/FlightsList/update/${id}`;

    function ChangeValues(event) {
        console.log(checked);
        if (checked) {

            const values = {
                FlightNo_: FlightNo,
                FlightFrom_: FlightFrom,
                FlightTo_: FlightTo,
                FlightDate_: FlightDate,
                FlightDep_: FlightDep,
                FlightArr_: FlightArr,
                FlightFirst_: FlightFirst,
                FlightBus_: FlightBus,
                FlightEco_: FlightEco,
            };
            console.log(values);
            axios.post('http://localhost:3000/UpdatePage', values);
        }
        else {
            console.log("Not Checked!");
        }
    }

    return (
        <div>
            <h1> Update Flight </h1>
            <div class="form-check">
                <div class="form-group">
                    <label for="exampleInputEmail1">Flight No</label>
                    <input name="FlightNo" type="text" class="form-control" id="attribute1" aria-describedby="emailHelp" placeholder="Enter Flight Number" onChange={event => setFlightNo(event.target.value)} />
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">From: </label>
                    <input type="text" name="FlightFrom" class="form-control" id="attribute2" placeholder="From" onChange={event => setFlightFrom(event.target.value)} />
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">To:</label>
                    <input name="FlightTo" type="text" class="form-control" id="attribute3" placeholder="To" onChange={event => setFlightTo(event.target.value)} />
                </div>

                <div class="form-group">
                    <label for="exampleInputPassword1">Flight Date</label>
                    <input name="FlightDate" type="date" class="form-control" id="attribute4" placeholder="Date" onChange={event => setFlightDate(event.target.value)} />
                </div>

                <div class="form-group">
                    <label for="exampleInputPassword1">Departure</label>
                    <input name="FlightDep" type="time" class="form-control" id="attribute5" placeholder="Dep Time" onChange={event => setFlightDep(event.target.value)} />
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Arrival</label>
                    <input name="FlightArr" type="time" class="form-control" id="attribute6" placeholder="Arr Time" onChange={event => setFlightArr(event.target.value)} />
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">First Class Seats</label>
                    <input name="FlightFirst" type="number" class="form-control" id="attribute7" placeholder="First Class Seats" onChange={event => setFlightFirst(event.target.value)} />
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Business Class Seats</label>
                    <input name="FlightBusiness" type="number" class="form-control" id="attribute8" placeholder="Business Class Seats" onChange={event => setFlightBus(event.target.value)} />
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Economy Class Seats</label>
                    <input name="FlightEconomy" type="number" class="form-control" id="attribute9" placeholder="Economy Class Seats" onChange={event => setFlightEco(event.target.value)} />
                </div>

                <input type="checkbox" class="form-check-input" id="exampleCheck1" onChange={event => setChecked(event.target.checked)} />
                <label class="form-check-label" for="exampleCheck1">Click To Confirm Update</label>
            </div>

            <button type="submit" class="btn btn-primary" onClick={event => ChangeValues(event)}><Link to='/FlightsList'> Update </Link> </button>
        </div>
    );
};
export default UpdatePage;



