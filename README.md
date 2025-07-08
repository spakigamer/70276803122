# 🔗 URL Shortener – Full Stack Project

A simple full stack URL Shortener built with **Node.js (Express)** for the backend and **React (Vite)** for the frontend. Users can create short URLs with optional custom codes and track their usage statistics.

---

## 🛠 Backend (Node.js + Express)

### ✅ Features:
- **POST `/shorturls`**: Create a new short URL.
  - Accepts: `url`, optional `shortcode`, and `validity` (in minutes).
- **GET `/shorturls/:shortcode`**: Fetch stats of a shortened URL.

### 🔧 Functionality:
- Validates the URL and shortcode format.
- Auto-generates shortcodes if not provided.
- Sets expiry (defaults to 30 mins if not specified).
- Tracks clicks with timestamps and referrers.
- Stores data in-memory for fast access.

### 🧾 Logging Middleware:
- Custom middleware logs each event (success, warning, or error).
- Sends logs to an external evaluation API with required headers.
- Fields like `stack`, `level`, and `package` are validated.

---

## 🎨 Frontend (React + Tailwind CSS)

### 🌐 Pages:
- **URL Shortener**:
  - Enter long URL.
  - Optional shortcode + expiry time.
  - Displays shortened URL and expiry time.
- **Stats Viewer**:
  - Enter a shortcode.
  - View stats like original URL, created time, expiry, click count, and details.

### 🧩 Features:
- Modern UI with responsive layout using Tailwind CSS.
- Reusable Navbar component with navigation.
- Axios used for API requests.
- Proper error handling and user alerts.

---
