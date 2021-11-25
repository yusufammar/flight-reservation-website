import react, {useEffect,useState} from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

function User(){
    const location = useLocation();
    const history = useHistory();

    const [user , setuser] = useState([{ 
        Name:"",
        Email:"",
      
    }])  
    useEffect(() => {
   
   var x= location.state.email; var y= location.state.password; 

    const article = { Email : x , Password: y  };
    axios.post('http://localhost:8000/SignIn', article)
    .then( jsonRes => {
    if (jsonRes.data.length===0){
        console.log("null");
  
    //history.push({
    //pathname: '/SignIn' 
    //});
    
    }
    
    else
    setuser(jsonRes.data)
    
    
    });
    
   
 
    }, [location]);




return (


<div className='container'>


<h1>Welcome User</h1>

{user.map(user =>
       <div>
        <br/>
       <p> 
        Name: {user.Name}  | Email: {user.Email}  
       <br></br>
       </p>
        </div>
       )}

</div>
)
} 

export default User;
