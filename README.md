# 💬 MERN Real-Time Chat App

A full-stack chat application built with the MERN stack (MongoDB, Express, React, Node.js) and Socket.io for real-time messaging. Features user authentication, live chat, responsive design, and more.

---


---

## ⚙️ Features

- 🔐 User Authentication (JWT-based)
- 💬 One-to-One Real-Time Messaging (Socket.io)
- 📱 Responsive Design (Mobile-friendly)
- 🧭 Chat List, Message Window, and Chat Switching
- 🟢 Online Users Tracking (Map with socket IDs)

---

## 🧰 Tech Stack

**Frontend**  
- React
- Tailwind CSS  
- Axios  
- Socket.io Client

**Backend**  
- Node.js + Express  
- MongoDB + Mongoose  
- JWT for Auth  
- Socket.io Server

---

## 📁 Project Structure

```bash
server/
  ├── controllers/
  ├── models/
  ├── routes/
  ├── socket.js
  └── server.js

client/
  ├── components/
  ├── pages/
  ├── App.jsx
  └── main.jsx
