import './style.css'
import react, {useEffect,useState} from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { css} from '@emotion/css'
import Top2 from './Top2';                     // rendering in return statement (responsible for session checking & returning of current user email)
import * as React from 'react';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import DateMomentUtils from '@date-io/date-fns';
import {
  DatePicker,
  TimePicker,
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from '@mui/material/FormControl';
import Select , { SelectChangeEvent } from '@mui/material/Select';
import { flexbox } from '@mui/system';
import { alpha } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Box from '@mui/material/Box';
import ManIcon from '@mui/icons-material/Man';
import ChildCareIcon from '@mui/icons-material/ChildCare';

<<<<<<< Updated upstream:frontend/src/components/User.jsx
=======
import NavBar from './Helper/NavBar';                     // rendering in return statement (responsible for session checking & returning of current user email)
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import ModalUnstyled from '@mui/base/ModalUnstyled';
import { styled} from '@mui/system';



>>>>>>> Stashed changes:frontend/src/components/LandingPage.jsx
function User(){      //for USER & GUEST

   /*  
const [from, setfrom] = useState();          // easiest way to accept input (no need to put name & value attributes to the input field)
function handleChange1(event){               // all you need: 
setfrom(event.target.value);                 // 1) make a useState variable (actual variable & setter) for each input 
}                                            // 2) Make a handelchange method that uses the setter of the usestate variable to set the variable with new value (that you get by event.target.value) 
                                             //     (call in the onChange attribute of the input field -> onChange={handlechange})
*/

const location = useLocation();
const history = useHistory();
axios.defaults.withCredentials = true;
    
//Inputs

const [from, setFrom] = useState();
function handleFrom(event,value){  setFrom(value);   }             // accepting input from material ui autocomplete (on change function has extra paramenter: value)

const [to, setTo] = useState();
function handleTo(event,value){  setTo(value);   }   
 
const [cabin, setCabin] = useState('');
function handleCabin(event){   setCabin(event.target.value);  }               

const [departureDate, setDeparture] = useState(new Date());

const [returnDate, setReturn] = useState(new Date());

//seats
var [adults,setAdults]=useState(0);
var [children,setChildren]=useState(0);

const seats=adults+children;

function handleAdultsPlus(event){
  if (adults+children<9)
  setAdults(adults+=1);
}
function handleAdultsMinus(event){
  if (adults>0)
  setAdults(adults-=1);
  }

function handleChildrenPlus(event){
  if (adults+children<9)
    setChildren(children+=1);
  }
function handleChildrenMinus(event){
  if (children>0)
    setChildren(children-=1);
   }   



function convertDate(date){
var dd = String(date.getDate()).padStart(2, '0');
var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = date.getFullYear();

var x = yyyy + '-' + mm + '-' +dd ;
return x;
}


function handleclick1(event){
    event.preventDefault();
  
 if (from=="" || to=="" || cabin =="" || adults+children ==0 )
 alert ("All search fields are required");
 else{   
var d= convertDate(departureDate);
var r= convertDate(returnDate);

var input= {from: from , to: to , departure: d , return: r, cabin: cabin , adultSeats: adults, childrenSeats: children };

//Getting departure flights, return flights, & price for each all at once (passed to other front end pages using history.push)
axios.post('http://localhost:8000/searchFlightUser', input).then(res =>{ 
    if (res.data == 1)
       alert("No results, Please Search again");
       else{
     console.log(res.data);
     history.push({
       pathname: '/DepartureFlights',
       state: {matchedFlights: res.data, search: input}
     })
   
}
})

}
}


const options = [ "LAX (Los Angeles International Airport, California, USA)",  
  "JFK (John F. Kennedy International Airport, New York, USA)", 
  "LHR (Heathrow Airport, London, England)",  
  "CAI \n(Cairo International Airport, Cairo, Egypt)",
  "DXB (Dubai International Airport, Dubai, UAE)",  
  "CDG (Paris Charles de Gaulle Airport, Paris, France)",  
  "MUC (Munich International Airport, Munich, Germany)",  
  "RUH (King Khalid International Airport, Riyadh, Saudi Arabia)",  
  "YYZ (Toronto Pearson International Airport, Toronto, Canada)",  
  "FRA (Frankfurt Airport, Frankfurt, Germany)"  
];




var xxx=["x"];

const itemData = [
  {
    img: 'https://static.saltinourhair.com/wp-content/uploads/2019/03/23140923/cairo-pyramids-giza.jpg',
    title: 'Cairo',
    author: '@visitegypt',
    rows: 2,
    cols: 2,
    featured: true,
  },
  {
    img: 'https://previews.123rf.com/images/f11photo/f11photo1806/f11photo180600097/104444908-statue-liberty-and-new-york-city-skyline-at-sunset-in-united-states.jpg',
    title: 'NewYork',
    author: '@iluvnyc',
  },
  {
    img: 'https://cdn.londonandpartners.com/-/media/images/london/visit/things-to-do/sightseeing/london-attractions/tower-bridge/thames_copyright_visitlondon_antoinebuchet640x360.jpg?mw=640&hash=27AEBE2D1B7279A196CC1B4548638A9679BE107A',
    title: 'London',
    author: '@goodmorninglondon',
  },
  {
    img: 'https://www.discoverwalks.com/blog/wp-content/uploads/2015/08/beautiful-eiffel-big.jpg',
    title: 'Paris',
    author: '@explore.paris',
  }
];


const itemData2 = [
  {
    img: 'https://c.files.bbci.co.uk/3407/production/_103591331_gettyimages-874914576.jpg',
    title: 'Get to the airport at least three hours before your flight.',
    
  },
  {
    img: 'https://www.moodiedavittreport.com/wp-content/uploads/2020/05/KLM-mouth-mask-cabin-crew-passengers-covid-19-coronavirus.jpg',
    title: 'Wear the mask and dont forget vacciantion certifacte.',
    
  },
  {
    img: 'https://t4.ftcdn.net/jpg/03/14/15/07/360_F_314150765_q2DxXZrbll9KQhe8KnVCvvFPnvv2NbM4.jpg',
    title: 'Make sure of travel requirements.',
    
  }
];
const StyledModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Backdrop = styled('div')`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const style = {
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  p: 2,
  px: 4,
  pb: 3,
};
const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


return ( 
  
<div id='container2'  className={css` background-color:white; height: 1000px; `} >
  
   <div name="content">
<<<<<<< Updated upstream:frontend/src/components/User.jsx
      <div id='container' className={css` color: white; position: absolute; width: 100%; height: 620px; `} style={{backgroundImage: 'url("/wall5.jpg")'}}>
          <Top2/> 
=======
      <div id='container' className={css` color: white; position: relative; width: 100%; height: 620px; `} style={{backgroundImage: 'url("/wall5.jpg")'}}>
          <NavBar state1="landingPage"/> 
>>>>>>> Stashed changes:frontend/src/components/LandingPage.jsx
          <div class="overlay">       <div class="text">Fly Safe.</div>     </div>
      </div>
      <br></br>
      <br></br>
      <br></br>
     
<form className={css`
  box-shadow: 0px 0px 100px 1px lightGray; position: relative; left: 12%; top:73%; background-color:white; border-radius: 20px; 
  width: 75%;  padding: 20px; font-family: 'Josefin Sans';  font-size: 10px;`} >  
  
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

<div className={css`display:flex; postion:relative`}>

<Autocomplete  inputValue={from} onInputChange={handleFrom} options={options} sx={{ width: 400 }}
renderInput={(params) => <TextField  {...params}  label="From" />}  />
 
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   <img src="/rt2.png" alt="" /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

<Autocomplete  inputValue={to} onInputChange={handleTo} options={options} sx={{ width: 400 }} 
renderInput={(params) => <TextField  {...params}  label="To" />} />
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 


<MuiPickersUtilsProvider utils={DateMomentUtils}>

<KeyboardDatePicker variant="inline" inputVariant="outlined"  label="Departure" value={departureDate} onChange={setDeparture} InputAdornmentProps={{ position: "start" }} />
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
<KeyboardDatePicker variant="inline" inputVariant="outlined" label="Return" value={returnDate} onChange={setReturn} InputAdornmentProps={{ position: "start" }} />

</MuiPickersUtilsProvider>

</div>
        
 
 <br></br>
    <div style={{display:'flex'}}>
    <FormControl>
    <InputLabel >Cabin</InputLabel>
        <Select value={cabin} label="Cabin" sx={{width: 150}} onChange={handleCabin} >
         <MenuItem value="Economy">Economy</MenuItem>
          <MenuItem value="Business">Business</MenuItem>
          <MenuItem value="First">First</MenuItem>
        </Select> 
      </FormControl>


 &nbsp;&nbsp;&nbsp;


 <FormControl>
    <InputLabel> Seats<br></br><br></br>
    <label style={{color: "black", fontSize: '22px'}}>{adults} Adults, {children} Children</label>
    </InputLabel>
        <Select multiple value={xxx} label="Seats" sx={{width: 400}}>
        
      <div style={{padding:"15px"}}>  
        
      <ManIcon style={{ transform: 'scale(1.5)'}}/>&nbsp;&nbsp;<label>Adults (12+ years)</label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <ButtonGroup variant="outlined" aria-label="outlined button group">
        <Button onClick={handleAdultsMinus}>-</Button>
        <Button>{adults}</Button>
        <Button onClick={handleAdultsPlus}>+</Button>
      </ButtonGroup>
      <br></br> <br></br>
      <ChildCareIcon /> &nbsp;<label>Children (2-11 years)</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <ButtonGroup variant="outlined" aria-label="outlined button group">
        <Button onClick={handleChildrenMinus}>-</Button>
        <Button>{children}</Button>
        <Button onClick={handleChildrenPlus}>+</Button>
      </ButtonGroup>
      </div>

        </Select>
      </FormControl>


   
      

<input style={{position: "absolute", left: "75%", top: "60%"}} 
class="btn btn-primary btn-lg" type="submit" value='Search Flights' onClick={handleclick1} /> 
</div>
</form>  
<br></br>
<br></br>
<br></br>
<br></br>

  <form style={{color:'#1976d2', fontSize:'20px', position:'relative', left:'28%',width:'25%',textAlign:'center'} }>

    <h2 style={{color:'#1976d2', fontSize:'30px', position:'relative', left:"41%", textTransform:'uppercase', fontFamily: 'Josefin Sans'  }}> SAFELY FLIGHTS</h2>
    <p style={{width:'200%', position:'relative', left:'-10%', fontFamily: 'Josefin Sans'}}>If you’re travelling soon, here are some important tips to help you prepare for your journey.</p>

    <p style={{position:'relative', left:"-25%"}}>____________________________________________________________________________________________</p>
  
    <div style={{width:'50', left:'-55%' , position:'relative'}}>
    <ImageList sx={{ width: 1200, height: 400, }}>
        <ImageListItem key="Subheader" cols={3}>
          <ListSubheader component="div"></ListSubheader>
        </ImageListItem>
        {itemData2.map((item) => (
          <ImageListItem key={item.img}>
            <img
              src={`${item.img}?w=248&fit=crop&auto=format`}
              srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={item.title}
              loading="lazy"
            />
            <ImageListItemBar
              title={item.title}
             
            />
          </ImageListItem>
        ))}
    </ImageList>
       
        </div>
     
  </form>

  <br></br>
  <br></br>
  <br></br><br></br><br></br>
  <form style={{color:'#1976d2', fontSize:'20px', position:'relative', left:'28%',width:'25%',textAlign:'center'} }>

<h2 style={{color:'#1976d2', fontSize:'30px', position:'relative', left:"41%", textTransform:'uppercase', fontFamily: 'Josefin Sans'  }}>Top Destinations</h2>
<p style={{width:'200%', position:'relative', left:'-10%', fontFamily: 'Josefin Sans'}}>Take a look for the most visited Destinations in 2021. </p>
<p style={{position:'relative', left:"-25%"}}>____________________________________________________________________________________________</p>

<div style={{width:'50', left:'-00%' , position:'relative'}}>
<ImageList sx={{ width: 800, height: 800, }}>
            <ImageListItem key="Subheader" cols={2}>
              <ListSubheader component="div"></ListSubheader>
            </ImageListItem>
            {itemData.map((item) => (
              <ImageListItem key={item.img}>
                <img
                  src={`${item.img}?w=248&fit=crop&auto=format`}
                  srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  alt={item.title}
                  loading="lazy"
                />
                <ImageListItemBar
                  title={item.title}
                  subtitle={item.author}
                  actionIcon={
                    <IconButton
                      sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                      aria-label={`info about ${item.title}`}
                    >
                      <InfoIcon> onClick{handleOpen} 
                      
                      </InfoIcon>
                                            
                    </IconButton>
                  }
                />
              </ImageListItem>
            ))}
        </ImageList>
       
  
    
   
    </div>
 
</form>
  
</div>


</div>

)} 

export default User;
