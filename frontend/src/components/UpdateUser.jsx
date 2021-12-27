import 'bootstrap/dist/css/bootstrap.min.css'
import react, {useEffect,useState} from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';                  // rendering in return statement (responsible for session checking & returning of current user email)
import { Modal} from 'react-bootstrap';
import { css} from '@emotion/css'
import Top from './Top';                     // rendering in return statement (responsible for session checking & returning of current user email)
require("react-bootstrap/ModalHeader");

function UpdateUser(){            // USER MAIN PAGE
    
   // Session Checking
    const location = useLocation();
    const history = useHistory();
    const [x,setUser]=useState();     // x is email of user (it is the old email if he updated email )

    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get('http://localhost:8000/currentUser').then(res =>{ 
        if (res.data=="0" || res.data.type!="Customer"){
        alert("Access Denied, Please Sign In First");
        history.push({pathname:"/SignIn"});
        }
        else
         setUser(res.data.email);
     })
    }, [location]);

    //------------------------------------------------------------
//Inputs
    const [input, setInput] = useState({ firstName: "", lastName: "" , email:"" , password:"" , oldPassword:"" });

    function handleChange(event){
        const {name,value}=event.target;
    
        setInput(prevInput => {
            return {
                ...prevInput,
                [name]:value
            }
        })
        
    }
  
//Accepting Inputs

    function handleclick(event){
        event.preventDefault();
         history.push({pathname: '/user'});    
    }

    function handleclick1(event){
        event.preventDefault();
        if (input.firstName!="" && input.lastName!="" && input.email!="" && input.password!="" && input.oldPassword!=""){
            
            console.log(input);     
            axios.post('http://localhost:8000/Updateinfo', input).then(res =>{
            if (res.data==0)  alert("Email already used, use a different email")  // email already used
            
            else if (res.data==1){        // succesful update
            var article={oldEmail: x};
            alert('Account Info Updated Successfully')
            axios.post('http://localhost:8000/UpdateBookingUser', article).then(history.push({pathname: '/user'}))
            }
            else if (res.data==2)  alert("Wrong Old Password");  // wrong old password
          
           });
      }
        else
        alert("Please fill all fields");
        }      
       
//------------------------------------------------------------

return (
<div className='container'>

<h1>Welcome</h1>
<h8>Account: {x}  </h8>

<br></br><br></br>
<button  onClick={handleclick}> Back to Main Page </button>
<br></br><br></br>

<form>
      <label>First Name <br></br>     <input onChange={handleChange} name="firstName" type="text" value={input.name} />  </label> <br></br> <br></br>
      <label>Last Name  <br></br>    <input onChange={handleChange} name="lastName" type="text" value={input.name} />  </label> <br></br> <br></br>
      <label>Email <br></br>     <input onChange={handleChange} name="email" type="text" value={input.email} />  </label> <br></br> <br></br>
      <br></br>
      <label>Old Password <br></br>   <input onChange={handleChange} name="oldPassword" type="password" value={input.oldPassword}/>  </label>
      <br></br>
      <label>New Password <br></br>   <input onChange={handleChange} name="password" type="password" value={input.password}/>  </label> <br></br> 
      <br></br> <br></br> 

      <input type="submit" value="Update" onClick={handleclick1} /> 
</form>



</div>
)
} 

export default  UpdateUser;
