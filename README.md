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

# Installation:

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



# Code Example.


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

<img width="1304" alt="Screenshot 2021-12-29 at 8 43 52 PM" src="https://user-images.githubusercontent.com/68854085/147696984-ba478207-7cfa-43e8-8f1a-65e023b0c79b.png">

<img width="1440" alt="Screenshot 2021-12-29 at 8 44 20 PM" src="https://user-images.githubusercontent.com/68854085/147696976-a09d26e9-a758-40af-a9b3-a470e8e3f92f.png">

<img width="1440" alt="Screenshot (117)" src="https://user-images.githubusercontent.com/93484250/213840487-05c24385-37ee-4c69-9af9-e52edbbb5812.png">

<img width="1440" alt="Screenshot (118)" src="https://user-images.githubusercontent.com/93484250/213840486-726de13d-8056-43e9-86d3-2f654720219c.png">

<img width="1440" alt="Screenshot (120)" src="https://user-images.githubusercontent.com/93484250/213840485-98d97dcb-42f4-4de2-93ba-61f67d1652db.png">

<img width="1440" alt="Screenshot (122)" src="https://user-images.githubusercontent.com/93484250/213840483-bbea46aa-bb3c-4cae-922b-7f1765b7ed12.png">

<img width="1440" alt="Screenshot (123)" src="https://user-images.githubusercontent.com/93484250/213840717-659255ea-3075-48d9-bc74-6e56348de1a1.png">

<img width="1440" alt="Screenshot (124)" src="https://user-images.githubusercontent.com/93484250/213840480-ba26b964-7a9b-4d60-80b0-6c3d57eb8f90.png">



# Contributors 

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








