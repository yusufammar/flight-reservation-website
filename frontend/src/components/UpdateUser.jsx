import 'bootstrap/dist/css/bootstrap.min.css'
import react, {useEffect,useState} from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

function UpdateUser(){            // USER MAIN PAGE
    
   
    const location = useLocation();
    const history = useHistory();
    const [x,setUser]=useState();

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

    const [input, setInput] = useState({ name: "" , email:"" , password:""  });

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
         history.push({pathname: '/user'});    
    }

    function handleclick1(event){
        event.preventDefault();
        if (input.name!="" && input.email!="" && input.password!=""){
    
            console.log(input);     
        
            axios.post('http://localhost:8000/UpdateBookingUser', input);

            axios.post('http://localhost:8000/Updateinfo', input);
            alert('Account Info Updated Successfully');
            history.push({pathname: '/user'});  
        }
        else
        alert("Please fill the needed fields");
            
        }      
       

return (
<div className='container'>

<h1>Welcome</h1>
<h8>Account: {x}  </h8>

<br></br><br></br>
<button  onClick={handleclick}> Back to Main Page </button>
<br></br><br></br>

<form>
      <label>Name      <input onChange={handleChange} name="name" type="text" value={input.name} />  </label> <br></br> <br></br>
      <label>Email    <input onChange={handleChange} name="email" type="text" value={input.email} />  </label> <br></br> <br></br>
      <label>Password <input onChange={handleChange} name="password" type="password" value={input.password}/>  </label> <br></br> <br></br> <br></br> 

      <input type="submit" value="Update" onClick={handleclick1} /> 
</form>



</div>
)
} 

export default  UpdateUser;
