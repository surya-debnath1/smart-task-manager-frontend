# SmartTasks – Mobile Task Manager (Frontend)

SmartTasks is a mobile task management application built using React Native and Expo.  
This repository contains the **frontend** of the SmartTasks full-stack project.

The application connects to a Node.js + Express backend API for authentication and task management.

---

## 📱 Features

- User Registration
- User Login (JWT Authentication)
- Protected Navigation
- Create Task
- View Tasks
- Update Task Status
- Delete Task
- Search Tasks
- Filter by Status (Pending, In Progress, Completed)
- Logout
- Secure token storage using AsyncStorage

---

## 🛠 Tech Stack

- React Native
- Expo
- Expo Router
- Axios
- AsyncStorage
- TypeScript

---

## 📂 Project Structure

```
frontend/
├── app/
│   ├── login.tsx
│   ├── register.tsx
│   ├── tasks.tsx
│   ├── create-task.tsx
│   ├── profile.tsx
│   └── index.tsx
│
├── src/
│   ├── components/
│   ├── context/
│   ├── services/
│   ├── types/
│   └── config/
│
├── assets/
└── app.json
```

---

## 🚀 Running the Frontend Locally

1️⃣ Install dependencies:

```bash
npm install
```

2️⃣ Start the application:

```bash
npx expo start
```

3️⃣ Open the app using:
- Expo Go (Android/iOS)
- Android Emulator
- iOS Simulator

---

## 🔗 Backend Requirement

The backend server must be running for authentication and task operations to work.

Make sure the base URL inside:

```
src/config/api.ts
```

points to your backend server.

Example:

```
http://localhost:5000/api
```

---

## 🎯 Learning Outcomes

- Implemented JWT authentication flow
- Built protected navigation using Expo Router
- Structured scalable React Native project
- Created reusable UI components
- Integrated frontend with REST API backend
- Managed global authentication state using Context API