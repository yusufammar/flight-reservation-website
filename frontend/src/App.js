import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react';
import ReactDOM from 'react-dom';

import {BrowserRouter as Router, Route} from "react-router-dom";  // react-router & react-router-dom v5.1.2

import Admin from './components/Admin';
import AddFlight from './components/addFlight';   //imported object should start with uppercase letter
import FlightsList from './components/FlightsList';

import SearchFlight from './components/SearchFlight';
import SearchResults from './components/SearchResults';
import UpdatePage from './components/UpdatePage';


function App() {
  return (
    <Router>
     
     
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

      
    
    


    </Router>
    
)}

export default App;
