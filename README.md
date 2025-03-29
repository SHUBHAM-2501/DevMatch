# DevMatch Backend (Node.js)

This is the backend API server for DevMatch, a developer-focused social networking platform.

## Features

- **Authentication System**: Secure signup and login using JWT
- **Profile Management**: View and edit user profiles
- **Connection Management**: Send, accept, and reject connection requests
- **Real-time Chat**: Messaging between connected users using Socket.io

## Tech Stack

- **Node.js & Express**: Server framework
- **MongoDB with Mongoose**: Database and ODM
- **JWT**: Authentication tokens
- **Socket.io**: Real-time communication
- **Bcrypt**: Password hashing

## Project Structure

- **src/app.js**: Main application entry point
- **src/config**: Database configuration
- **src/middleware**: Authentication middleware
- **src/models**: Mongoose schemas for User, ConnectionRequest, and Chat
- **src/routes**: API endpoints for auth, profile, requests, and chat
- **src/utils**: Utility functions for validation and socket connections

## API Endpoints

### Authentication
- `POST /signup`: Create new user account
- `POST /login`: Authenticate user and get token
- `POST /logout`: Clear authentication token

### Profile
- `GET /profile`: Get current user profile
- `PATCH /profile/edit`: Update user profile

### Connection Requests
- `POST /request/send/:status/:toUserId`: Send a connection request
- `POST /request/review/:status/:requestId`: Accept or reject a request
- `GET /user/requests/received`: Get received connection requests
- `GET /user/connections`: Get accepted connections

### Feed and Users
- `GET /feed`: Get potential connections
- `GET /user`: Get user by email
- `PATCH /user`: Update user
- `DELETE /user`: Delete user

### Chat
- `GET /chat/:targetUserId`: Get or create chat with another user

## Socket.io Events

- `joinChat`: Join a specific chat room
- `sendMessage`: Send a message to another user
- `messageReceived`: Receive incoming messages

## Database Models

### User
- Personal details (name, email, password)
- Profile information (age, gender, photo, about, skills)
- Authentication methods for JWT and password validation

### ConnectionRequest
- Tracks connection requests between users
- States: interested, ignored, accepted, rejected

### Chat
- Stores messages between connected users
- Tracks participants and message history

## Setup

1. Install dependencies: `npm install`
2. Create `.env` file with required variables:
   ```
   DATABASE_STRING=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```
3. Start server: `node src/app.js`

## Development

To add a start script for easier development, update package.json:
```json
"scripts": {
  "start": "node src/app.js",
  "dev": "nodemon src/app.js"
}
```
