
# Task Scheduler App

Task Scheduler is a web application that allows users to manage their tasks effectively. It provides features such as task creation, task details, task status tracking, and user authentication..

## Table of Contents

- [Architecture](#architecture)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Instructions for Running Locally](#instructions-for-running-locally)

## Architecture

The application is built using a full-stack architecture with the following components:

- **Frontend:**
 - Developed using React.js for building user interfaces.
 - Utilizes React Router for navigation.
 - Implements authentication hooks for user login and registration.

- **Backend:**
 - Built with Node.js and Express.js for server-side logic.
 - Uses MongoDB as the database to store user information and tasks.
 - JWT tokens are employed for user authentication and authorization.

- **Database:**
 - MongoDB is used as the database.
 - Task data is stored in the `tasks` collection.
 - User data is stored in the `users` collection.

## API Endpoints

### Authentication Endpoints

- `POST /api/v1/auth/register`: Register a new user.
- `POST /api/v1/auth/login`: Authenticate and log in the user.
- `GET /api/v1/auth/logout`: Log out the user.

### Task Endpoints

- `POST /api/v1/tasks`: Create a new task.
- `GET /api/v1/tasks`: Get all tasks for the authenticated user.
- `GET /api/v1/tasks/:taskId`: Get details of a specific task.
- `PUT /api/v1/tasks/:taskId`: Update a task (requires authorization).
- `DELETE /api/v1/tasks/:taskId`: Delete a task (requires authorization).

## Database Schema

### Task Model

```
{
  title: String,
  description: String,
  dueDate: Date,
  createdBy: ObjectId, // User reference
  status: String // 'pending' or 'completed'
}
```

### User Model


```
{
  email: String,
  password: String,
  resetPasswordToken: String,
  resetPasswordExpire: Date
}
```

## Instructions for Running Locally

1.  Clone the repository:

    `git clone https://github.com/naresh-vunnam77/task-front-end.git`

2.  Navigate to the project directory:
    cd task-front-end

3.  Install dependencies for both the client and server:

    npm install

5.  Run the application:
    open  teminal in vs code
    ` npm run dev `

    . Open your browser and go to `http://localhost:3000` to access the application.



