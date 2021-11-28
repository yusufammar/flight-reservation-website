import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react';
import ReactDOM from 'react-dom';

import {BrowserRouter as Router, Route} from "react-router-dom";  // react-router & react-router-dom v5.1.2

import Admin from './components/Admin';
import AddFlight from './components/addFlight';   //imported object should start with uppercase letter
import FlightsList from './components/FlightsList';

import SearchFlight from './components/SearchFlight';
import Main from './components/Main';
import Guest from './components/Guest';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import SearchResults from './components/SearchResults';
import UpdatePage from './components/UpdatePage';
import Updateinfo from './components/Updateinfo';
import User from './components/User';


function App() {
  return (
    <Router>
      <Route exact path="/">          
      <Main/>
      </Route>
      <Route path="/User">
      <User/>
      </Route>

      <Route path="/Guest">
      <Guest/>
      </Route>

      <Route path="/SignUp">
      <SignUp/>
      </Route>

      <Route path="/SignIn">
      <SignIn/>
      </Route>
     
     
      <Route path="/admin">
        
       <Admin/>
      </Route>
      
      <Route path="/addFlight">
      <AddFlight/>
      </Route>

      <Route path ="/FlightsList">
        <FlightsList/>
      </Route>

      
      <Route path ="/SearchFlight">
        <SearchFlight/>
      </Route>
      
      <Route path ="/SearchResults">
        <SearchResults/>
      </Route>


      <Route path ="/UpdatePage">
        <UpdatePage/>
      </Route>

      <Route path ="/Updateinfo">
        <Updateinfo/>
      </Route>

      
    
    


    </Router>
    
)}

export default App;
