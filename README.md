# Todo API Project

This is a Laravel RESTful API for managing tasks with JWT authentication, user registration, email verification, real-time event broadcasting, validation, and API resources.

## Features

- User registration and login (JWT)
- Email auto-verification on registration
- Task CRUD (Create, Read, Update, Delete)
- Real-time events for task creation, update, and deletion
- API resources for consistent JSON responses
- Validation and error handling

---

## Step-by-Step Setup Guide

### 1. Prerequisites

- PHP >= 8.0
- Composer
- MySQL or SQLite
- Node.js & npm (optional, for frontend assets)

### 2. Clone the Repository

```sh
git clone https://github.com/mchzakaria/TaskManger-RESTful-API.git
cd todo-api
```

### 3. Install Dependencies

```sh
composer install
```

### 4. Install JWT Package

```sh
composer require tymon/jwt-auth
php artisan vendor:publish --provider="Tymon\JWTAuth\Providers\LaravelServiceProvider"
php artisan jwt:secret
```

### 5. Configure Environment

- Copy `.env.example` to `.env`:
  ```sh
  cp .env.example .env
  ```
- Edit `.env` and set your database credentials:
  ```env
  DB_CONNECTION=mysql
  DB_HOST=127.0.0.1
  DB_PORT=3306
  DB_DATABASE=your_db
  DB_USERNAME=your_user
  DB_PASSWORD=your_password
  ```
- For local development, set mail driver to log:
  ```env
  MAIL_MAILER=log
  ```

### 6. Generate Application Key

```sh
php artisan key:generate
```

### 7. Run Migrations

```sh
php artisan migrate
```

### 8. (Optional) Seed the Database

```sh
php artisan db:seed
```

### 9. (Optional) Build Frontend Assets

```sh
npm install
npm run dev
```

### 10. Start the Server

```sh
php artisan serve
```

### 11. (Optional) Clear and Cache Config

```sh
php artisan config:cache
php artisan cache:clear
```

## Troubleshooting

- **Missing PHP extensions:** Install required extensions (pdo, mbstring, openssl, tokenizer, xml, etc.).
- **JWT errors:** Ensure you installed and configured `tymon/jwt-auth` and ran `php artisan jwt:secret`.
- **Database errors:** Check your `.env` DB settings and that migrations ran successfully.
- **Mail errors:** Use `MAIL_MAILER=log` for local dev.
- **Broadcasting issues:** Configure broadcasting in `.env` and `config/broadcasting.php` if using events frontend.
- **CORS issues:** Adjust `config/cors.php` if accessing API from a frontend.
- **Class not found:** Run `composer dump-autoload` after adding new files.

---

## How to Use

1. Register a user via `POST /api/register`.
2. Login via `POST /api/login` to get a JWT token.
3. Use the token in the `Authorization: Bearer <token>` header for all protected endpoints.
4. Manage tasks via the endpoints below.

---

## API Endpoints

### Auth

- `POST /api/register` — Register a new user
- `POST /api/login` — Login and receive JWT token
- `POST /api/logout` — Logout (invalidate token)
- `POST /api/refresh` — Refresh JWT token
- `GET /api/me` — Get current user info

### Tasks

- `GET /api/tasks` — List all tasks for authenticated user
- `POST /api/tasks` — Create a new task
- `GET /api/tasks/{id}` — Get a specific task
- `PUT /api/tasks/{id}` — Update a task
- `DELETE /api/tasks/{id}` — Delete a task

### Email Verification

- `GET /api/email/verify/{id}/{hash}` — Verify email (auto-verified on registration)
- `POST /api/email/resend` — Resend verification email

### Events

- TaskCreated, TaskUpdated, TaskDeleted events are broadcasted in real-time (see Laravel Echo & Pusher setup for frontend)

### Validation & Error Handling

- All endpoints return JSON responses.
- Validation errors return status 422 with error details.
- Unauthenticated requests return status 401.
