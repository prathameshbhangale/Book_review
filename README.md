# 📚 Book Review API

A RESTful API for managing book reviews, built with Node.js and Express.js.

## 🚀 Features

- User authentication and authorization
- CRUD operations for books and reviews
- Middleware for logging
- Modular code structure with MVC architecture

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- dotenv for environment variable management

## 📁 Project Structure
├── config/ # Configuration files
├── controller/ # Route handlers
├── middleware/ # Custom middleware
├── model/ # Mongoose models
├── routes/ # API routes
├── utils/ # Utility functions
├── index.js # Entry point
├── package.json # Project metadata and scripts
└── .gitignore # Files to ignore in version control


## 🔧 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/prathameshbhangale/Book_review.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a .env file in the root directory and add your environment variables:
   ```bash
    PORT=3000
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
   ```
4.Start the development server:
  ```bash
  npm run dev
  ```
