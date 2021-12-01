import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react';
import ReactDOM from 'react-dom';

import {BrowserRouter as Router, Route} from "react-router-dom";  // react-router & react-router-dom v5.1.2

import Main from './components/Main';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import User from './components/User';
import Guest from './components/Guest';

import Admin from './components/Admin';
import AddFlight from './components/addFlight';   //imported object should start with uppercase letter
import FlightsList from './components/FlightsList';

import SearchFlight from './components/SearchFlight';
import SearchResults from './components/SearchResults';
import UpdatePage from './components/UpdatePage';

import SearchFlightsUser from './components/SearchFlightsUser';
import SearchResultsUser from './components/SearchResultsUser';

import BookDepartureFlightUser from './components/BookDepartureFlightUser';

function App() {
  return (
    <Router>
     
     <Route exact path="/">          
      <Main/>
      </Route>
     
     <Route exact path="/user">
      <User/>
      </Route>

      <Route exact path="/guest">
      <Guest/>
      </Route>

      <Route exact path="/SignUp">
      <SignUp/>
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

      <Route exact path ="/SearchFlightsUser">
        <SearchFlightsUser/>
      </Route>
      
      <Route exact path ="/SearchResultsUser">
        <SearchResultsUser/>
      </Route>
      
      <Route exact path ="/BookDepartureFlightUser">
        <BookDepartureFlightUser/>
      </Route>


    </Router>
    
)}

export default App;
