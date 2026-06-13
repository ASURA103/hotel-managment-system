# Hotel Management System

## Tech Stack:
React, Node.js, Express, MongoDB

## Features:
- User Login & Signup
- Room Booking
- Admin Dashboard

## Advanced Features:
- AWS S3 image upload
- Seller dashboard (multi-role system)
- Email notifications using Nodemailer

## Description:
This project helps manage hotel bookings and user data.

## How to Run:
npm install
npm start
 
 🏨 Hotel Management Web App

A full-stack Hotel Management System built using the MERN Stack (MongoDB, Express.js, React.js, Node.js) with secure authentication, role-based access control, and scalable backend architecture. The system supports users, hotel owners, and admins with separate dashboards and workflows.


🧠 Backend (Node.js + Express + MongoDB + JWT + AWS-ready structure)
⚛️ Frontend (React + Vite + Redux Toolkit + Tailwind CSS)
🏗️ Architecture (Role-based Hotel Management System)

📌 Live Demo

🔗 Live Demo: https://asura-dreamstay-hotelsite.vercel.app/

🚀 Live Features
👤 User Side
Browse hotels with advanced filtering & search
Book rooms easily with real-time availability
View booking history
Secure authentication system
🏨 Hotel Owner Side
Add, edit, and manage hotels
Manage room availability and bookings
View analytics and booking data
🛠️ Admin Panel
Manage users, owners, and hotels
Approve or reject hotel listings
Full system control dashboard
🧠 Key Features
🔐 JWT Authentication (Role-Based Access Control)
🧑‍💼 Multi-role system (Admin / Owner / User)
🏨 Hotel & Room Management System
📅 Booking & Reservation System
🔍 Advanced Search & Filters
☁️ AWS S3 + CloudFront (Image Storage Ready)
⚡ Optimized API performance with Express.js
🎨 Modern UI with React + Tailwind CSS
📦 Scalable MVC Backend Architecture
🏗️ Tech Stack
Frontend
React.js (Vite)
Redux Toolkit
React Router DOM
Axios
Tailwind CSS
GSAP (animations)
React Icons
Backend
Node.js
Express.js
MongoDB + Mongoose
JWT Authentication
Nodemailer (emails)
AWS S3 (image storage integration ready)
📁 Project Structure
🖥️ Frontend Structure
src/
│── Components/
│   ├── Navbar.jsx
│   ├── Sidebar.jsx
│   ├── HotelCard.jsx
│   ├── SearchBar.jsx
│   ├── AdminSidebar.jsx
│   └── ...
│
│── Pages/
│   ├── Landing.jsx
│   ├── AdminDashboard.jsx
│   ├── SellerDashboard.jsx
│   ├── Searchpage.jsx
│   └── ...
│
│── Model/
│   ├── Account.jsx
│
│── lib/
│   └── store.js
│
│── App.jsx
│── main.jsx
🧩 Backend Structure
backend/
│── src/
│   │── api/
│   │── config/
│   │── helper/
│   │── validators.js
│   │
│   ├── schema/
│   │   ├── admin.schema.js
│   │   ├── booking.schema.js
│   │   ├── hotel.schema.js
│   │   ├── owner.schema.js
│   │   ├── userschema.js
│   │
│   ├── controller/
│   │   ├── admin_controller.js
│   │   ├── hotel_controller.js
│   │   ├── owner_controller.js
│   │   ├── user_controller.js
│   │
│   ├── lib/
│   │   ├── authMiddleware.js
│   │   ├── mailer.js
│   │
│   ├── model/
│   │   ├── hotel.model.js
│   │
│   ├── routes/
│   │   ├── admin.js
│   │   ├── owner.js
│   │   ├── user.js
│   │
│   ├── infrastructure/
│   │   ├── env.js
│   │   ├── route.js
│
│── index.js
🔐 Authentication System
JWT-based authentication
Role-based access control:
user
owner
admin
Protected routes middleware (authMiddleware.js)
☁️ Cloud & Storage
AWS S3 → Image storage (hotels, profiles)
CloudFront → Fast CDN delivery (planned/optional integration)