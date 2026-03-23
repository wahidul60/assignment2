# 🚗 Vehicle Rental System

🔗 **Live URL:**  
https://assignment2-zimg.vercel.app/

🔗 **API Base URL:**  
https://assignment2-zimg.vercel.app/api/v1

🔗 **GitHub Repository:**  
https://github.com/wahidul60/assignment2

🔗 **Live Deployment:**  
https://assignment2-zimg-nnfz6oov8-wahidul-hassans-projects.vercel.app

---

## 🛠️ Features

A backend API for a vehicle rental management system that handles:

- 🚘 **Vehicles**
  - Manage vehicle inventory
  - Track availability status

- 👤 **Customers**
  - Manage customer accounts and profiles

- 📅 **Bookings**
  - Handle vehicle rentals and returns
  - Automatic return system after `rent_end_date`
  - Total cost calculation

- 🔐 **Authentication**
  - Secure role-based access control
  - Roles: Admin & Customer

---

## 🛠️ Technology Stack

- **Node.js** + **TypeScript**
- **Express.js**
- **PostgreSQL**
- **bcrypt** (password hashing)
- **jsonwebtoken (JWT)** for authentication

---

## ⚙️ Setup & Installation

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/wahidul60/assignment2.git
2️⃣ Navigate to Project Folder
cd assignment2
3️⃣ Install Dependencies
npm install
4️⃣ Setup Environment Variables
Create a .env file in the root directory:
PORT=5000
DATABASE_URL=your_database_url
JWT_SECRET=your_secret_key
5️⃣ Run the Server
npm run dev

