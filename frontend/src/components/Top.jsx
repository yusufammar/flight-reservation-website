import react, {useEffect,useState} from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { css} from '@emotion/css'
//import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';

function Top(){      //for USER & GUEST
   
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

    function handleclick7(event){
        event.preventDefault();
        history.push({
        pathname: '/user'})
    }
    function handleclick8(event){
        event.preventDefault();
        history.push({pathname: '/UpdateUser' });
    }
    function handleclick9(event){
        event.preventDefault();
        axios.get('http://localhost:8000/logout').then(
        history.push({
            pathname: '/'}))
    }
    function showBookings(event){
        event.preventDefault();
        history.push({
        pathname: '/MyFlights'}); 
    }

  


return (
<div name="top" className={css`
    display: flex;
    font-family: "Josefin Sans";
    `} > 

<div className={css`
   width: 80%;
   text-align: left;
   padding: 20px
   `}> <button class="btn btn-primary"  onClick={handleclick7}>Home</button>  
   &nbsp; &nbsp; &nbsp;
<button  class="btn btn-primary" onClick={showBookings}>Bookings </button>
   <h1 className={css`
   font-family: "Josefin Sans"; font-weight:bold; font-size:60px;  padding-left: 52% ; color: powderblue;
  `}>AIRLINE </h1>
<br></br>
  

   </div>

<div className={css`
   width: 20%;
   text-align: right;
   padding: 20px
   `}>  
<AccountCircleRoundedIcon/>&nbsp;
    <h8>{x}</h8>
<br></br>
<button class="btn btn-secondary" onClick={handleclick8}> Edit Profile </button> 
&nbsp;&nbsp;
<button class="btn btn-danger"  onClick={handleclick9}> Sign Out </button> 
</div>

</div>

);
} 

export default Top;
