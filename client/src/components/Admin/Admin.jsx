import App from '../../App';
import react, {useEffect,useState} from "react";
import React from "react";
import { Link } from "react-router-dom";
import { Route, Redirect, useLocation } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router-dom";

function Admin(){
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

    function handleclick3(event){
        event.preventDefault();
        console.log("so");
        
        axios.get(App.url + '/logout').then(
        history.push({
            pathname: '/'
        })
        )
     
    }

return (
<div className='container'>

<h1>Admin</h1>
<br/>
<p> <Link to="/addFlight">Add Flight</Link> </p>
<p> <Link to="/FlightsList">Show Flights</Link> </p>
<p> <Link to="/SearchFlight">Flight Search</Link> </p>

    
<br></br><br></br>
<button onClick={handleclick3}> Sign Out </button>
<br></br><br></br>
</div>
)
} 

export default Admin;
