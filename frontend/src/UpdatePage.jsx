import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios'
import { BrowserRouter as Router, useParams } from "react-router-dom";
import { useState, useEffect } from 'react';

const UpdatePage = () => {

    const [updatedF, setupdatedF] = useState({});
    let { id } = useParams();
    const baseURL = `http://localhost3000/flights/update/${id}`; 

    function onSubmit() {
        axios.patch(baseURL, { updatedF }).then((response) => { })
    }
    return (
        <form>
            <div class="form-group">
                <label for="exampleInputEmail1">Flight No</label>
                <input type="text" class="form-control" id="attribute1" aria-describedby="emailHelp" placeholder="Enter Flight Number" onChange={event => setupdatedF(Object.assign(updatedF, { ["Flight_No"]: event.target.value }))}/>
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">From: </label>
                <input type="text" class="form-control" id="attribute2" placeholder="From" onChange={event => setupdatedF(Object.assign(updatedF, { ["From"]: event.target.value }))}/>
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">To:</label>
                <input type="text" class="form-control" id="attribute3" placeholder="To" onChange={event => setupdatedF(Object.assign(updatedF, { ["To"]: event.target.value }))}/>
            </div>
            
            <div class="form-group">
                <label for="exampleInputPassword1">Flight Date</label>
                <input type="date" class="form-control" id="attribute4" placeholder="Date" onChange={event => setupdatedF(Object.assign(updatedF, { ["FlightDate"]: event.target.value }))}/>
            </div>
            <div class="form-check">
            <div class="form-group">
                <label for="exampleInputPassword1">Departure</label>
                <input type="text" class="form-control" id="attribute5" placeholder="Dep Time" onChange={event => setupdatedF(Object.assign(updatedF, { ["Departure"]: event.target.value }))}/>
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Arrival</label>
                <input type="text" class="form-control" id="attribute6" placeholder="Arr Time" onChange={event => setupdatedF(Object.assign(updatedF, { ["Arrival"]: event.target.value }))}/>
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">First Class Seats</label>
                <input type="number" class="form-control" id="attribute7" placeholder="First Class Seats" onChange={event => setupdatedF(Object.assign(updatedF, { ["First_Class_Seats"]: event.target.value }))}/>
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Business Class Seats</label>
                <input type="number" class="form-control" id="attribute8" placeholder="Business Class Seats"onChange={event => setupdatedF(Object.assign(updatedF, { ["Business_Class_Seats"]: event.target.value }))}/>
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Economy Class Seats</label>
                <input type="number" class="form-control" id="attribute9" placeholder="Economy Class Seats"   onChange={event => setupdatedF(Object.assign(updatedF, { ["Economy_Class_Seats"]: event.target.value }))}/>
            </div>
                <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
                <label class ="form-check-label" for="exampleCheck1">Click To Confirm Update</label>
            </div>
            <button type="submit" class="btn btn-primary" onClick = {onSubmit}  >Update</button>
        </form>
    );
};
export default UpdatePage;

