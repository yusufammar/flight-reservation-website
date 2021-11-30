import react, {useEffect,useState} from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";


function SearchFlightsUser(){      //for USER & GUEST
    const location = useLocation();
    const history = useHistory();
    
    if (location.state!=null){           //checking if session exists (no url jumping) (if location.state has variables passed)
        var x= location.state.email;    
    }
    else{
    alert("Access Denied, Please Sign In first!");
    history.push({
        pathname: '/SignIn' 
        });
    }

    const [input, setInput] = useState({
        from:"" , to:"" , date:"" , departure: "", arrival: "", cabin: "" , seats: "", price: ""
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
    if (x.includes("guest")){       // redirects to guest main page if email is guest email
        history.push({
            pathname: '/guest',
            state: {email : x}  
    })}
    else {                        // redirects to user main page if email is user email
    history.push({
    pathname: '/user',
    state: {email : x}
    })
}
}

function handleclick1(event){
    event.preventDefault();
   
    history.push({
    pathname: '/SearchResultsUser',
    state: {email: x,                 // for session
        from: input.from , to: input.to , date: input.date , departure: input.departure , arrival: input.arrival, 
        cabin: input.cabin , seats: input.seats, price: input.price }
        
});

}



return (
<div className='container'>
<h1>Search Flights </h1>

<br></br>
       <button onClick={handleclick}>Back To Main Page</button>
        <br></br><br></br>

<form>
<label> From <br></br> <input onChange={handleChange} name="from" type="text" value={input.from} style={{ width:"125px" }} />  </label> &nbsp;&nbsp;&nbsp;
<label> To <br></br> <input onChange={handleChange} name="to" type="text" value={input.to} style={{ width:"125px" }} />  </label> &nbsp;&nbsp;&nbsp;
<label> Date <br></br> <input onChange={handleChange} name="date" type="date" value={input.date} />  </label> &nbsp;&nbsp;&nbsp;
<label> Departure Time <br></br> <input onChange={handleChange} name="departure" type="time" value={input.departure} />  </label> &nbsp;&nbsp;&nbsp;
<label> Arrival Time <br></br> <input onChange={handleChange} name="arrival" type="time" value={input.arrival} />  </label> &nbsp;&nbsp;&nbsp; <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> 
<label> Cabin <br></br> 
<select name="cabin" onChange={handleChange} value={input.cabin} >
<option >  </option>
  <option > First </option>
  <option > Business </option>
  <option > Economy </option>
</select> 
</label> &nbsp;&nbsp;&nbsp;

<label> Seats (Adults + Children)  <br></br> <input onChange={handleChange} name="seats" type="number" value={input.seats} style={{ width:"180px" }}  />  </label> &nbsp;&nbsp;&nbsp;
<label> Price (Maximum) (Per Seat) <br></br> <input onChange={handleChange} name="price" type="number" value={input.price} style={{ width:"200px" }}  />  </label> &nbsp;&nbsp;&nbsp;

 &nbsp; &nbsp;
<input type="submit" value='Search' onClick={handleclick1} /> <br></br> <br></br>
</form>
    
    
</div>
)
} 

export default SearchFlightsUser;
