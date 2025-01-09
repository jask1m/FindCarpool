# University Carpool Coordinator

A modern web application designed to help students coordinate carpools, reduce transportation costs, and decrease their carbon footprint. The platform features secure user authentication, real-time ride matching, and an intuitive interface for managing carpool schedules.

## 🚗 Features

- **Secure Authentication**
  - Custom JWT implementation with access and refresh tokens
  - Password encryption using bcrypt
  - Protected routes and middleware authentication

## 🛠️ Tech Stack

### Frontend
- **React** - UI component library
- **TypeScript** - Type-safe development
- **TailwindCSS** - Styling and responsive design
- **Axios** - HTTP client for API requests
- **React Router** - Client-side routing

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **TypeScript** - Server-side type safety
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling

### Authentication
- **JSON Web Tokens (JWT)** - Secure authentication
- **bcrypt** - Password hashing
- **Custom middleware** - Route protection
- **HTTP-only cookies** - Secure token storage

## 🔒 Authentication Flow

1. **Registration**
   - Password hashing using bcrypt
   - Student email verification
   - Initial JWT token generation

2. **Login**
   - Credential verification
   - Access token generation (short-lived)
   - Refresh token generation (long-lived)
   - Secure cookie storage

3. **Route Protection**
   - Custom middleware authentication
   - Token verification
   - Automatic token refresh
   - Session management

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/lets-carpool.git
cd lets-carpool
```

2. Install dependencies for both frontend and backend:
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Set up environment variables:
```bash
# Backend .env
PORT=5000
MONGODB_URI=your_mongodb_uri
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
TOKEN_DURATION=15m

# Frontend .env
REACT_APP_API_URL=http://localhost:5000/api
```

4. Start the development servers:
```bash
# Start backend server
cd backend
npm run dev

# Start frontend server
cd frontend
npm start
```

## 📁 Project Structure

```
lets-carpool/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── context/
│   │   └── types/
│   └── public/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── utils/
│   └── config/
└── shared/
    └── types/
```

## 🔐 Security Measures

- Password hashing using bcrypt with salt rounds
- HTTP-only cookies for refresh tokens
- Access token rotation
- CORS protection
- Rate limiting
- Input validation and sanitization
- XSS protection
