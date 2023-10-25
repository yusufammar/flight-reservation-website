//import Form from 'react-bootstrap/Form'
//import Button from 'react-bootstrap/Button';
import App from '../../App';
import { BrowserRouter as Router, useParams } from "react-router-dom";
import react, {useEffect,useState} from "react";
import React from "react";
import { Link } from "react-router-dom";
import { Route, Redirect, useLocation } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router-dom";


const UpdatePage = () => {

    const location = useLocation();
    const history = useHistory();
    axios.defaults.withCredentials = true;
    
    useEffect(() => {
        
     axios.get(App.url + '/currentUser').then(res =>{ 
        if (res.data=="0" || res.data.type=="Customer" || res.data.type=="Guest" ){
        alert("Access Denied, Please Sign In First");
        history.push({pathname:"/SignIn"});
        }
        // else go to admin page
     })
    }, [location]);
    
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
            


    history.push({
    pathname: '/FlightsList'
    //state: {flightNo : input.flightNo, type: "flightNo"}
});

        }
        else {
            console.log("Not Checked!");
        }
    }

    return (
        <div class="container"  style={{display: "flex"}}>
              
             <div  style={{width: "50%"}}>
             <h1> Update Flight </h1>
           
             <br></br> <br></br>
                    <label for="exampleInputEmail1">Flight No</label>
                    <input name="FlightNo" type="text" class="form-control" style={{width: "200px"}} id="attribute1" aria-describedby="emailHelp" placeholder="Enter Flight Number" onChange={event => setFlightNo(event.target.value)} />
                
               
                    <label for="exampleInputPassword1">From: </label>
                    <input type="text" name="FlightFrom" class="form-control" style={{width: "200px"}} id="attribute2" placeholder="From" onChange={event => setFlightFrom(event.target.value)} />
                
                
                    <label for="exampleInputPassword1">To:</label>
                    <input name="FlightTo" type="text" class="form-control" style={{width: "200px"}} id="attribute3" placeholder="To" onChange={event => setFlightTo(event.target.value)} />
               

               
                    <label >Flight Date</label>
                    <input name="FlightDate" type="date" class="form-control" style={{width: "200px"}} id="attribute4" placeholder="Date" onChange={event => setFlightDate(event.target.value)} />
                    

              
                    <label>Departure</label>
                    <input name="FlightDep" type="time" class="form-control" style={{width: "200px"}} id="attribute5" placeholder="Dep Time" onChange={event => setFlightDep(event.target.value)} />
               
                
                    <label for="exampleInputPassword1">Arrival</label>
                    <input name="FlightArr" type="time" class="form-control" style={{width: "200px"}} id="attribute6" placeholder="Arr Time" onChange={event => setFlightArr(event.target.value)} />
                    </div>
                    <div style={{width: "50%"}}>
                       
                    <br></br> <br></br> <br></br> <br></br><br></br> <br></br>
                    <label for="exampleInputPassword1">First Class Seats</label> 
                    <input name="FlightFirst" type="number" class="form-control" style={{width: "200px"}} id="attribute7" placeholder="First Class Seats" onChange={event => setFlightFirst(event.target.value)} />
                
                
                    <label for="exampleInputPassword1">Business Class Seats</label>
                    <input name="FlightBusiness" type="number" class="form-control" style={{width: "200px"}} id="attribute8" placeholder="Business Class Seats" onChange={event => setFlightBus(event.target.value)} />
                
                
                    <label for="exampleInputPassword1">Economy Class Seats</label>
                    <input name="FlightEconomy" type="number" class="form-control" style={{width: "200px"}} id="attribute9" placeholder="Economy Class Seats" onChange={event => setFlightEco(event.target.value)} />
                
                    <br></br><br></br>
                <input type="checkbox" class="form-check-input" id="exampleCheck1" onChange={event => setChecked(event.target.checked)} />
               
                <label class="form-check-label" for="exampleCheck1">Click To Confirm Update</label>
                <br></br>
               <br/>
            <button type="submit" class="btn btn-primary" onClick={event => ChangeValues(event)}>Update</button>
            </div>
           


     
   </div>

    );
};
export default UpdatePage;



