import react, {useEffect,useState} from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

function Main(){
    const history = useHistory();
    function handleclick(event){
        event.preventDefault();
    
        history.push({
        pathname: '/guest' ,
        state: {email : "Guest"}
            });
    }

return (
<div className='container'>

<h1>Airline</h1>
<br/>
<button><Link to="/SignIn">Sign In </Link></button>
<br></br><br></br> 

<button><Link to="/SignUp">Sign Up </Link></button>
<br></br><br></br>

<button onClick={handleclick}> <Link to="/Guest"> Continue As Guest </Link></button>
<br></br><br></br>

</div>
)
} 

export default Main;
