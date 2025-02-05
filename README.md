# Railway Management System

**Railway Management System** is a project that simulates the core functionalities of the IRCTC system. The system enables users to:

- Register
- Login
- Check seat availability
- Book train tickets
- Get booking details 
- Add new train (admin)
- Update train details (admin)

This system also implements role-based authorization for admins and users

The backend is developed using **Node.js**, **Express.js**, and **MySQL** as database to ensure efficient and scalable performance.

---

## Project Setup

### Prerequisites

To run this project, ensure you have the following installed:

- Node.js
- MySQL
- Postman


### Environment Variables

Create a `.env` file in the root of your project with the following environment variables:

```bash
PORT=4080
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=root
DB_NAME=railway_management
JWT_SECRET=6046ce1f64995285de5e43b261dd4432442760878066ea00590424c461a06d02
API_KEY=adminAccessKey
```

### Installation

1. Clone the repository to your local machine:
   ```bash
      git clone https://github.com/Aman-X7/WorkIndia_RailwayManagement
      cd WorkIndia_RailwayManagement
   ```
2. Install all necessary dependencies using npm:

   ```bash
    npm install
   ```

3. Set up your MySQL database:

- Create a MySQL database named workindia.
- Run the SQL scripts to create necessary tables (users, trains, bookings).

Example:

```bash

CREATE DATABASE railway_management;
USE railway_management;

CREATE TABLE users (
   user_id INT AUTO_INCREMENT PRIMARY KEY,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   name VARCHAR(255) NOT NULL,
   email VARCHAR(255) UNIQUE NOT NULL,
   password VARCHAR(255) NOT NULL,
   role ENUM('user', 'admin') DEFAULT 'user'
);

CREATE TABLE trains (
   train_id INT AUTO_INCREMENT PRIMARY KEY,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   train_number VARCHAR(50) NOT NULL,
   source VARCHAR(255) NOT NULL,
   destination VARCHAR(255) NOT NULL,
   total_seats INT NOT NULL,
   available_seats INT NOT NULL
);

CREATE TABLE bookings (
   id INT AUTO_INCREMENT PRIMARY KEY,
   user_id INT,
   train_id INT,
   seats INT NOT NULL,
   FOREIGN KEY (user_id) REFERENCES users(user_id),
   FOREIGN KEY (train_id) REFERENCES trains(train_id)
);

```

### Starting the Server

Once the setup is complete, start the server using npm:

```bash

  node server.js

```

#### Note :- By default, the server will run on port 4080. You can access the API at http://localhost:4080.

### API Endpoints

#### User Routes

1. Register a new user
   - HTTP Method :- POST
   - Endpoint :- http://localhost:4080/user/register
   - Body:

```bash
{
  "name": "Aman Raj",
  "email": "aman@gmail.com",
  "password": "test123"
}

```

2. Login
   - HTTP Method :- POST
   - Endpoint :- http://localhost:4080/user/login
   - Body:

```bash
{
  "email": "aman@gmail.com",
  "password": "test123"
}
```

3. Check train availability

   - HTTP Method :- GET
   - Endpoint :- http://localhost:4080/user/availability?source=Jaipur&destination=Agra
   - Query Parameters
     - source: Source station (e.g., "Jaipur")
     - destination: Destination station (e.g., "Agra")
   - Response:

```bash
{
    "available": true,
    "availableTrainCount": 1,
    "trains": [
        {
            "trainNumber": "104040",
            "availableSeats": 150
        }
    ]
}

```

4.  Book Seats
    - HTTP Method :- POST
    - Endpoint :- http://localhost:4080/user/book
    - Request Body:

```bash
{
  "trainId": 4,
  "seatsToBook": 1
}

```

- Response:

```bash
{
  "message": "Seats booked successfully"
}
```

Note :- Requires JWT authentication via headers.

5.  Booking Details

    - HTTP Method :- GET
    - Endpoint :- http://localhost:4080/user/getAllbookings

    - Response:

```bash
[
    {
        "booking_id": 11,
        "number_of_seats": 150,
        "train_number": "104040",
        "source": "Jaipur",
        "destination": "Agra"
    }
]


```

#### Admin Routes

1.  Add a new train

    - HTTP Method :- POST
    - Endpoint :- http://localhost:4080/admin/addTrain

    - Request Body:

```bash
{
    "message": "Trains added successfully",
    "trainIds": [
        {
            "trainNumber": "104040",
            "trainId": 4
        }
    ]
}
```

         * Headers :
             * x-api-key: Your admin API key which is stored in .env

2. Update seat availability

   - HTTP Method :- PUT
   - Endpoint :- http://localhost:4080/admin/update-seats/10
   - Request Body:

```bash
 {
  "totalSeats": 200,
  "availableSeats": 150
 }
```

       * Response:

```bash
{
  "message": "Seats updated successfully"
}
```

        * Headers:
            * x-api-key:  Your admin API key which is stored in .env

### Running Tests

You can test all the available APIs using Postman. The endpoints are well-structured and follow RESTful conventions.

```bash
[
  {
    "trainNumber": "105050",
    "source": "Hyderabad",
    "destination": "Visakhapatnam",
    "totalSeats": 350
  },
  {
    "trainNumber": "102020",
    "source": "Chennai",
    "destination": "Bangalore",
    "totalSeats": 250
  },
  {
    "trainNumber": "103030",
    "source": "Kolkata",
    "destination": "Patna",
    "totalSeats": 300
  },
  {
    "trainNumber": "104040",
    "source": "Jaipur",
    "destination": "Agra",
    "totalSeats": 150
  },
  {
    "trainNumber": "101010",
    "source": "Mumbai",
    "destination": "Pune",
    "totalSeats": 200
  }
]

```

### Technologies Utilized

- **Node.js**: Backend runtime environment enabling the server-side logic and API management.
- **Express.js**: A lightweight framework that facilitates the creation of the RESTful API.
- **dotenv**: Manages environment variables for secure configuration and deployment.
- **bcrypt**: Encryption library used for securely hashing user passwords.
- **JWT (JSON Web Token)**: For secure user authentication and authorization processes.
- **MySQL**: Relational database used for storing user information, train schedules, and booking data.


# Screenshots of the Project

#### 1. Server Startup

![Localhost Running Screenshot](./WorkIndia_RailwayManagement/Screenshots/ServerSS.png)

Description: The server running locally on `http://localhost:4080` as part of the project setup.

---

#### 2. User Registration

![Postman Registration Screenshot](./WorkIndia_RailwayManagement/Screenshots/UserRegisterSS.png)

Description: A Postman request to register a new user, demonstrating the registration functionality.

---

#### 3. User Login

![Postman Login Screenshot](./WorkIndia_RailwayManagement/Screenshots/UserLoginSS.png)

Description: A Postman request to log in a user, showcasing how the login API works.

---

#### 4. Checking Train Availability

![Train Availability Screenshot](./WorkIndia_RailwayManagement/Screenshots/TrainAvailabilitySS.png)

Description: This screenshot demonstrates how the `GET /user/availability` API is used to check train availability.

---

#### 5.  Add New Train

![Train Availability Screenshot](./WorkIndia_RailwayManagement/Screenshots/AddingTrainSS.png)

Description: This screenshot demonstrates how the `POST /admin/addTrain` API is used to add new train by admin.

---

#### 6.  Update seats

![Train Availability Screenshot](./WorkIndia_RailwayManagement/Screenshots/UpdatingSeatsSS.png)

Description: This screenshot demonstrates how the `put /admin/update-seats/:trainId` API is used to update seats of a particular train (by trainId) by admin.

---

#### 7. Database Creation

![Database Creation Screenshot](./WorkIndia_RailwayManagement/Screenshots/DatabaseSS.png)

Description: This screenshot showcases the creation of the database schema for the Railway Management system.

---

#### 8. Users Table

![User Database Screenshot](./WorkIndia_RailwayManagement/Screenshots/UsersTableSS.png)

Description: The structure and data stored in the `users` table of the `railway_management` database.

---

#### 9. Workbench SQL View

![Workbench SQL Screenshot](./WorkIndia_RailwayManagement/Screenshots/DatabaseTablesSS.png)

Description: An overview of the SQL queries and table structures in MySQL Workbench.

