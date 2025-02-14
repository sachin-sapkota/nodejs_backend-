# Node.js Backend Project

This repository contains a Node.js-based backend server with user authentication and various API endpoints. It’s designed to be a starting point for applications requiring user registration, login, and other core functionality.

> **Note:** This README is based on the repository at [nodejs_backend-](https://github.com/sachin-sapkota/nodejs_backend-.git). If you have cloned or downloaded that code, the instructions below will help you set up and run the project.

---

## Features

- **User Registration & Login**: Basic authentication flow with hashed passwords (e.g., bcrypt or similar).
- **JWT Authentication**: Secure endpoints using JSON Web Tokens.
- **RESTful API Endpoints**: Pre-built routes for user-related actions.
- **Database Integration**: Presumably connected to MongoDB (based on the repository’s naming and structure).
- **Scalable Setup**: Organized folder structure for easy maintenance and potential feature expansion.

---

## Prerequisites

- **Node.js** (v14 or higher recommended)
- **npm** or **yarn** for package management
- **MongoDB** (local instance or a hosted solution such as MongoDB Atlas)
- (Optional) **Redis** if implementing sessions or caching (depending on the code specifics)

---

## Installation & Setup

 **Clone the repository**:
   ```bash
   git clone https://github.com/sachin-sapkota/nodejs_backend-.git
   cd nodejs_backend-
   ```
---
   
## 🚀 Features

- 📁 Modular Structure: Organized by feature for easy navigation and scalability
- 💨 Faster Execution with tsx: Rapid TypeScript execution with `tsx` and type checking with `tsc`
- 🌐 Stable Node Environment: Latest LTS Node version in `.nvmrc`
- 🔧 Simplified Environment Variables: Managed with Envalid
- 🔗 Path Aliases: Cleaner code with shortcut imports
- 🔄 Renovate Integration: Automatic updates for dependencies
- 🔒 Security: Helmet for HTTP header security and CORS setup
- 📊 Logging: Efficient logging with `pino-http`
- 🧪 Comprehensive Testing: Setup with Vitest and Supertest
- 🔑 Code Quality Assurance: Husky and lint-staged for consistent quality
- ✅ Unified Code Style: `Biomejs` for consistent coding standards
- 📃 API Response Standardization: `ServiceResponse` class for consistent API responses
- 🐳 Docker Support: Ready for containerization and deployment
- 📝 Input Validation with Zod: Strongly typed request validation using `Zod`
- 🧩 Swagger UI: Interactive API documentation generated from Zod schemas

---

## Project Structure
```bash
nodejs_backend-/
├── config/
│   └── db.js              // MongoDB connection logic
├── controllers/
│   └── authController.js  // Handles user login, registration
│   └── userController.js  // Other user-related logic
├── middlewares/
│   └── authMiddleware.js  // JWT verification
├── models/
│   └── User.js            // Mongoose schema for users
├── routes/
│   └── authRoutes.js      // Routes for login, registration
│   └── userRoutes.js      // Routes for user management
├── .env                   // Environment variables (not committed)
├── package.json
├── server.js              // Main entry point
└── README.md
```
---

## Environment Variables
``` bash
# Server settings
PORT=3000

# MongoDB Connection URI
MONGO_URI=mongodb://localhost:27017/your_db_name

# JWT Secret (replace with a secure, randomly generated string)
JWT_SECRET=your_jwt_secret_here

# Any other environment variables your code requires
# For example:
# SMTP_HOST=smtp.mailtrap.io
# SMTP_PORT=2525
# SMTP_USER=xxxx
# SMTP_PASS=xxxx
```
---

## 🏃‍♂️ Running the Project

- Development Mode: `npm run dev`
- Building: `npm run build`
- Production Mode: Set `.env` to `NODE_ENV="production"` then `npm run build && npm run start`

