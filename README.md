# College Discovery Platform

A production-grade MVP for a college discovery and comparison platform. Built with a NestJS backend API, a PostgreSQL database (Prisma ORM), and a premium Next.js frontend UI.

## Features

- **College Search & Filter**: Fully composable search queries by name/location, filters (fees range, college type, minimum rating), sorting (fees, rating, name, established year), and pagination.
- **Relational Detail Page**: View specific college details, course listings (fees, seats, durations), placements (year-by-year packages, placement rates, top recruiters), and student reviews.
- **Side-by-Side Comparison**: Select 2 or 3 colleges to compare side-by-side with automatic highlights for best values (e.g., lowest fees, highest package, highest placement rate).
- **Authentication & Saved Colleges**: User login/signup with secure JWT authentication. Users can save and unsave colleges to track their favorites.

## Tech Stack

- **Backend**: NestJS, TypeScript, Passport.js (JWT Strategy), `class-validator`, Prisma ORM.
- **Frontend**: Next.js (App Router), TypeScript, TailwindCSS, Lucide Icons.
- **Database**: PostgreSQL (Prisma).

## Setup & Running Instructions

### 1. Database Setup
Create a PostgreSQL instance (e.g., on Neon, Supabase, Docker, or Local PostgreSQL).
Create a `backend/.env` file with the following variables:

```env
DATABASE_URL="postgresql://user:password@host/dbname?sslmode=require"
JWT_SECRET="your-super-secret-key-minimum-32-characters-long"
JWT_EXPIRES_IN="7d"
PORT=3001
NODE_ENV="development"
FRONTEND_URL="http://localhost:3000"
```

### 2. Generate Prisma Client, Migrate, and Seed
Run these commands inside the `backend` directory to initialize the database and seed it with 100 realistic Indian colleges (including courses, placements, and reviews):

```bash
cd backend
npm install
npx prisma db push
npx prisma db seed
```

### 3. Start Backend Server
```bash
npm run start:dev
```
The backend API runs at `http://localhost:3001/api`.

### 4. Setup and Start Frontend Next.js Client
Create a `frontend/.env.local` file:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

Run these commands inside the `frontend` directory to start the client:
```bash
cd ../frontend
npm install
npm run dev
```
Open `http://localhost:3000` to interact with the platform.

## API Endpoints

| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| **POST** | `/api/auth/register` | No | Register a new user |
| **POST** | `/api/auth/login` | No | Login and get JWT token |
| **GET** | `/api/auth/me` | Yes | Get currently logged-in user profile |
| **GET** | `/api/colleges` | No | Search, filter, and paginate colleges |
| **GET** | `/api/colleges/:id` | No | Get detailed college by ID |
| **GET** | `/api/compare?ids=id1,id2,id3` | No | Compare 2-3 colleges side-by-side |
| **GET** | `/api/saved` | Yes | List saved colleges for user |
| **POST** | `/api/saved/:id` | Yes | Save a college to list |
| **DELETE**| `/api/saved/:id` | Yes | Unsave a college from list |
| **GET** | `/api/saved/:id/status` | Yes | Check save status of a college |
