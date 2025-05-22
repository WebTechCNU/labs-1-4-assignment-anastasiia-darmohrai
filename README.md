[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/Om1zqYVh)

# Laboratory Assignment 1: REST API

## Technologies Used

### Frontend:
- **React** - A JavaScript library for building user interfaces.
- **JavaScript** - Programming language used for frontend development.

### Backend:
- **Spring Boot** - A Java-based framework for building web applications and microservices.
- **Java** - Programming language used for backend development.

### Database:
- **MongoDB** - A NoSQL database used to store application data.
  - **MongoDB Atlas** - A cloud database service for MongoDB.

### Deployment:
- **Netlify** - A platform for deploying frontend applications with continuous integration and deployment


This project consists of both a frontend and backend that are used to manage a dating application. The frontend is a React application, while the backend is a Spring Boot application that connects to MongoDB.

## Frontend

The frontend is a React application that interacts with the backend API to handle user registration, authentication, and other user-related actions.

### Frontend Deployment

The frontend is deployed on Netlify. You can access the live version of the application here:

[Frontend Demo](https://roaring-liger-9c5167.netlify.app/)

### Steps to run the frontend locally

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repository-url.git
   cd your-repository-folder
Install dependencies and run:
   ```bash
   npm install
   npm start
 ```
Visit the app in your browser at http://localhost:3000

Backend
The backend is a Spring Boot application that uses MongoDB as the database. It provides RESTful APIs to interact with the frontend.

Steps to run the backend locally
Clone the backend repository:
   ```bash
https://github.com/anastasiia-darmohrai/dating-app-backend.git
 ```
Set up environment variables for MongoDB connection:

Create a .env file in the root directory of the backend project (or modify the application.properties or application.yml file) and define the following variables:
Example
   ```bash
MONGO_DB_USERNAME=your-mongodb-username
MONGO_DB_PASSWORD=your-mongodb-password
SPRING_DATA_MONGODB_URI=mongodb+srv://your-mongodb-username:your-mongodb-password@cluster0.mongodb.net/datingapp
SPRING_DATA_MONGODB_DATABASE=datingapp
SPRING_SECURITY_CSRF_DISABLED=true
 ```
Install dependencies and run the Spring Boot application:
   ```bash
./mvnw spring-boot:run
 ```


