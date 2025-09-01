# Todo API Project

A full-stack **To-Do application** with a **Laravel RESTful API backend** (`todo-backend`) and a **Vue.js frontend** (`todo-frontend`).  
The backend provides JWT authentication, email verification, task CRUD operations, and real-time event broadcasting.  
The frontend, built with **Vue 3, Pinia, Tailwind CSS, and shadcn-vue**, consumes the API and supports **real-time updates** via **Laravel Echo + Pusher**.

---

## ✨ Features

### 🔹 Backend
- JWT Authentication (login/register/refresh/logout)
- Email auto-verification on registration
- Task CRUD (Create, Read, Update, Delete)
- Real-time events (task created, updated, deleted)
- Consistent JSON responses with API resources
- Validation & error handling

### 🔹 Frontend
- Responsive UI with Tailwind CSS & shadcn-vue
- User auth (register, login, profile, logout)
- Task management (list, add, edit, delete)
- Real-time updates with Laravel Echo + Pusher
- State management with Pinia
- Built & served using Vite

---

## ⚙️ Step-by-Step Setup Guide

### 1. Prerequisites

**Backend**
- PHP >= 8.0
- Composer
- MySQL or SQLite

**Frontend**
- Node.js >= 18
- npm or pnpm

---

### 2. Clone the Repository
```sh
git clone https://github.com/mchzakaria/TaskManger-Test.git
cd TaskManger-Test
```

---

### 3. Backend Setup

```sh
cd todo-backend
composer install
```

#### Install JWT
```sh
composer require tymon/jwt-auth
php artisan vendor:publish --provider="Tymon\JWTAuth\Providers\LaravelServiceProvider"
php artisan jwt:secret
```

#### Configure `.env`
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_db
DB_USERNAME=your_user
DB_PASSWORD=your_password

MAIL_MAILER=log

BROADCAST_DRIVER=pusher
PUSHER_APP_ID=your_app_id
PUSHER_APP_KEY=your_app_key
PUSHER_APP_SECRET=your_app_secret
PUSHER_APP_CLUSTER=mt1
```

#### Run setup commands
```sh
php artisan key:generate
php artisan migrate
php artisan db:seed   # optional
php artisan serve
```

---

### 4. Frontend Setup

```sh
cd ../todo-frontend
pnpm install   # or npm install
```

#### Setup shadcn-vue components
```sh
npx shadcn-vue@latest add button input select textarea dialog
```

#### Configure `.env`
```env
VITE_API_URL=http://localhost:8000/api
VITE_PUSHER_APP_KEY=your_app_key
VITE_PUSHER_APP_CLUSTER=mt1
```

#### Start frontend
```sh
pnpm dev
```
Access → [http://localhost:5173](http://localhost:5173)

---

## 🛠 Troubleshooting

### Backend
- **Missing PHP extensions** → Install `pdo`, `mbstring`, `openssl`, `xml`, etc.
- **JWT errors** → Run `php artisan jwt:secret`
- **DB issues** → Check `.env` and rerun migrations
- **Broadcast errors** → Verify Pusher credentials
- **CORS issues** → Update `config/cors.php` to allow `http://localhost:5173`

### Frontend
- **shadcn-vue errors** → Ensure components are generated
- **Alias issues** → Check `tsconfig.json` & `vite.config.ts`
- **Build errors** → Delete `node_modules` + lockfile, reinstall

---

## 🚀 Usage

### Backend
- Register → `POST /api/register`
- Login → `POST /api/login` → get JWT
- Use `Authorization: Bearer <token>` header for protected routes
- Manage tasks with CRUD endpoints

### Frontend
- Visit [http://localhost:5173](http://localhost:5173)
- Register/login
- Add, edit, delete tasks with real-time sync
- Logout when done

---

## 📡 API Endpoints

### Auth
- `POST /api/register` — Register new user
- `POST /api/login` — Login & get JWT
- `POST /api/logout` — Logout
- `POST /api/refresh` — Refresh JWT
- `GET /api/me` — Get logged-in user

### Tasks
- `GET /api/tasks` — List all tasks
- `POST /api/tasks` — Create task
- `GET /api/tasks/{id}` — Get single task
- `PUT /api/tasks/{id}` — Update task
- `DELETE /api/tasks/{id}` — Delete task

### Email Verification
- `GET /api/email/verify/{id}/{hash}` — Verify email
- `POST /api/email/resend` — Resend verification

### Events
- `TaskCreated`, `TaskUpdated`, `TaskDeleted` broadcasted via Pusher

---

## 📂 Project Structure

```
todo-backend/     # Laravel API backend
 ├─ app/
 ├─ config/
 ├─ database/
 └─ routes/

todo-frontend/    # Vue.js frontend
 ├─ src/
 ├─ public/
 └─ vite.config.ts
```

---

## 🤝 Contributing
1. Fork repo  
2. Create branch → `git checkout -b feature-name`  
3. Commit changes → `git commit -m "Add feature"`  
4. Push branch → `git push origin feature-name`  
5. Open PR 🚀

---

## 📜 License
MIT License
