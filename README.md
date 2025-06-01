# TaskMaster - Kanban Board

![image](https://github.com/user-attachments/assets/75c2450b-a626-4d6a-bc0b-1e0697470b34)
![image](https://github.com/user-attachments/assets/d8b0a886-b529-4e83-b159-abe297b19702)



A lightweight task management app with **drag-and-drop Kanban board** and CRUD operations. Built with the MERN stack and Tailwind CSS.

## ✨ Features
- **Drag-and-drop** task reorganization (status: To Do / In Progress / Done)
- **Full CRUD operations** for tasks (Create, Read, Update, Delete)
- Minimalist Kanban-style UI with Tailwind CSS
- Responsive design

## 🛠 Tech Stack
- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Drag-and-Drop**: React Beautiful DnD

## 🚀 Quick Start
1. **Clone the repo**
   ```bash
   git clone https://github.com/Harshiniii027/TaskMaster.git

   Install dependencies

# Frontend
cd client && npm install

# Backend
cd ../server && npm install
Configure Environment

Create .env in /server:

env
MONGO_URI=your_mongodb_connection_string
PORT=5000
Run Application

bash
# Start backend (from /server)
npm run dev

# Start frontend (from /client)
npm start
📂 Directory Structure
TaskMaster/
├── client/           # React app
│   ├── public/       # Static files
│   └── src/          # Components, styles
├── server/           # Express backend
│   ├── models/       # Mongoose models
│   └── routes/       # API routes
└── README.md
