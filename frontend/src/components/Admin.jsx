import React from "react";
import { Link } from "react-router-dom";

function Admin(){
return (
<div className='container'>

<h1>Admin</h1>
<br/>
<p> <Link to="/addFlight">Add Flight</Link> </p>
<p> <Link to="/FlightsList">Show Flights</Link> </p>
<p> <Link to="/SearchFlight">Flight Search</Link> </p>

    

</div>
)
} 

export default Admin;
