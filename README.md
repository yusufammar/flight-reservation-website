# ✈️ Flight Reservation Website - **SAMYH**

**MERN Stack | Yusuf Ammar's Repository**


## 📝 Project Description

A user-friendly flight reservation website for the fictional airline **SAMYH**. Users and guests can search for flights, reserve seats, edit or cancel reservations. Admins have full control over the flight system, including adding, editing, and deleting flights.



## 🎯 Motivation

To create a complete, responsive MERN stack application that simulates a real-world airline reservation system.



## ⚙️ Technologies Used

- React
- Node.js
- Express.js
- MongoDB
- REST API
- Axios



## 🚀 Live Demo

> **Frontend:** Deployed on Vercel: [https://flight-reservation-website.vercel.app/](https://flight-reservation-website.vercel.app/)
> 
> 
> **Backend**: Hosted on Render: [https://flight-reservation-website-ltkz.onrender.com/](https://flight-reservation-website-ltkz.onrender.com/)
> 



## 💻 Installation (Local Development)

1. **Install dependencies:**
    - **Backend (Inside `/server` folder):**
        
        ```
        cd server
        npm install
        ```
        
    - **Frontend (Inside `/client` folder):**
        
        ```
        cd client
        npm install
        ```
        
2. **Start the development servers:**
    - **Backend:**
        
        ```
        cd server
		node App.js
        ```
        
        > Wait for MongoDB connected log message.
        > 
    - **Frontend:**
        
        ```
        cd client
        npm start
        ```
        


## ✨ Features

- Sign up, Sign in for customers
- Flight search (filter by date, location)
- Flight booking (guest or registered user)
- Email confirmation and itinerary (PDF)
- Admin dashboard to manage flights
- Reservation management (edit, cancel)



## ✅ Functional Tests (Manual)

### 1. Auth

- Sign up with a new user
- Sign in with an existing user

### 2. User/Guest

- Booking flights “Try LAX (Jan 12 2022) -> JFK (Jan 22 2022)”
- Editing flight seats of a booking.
- Cancelling bookings and email notification
- Sending ticket as pdf by email

### 3. Admin

- Showing a list of all flights on the DB.
- Searching criteria.
- Editing flights.
- Adding/deleting flights (to be fixed)

**🔐 Admin Credentials**

```
Username: admin
Password: admin
```



## Code Example

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

      


## 📷 Screenshots

<img width="1304" alt="Screenshot 2021-12-29 at 8 43 27 PM" src="https://user-images.githubusercontent.com/68854085/147696994-7da18324-41ef-4821-bffb-845b754f59f9.png">

<img width="1304" alt="Screenshot 2021-12-29 at 8 43 52 PM" src="https://user-images.githubusercontent.com/68854085/147696984-ba478207-7cfa-43e8-8f1a-65e023b0c79b.png">

<img width="1440" alt="Screenshot 2021-12-29 at 8 44 20 PM" src="https://user-images.githubusercontent.com/68854085/147696976-a09d26e9-a758-40af-a9b3-a470e8e3f92f.png">

<img width="1440" alt="Screenshot (117)" src="https://user-images.githubusercontent.com/93484250/213840487-05c24385-37ee-4c69-9af9-e52edbbb5812.png">

<img width="1440" alt="Screenshot (118)" src="https://user-images.githubusercontent.com/93484250/213840486-726de13d-8056-43e9-86d3-2f654720219c.png">

<img width="1440" alt="Screenshot (120)" src="https://user-images.githubusercontent.com/93484250/213840485-98d97dcb-42f4-4de2-93ba-61f67d1652db.png">

<img width="1440" alt="Screenshot (122)" src="https://user-images.githubusercontent.com/93484250/213840483-bbea46aa-bb3c-4cae-922b-7f1765b7ed12.png">

<img width="1440" alt="Screenshot (123)" src="https://user-images.githubusercontent.com/93484250/213840717-659255ea-3075-48d9-bc74-6e56348de1a1.png">

<img width="1440" alt="Screenshot (124)" src="https://user-images.githubusercontent.com/93484250/213840480-ba26b964-7a9b-4d60-80b0-6c3d57eb8f90.png">





## Contributors 

The project is created with the contribution of 5 members.
* https://github.com/yusufammar
* https://github.com/MayarEzzeldin
* https://github.com/AdhamElsheikh
* https://github.com/hossammeligy
* https://github.com/Shorook1

## Credits

	 https://mui.com
	 https://www.codecademy.com/learn/react-101	
	 https://www.w3schools.com/nodejs/
	 https://expressjs.com/








