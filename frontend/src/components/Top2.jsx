import react, {useEffect,useState} from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { css} from '@emotion/css'


import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import ArticleIcon from '@mui/icons-material/Article';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';

import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import * as React from 'react';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from '@mui/material/MenuList';
import Divider from '@mui/material/Divider';



function Top2(){      //for USER & GUEST
   
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

// MUI Profile Dropdown
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);
 
// ----------


return (
    <div className={css`
    width: 100%;
    display:flex;
    height: 75px;
    position: fixed;
    padding-top:15px;
    top: 0px;
    left: 0px;
    z-index:1;
    color:	white;
    font-family:"Josefin Sans";  `}>
       
      
    <img className={css`position: absolute; left: 10%; `} src="/logo.png" />
      
         
    <div className={css`position: absolute; left: 75%;` }>
    <label className={css` font-size: 20px;  &:hover{cursor: pointer;} `} onClick={handleclick7}>BOOK</label>  
    &nbsp; &nbsp; &nbsp;    &nbsp; &nbsp;  
 
    <label className={css`   font-size: 20px;  &:hover{cursor: pointer;}`} onClick={showBookings}>ABOUT</label> 
   </div>
    

 <AccountCircleRoundedIcon  ref={anchorRef}
        id="composition-button"
        aria-controls={open ? 'composition-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleToggle} className={css`position: absolute; left: 88%; transform: scale(1.5)  ; `}/>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-end"
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom-start' ? 'left top' : 'left bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                  >
                     &nbsp;&nbsp;&nbsp;<PersonIcon/>&nbsp; {x} &nbsp;&nbsp;
                    <Divider/>
                    
                    <MenuItem onClick={handleclick8}><EditIcon/> &nbsp; Edit Profile</MenuItem>
                    <MenuItem onClick={showBookings}><ArticleIcon/> &nbsp; My Bookings</MenuItem>
                  
                  
                    
                    <MenuItem onClick={handleclick9}>&nbsp;<LogoutIcon/> &nbsp;  Logout</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>

 </div>


);
} 

export default Top2;
