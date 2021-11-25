import React from "react";
import { Link } from "react-router-dom";

function Main(){
return (
<div className='container'>

<h1>Airline</h1>
<br/>
<button><Link to="/SignIn">Sign In </Link></button>
<br></br><br></br> 

<button><Link to="/SignUp">Sign Up </Link></button>
<br></br><br></br>

<button><Link to="/Guest"> Continue As Guest </Link></button>
<br></br><br></br>

</div>
)
} 

export default Main;
