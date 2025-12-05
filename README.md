# 🥗 Community Food Sharing Platform (Client)

A modern full-stack application built to reduce food waste by connecting community members who have surplus food with those who need it. This repository contains the Frontend logic.

## 🔗 Live Links
- **Live Site:** https://food-sharing-app-puce.vercel.app/
- **Server Repo:** (https://github.com/MahinAnowar/food-sharing-app-server)

## 🚀 Key Features
- **Dynamic Title:** Browser tab title changes based on the route.
- **Authentication system:**
  - Email/Password Login & Registration.
  - Google Social Login.
  - JWT (JSON Web Token) implementation for secure private routes.
- **Home Page:**
  - Interactive Hero Banner.
  - "Featured Foods" section (Sorted by highest quantity).
  - Framer Motion animations.
- **Food Management:**
  - **Available Foods:** Search, Sort by Expiry Date, and Toggle Layout (2-Column/3-Column grid).
  - **Add Food:** Secure form to post food (Donator info auto-filled).
  - **Food Details:** View food info and "Request" it via a Modal.
  - **Manage My Foods:** Table view to Edit/Update or Delete food items posted by the logged-in user.
  - **My Food Requests:** Track the status of foods requested by the user.
- **Responsiveness:** Fully optimized for Mobile, Tablet, and Desktop (Custom Navbar with mobile drawer).

## 🛠️ Technology Stack
- **Framework:** React + Vite
- **Styling:** Tailwind CSS
- **Routing:** React Router DOM
- **State Management:** TanStack Query (React Query) + Context API
- **Auth:** Firebase Authentication
- **HTTP Client:** Axios (Custom `useAxiosSecure` hook with interceptors)
- **Animation:** Framer Motion
- **UI Components:** React Hot Toast, SweetAlert2 (Modals), React Icons.

## 📦 NPM Packages Used
- `react-router-dom`: For client-side routing.
- `firebase`: Authentication SDK.
- `@tanstack/react-query`: For fetching, caching, and updating server state.
- `axios`: For API requests.
- `framer-motion`: For animations.
- `react-helmet-async`: For dynamic document titles.
- `react-hot-toast`: For nice notification popups.
- `localforage` & `match-sorter`: For utility logic.

## ⚙️ Local Setup
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
