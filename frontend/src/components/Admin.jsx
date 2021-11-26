import React from "react";
import { Link } from "react-router-dom";
import { Route, Redirect, useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";

function Admin(){

    const location = useLocation();
    const history = useHistory();
    if (location.state!=null){           //checking if session exists (no url jumping) (if location.state has variables passed)
        var x= location.state.email;    
    }
    else{
    alert("Access Denied, Please Sign In first!");
    history.push({
        pathname: '/SignIn' 
        });
    }    

return (
<div className='container'>

<h1>Admin</h1>
<br/>
<p> <Link to="/addFlight">Add Flight</Link> </p>
<p> <Link to="/FlightsList">Show Flights</Link> </p>
<p> <Link to="/SearchFlight">Flight Search</Link> </p>

    
<br></br><br></br>
<button><Link to="/SignIn"> Sign Out </Link></button>
<br></br><br></br>
</div>
)
} 

export default Admin;
