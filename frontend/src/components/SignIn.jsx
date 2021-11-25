import React, {useState} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router-dom";

function SignIn(){
    const history = useHistory();
    const [input, setInput] = useState({     //attribute names should be lowercase (for handle change to work & accept inputs) 
        email: "" , password: "" 
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
    console.log(input);

    const user= {email : input.email , password : input.password  }  ;
    axios.post('http://localhost:8000/SignIn', user).then(/* showing success message*/ );

    history.push({
        pathname: '/User' ,
        state: {email : input.email , password : input.password  }
    });
}

return (
<div className='container'>
<h1>Sign In</h1>

<br></br>
<button><Link to="/SignUp">Sign Up Instead</Link></button>
<br></br><br></br>

<form>
   
      <label>Email <br></br>     <input onChange={handleChange} name="email" type="text" value={input.email} />  </label> <br></br> <br></br>
      <label>Password <br></br>  <input onChange={handleChange} name="password" type="password" value={input.password}/>  </label> <br></br> <br></br> <br></br> 
      
      <input type="submit" value="Sign In" onClick={handleclick} /> 
</form>

<br></br> <br></br>


    




 


</div>
)
} 

export default SignIn;
