import React, {useState} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Route, Redirect, useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";


function SearchFlight(){
    const [input, setInput] = useState({
        flightNo:"" , from:"" , to:"" , date:"" , departure: "", arrival: ""
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

const history = useHistory();

function handleclick1(event){
    event.preventDefault();
   
    history.push({
    pathname: '/SearchResults',
    state: {flightNo : input.flightNo, type: "flightNo"}
});
}

function handleclick2(event){
    event.preventDefault();
   
    history.push({
    pathname: '/SearchResults',
    state: {from : input.from, type : "from"}
});
}

function handleclick3(event){
    event.preventDefault();
   
    history.push({
    pathname: '/SearchResults',
    state: {to : input.to , type : "to"}
});
}

function handleclick4(event){
    event.preventDefault();
   
    history.push({
    pathname: '/SearchResults',
    state: {date : input.date , type : "date"}
});
}

function handleclick5(event){
    event.preventDefault();
   
    history.push({
    pathname: '/SearchResults',
    state: {departure : input.departure , type : "departure"}
});
}

function handleclick6(event){
    event.preventDefault();
   
    history.push({
    pathname: '/SearchResults',
    state: {arrival : input.arrival , type : "arrival"}
});
}

return (
<div className='container'>
<h1>Search Flight </h1>

<br></br>
       <button><Link to="/admin">Back To Admin Page</Link></button>
        <br></br><br></br>

<form>
<label> Flight No <br></br> <input onChange={handleChange} name="flightNo"  type="number" value={input.flightNo} />  </label> &nbsp;&nbsp;&nbsp;
<input type="submit" value="Search" onClick={handleclick1} /> <br></br> <br></br>

<label> From <br></br> <input onChange={handleChange} name="from" type="text" value={input.from} />  </label> &nbsp;&nbsp;&nbsp;
<input type="submit" value= 'Search'onClick={handleclick2} /> <br></br> <br></br>

<label> To <br></br> <input onChange={handleChange} name="to" type="text" value={input.to} />  </label> &nbsp;&nbsp;&nbsp;
<input type="submit" value='Search' onClick={handleclick3} /> <br></br> <br></br>

<label> Date <br></br> <input onChange={handleChange} name="date" type="date" value={input.date} />  </label> &nbsp;&nbsp;&nbsp;
<input type="submit" value='Search' onClick={handleclick4} /> <br></br> <br></br>

<label> Departure Time <br></br> <input onChange={handleChange} name="departure" type="time" value={input.departure} />  </label> &nbsp;&nbsp;&nbsp;
<input type="submit" value='Search' onClick={handleclick5} /> <br></br> <br></br>

<label> Arrival Time <br></br> <input onChange={handleChange} name="arrival" type="time" value={input.arrival} />  </label> &nbsp;&nbsp;&nbsp;
<input type="submit" value='Search' onClick={handleclick6} /> <br></br> <br></br>
</form>
    
    
</div>
)
} 

export default SearchFlight;
