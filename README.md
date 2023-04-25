## **Introduction**

As part of the Code Challenge for Bolt and Dash, this Simulated Surveillance Camera Management System web application was created to simulate a network of surveillance cameras in a building or home. 

The app was built with React, Vite, Node.js, Express.js, MySQL, Jest, Mantine, TailwindCSS, video.js, chart.js and ml5.js.

It utilizes a combination of different tools, including machine learning for realtime object detection, that showcase my skills and abilities.


Required app features include:

1. Login functionality with user
2. Allow operators to view simulated past footage from each camera
3. Alert operators when a camera goes offline or detects simulated motion or sound
4. Design and implement a responsive UI that works well on both desktop and mobile
devices


## **How to run the app**

To launch the app in your environment, follow these steps:
## Setup
1. Clone the entire repository:
```bash
git clone https://github.com/NoorChasib/SCMS.git
```

### Database
1. Install MySQL on your device if not already installed.

2. Once MySQL is installed, start your server.

3. Note your MySQL credentials for later use.

4. Navigate to schema file:
```bash
cd SCMS/backend/src/db
```
3. Create a new database
```bash
CREATE DATABASE SCMS;
```
4. Switch to the new database:
```bash
USE SCMS;
```
5. Run the schema file:
```bash
USE schema.sql;
```
6. Your database should be set up with the tables and columns defined in the schema file. Alternatively, if you have MySQL Workbench you can copy and past the schema.sql file contents and run the query.

### ENV Setup
#### Backend
1. Convert the .env.example file from within the backend folder to just .env and input the correct variables.

```bash
example
DB_HOST="localhost"
DB_PORT="3306"
DB_USER="root"
DB_PASS="mysql123"
DB_NAME="SCMS"
JWT_SECRET_KEY=my-long-random-secret-key
JWT_EXPIRATION=1d
BACKEND_PORT=3000
FRONTEND_PORT=8000
```

#### Frontend
1. Convert the .env.example file from within the frontend folder to just .env and input the same port numbers as the backend. 

```bash
example
VITE_BACKEND_PORT=3000
VITE_FRONTEND_PORT=8000
```


### Backend
1. Navigate to the cloned repository:
```bash
cd SCMS
```
2. Start the server for the Backend:
```bash
npm run start:backend
```
3. Open your browser and navigate to `http://localhost:3000` to view the app.

### Frontend
1. In a second terminal window, navigate to the cloned repository:
```bash
cd SCMS
```
3. Start the server for the Frontend:
```bash
npm run start:frontend
```
3. Open your browser and navigate to `http://localhost:8000` to view the app.

## Note
You do NOT need to run `npm i` or cd into the frontend/backend folders. The `npm run start:___` commands handle it all for you.

## **Testing**

### Backend
1. Navigate to the backend folder within SCMS:
```bash
cd backend
```
2. run Jest tests within the terminal:
```bash
npm test
```

## **Demo**


