# Native Chat Web Application

A simple text-based chat application built using HTTP protocol and Node.js/Express, allowing users to register, add friends, and exchange messages in real-time.

## Overview

This web-based chat application provides a simple yet effective platform for text-based communication using standard HTTP protocols and a web browser interface.

## Features

- **User Authentication**: Register new accounts and login securely
- **Friend Management**: Search for users, send friend requests, and build your contact list
- **Messaging System**: Send and receive text messages with your friends
- **Data Persistence**: All messages and user data stored in SQLite database
- **HTTP-based Communication**: Utilizes standard HTTP requests for all operations

## Technologies Used
- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js with Express.js
- **Database**: SQLite3
- **Authentication**: JWT (JSON Web Tokens) with bcryptjs for password hashing
- **HTTP Management**: Native HTTP protocol with polling for message updates

## Installation

1. Clone this repository:
   ```
   git clone (https://github.com/Mohamed-Elsemary/ChatApplication.git)
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the server:
   ```
   npm start
   ```

4. Access the application:
   ```
   http://localhost:4000

## Project Structure

```
native-chat/
├── public/           # Static frontend files
│   ├── css/          # Stylesheets
│   ├── js/           # Client-side JavaScript
│   └── index.html    # Main HTML file
├── routes/           # Express route handlers
├── models/           # Database models
├── middleware/       # Authentication middleware
├── server.js         # Main application entry point
├── package.json      # Project dependencies
└── README.md         # This file
```

## API Endpoints

- **Authentication**
  - `POST /api/auth/register` - Register a new user
  - `POST /api/auth/login` - Login and get authentication token

- **Friends**
  - `GET /api/friends` - Get friend list
  - `POST /api/friends/request/:userId` - Send friend request
  - `PUT /api/friends/accept/:requestId` - Accept friend request
  - `GET /api/users/search?q=query` - Search for users

- **Messages**
  - `POST /api/messages/:friendId` - Send message to friend
  - `GET /api/messages/:friendId` - Get conversation history
  - `GET /api/messages/new` - Poll for new messages
