import react, {useEffect,useState} from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { css} from '@emotion/css'
import Top from './Top';                     // rendering in return statement (responsible for session checking & returning of current user email)

function User(){      //for USER & GUEST
    const location = useLocation();
    const history = useHistory();
    axios.defaults.withCredentials = true;
    
    const [input, setInput] = useState({
        from:"" , to:"" , date:"" , departure: "", arrival: "", cabin: "" , seats: "", price: ""
    })


function handleChange(event){
    const {name,value}=event.target;

    setInput(prevInput => {
        return {
            ...prevInput,
            [name]:value }  })
 }

 /*  
const [from, setfrom] = useState();          // easiest way to accept input (no need to put name & value attributes to the input field)
function handleChange1(event){               // all you need: 
setfrom(event.target.value);                 // 1) make a useState variable (actual variable & setter) for each input 
}                                            // 2) Make a handelchange method that uses the setter of the usestate variable to set the variable with new value (that you get by event.target.value) 
                                             //     (call in the onChange attribute of the input field -> onChange={handlechange})
*/


function handleclick1(event){
    event.preventDefault();
    if (Object.values(input).every(x => x == "") ) 
    alert("Search fields are empty");

    else if ((input.seats!="" || input.price!="") && input.cabin=="" )
    alert("Please Select Cabin, when searching by seats or price");

    else if ((input.seats<0 || input.price<0) && input.cabin!="" )
        alert("Price or Seats can't be less than or equal to zero");
    
    else
    history.push({
    pathname: '/DepartureFlights',
    state: {
        from: input.from , to: input.to , date: input.date , departure: input.departure , arrival: input.arrival, 
        cabin: input.cabin , seats: input.seats, price: input.price }
        
});

}
return ( 
<div  className={css`
     color: white;
    height: 1920px;
    height: 1080px; 
    `} style={{backgroundImage: 'url("/wallpaper.jpg")'}}>

    <Top/> 


    <div name="content" >

<form className={css`
  position: absolute;
  left: 25%;
  background-color: dodgerblue;
  border-radius: 20px;
  width: 48%;
  padding: 20px;
  font-family: 'Josefin Sans';
  font-size: 25px;`} >
<label> From <br></br> 
<select class="form-control" name="from" onChange={handleChange} value={input.from} style={{ width:"350px" }} >
<option >  </option>
  <option > LAX (Los Angeles International Airport, California, USA) </option>
  <option > JFK (John F. Kennedy International Airport, New York, USA) </option>
  <option > LHR (Heathrow Airport, London, England) </option>
  <option > CAI (Cairo International Airport, Cairo, Egypt) </option>
  <option > DXB (Dubai International Airport, Dubai, UAE) </option>
  <option > CDG (Paris Charles de Gaulle Airport, Paris, France) </option>
  <option > MUC (Munich International Airport, Munich, Germany) </option>
  <option > RUH (King Khalid International Airport, Riyadh, Saudi Arabia) </option>
  <option > YYZ (Toronto Pearson International Airport, Toronto, Canada) </option>
  <option > FRA (Frankfurt Airport, Frankfurt, Germany) </option>
  
</select> 
</label> &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

<label> To <br></br> 
<select class="form-control" name="to" onChange={handleChange} value={input.to} style={{ width:"350px" }} >
<option >  </option>
  <option > LAX (Los Angeles International Airport, California, USA) </option>
  <option > JFK (John F. Kennedy International Airport, New York, USA) </option>
  <option > LHR (Heathrow Airport, London, England) </option>
  <option > CAI (Cairo International Airport, Cairo, Egypt) </option>
  <option > DXB (Dubai International Airport, Dubai, UAE) </option>
  <option > CDG (Paris Charles de Gaulle Airport, Paris, France) </option>
  <option > MUC (Munich International Airport, Munich, Germany) </option>
  <option > RUH (King Khalid International Airport, Riyadh, Saudi Arabia) </option>
  <option > YYZ (Toronto Pearson International Airport, Toronto, Canada) </option>
  <option > FRA (Frankfurt Airport, Frankfurt, Germany) </option>
  </select> 
  </label> <br></br> <br></br>
<label> Date <br></br> <input class="form-control" onChange={handleChange} name="date" type="date" value={input.date} />                      </label> &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
<label> Departure Time <br></br> <input class="form-control" onChange={handleChange} name="departure" type="time" value={input.departure} />  </label> &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
<label> Arrival Time <br></br> <input class="form-control" onChange={handleChange} name="arrival" type="time" value={input.arrival} />  </label> <br></br> <br></br>  
<label> Cabin <br></br> 
<select class="form-control" name="cabin" onChange={handleChange} value={input.cabin} >
<option >  </option>
  <option > First </option>
  <option > Business </option>
  <option > Economy </option>
</select> 
</label> &nbsp;&nbsp;&nbsp;

<label > Seats (Adults & Children)  <br></br> <input class="form-control" class="form-control" onChange={handleChange} name="seats" type="number" value={input.seats} style={{ width:"300px" }}  />  </label> &nbsp;&nbsp;&nbsp;
<label> Price (Maximum, Per Seat) <br></br> <input  class="form-control" onChange={handleChange} name="price" type="number" value={input.price} style={{ width:"325px" }}  />  </label>

<br></br> <br></br>
<input style={{position: "absolute", left: "42%"}} 
class="btn btn-success btn-lg" type="submit" value='Search' onClick={handleclick1} /> 
<br></br>
</form>  

    </div>
   
</div>


)
} 

export default User;
