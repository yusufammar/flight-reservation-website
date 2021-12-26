import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from "react-router-dom";  // react-router & react-router-dom v5.1.2
import react, {useEffect,useState} from "react";
import WebFont from 'webfontloader';

//imported jsx components should start with uppercase letter

import Main from './components/Main';                                 //main
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import UpdateUser from './components/UpdateUser';

import Admin from './components/Admin/Admin';                         //admin
import AddFlight from './components/Admin/addFlight';  
import FlightsList from './components/Admin/FlightsList';
import SearchFlight from './components/Admin/SearchFlight';
import SearchResults from './components/Admin/SearchResults';
import UpdatePage from './components/Admin/UpdatePage';

import User from './components/User';                                 //user (& guest)
import DepartureFlights from './components/DepartureFlights';
import ReturnFlights from './components/ReturnFlights';
import Booking from './components/Booking';
import MyFlights from './components/MyFlights';
import BookingDetails from './components/BookingDetails';
import ChangeSeats from './components/ChangeSeats';
import ChangeFlight from './components/ChangeFlight';
import BookingUpdate from './components/BookingUpdate';

function App() {
  
  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Droid Sans', 'Chilanka', 'Josefin Sans', 'Roboto']
      }
    });
   }, []);

  return (
    <Router>
     
     <Route exact path="/">          
      <Main/>
      </Route>
     
     <Route exact path="/user">
      <User/>
      </Route>

      <Route exact path="/SignUp">
      <SignUp/>
      </Route>

      <Route exact path="/MyFlights">
      <MyFlights/>
      </Route>

      <Route exact path="/SignIn">
      <SignIn/>
      </Route>

      <Route exact path="/admin">
      <Admin/>
      </Route>
      
      <Route exact path="/addFlight">
      <AddFlight/>
      </Route>

      <Route exact path ="/FlightsList">
        <FlightsList/>
      </Route>

      
      <Route exact path ="/SearchFlight">
        <SearchFlight/>
      </Route>
      
      <Route exact path ="/SearchResults">
        <SearchResults/>
      </Route>


      <Route exact path ="/UpdatePage">
        <UpdatePage/>
      </Route> 
    
      
      <Route exact path ="/DepartureFlights">
        <DepartureFlights/>
      </Route>
      
      <Route exact path ="/ReturnFlights">
        <ReturnFlights/>
      </Route>

      <Route exact path="/Booking">
        <Booking/>
      </Route>

      <Route exact path="/UpdateUser">
        <UpdateUser/>
      </Route>


      <Route exact path="/BookingDetails">
        <BookingDetails/>
      </Route>
      <Route exact path="/ChangeSeats">
        <ChangeSeats/>
      </Route>

      <Route exact path="/ChangeFlight">
        <ChangeFlight/>
      </Route>

      <Route exact path="/BookingUpdate">
        <BookingUpdate/>
      </Route>
    </Router>
    
)}

export default App;