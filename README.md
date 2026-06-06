# College Discovery Platform (MVP)

A production-grade MVP for a college discovery and decision-making platform. Built with a NestJS backend API, a PostgreSQL database (Prisma ORM), and a premium Next.js frontend UI.

This project was built following the expectations of **Track B (College Discovery Platform)** for the **Role of Backend Engineer**, with a focus on robust API design, pagination, validation systems, relational database modeling, and standard REST practices.

---

## 🚀 Live Demo & Submission Links
* **Live App URL**: `https://your-frontend-deployment.vercel.app` *(Replace with your Vercel URL)*
* **Loom Video (Architecture & Walkthrough)**: `https://loom.com/your-video-id` *(Replace with your Loom video URL)*
* **GitHub Repository**: `https://github.com/your-username/college-discovery-platform` *(Replace with your repo URL)*

---

## 🛠 Tech Stack

| Layer | Technology | Rationale |
|---|---|---|
| **Frontend** | Next.js 14 (App Router) + React + TypeScript | Premium rendering engine with Suspense boundary route handlers. |
| **Styling** | TailwindCSS + Vanilla CSS | Modern dark-theme first design with glassmorphism, gradients, and micro-animations. |
| **Backend** | NestJS + Node.js + TypeScript | Modular, scalable architectural pattern (controllers/services split) matching production environments. |
| **Database** | PostgreSQL (Neon serverless) | Normalized SQL database with multi-field indexing for fast queries. |
| **ORM** | Prisma | Typesafe schema modeling with cascading deletes and database seeds. |
| **Validation** | class-validator + class-transformer | Strict DTO-based route input validation. |
| **Auth** | @nestjs/jwt + passport-jwt | Industry-standard stateless JWT authentication. |

---

## 🌟 Key Features Implemented

1. **College Search, Composable Filters & Pagination**:
   * Live search querying `name`, `location`, and `city` (ILIKE matches).
   * Composable filters for college type (`GOVERNMENT`, `PRIVATE`, `DEEMED`), annual fee bounds (`minFees`, `maxFees`), and rating thresholds.
   * Skip/Take pagination returning total records and page-next/prev metadata using transaction isolation.
2. **College Detail Page**:
   * Dynamic fetching of individual colleges with 4-way relational splits: general overview, course tables, historical placements data (annual averages and top recruiters list), and student reviews.
3. **Side-by-Side Comparison**:
   * Compare 2 to 3 colleges side-by-side. 
   * Highlights best values automatically (e.g., green badge for lowest annual fees, gold badge for highest average package/rating).
4. **College Predictor Tool**:
   * Takes user rank and exam (`JEE Main`, `GATE`, `CAT`) inputs and queries the database for qualifying courses based on closing rank cutoffs (`cutoff >= rank`).
5. **Authentication & shortlisting**:
   * JWT-based login/signup. Authenticated users can save or unsave colleges. The saved list is user-scoped on the backend (queries use the decoded JWT payload).

---

## ⚡ Edge Cases Handled (REST API Quality)

* **Logical Validation**: Returns a `400 Bad Request` if `minFees > maxFees`.
* **Comparison Quantity Bounds**: Restricts comparisons strictly to 2–3 colleges. Returns `400` if you pass 1 or 4+ IDs.
* **Duplicate Comparison Rejection**: Detects and throws a `400` error if duplicate IDs are sent in comparison.
* **Database Cohesion on Deletes**: Course, Placement, and Review tables use `onDelete: Cascade` constraints so deleting a college cleans up orphans automatically.
* **Concurring Saves**: Catches PostgreSQL unique constraint errors (`P2002`) and returns a `409 ConflictException` if a user attempts to save an already saved college.
* **Stateless Token Integrity**: Saved routes are guarded with `JwtAuthGuard`. The backend extracts user context directly from the token, completely preventing ID spoofing.

---

## 📂 Directory Structure

```
college-platform/
├── backend/                       # NestJS API App
│   ├── src/
│   │   ├── main.ts                # App bootstrapper, CORS, ValidationPipe, Filters
│   │   ├── app.module.ts          # Root module importing feature modules
│   │   ├── prisma/                # Prisma Module & Service (DB connection)
│   │   ├── auth/                  # JWT Strategy, login, registration, Guards
│   │   ├── colleges/              # Listing, filters, search, details
│   │   ├── compare/               # Side-by-side college analytics
│   │   ├── saved/                 # User-scoped shortlist controls
│   │   ├── predictor/             # Eligibility estimator using cutoffs
│   │   └── common/                # Global exception filters & format interceptors
│   ├── prisma/
│   │   ├── schema.prisma          # PostgreSQL relational schema
│   │   └── seed.ts                # Seeding script populating 100 Indian colleges
│   ├── package.json
│   └── tsconfig.json
│
└── frontend/                      # Next.js App Client
    ├── src/app/
    │   ├── page.tsx               # Home Page (Search, listing, filters)
    │   ├── colleges/[id]/page.tsx # Detail Page (Overview, Courses, Placements, Reviews)
    │   ├── compare/page.tsx       # Compare matrix
    │   ├── predictor/page.tsx     # Cutoffs search tool
    │   ├── saved/page.tsx         # Shortlisted colleges
    │   └── auth/                  # Login & Register forms
    ├── src/components/            # Reusable UI cards, Navbar, Pagination, Skeletons
    ├── src/lib/                   # Axios-equivalent Fetch API utility
    ├── package.json
    └── tailwind.config.ts
```

---

## ⚙️ Environment Variables Config

### Backend Config (`backend/.env`)
```env
DATABASE_URL="postgresql://user:password@host/dbname?sslmode=require"
JWT_SECRET="your-super-secret-key-minimum-32-characters-long"
JWT_EXPIRES_IN="7d"
PORT=3001
NODE_ENV="development"
FRONTEND_URL="http://localhost:3000"
```

### Frontend Config (`frontend/.env.local`)
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

---

## 🔧 Setup & Local Running Instructions

### 1. Database Schema Sync & Seeding
1. Create a PostgreSQL database (Neon serverless or local pgAdmin).
2. Write your connection string in the `backend/.env` file.
3. Open your terminal in the `/backend` folder and run:
   ```bash
   npm install
   npx prisma db push
   npx prisma db seed
   ```
   *(This creates the tables and seeds 100 colleges, 500 courses, 200 placements, and 200 reviews).*

### 2. Start the Backend API Server
```bash
npm run start:dev
```
The backend API runs at `http://localhost:3001/api`.

### 3. Start the Next.js Frontend App
1. Open a new terminal in the `/frontend` folder.
2. Run the following commands:
   ```bash
   npm install
   npm run dev
   ```
3. Open `http://localhost:3000` in your web browser.

---

## 🔌 API Endpoints Table

| Method | Endpoint | Auth Required | Input/Query Params | Description |
|--------|----------|---------------|-------------------|-------------|
| **POST** | `/api/auth/register` | No | `{ email, password, name }` | Register a new user account |
| **POST** | `/api/auth/login` | No | `{ email, password }` | Authenticate and get JWT token |
| **GET** | `/api/auth/me` | Yes | Bearer Token | Fetch authenticated profile details |
| **GET** | `/api/colleges` | No | `?search=&location=&type=&minFees=&maxFees=&minRating=&sortBy=&sortOrder=&page=&limit=` | Filter, search, and paginate colleges |
| **GET** | `/api/colleges/:id` | No | Path parameter `:id` | Get detail metrics of a college |
| **GET** | `/api/compare` | No | `?ids=id1,id2,id3` | Compare 2-3 colleges side-by-side |
| **GET** | `/api/saved` | Yes | Bearer Token | Fetch user's shortlisted colleges |
| **POST** | `/api/saved/:id` | Yes | Path parameter `:id` | Save college to user's shortlist |
| **DELETE**| `/api/saved/:id` | Yes | Path parameter `:id` | Remove college from shortlist |
| **GET** | `/api/saved/:id/status` | Yes | Path parameter `:id` | Check shortlist status of a college |
| **GET** | `/api/predictor` | No | `?exam=&rank=` | Find qualifying courses based on rank |
