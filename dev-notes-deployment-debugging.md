## 🚀 Deployment Notes

> 🔁 Main branch is connected to Render. Committing to main automatically redeploys both frontend and backend.
> 

### Deployment Strategy

- **Frontend(React) + Backend (Node/Express)** → Deployed on **Render** as single app

---

### 🧪 Localhost: React + Environment Variables

- When running React locally:
    - Changes to `.env` require a new build:
        
        ```bash
        npm run build
        ```
        
    - Because `.env` is only read during build time
- **Note:** React build files (`/build`) are ignored by Git (`.gitignore`)
- Vercel builds the frontend automatically on deploy using the current `.env` values

---

### 🧪 Localhost Frontend + Remote Backend

- React (`localhost:3000`) calling deployed API (e.g., Render)
- Ensure:
    - CORS allows `localhost`
    - React uses full deployed API URL in development
        
        ```jsx
        App.url = 'https://your-api.onrender.com';
        ```
        

---

### 🔀 Single vs. Separate Deployment

- **Single App (e.g. Heroku):**
    - Backend serves React build as static files
    - Needs:
        
        ```jsx
        if (process.env.NODE_ENV === 'production') {
          app.use(express.static('client/build'));
          app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, 'client/build/index.html'));
          });
        }
        ```
        

---

### 🔀 Separate Deployment (Best Practice)

### ✅ Benefits:

- Clean separation of frontend/backend
- Easier to deploy, scale, debug
- Modern architecture standard

---

### ⚙️ Backend (e.g., Render)

### ✅ Recommended CORS Setup:

```jsx
// **controller.js**
const allowedOrigins = [
  'https://flight-reservation-website.vercel.app',
  'http://localhost:3000'
];

router.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST'],
  credentials: true, // allows sending cookies
}));
```

This allows:

- Your frontend in production (Vercel)
- Local development frontend (localhost:3000)

---

### 💻 Frontend (e.g., Vercel)

### ✅ Dynamic Backend URL in `App.js`:

```jsx
function App() {
  if (process.env.NODE_ENV === 'production') {
    App.url = process.env.REACT_APP_API_URL;
  } else {
    App.url = 'http://localhost:8000';
  }
}
```

- In `.env`:
    
    ```jsx
    REACT_APP_API_URL=https://your-backend.onrender.com
    ```
    

### ✅ Sample Axios Call (`FlightList.js`):

```jsx
axios.get(App.url + '/currentUser');
```

Or use `axios.create()` globally:

```jsx
const api = axios.create({
  baseURL: App.url,
  withCredentials: true,
});
```

|


## 🗒️ Yusuf’s Personal Notes

- This is a **forked repo** to avoid unwanted changes by contributors.
- Contributors can be tracked under GitHub `Insights > Contributors`.
- Avoid importing/exporting changes with the original repo from now on.
- No license = code cannot be reused without permission.

Here is your **MongoDB Notes** section, rewritten with better formatting and clarity, while keeping **all original information** intact:



## 🗃️ MongoDB Personal Notes (Developer: `yusufammar`)

### 🔄 Maintenance Routine

- Periodically **check if the MongoDB cluster is live**.
- Perform a **database reload** if many bookings are made during testing (especially by guests).

---

### 🏢 Cluster Structure

There are **2 MongoDB clusters** hosted under **2 different organizations**:

| Cluster Name | Access Type | MongoDB Account |
| --- | --- | --- |
| `GUC` | Shared | `adham.elsheikh@student.guc.edu.eg` |
| `GUC_Yusuf` | Private | `yousifammar.ya@gmail.com` |
- ✅ **Backend code is currently using** the cluster in `GUC_Yusuf` to avoid accidental modifications by other contributors.

---

### 👤 MongoDB Accounts

- `Adham.elsheikh@student.guc.edu.eg` (GUC)
- `yousifammar.ya@gmail.com` (GUC & GUC_Yusuf)

---

### 💾 Database Backup – `mongodump`

**Use this to create a backup of the database.**

### ➤ Step-by-step:

1. Open CMD/Terminal.
2. Run the command:
    
    ```bash
    mongodump --uri="mongodb+srv://Yusuf:pass1234@cluster0.qzglopr.mongodb.net/Airline_Backup"
    ```
    
3. A folder named `dump` will be created in your user directory containing the backup.

### 💡 Command Breakdown:

```bash
mongodump --uri="[cluster connection string]/[target database name]"
```

---

### ♻️ Database Reload – `mongorestore`

**Use this when you need to reset the live DB to a known backup state.**

### ➤ Step-by-step:

1. **Delete the `Airline` database** from MongoDB Atlas manually.
2. Download and extract the backup:
    
    [🔗 Download Link](https://drive.google.com/file/d/1cjuWPF2IJkrEUxqiuJVG_3a0VlUbMYjb/view?usp=sharing)
    
3. Save the extracted folder (named `Airline_Backup`) in your `Downloads` directory.
4. Open CMD/Terminal in the Downloads folder (type `cmd` in the address bar).
5. Run:
    
    ```bash
    mongorestore --uri="mongodb+srv://Yusuf:pass1234@cluster0.qzglopr.mongodb.net/Airline" Airline_Backup
    ```
    

### 💡 Command Breakdown:

```bash
mongorestore --uri="[cluster connection string]/[database to restore into]" [relative path to backup folder]
```

---

### 📚 More Info

- [📘 Stack Overflow: Copy MongoDB Data Between Projects](https://stackoverflow.com/questions/60302137/how-do-i-copy-all-data-from-one-mongodb-cloud-project-to-another)


## ✴️ Error Debugging Notes

### 🔒 `digital envelope routines::unsupported`

- **Error Message:**
    
    ```
    Error: error:0308010C:digital envelope routines::unsupported
    code: 'ERR_OSSL_EVP_UNSUPPORTED'
    Node.js v22.13.0
    ```
    
- **Cause:** Node.js v17+ with Webpack (e.g., CRA)
- **Fix (run in client folder):**
    
    ```bash
    export NODE_OPTIONS=--openssl-legacy-provider
    npm start
    ```
    

---

### ➿ Double Slash in URL

- **Error Example:** `https://domain.com//currentUser` → 404
- **Causes:**
    - Incorrect URL concatenation logic (e.g., both base and route start/end with `/`)
    - Faulty `.env` values (e.g., trailing `/`)
- **Fixes:**
    1. Recheck concatenation logic:
        
        ```jsx
        axios.get(App.url + '/currentUser');
        ```
        
    2. Sanitize base URL:
        
        ```jsx
        App.url = App.url.replace(/\/$/, '');
        ```
        

---

