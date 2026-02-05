> Backend-focused assignment with JWT authentication and task management APIs, built for PrimeTrade.


# PrimeTrade Assignment — Backend + Basic UI

## Overview
This project implements a **secure, scalable backend REST API** with authentication and role-based access, along with a **basic frontend UI** to interact with the APIs.

It is built to match PrimeTrade’s assignment requirements and demonstrates clean API design, security best practices, and full CRUD functionality.

---

## ✅ Features Implemented

### 🔐 Authentication & Security
- User registration & login
- Password hashing using **bcrypt**
- JWT-based authentication
- Role-based access control (admin vs user)
- Protected routes using Bearer tokens

### 🧩 Backend (Primary Focus)
- RESTful API design
- API versioning: `/api/v1`
- CRUD APIs for **Tasks** (secondary entity)
- Ownership-based access (users can manage only their own tasks)
- Input validation with proper HTTP status codes
- Swagger / OpenAPI documentation at `/docs`
- SQLAlchemy ORM with relational schema
- Clean, modular project structure

### 🖥 Basic Frontend UI
- User registration & login
- JWT-authenticated API requests
- Displays protected `/auth/me` data
- Create, list, update, delete tasks
- Shows success and error messages from API responses

---

## 🛠 Tech Stack
- **Backend:** FastAPI, SQLAlchemy
- **Authentication:** JWT (python-jose), bcrypt, passlib
- **Database:** SQLite (easily switchable to PostgreSQL/MySQL)
- **API Docs:** Swagger (OpenAPI)
- **Frontend:** Basic HTML/CSS/JavaScript

---

## 🚀 Run Backend Locally

```bash
cd backend
python -m venv .venv

# Activate virtual environment
# Windows:
.venv\Scripts\activate
# Mac/Linux:
# source .venv/bin/activate

pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
Access:

Swagger Docs → http://localhost:8000/docs

Health Check → http://localhost:8000/health

📌 API Endpoints
Auth

POST /api/v1/auth/register — Register user

POST /api/v1/auth/login — Login & get JWT

GET /api/v1/auth/me — Get current authenticated user

Tasks

POST /api/v1/tasks — Create task

GET /api/v1/tasks — List tasks

GET /api/v1/tasks/{id} — Get task by ID

PUT /api/v1/tasks/{id} — Update task

DELETE /api/v1/tasks/{id} — Delete task

📈 Scalability Notes

JWT authentication is stateless → horizontally scalable

Database layer can be migrated to PostgreSQL/MySQL

Redis can be added for caching

Docker-ready architecture

Can be split into microservices (auth, users, tasks)

✅ Assignment Status

✔ Authentication & Authorization
✔ Secure password handling
✔ CRUD operations
✔ Swagger documentation
✔ Basic frontend integration
✔ Scalable backend structure

👤 Author

Nehal Shaikh