# SAMYH


# Project Title:
SAMYH-Airline Reservation System

# Project description: 
A user friendly website for airline called “SAMYH” to make reservations for flights on the system for users and guests by searching for flights, reserve it and they have more functionalities as edit their reservations and cancelling it. also allowing the administers to edit on it the flights system between adding, deleting and editing flights details.

# Motivation:
Our vision was to create user-friendly website using MERN stack 

# Technologies:
*Node Js
*React
*Express
*Mongo DB
*REST API

# installation:

Locally:
-	Clone the link of repository from github.
-	Open new terminal.
-	`Cd src`
-	 `node app` “wait until MongoDB connected”.
-	Open new terminal.
-	`Cd frontend`
-	`npm start` “wait until your browser open automatically”.


# Tests:

For Admin:
-	The list of all flights on the DB.
-	Searching criteria.
-	Editing flights.
-	Adding/deleting flights
-	
For User/Guest:
-	Booking flights. “you can go with LAX->JFK on 12 .jan.2022 and 22.jan.2022 as example” 
-	Editing flights seats.
-	Cancelling his booked flights
-	The ticket as PDF attachment email after reservation and cancelling 



# code example.


NODEJS: 

    useEffect(() => {
        
     axios.get('http://localhost:8000/currentUser').then(res =>{ 
        if (res.data=="0" || res.data.type=="Customer" || res.data.type=="Guest" ){
        alert("Access Denied, Please Sign In First");
        history.push({pathname:"/SignIn"});
        }
        // else go to admin page
     })
    }, [location]);
    
    const [FlightNo, setFlightNo] = useState("");
    const [FlightFrom, setFlightFrom] = useState("");
    const [FlightTo, setFlightTo] = useState("");
    const [FlightDate, setFlightDate] = useState("");
    const [FlightDep, setFlightDep] = useState("");
    const [FlightArr, setFlightArr] = useState("");
    const [FlightFirst, setFlightFirst] = useState("");
    const [FlightBus, setFlightBus] = useState("");
    const [FlightEco, setFlightEco] = useState("");
    const [checked, setChecked] = useState(false);

      


# Screenshots

<img width="1304" alt="Screenshot 2021-12-29 at 8 43 27 PM" src="https://user-images.githubusercontent.com/68854085/147696994-7da18324-41ef-4821-bffb-845b754f59f9.png">
<img width="1306" alt="Screenshot 2021-12-30 at 5 44 06 AM" src="https://user-images.githubusercontent.com/68854085/147720403-d4f2bec3-fb96-488b-84f6-4a1f046300f2.png">
<img width="1306" alt="Screenshot 2021-12-30 at 5 44 26 AM" src="https://user-images.githubusercontent.com/68854085/147720414-0dead41e-0b2f-4ea9-926f-33ae954b1cd2.png">
<img width="1304" alt="Screenshot 2021-12-29 at 8 43 52 PM" src="https://user-images.githubusercontent.com/68854085/147696984-ba478207-7cfa-43e8-8f1a-65e023b0c79b.png">
<img width="1440" alt="Screenshot 2021-12-29 at 8 44 20 PM" src="https://user-images.githubusercontent.com/68854085/147696976-a09d26e9-a758-40af-a9b3-a470e8e3f92f.png">
<img width="1440" alt="Screenshot 2021-12-29 at 8 45 03 PM" src="https://user-images.githubusercontent.com/68854085/147696974-c55ba003-4dad-4fc3-aca5-7fdbe5e665ff.png">
<img width="1440" alt="Screenshot 2021-12-29 at 8 45 41 PM" src="https://user-images.githubusercontent.com/68854085/147696970-1a79449a-5098-43fe-961b-598bf4abf617.png">
<img width="1440" alt="Screenshot 2021-12-29 at 8 46 02 PM" src="https://user-images.githubusercontent.com/68854085/147696963-36f11a4b-05cd-49f7-bb40-444c0b118156.png">




# contributions 

The project is created with the contribution of 5 members.
* https://github.com/yusufammar
* https://github.com/MayarEzzeldin
* https://github.com/AdhamElsheikh
* https://github.com/hossammeligy
* https://github.com/Shorook1

# Credits

	 https://mui.com
	 https://www.codecademy.com/learn/react-101	
	 https://www.w3schools.com/nodejs/
	 https://expressjs.com/








