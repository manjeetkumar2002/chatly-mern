# 💬 Chatly

A real-time chat application built using the MERN Stack with Socket.io. Users can create accounts, send instant messages, upload profile pictures, and chat in real time.

---

## 🚀 Tech Stack

### Frontend
- React.js
- Tailwind CSS
- React Router
- Axios
- React Redux

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- Socket.io
- JWT Authentication
- Multer
- Cloudinary

---

# ✨ Features

- 🔐 User Authentication (Signup/Login)
- 🔑 JWT Authentication
- 👤 User Profile
- 📷 Profile Image Upload
- 💬 Real-time Messaging
- 🟢 Online/Offline Status
- 📱 Responsive UI
- 🔍 Search Users
- 😊 Emoji Support
- 📁 Image Sharing 
- ⚡ Fast Socket.io Communication

---

# 📂 Folder Structure

```
chatly-mern
│
├── frontend
├── backend
└── README.md
```

---

# ⚙️ Installation

## 1. Clone Repository

```bash
git clone https://github.com/manjeetkumar2002/chatly-mern.git
```

Go inside project

```bash
cd chatly-mern
```

---

## 2. Install Dependencies

### Backend

```bash
cd backend
npm install
```

### Frontend

```bash
cd ../frontend
npm install
```

---

# 🔑 Environment Variables

Create a `.env` file inside the **backend** folder.

Example:

```env
PORT=3000

MONGODB_CONNECTION_STRING=your_mongodb_connection_string

REDIS_PASS = your_redis_password

JWT_SECRET_KEY=your_jwt_secret

NODE_ENV = "development"

CLOUDINARY_CLOUD_NAME=your_cloud_name

CLOUDINARY_API_KEY=your_api_key

CLOUDINARY_API_SECRET=your_api_secret

CLIENT_URL=http://localhost:5173
```

---

Create another `.env` inside the **frontend** folder.

```env
VITE_API_BASE_URL=http://localhost:3000
```

---

# ▶️ Run Project

### Backend

```bash
cd backend
npm run dev
```

### Frontend

```bash
cd frontend
npm run dev
```

---

# 🌐 Default URLs

Frontend

```
http://localhost:5173
```

Backend

```
http://localhost:3000
```

---

# 📦 Build

Frontend

```bash
npm run build
```

Backend

```bash
npm start
```

---


# 🤝 Contributing

Pull requests are welcome.

For major changes, please open an issue first.

---


# 👨‍💻 Author

**Manjeet Kumar**

GitHub:
https://github.com/manjeetkumar2002/chatly-mern.git

## 🌍 Live Demo

Frontend:
https://chatly-o57e.onrender.com

Backend API:
https://chatly-mern-ufxp.onrender.com