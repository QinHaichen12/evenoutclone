# Evenout

## Overview

This project is built with a React frontend and an Express backend. Users can create threads, and other users can upvote or downvote these threads. The system ensures that if a user changes their vote (e.g., from upvote to downvote), the previous vote is removed.

## Features

- User registration and login
- Thread creation
- Upvote and downvote threads
- Toggle votes (change from upvote to downvote and vice versa)
- Real-time vote count updates

## Technologies Used

- Frontend: React
- Backend: Node.js, Express
- Data storage: In-memory arrays (for simplicity; can be replaced with a database)
- Others: Fetch API for HTTP requests, React Router for navigation

## Getting Started

### Prerequisites

- Node.js and npm installed
- A modern web browser

### Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/lilyium/EvenOut
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

### Running the Application

   ```sh
   npm start
   ```

   The frontend application will run on `http://localhost:3000`.
   The backend server will run on `http://localhost:8080`.

### Usage

1. **Open your browser and navigate to `http://localhost:3000`.**
2. **Register a new user or login with an existing account.**
3. **Create a new thread.**
4. **Upvote or downvote threads.**
5. **Observe real-time updates to the vote counts.**

## Project Structure

```
evenout/
├── client/
│   ├── public
│   ├── src
│   ├── package.json
│   └── package-lock.json
├── server/
│   ├── app
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
├── package.json
├── package-lock.json
└── README.md
```

## API Endpoints

### User Authentication

- **Register:** `POST /api/register`
  - Body: `{ email, password, username }`
  - Response: `{ message }` or `{ error_message }`

- **Login:** `POST /api/login`
  - Body: `{ email, password }`
  - Response: `{ message, id }` or `{ error_message }`

### Threads

- **Create Thread:** `POST /api/create/thread`
  - Body: `{ thread, userId }`
  - Response: `{ message, threads }`

- **Get All Threads:** `GET /api/all/threads`
  - Response: `{ threads }`

### Voting

- **Vote on Thread:** `POST /api/thread/vote`
  - Body: `{ threadId, userId, action }`
  - Response: `{ message, upvotes, downvotes }` or `{ error_message }`

- **Get Thread Votes:** `POST /api/thread/votes`
  - Body: `{ id }`
  - Response: `{ upvotes, downvotes }`

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b my-feature-branch`
3. Make your changes and commit them: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin my-feature-branch`
5. Create a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
