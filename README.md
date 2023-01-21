# SAMYH (MERN Stack)


# Project Title:
SAMYH-Airline Reservation System

# Project description: 
A user friendly website for airline called “SAMYH” to make reservations for flights on the system for users and guests by searching for flights, reserve it and they have more functionalities as edit their reservations and cancelling it. also allowing the administers to edit on it the flights system between adding, deleting and editing flights details.

# Motivation:
Our vision was to create user-friendly website using MERN stack 

# Technologies:
-	Node Js <br>
-	React <br>
-	Express <br>
-	Mongo DB <br>
-	REST API <br>

# Installation:
-	Clone repository locally using github desktop or download repository zip folder and extract it.
-	Download backend node modules 
	-	Link: https://drive.google.com/file/d/1B6XWEM-3bsJCZXyqjczUiZuGhVnvZLWX/view?usp=sharing
	-	Extract File and move "node_modules" folder to repository in "backend" folder
-	Download frontend node modules 
	-	Link: https://drive.google.com/file/d/1ayfIaY0WBtonf4d7UH8G4wh0xmQetCUu/view?usp=sharing
	-	Extract File and move "node_modules" folder to repository in "frontend" folder

# Running:
-	Run backend:
	-	Open cmd/terminal in repository directory 
	-	`cd backend`
	-	`cd src`
	-	`node app` -> wait until "MongoDB connected" else make sure mongodb databse is live
	
-	Run frontend:
	-	Open cmd/terminal in repository directory
	-	`cd frontend` 
	-	`npm start` -> wait until your browser opens automatically


# MongoDB Personal Notes (Developer 'yusufammar' Notes) 
-	Periodically check if the cluster is live and do a database reload if needed (if there are a lot of bookings done by guests while testing the website)
-	Note there are 2 clusters that can be used on 2 different organizations: GUC (accesible to all contributors using adham's account) & GUC_Yusuf (accessible only by yusufammar's mongodb account to avoid changes done by other contributors)
-	Currently the cluster being using in backend code is the one in GUC_Yusuf 

	MongoDb Accounts:
	-	Adham.elsheikh@student.guc.edu.eg (GUC)
	-	yousifammar.ya@gmail.com (GUC & GUC_Yusuf)

-	To do database backup and restores we use mongodump and mongorestore instruction in cmd/terminal but first you need to install mongodb tools
-	More Details: https://stackoverflow.com/questions/60302137/how-do-i-copy-all-data-from-one-mongodb-cloud-project-to-another

<br><br>

**MongoDB Database Backup (mongodump)**

-	Open cmd/terminal and run this code
	-	mongodump --uri="mongodb+srv://Yusuf:pass1234@cluster0.qzglopr.mongodb.net/Airline_Backup"
		-	(backup database for 'Airline_Backup' database in your mongoDb cluster will be saved in a folder named 'dump' in your users folder)
	-	mongodump code explanation: mongodump --uri="[connection string of cluster]/[name of database to create backup for]"


<br><br>


**MongoDB Database Reload (mongorestore)**

-	Delete Airline Database in mongodb
-	Download file (save in downloads) and extract file
	-	Link: https://drive.google.com/file/d/1cjuWPF2IJkrEUxqiuJVG_3a0VlUbMYjb/view?usp=sharing
-	Open command prompt / terminal in downloads (by opening downloads folder and typing address bar -> cmd) and run this code
	-	mongorestore --uri="mongodb+srv://Yusuf:pass1234@cluster0.qzglopr.mongodb.net/Airline" Airline_Backup
	-	mongorestore code explanation: mongorestore --uri="[connection string of cluster]/[database restore name]" [path (relative path) of backup folder ]	

	
<br><br>

# Personal Notes (Developer 'yusufammar' Notes) :
-	This is a forked repo of the original repo to avoid further changes from contributors, as this forked repo has no contributors (contributors are the only ones allows to push code into the repo)
-	If the original (public) repo gets deleted nothing will happened to this forked repo.
-	From now on don't do or export any changes to original repo. Also, don't import any changes from original repo. All changes should only be done exclusively to this repo and work as if the original repo doesn't exist any more.
-	No license in a repo means that it is not allowed to be used by other people 
-	Under insights tab -> contributors, you can find the rate of contribution of each member to the 'main' branch, considering this you can share this repo's link with your contributors if they want and save yourself the hassle of telling them how to fix the original repo




# Tests:

1- Sign Up & Sign In

2- For User/Guest:
-	Booking flights “Try LAX (Jan 12 2022) -> JFK (Jan 22 2022)” 
-	Editing flight seats of a booking.
-	Cancelling bookings and email notification
-	Sending ticket as pdf by email

3- For Admin:
-	Showing a list of all flights on the DB.
-	Searching criteria.
-	Editing flights.
-	Adding/deleting flights (to be fixed)

Admin Credentials:
	
	Username: admin
	password: admin


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








