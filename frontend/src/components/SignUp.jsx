import React, {useState} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router-dom";




function SignUp(){
    const history = useHistory();
    const [input, setInput] = useState({     //attribute names should be lowercase that will be use in the return statement {input.attributename} (for handle change to work & accept inputs) 
        firstname:"", lastname:"", email: "", password: "", countryCode:"", phoneNo:"", passportNo:"", address:"" 
    })




function handleChange(event){
    const {name,value}=event.target;

    setInput(prevInput => {
        return {
            ...prevInput,
            [name]:value
        }
    })
    
}

function handleclick(event){
    event.preventDefault();

    
    axios.post('http://localhost:8000/addUser', input).then( res => {
        if (res.data==1){
        alert("E-Mail Address Already Exists!  \nPlease use another E-Mail address");  // alert message with line break
        history.push({
        pathname: '/SignUp' 
        });
        
        }
        if (res.data==0){
        alert("Registration Successfully Done!");
        history.push({
            pathname: '/SignIn' 
            });
        }
        });
}

return (
<div className='container'>
<h1>Sign Up</h1>

<br></br>
<button><Link to="/SignIn">Sign In Instead</Link></button>
&nbsp;&nbsp;
<button><Link to="/"> Back To Main Page </Link></button>
<br></br><br></br>

<form>
      <label>First Name: <br></br>      <input onChange={handleChange} name="firstName" type="text" value={input.firstName} />  </label> <br></br> <br></br>
      <label>Last Name: <br></br>      <input onChange={handleChange} name="lastName" type="text" value={input.lastName} />  </label> <br></br> <br></br>
      <label>Email <br></br>     <input onChange={handleChange} name="email" type="text" value={input.email} />  </label> <br></br> <br></br>
      <label>Password <br></br>  <input onChange={handleChange} name="password" type="password" value={input.password}/> </label> <br></br> <br></br>
      
      <label>Passport No <br></br>      <input onChange={handleChange} name="passportNo" type="text" value={input.passportNo} />  </label> <br></br> <br></br>
      <label>Address <br></br>     <input onChange={handleChange} name="address" type="text" value={input.address} />  </label> <br></br> <br></br>
      <label>Country Code <br></br>     <input onChange={handleChange} name="countryCode" type="number" value={input.nationality} />  </label> <br></br> <br></br>
      <label>Phone No <br></br>      <input onChange={handleChange} name="phoneNo" type="number" value={input.phoneNo} />  </label> <br></br> <br></br>
      
      
      
      <input type="submit" value="Sign Up" onClick={handleclick} /> 
</form>

<br></br> <br></br>

</div>
)
} 

export default SignUp;
