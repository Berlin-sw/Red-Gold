# 🩸 RED GOLD - Blood Bank Management System

A premium, full-stack **MERN** application designed to streamline blood donation, inventory management, and distribution between Donors, Hospitals, and Organizations.

![Project Preview](https://img.shields.io/badge/UI-Glassmorphism-eb4d4b?style=for-the-badge)
![Tech Stack](https://img.shields.io/badge/Stack-MERN-blue?style=for-the-badge)

---

## ✨ Key Features

### 👥 Role-Based Dashboards
- **Admin:** Complete system oversight, user management (Donors, Hospitals, Organizations), and data deletion capabilities.
- **Donor:** Track personal donation history and view organizations involved.
- **Hospital:** Manage blood consumption records and request blood from specific organizations.
- **Organization:** The core hub. Manage blood inventory (IN/OUT), track donor/hospital relationships, and monitor real-time analytics.

### 🛡️ Security & Authentication
- **JWT Authentication:** Secure stateless session management.
- **Bcrypt.js:** Industry-standard password hashing.
- **Protected Routes:** Role-based access control on both Frontend and Backend.

### 📊 Advanced Analytics
- Real-time aggregation of blood group data (A+, B+, O+, AB+, etc.).
- Automated calculations for **Total In**, **Total Out**, and **Net Available** quantities.

### 🎨 Modern UI/UX
- **Glassmorphic Design:** A sleek, transparent, and modern aesthetic.
- **Responsive Layout:** Optimized for all screen sizes using Bootstrap and custom CSS.
- **Dynamic Feedback:** Real-time toast notifications for all user actions.

---

## 🚀 Tech Stack

- **Frontend:** React.js, Redux Toolkit, Axios, Bootstrap, React-Router-DOM.
- **Backend:** Node.js, Express.js.
- **Database:** MongoDB Atlas (Cloud) with Mongoose ODM.
- **Utilities:** Moment.js, Morgan, Colors, Dotenv.

---

## 🛠️ Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v14+)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) Account

### Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repo-link>
   cd red-gold
   ```

2. **Backend Setup:**
   ```bash
   # Install dependencies
   npm install

   # Create a .env file in the root
   # Add your credentials:
   PORT=5000
   MONGO_URL=your_mongodb_atlas_url
   JWT_SECRET=your_secret_key
   DEV_MODE=development
   ```

3. **Frontend Setup:**
   ```bash
   cd client
   npm install
   ```

### Running Locally

In the root directory, run:
```bash
npm start
```
*This will concurrently start both the Backend (Port 5000) and the Frontend (Port 3000).*

---

## 📂 Project Structure

```text
├── client/              # Frontend (React)
│   ├── src/
│   │   ├── components/  # Reusable UI elements
│   │   ├── pages/       # Dashboard & Auth views
│   │   ├── redux/       # State management
│   │   └── services/    # API calls
├── config/              # DB connection
├── controllers/         # Business logic
├── middleware/          # Auth & Role checks
├── models/              # Mongoose schemas
├── routes/              # API endpoints
└── server.js            # Express entry point
```

---

## 📜 License
Distributed under the ISC License.

---

## 👨‍💻 Author
**Sagar Wagh**
