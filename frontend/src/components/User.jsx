import react, {useEffect,useState} from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

function User(){            // USER MAIN PAGE
    
   
    const location = useLocation();
    const history = useHistory();
    const [x,setUser]=useState();
    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get('http://localhost:8000/currentUser').then(res =>{ 
        if (res.data=="0" || res.data.type=="Admin"){
        alert("Access Denied, Please Sign In First");
        history.push({pathname:"/SignIn"});
        }
        else
         setUser(res.data.email);
     })
    }, [location]);

    function handleclick(event){
        event.preventDefault();
        history.push({
        pathname: '/SearchFlightsUser'
    });
    }

    function handleclick1(event){
        event.preventDefault();
        history.push({pathname: '/UpdateUser' });
    }

    function handleclick3(event){
        event.preventDefault();
        console.log("so");
        
        axios.get('http://localhost:8000/logout').then(
        history.push({
            pathname: '/'
        })
        )
     
    }

    function showBookings(event)
    {
        event.preventDefault();
        history.push({
        pathname: '/MyFlights',
        state: {email : x}
    }); 
    }
   

return (
<div className='container'>

<h1>Welcome</h1>
<h8>Account: {x}  </h8>

<br></br><br></br>
<button  onClick={handleclick1}> Update Account Info </button>
<br></br><br></br>

<br></br><br></br>
<button  onClick={handleclick}> Book Flight </button>
<br></br><br></br>


<br></br><br></br>
<button  onClick={showBookings}> My Bookings </button>
<br></br><br></br>

<br></br><br></br>
<button onClick={handleclick3}> Sign Out </button>
<br></br><br></br>
</div>
)
} 

export default User;
