import react, {useEffect,useState} from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

function Main(){
    axios.defaults.withCredentials = true;
    const history = useHistory();
   
    function handleclick(event){
        event.preventDefault();
          
        axios.get('http://localhost:8000/addGuest').then(res=>
            history.push({ pathname: '/user' })
        );
        
    } 
 

return (
<div className='container'>

<h1>Airline</h1>
<br/>
<button><Link to="/SignIn">Sign In </Link></button>
<br></br><br></br> 

<button><Link to="/SignUp">Sign Up </Link></button>
<br></br><br></br>

<button onClick={handleclick}> Continue As Guest </button> 
<br></br><br></br>

</div>
)
} 

export default Main;
