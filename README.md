# SAMYH


# Project Title:
SAMYH-Airline Reservation System

# Project description: 
A user friendly website for airline called “SAMYH” to make reservations for flights on the system for users and guests by searching for flights, reserve it and they have more functionalities as edit their reservations and cancelling it. also allowing the administers to edit on it the flights system between adding, deleting and editing flights details.

# Motivation:
Our vision was to create user-friendly website using MERN stack 

# Technologies:
*Node Js
*React
*Express
*Mongo DB
*REST API

# installation:

Locally:
-	Clone the link of repository from github.
-	Open new terminal.
-	Cd src -> node app “wait until MongoDB connected”.
-	Open new terminal.
-	Cd frontend -> npm start “wait until your browser open automatically”.


# Tests:

For Admin:
-	The list of all flights on the DB.
-	Searching criteria.
-	Editing flights.
-	Adding/deleting flights
For User/Guest:
-	Booking flights. “you can go with LAX->JFK on 12 .jan.2022 and 22.jan.2022 as example” 
-	Editing flights seats.
-	Cancelling his booked flights
-	The ticket email after reservation and cancelling 



# code example.

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
        
     axios.get('http://localhost:8000/currentUser').then(res =>{ 
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


#Screenshots

	Booking/Landing Page:
-	https://drive.google.com/file/d/1fftq5zoOo5O8TV-YwnW70RbGmQNRGjk-/view?usp=sharing

	Sign up page
-	https://drive.google.com/file/d/1lv6DWDBAOO5Bz7ikbK9tQtBmox-zAFTQ/view?usp=sharing

	Sign In page:
-	https://drive.google.com/file/d/1lmNsSIZR8OI-D_Fh-71CY9fkD7UZJBnu/view?usp=sharing

	Flights selection page:
-	https://drive.google.com/file/d/1uTfqov9rmFPZaUbEijL8z0Kflg7HgYdD/view?usp=sharing

Seats selection page:
-	https://drive.google.com/file/d/1gwUIPCb_nuWCdrgQoisJOuJqFM8G-Anh/view?usp=sharing

#contributions 
The project is created with the contribution of 5 members.
* https://github.com/yusufammar
* https://github.com/MayarEzzeldin
* https://github.com/AdhamElsheikh
* https://github.com/hossammeligy
* https://github.com/Shorook1

# Credits

	 https://mui.com
	 https://www.codecademy.com/learn/react-101	
	 https://www.w3schools.com/nodejs/
	 https://expressjs.com/








