# Whiteboard AI

A real-time collaborative whiteboard application powered by AI, enabling multiple users to draw, brainstorm, and collaborate simultaneously. The platform combines real-time synchronization using Socket.IO with AI-assisted suggestions powered by Google Gemini.

## Overview

Whiteboard AI is designed to provide an interactive digital workspace where users can collaborate in real time regardless of location. The application supports drawing, shape creation, text annotations, board persistence, and AI-generated suggestions to enhance brainstorming and productivity.

---

## Features

### Real-Time Collaboration
- Multi-user collaborative whiteboard
- Instant synchronization using Socket.IO
- Live presence tracking of active users
- Shared editing experience across multiple devices and browsers

### Authentication & Security
- User registration and login
- JWT-based authentication
- Password hashing using bcrypt
- Protected API routes

### Whiteboard Functionality
- Freehand drawing
- Rectangle creation
- Circle creation
- Text annotations
- Color selection
- Shape editing
- Shape deletion
- Board clearing
- Undo/Redo functionality

### Persistence
- Board data stored in MongoDB
- Automatic saving of board elements
- Board restoration on reload
- Persistent collaborative sessions

### AI Integration
- AI-powered suggestions using Google Gemini
- Generate ideas and content directly within the whiteboard
- Enhance brainstorming and productivity

---

## Tech Stack

### Frontend
- React
- TypeScript
- Vite
- React Router
- Axios
- React Konva
- Socket.IO Client

### Backend
- Node.js
- Express.js
- TypeScript
- Socket.IO
- JWT Authentication
- Bcrypt

### Database
- MongoDB Atlas
- Mongoose ODM

### AI
- Google Gemini API

### Deployment
- Frontend: Vercel
- Backend: Render / Railway
- Database: MongoDB Atlas

---

## System Architecture

```text
┌─────────────────┐
│ React Frontend  │
└────────┬────────┘
         │
         │ REST APIs
         ▼
┌─────────────────┐
│ Express Server  │
└────────┬────────┘
         │
         │ Mongoose
         ▼
┌─────────────────┐
│ MongoDB Atlas   │
└─────────────────┘

         ▲
         │
         │ WebSockets
         │
┌────────┴────────┐
│ Socket.IO Server│
└────────┬────────┘
         │
         ▼
 Multiple Connected Users
```

---

## Project Structure

```text
Whiteboard-AI
│
├── server
│   └── index.ts
│
├── src
│   ├── components
│   │   ├── Auth.tsx
│   │   ├── Dashboard.tsx
│   │   └── Whiteboard.tsx
│   │
│   ├── services
│   │   ├── api.ts
│   │   ├── socket.ts
│   │   └── gemini.ts
│   │
│   ├── App.tsx
│   ├── main.tsx
│   └── types.ts
│
├── .env.example
├── package.json
└── README.md
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/your-username/whiteboard-ai.git
cd whiteboard-ai
```

### Install Dependencies

```bash
npm install
```

---

## Environment Variables

Create a `.env` file in the project root.

```env
GEMINI_API_KEY=your_gemini_api_key
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret

VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

---

## Running Locally

### Start Backend

```bash
cd server
npx tsx index.ts
```

Expected Output:

```text
Connected to MongoDB
Server running on http://localhost:5000
```

### Start Frontend

Open another terminal:

```bash
npm run dev
```

Expected Output:

```text
Local: http://localhost:3001
```

---

## API Endpoints

### Authentication

#### Register

```http
POST /api/auth/register
```

#### Login

```http
POST /api/auth/login
```

### Boards

#### Get Boards

```http
GET /api/boards
```

#### Create Board

```http
POST /api/boards
```

#### Get Board Details

```http
GET /api/boards/:id
```

---

## Socket.IO Events

### Client → Server

```text
join-board
draw-element
update-element
delete-element
clear-board
save-board
update-board-name
```

### Server → Client

```text
board-init
element-drawn
element-updated
element-deleted
board-cleared
board-name-updated
presence-update
```

---

## Key Learning Outcomes

Through this project, I gained hands-on experience with:

- Real-time systems using WebSockets
- Socket.IO room management
- Authentication using JWT
- MongoDB data modeling
- API development using Express.js
- React state management
- Collaborative application architecture
- AI integration using Google Gemini
- Deployment of full-stack applications

---

## Challenges Solved

### Real-Time Synchronization

Implemented Socket.IO rooms to ensure that all users connected to the same board receive updates instantly.

### Board Persistence

Designed MongoDB storage to save and restore whiteboard state, ensuring data is not lost across sessions.

### Authentication Security

Implemented JWT-based authentication with password hashing using bcrypt.

### Multi-User Presence

Tracked connected users and displayed active collaborators in real time.

---

## Future Improvements

- Board sharing permissions
- Export board as PNG/PDF
- Voice collaboration
- Cursor tracking
- Team workspaces
- Infinite canvas
- Version history
- Dark mode

---

## Author

**Vani Nandyala**

Chemical Engineering Undergraduate, IIT (BHU) Varanasi

Aspiring Full Stack Developer | Problem Solver | AI Enthusiast
