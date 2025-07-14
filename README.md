# Service POS Backend and Frontend

## Project Overview

This project is a Point of Sale (POS) system designed to manage store sales data, customer and employee information, appointments, payments, and time tracking. The backend API is built with Node.js, Express, and MySQL (using UUIDs as primary keys). The frontend will be developed using React and Tailwind CSS for a modern and responsive dashboard interface.

---

## Current Status

- **Backend API:**
  - Fully functional CRUD endpoints for:
    - Customers
    - Employees
    - Services
    - Appointments
    - Payments
    - Time Tracking
  - Database schema designed with proper foreign key constraints
  - Environment configuration using `.env`
  - Basic server setup with CORS and JSON body parsing

- **Frontend:**
  - Yet to be started
  - Planned to use React + Tailwind CSS for building the dashboard UI

- **Authentication:**
  - Skipped for now, to be implemented later if needed

---

## Technologies Used

- Node.js
- Express
- MySQL (or compatible, using UUIDs)
- dotenv
- cors
- React (planned)
- Tailwind CSS (planned)

---

## How to Run Backend

1. Clone the repo
2. Create `.env` with database credentials and server port
3. Run `npm install`
4. Run `npm run init-db` to create tables
5. Run `npm run seed` to seed example data
6. Run `npm start` to start the backend server on the configured port (default 3000)
