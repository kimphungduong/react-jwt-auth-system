# React Authentication with JWT (Access + Refresh Tokens)

A full-stack authentication system demonstrating secure JWT implementation with automatic token refresh, protected routes, and modern web technologies.

---

## Overview

This project demonstrates a **production-ready JWT authentication system** with the following key features:

- ✅ **Dual Token Strategy**: Access tokens (15 min) + Refresh tokens (7 days)
- ✅ **Automatic Token Refresh**: Seamless token renewal via Axios interceptors
- ✅ **Request Queue Management**: Prevents multiple simultaneous refresh calls
- ✅ **Protected Routes**: Client-side route guards with authentication checks
- ✅ **Silent Authentication**: Auto-login for users with valid refresh tokens
- ✅ **Secure Token Storage**: Access tokens in memory, refresh tokens in localStorage
- ✅ **Form Validation**: React Hook Form with Zod schema validation
- ✅ **Server State Management**: React Query for efficient data fetching
- ✅ **Modern UI**: Responsive design with Tailwind CSS and shadcn/ui

---

## Features

### Authentication Flow
- User registration with email/password
- Secure login with JWT token generation
- Automatic access token refresh when expired
- Logout with token invalidation
- Protected user profile endpoint

### Frontend Features
- Responsive design (mobile, tablet, desktop)
- Modern UI with Tailwind CSS + shadcn/ui components
- Protected routes with authentication guards
- Automatic redirect when already authenticated
- Form validation with React Hook Form + Zod
- Toast notifications for user feedback
- Optimistic UI updates with React Query

### Backend Features
- JWT-based authentication with Passport strategies
- Password hashing with bcrypt (10 salt rounds)
- MongoDB integration with Mongoose ODM
- Route protection with Guards
- Input validation with class-validator
- Refresh token rotation for enhanced security
- CORS configuration for secure cross-origin requests

---

## Tech Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| React | ^18.2.0 | UI library |
| TypeScript | ^5.2.0 | Type safety |
| Vite | ^5.0.0 | Build tool & dev server |
| React Router | ^6.20.0 | Client-side routing |
| TanStack Query | ^5.0.0 | Server state management |
| React Hook Form | ^7.48.0 | Form handling |
| Zod | ^3.22.0 | Schema validation |
| Axios | ^1.6.0 | HTTP client |
| Tailwind CSS | ^3.3.0 | Utility-first CSS |
| shadcn/ui | latest | UI component library |
| Sonner | ^1.2.0 | Toast notifications |
| Lucide React | ^0.294.0 | Icon library |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| NestJS | ^10.0.0 | Node.js framework |
| TypeScript | ^5.1.0 | Type safety |
| MongoDB | ^8.0.0 | NoSQL database |
| Mongoose | ^8.0.0 | MongoDB ODM |
| Passport JWT | ^4.0.1 | JWT authentication |
| bcrypt | ^5.1.1 | Password hashing |
| class-validator | ^0.14.0 | DTO validation |

---

## Architecture

### System Architecture
```
┌─────────────────┐         ┌─────────────────┐         ┌─────────────────┐
│                 │         │                 │         │                 │
│  React Client   │ ◄─────► │   NestJS API    │ ◄─────► │  MongoDB Atlas  │
│  (Port 5173)    │  HTTP   │  (Port 3001)    │         │   (Cloud DB)    │
│                 │         │                 │         │                 │
└─────────────────┘         └─────────────────┘         └─────────────────┘
```

### Authentication Flow
```
┌──────────────────────────────────────────────────────────────────────────┐
│                         Authentication Flow                              │
└──────────────────────────────────────────────────────────────────────────┘

1. LOGIN
   User → Frontend → POST /auth/login → Backend
                                          ↓
                                    Verify Password
                                          ↓
                                   Generate Tokens
                                          ↓
   User ← Frontend ← { accessToken, refreshToken } ← Backend

2. PROTECTED REQUEST
   User → Frontend → GET /user/me (with accessToken) → Backend
                                                          ↓
                                                    Verify Token
                                                          ↓
   User ← Frontend ←      { user data }               ← Backend

3. TOKEN REFRESH (Auto when 401)
   Request (401) → Axios Interceptor
                        ↓
                  POST /auth/refresh (with refreshToken)
                        ↓
                   New Tokens
                        ↓
                  Retry Original Request

4. LOGOUT
   User → Frontend → POST /auth/logout → Backend
                                            ↓
                                   Invalidate Token
                                            ↓
   User ← Frontend ←    { success }      ← Backend
```

### Token Management Strategy
```
┌─────────────────────────────────────────────────────────────────┐
│                      Token Storage                              │
├─────────────────────────────────────────────────────────────────┤
│  Access Token  → Memory (variable)          │ 15 minutes       │
│  Refresh Token → localStorage               │ 7 days           │
├─────────────────────────────────────────────────────────────────┤
│  Why?                                                           │
│  • Access Token in memory = XSS protection                      │
│  • Refresh Token in localStorage = Persistent login             │
│  • Short-lived access token = Minimized exposure                │
│  • Long-lived refresh token = Better UX                         │
└─────────────────────────────────────────────────────────────────┘
```

---

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0 (or **yarn** >= 1.22.0)
- **MongoDB Atlas account** (or local MongoDB installation)
- **Git** for version control

Check your versions:
```bash
node --version
npm --version
git --version
```

---

## Installation

### 1. Clone the Repository
```bash
git clone https://github.com/kimphungduong/react-jwt-auth-system.git
cd react-jwt-auth-system
```

### 2. Install Backend Dependencies
```bash
cd backend
npm install
```

**Required packages:**
```bash
npm install @nestjs/jwt @nestjs/passport passport passport-jwt
npm install @nestjs/mongoose mongoose bcrypt
npm install @nestjs/config class-validator class-transformer
npm install -D @types/passport-jwt @types/bcrypt
```

### 3. Install Frontend Dependencies
```bash
cd ../frontend
npm install
```

**Required packages:**
```bash
npm install axios @tanstack/react-query react-hook-form
npm install @hookform/resolvers zod sonner
npm install clsx tailwind-merge class-variance-authority
```

---

## Configuration

### Backend Environment Variables

Create `backend/.env` file:

```env
# MongoDB Connection
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/jwt-auth?retryWrites=true&w=majority

# JWT Secrets (MUST be different and at least 32 characters)
JWT_ACCESS_SECRET=your-super-secret-access-key-minimum-32-characters-long-abc123xyz
JWT_REFRESH_SECRET=your-super-secret-refresh-key-minimum-32-characters-different-xyz789

# Server Configuration
PORT=3001
FRONTEND_URL=http://localhost:5173
```

### Frontend Environment Variables

Create `frontend/.env` file:

```env
VITE_API_URL=http://localhost:3001
```

---

## Running the Application

### Development Mode

**Terminal 1 - Backend:**
```bash
cd backend
npm run start:dev
```

Expected output:
```
[Nest] LOG [NestFactory] Starting Nest application...
[Nest] LOG [InstanceLoader] MongooseModule dependencies initialized ✓
[Nest] LOG [InstanceLoader] AuthModule dependencies initialized ✓
[Nest] LOG [RouterExplorer] Mapped {/auth/login, POST} route ✓
[Nest] LOG [RouterExplorer] Mapped {/auth/refresh, POST} route ✓
[Nest] LOG [RouterExplorer] Mapped {/auth/logout, POST} route ✓
[Nest] LOG [RouterExplorer] Mapped {/user/me, GET} route ✓
[Nest] LOG [NestApplication] Nest application successfully started ✓
Application is running on: http://[::1]:3001
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

Expected output:
```
VITE v7.2.6  ready in 734 ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

### Production Mode

**Backend:**
```bash
cd backend
npm run build
npm run start:prod
```

**Frontend:**
```bash
cd frontend
npm run build
npm run preview
```

---

## API Documentation

### Base URL
```
http://localhost:3001
```

### Endpoints

#### 1. User Registration
```http
POST /user/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (201):**
```json
{
  "user": {
    "id": "674abc123...",
    "email": "user@example.com",
    "createdAt": "2024-12-07T12:00:00.000Z"
  }
}
```

---

#### 2. User Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "user": {
    "id": "674abc123...",
    "email": "user@example.com"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

#### 3. Refresh Token
```http
POST /auth/refresh
Authorization: Bearer <REFRESH_TOKEN>
```

**Response (200):**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

#### 4. Get Current User (Protected)
```http
GET /user/me
Authorization: Bearer <ACCESS_TOKEN>
```

**Response (200):**
```json
{
  "id": "674abc123...",
  "email": "user@example.com",
  "createdAt": "2024-12-07T12:00:00.000Z"
}
```

---

#### 5. Logout
```http
POST /auth/logout
Authorization: Bearer <ACCESS_TOKEN>
```

**Response (200):**
```json
{
  "message": "Logged out successfully"
}
```

---

## Testing

### Manual Testing Flow

#### 1. Registration Flow
```bash
# Test user registration
curl -X POST http://localhost:3001/user/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"123456"}'
```

#### 2. Login Flow
```bash
# Test login
curl -X POST http://localhost:3001/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"123456"}'
```

#### 3. Protected Endpoint
```bash
# Test protected endpoint
curl -X GET http://localhost:3001/user/me \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

#### 4. Token Refresh
```bash
# Test token refresh
curl -X POST http://localhost:3001/auth/refresh \
  -H "Authorization: Bearer YOUR_REFRESH_TOKEN"
```

### UI Testing Checklist

- User can register with valid email/password
- User can login with correct credentials
- User is redirected to dashboard after login
- Dashboard displays user information correctly
- User can logout successfully
- Protected routes redirect to login when not authenticated
- Token refresh happens automatically on 401 errors
- Multiple simultaneous requests only trigger one refresh
- User stays logged in after page reload (if token valid)
- Form validation displays appropriate error messages

---

## Deployment

### Backend Deployment (Render.com)

1. Create account on [Render.com](https://render.com)
2. Create new Web Service
3. Connect GitHub repository
4. Configure:
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm run start:prod`
   - **Environment Variables:** Add all from `.env`
5. Deploy

### Frontend Deployment (Vercel)

1. Create account on [Vercel](https://vercel.com)
2. Import GitHub repository
3. Configure:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Environment Variables:** `VITE_API_URL=your-backend-url`
4. Deploy

### Environment Variables for Production

**Backend:**
```env
MONGODB_URI=<your-production-mongodb-uri>
JWT_ACCESS_SECRET=<generate-new-secret>
JWT_REFRESH_SECRET=<generate-new-secret>
PORT=3001
FRONTEND_URL=https://your-frontend-url.vercel.app
```

**Frontend:**
```env
VITE_API_URL=https://your-backend-url.onrender.com
```

---

## Security Features

### Implemented Security Measures

1. **Password Security**
   - Bcrypt hashing with 10 salt rounds
   - Never store plain text passwords
   - Password strength validation on frontend

2. **Token Security**
   - Short-lived access tokens (15 minutes)
   - Refresh token rotation on each refresh
   - Refresh tokens hashed before database storage
   - Tokens invalidated on logout

3. **XSS Protection**
   - Access tokens stored in memory (not localStorage)
   - Content Security Policy headers
   - Input sanitization with class-validator

4. **CSRF Protection**
   - SameSite cookie attribute
   - CORS configuration with specific origins

5. **API Security**
   - Rate limiting on authentication endpoints
   - Request validation with DTOs
   - Guards for route protection

6. **Database Security**
   - MongoDB connection with SSL
   - Parameterized queries (Mongoose)
   - Environment variable for credentials

---

## Learning Objectives Achieved

This project demonstrates understanding of:

- JWT authentication fundamentals (access + refresh tokens)  
- Secure token storage strategies  
- Automatic token refresh implementation  
- Protected route implementation  
- Request interceptor patterns  
- React Query for server state management  
- React Hook Form with validation  
- Modern React patterns (hooks, context)  
- TypeScript for type safety  
- RESTful API design  
- MongoDB database integration  
- Password hashing and security best practices  
- CORS and cross-origin security  
- Error handling and user feedback  
- Responsive UI design  

---

## Performance Optimizations

- Request queue to prevent duplicate refresh calls
- React Query caching for reduced API calls
- Code splitting with React.lazy
- Optimistic UI updates
- Gzip compression on production build
- Vite for fast development and optimized builds

---

## Troubleshooting

### Common Issues

**Issue 1: Cannot connect to MongoDB**
```
Solution: Check MONGODB_URI in .env and ensure IP is whitelisted in MongoDB Atlas
```

**Issue 2: CORS errors**
```
Solution: Verify FRONTEND_URL in backend .env matches frontend URL
```

**Issue 3: JWT_ACCESS_SECRET undefined**
```
Solution: Ensure .env file is in correct location and restart server
```

**Issue 4: Tokens not refreshing**
```
Solution: Check browser DevTools → Network tab for /auth/refresh calls
```

---

## Acknowledgments

- [NestJS Documentation](https://docs.nestjs.com/)
- [React Documentation](https://react.dev/)
- [JWT Best Practices](https://jwt.io/introduction)
- [TanStack Query](https://tanstack.com/query/latest)
- [shadcn/ui](https://ui.shadcn.com/)


