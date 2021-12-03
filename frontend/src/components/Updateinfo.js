import 'bootstrap/dist/css/bootstrap.min.css'
import React, {useState} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useHistory,useLocation } from "react-router-dom";
import { Component } from "react";




export default class Updateinfo extends Component{
    
    constructor(props){
        super(props);

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
       this.onChangeType = this.onChangeType.bind(this);
       


        this.state =
        {
            Name:'',
            Email:'',
            Password:'',
            Type:'Customer'
        }

       


        
     
    }
    

//   if(this.state=null){
//             alert("access denied , you are not logged in")
//             window.location.href("./");
//         }
     
   

onChangeName(e) {
    this.setState({
        Name: e.target.value

    });
}

onChangeEmail(e) {
    this.setState({
        Email: e.target.value

    });
}

onChangePassword(e) {
    this.setState({
        Password: e.target.value

    });
}

onChangeType(e) {
    this.setState({
        Type: e.target.value

    });
}



onSubmit(e){
    

    


    e.preventDefault();
    console.log("1")
    const user = {
        Name : this.state.Name,
        Email : this.state.Email,
        Password : this.state.Password,
        // Type : this.state.Type

    }


    axios.post('http://localhost:8000/UpdateBookingUser', user)
    console.log(user)
    console.log("1")
    axios.post('http://localhost:8000/Updateinfo', user)
    alert('informations has been updated successfully');
    window.location.href = "/SignIn";
    console.log("Redirecting");
    if(user.Email==''||user.Name==''||user.Password==''){
    alert("please fill in all the fields to update your informations")
}
else{
    
}
    return false ;

}

Redirect()
{   
    // alert("You have updated your informations successfully!");
    // window.location.href = "/SignIn";
 
}

render(){
return(
    <div>
    <h3>You are updating your info</h3>
    <form onSubmit = {this.onSubmit.bind(this)}  onClick= {this.Redirect}>
        <div className = "form-group">
            <label>
                Name:
            </label>
            <input type = "text" required className="form-control" value={this.state.Name} onChange={this.onChangeName.bind(this)}/>

            
        </div>

        <div className = "form-group">
            <label>
                Email:
            </label>
            <input type = "text" required className="form-control" value={this.state.Email} onChange={this.onChangeEmail.bind(this)}/>

            
        </div>



        <div className = "form-group">
            <label>
                Password:
            </label>
            <input type = "text" required className="form-control" value={this.state.Passworde} onChange={this.onChangePassword.bind(this)}/>

            
        </div>


        <div className = "form-group">
            <label>
                Type:
            </label>
            <input type = "text" required className="form-control" value={this.state.Type} onChange={this.onChangeType}/>

            
        </div>
        <label>
               
            </label>
            <input type = "submit" required className="form-control" className = "btn btn-primary" />

<div>

</div>


    
    
    </form>
    </div>
)

}
}
