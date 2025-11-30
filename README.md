# 📊 Admin Dashboard (MERN + React + Tailwind)

A modern **Admin Analytics Dashboard** with authentication, role-based access, charts, and user management.

---

## 🚀 Features

- 🔐 JWT Authentication (Login/Register)
- 👮 Role-Based Access (Admin/User)
- 📈 Analytics Dashboard (Recharts)
- 📊 KPI Cards (Users, Sales, Growth)
- 🧑‍💼 User Management (edit role, delete user)
- 🎨 Tailwind + Glassmorphism UI
- ⚡ Lazy Loading + Suspense
- 🌙 Fully Responsive

---

## 🛠️ Tech Stack

**Frontend:** React, Redux Toolkit, Tailwind, Recharts  
**Backend:** Node.js, Express, MongoDB, Mongoose  
**Auth:** JWT + bcrypt  
**Architecture:** MVC

---

## 📁 Setup Instructions

### Backend

```bash
cd server
npm install
npm start
```

### Frontend

```bash
cd client
npm install
npm run dev
```

📡 API Endpoints

- Auth: /auth/login, /auth/register
- Admin: /admin/users (GET, PUT, DELETE)
- Analytics: /analytics/kpi, /analytics/signups, /analytics/sales

### Folder Structure

- admin-dashboard/
- ├── client/ # React Frontend
- └── server/ # Node.js Backend

### 📝 License

MIT
