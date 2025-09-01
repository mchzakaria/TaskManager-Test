# Todo API Project

<<<<<<< HEAD
A full-stack **To-Do application** with a **Laravel RESTful API backend** (`todo-backend`) and a **Vue.js frontend** (`todo-frontend`).  
The backend provides JWT authentication, email verification, task CRUD operations, and real-time event broadcasting.  
The frontend, built with **Vue 3, Pinia, Tailwind CSS, and shadcn-vue**, consumes the API and supports **real-time updates** via **Laravel Echo + Pusher**.
=======
A full-stack **To-Do application** featuring a **Laravel RESTful API backend** (`todo-backend`) and a **Vue.js frontend** (`todo-frontend`).  
The backend provides JWT authentication, email verification, task CRUD operations, and real-time event broadcasting.  
The frontend is built with **Vue 3, Pinia, Tailwind CSS, and shadcn-vue components**, supporting real-time updates via **Laravel Echo** and **Pusher**.

---

## ✨ Features

### 🔹 Backend
- User registration and login with **JWT authentication**
- Email auto-verification on registration
- Task CRUD (Create, Read, Update, Delete)
- Real-time events for task creation, update, and deletion
- API resources for consistent JSON responses
- Validation and error handling
>>>>>>> 726826384ca60258695aaac885a2937de408d4fd

### 🔹 Frontend
- Responsive UI with **Tailwind CSS** and **shadcn-vue** components
- Authentication (login, register, profile, logout)
- Task management (add, edit, delete, list)
- Real-time task updates using **Laravel Echo + Pusher**
- State management with **Pinia**
- **Vite** for development and building

---

<<<<<<< HEAD
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

=======
## ⚙️ Step-by-Step Setup Guide

### 1. Prerequisites
>>>>>>> 726826384ca60258695aaac885a2937de408d4fd
**Backend**
- PHP >= 8.0
- Composer
- MySQL or SQLite

**Frontend**
- Node.js >= 18
- npm or pnpm
<<<<<<< HEAD
=======
- A code editor (e.g., VS Code)
>>>>>>> 726826384ca60258695aaac885a2937de408d4fd

---

### 2. Clone the Repository
<<<<<<< HEAD
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
=======
```sh
git clone https://github.com/mchzakaria/TaskManger-Test.git
cd TaskManger-Test
3. Backend Setup
a. Navigate to Backend Directory
sh
Copier le code
cd todo-backend
b. Install Dependencies
sh
Copier le code
composer install
c. Install JWT Package
sh
Copier le code
>>>>>>> 726826384ca60258695aaac885a2937de408d4fd
composer require tymon/jwt-auth
php artisan vendor:publish --provider="Tymon\JWTAuth\Providers\LaravelServiceProvider"
php artisan jwt:secret
d. Configure Environment
Copy .env.example → .env:

<<<<<<< HEAD
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
=======
sh
Copier le code
cp .env.example .env
Update .env:

env
Copier le code
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
e. Generate Application Key
sh
Copier le code
php artisan key:generate
f. Run Migrations
sh
Copier le code
php artisan migrate
g. (Optional) Seed the Database
sh
Copier le code
php artisan db:seed
h. Start the Backend Server
sh
Copier le code
php artisan serve
i. (Optional) Cache Config
sh
Copier le code
php artisan config:cache
php artisan cache:clear
4. Frontend Setup
a. Navigate to Frontend Directory
sh
Copier le code
cd ../todo-frontend
b. Install Dependencies
sh
Copier le code
pnpm install
# or
npm install
c. Configure shadcn-vue Components
sh
Copier le code
npx shadcn-vue@latest add button input select textarea dialog
d. Configure Environment
Copy .env.example → .env:

sh
Copier le code
cp .env.example .env
Update .env:

env
Copier le code
VITE_API_URL=http://localhost:8000/api
VITE_PUSHER_APP_KEY=your_app_key
VITE_PUSHER_APP_CLUSTER=mt1
e. Start Development Server
sh
Copier le code
pnpm dev
Visit → http://localhost:5173
>>>>>>> 726826384ca60258695aaac885a2937de408d4fd

🛠 Troubleshooting
Backend
Missing PHP extensions → Install pdo, mbstring, openssl, tokenizer, xml, etc.

<<<<<<< HEAD
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
=======
JWT errors → Run php artisan jwt:secret

Database errors → Check .env DB settings & migrations
>>>>>>> 726826384ca60258695aaac885a2937de408d4fd

Mail issues → Use MAIL_MAILER=log locally

<<<<<<< HEAD
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
=======
Broadcast issues → Verify Pusher credentials in .env

CORS issues → Update config/cors.php to allow frontend URL

Class not found → Run composer dump-autoload

Frontend
Import errors → Ensure shadcn-vue components are generated

Alias resolution → Check tsconfig.json & vite.config.ts

Pusher issues → Validate .env credentials & connectivity

Build errors → Delete node_modules & lock file, reinstall dependencies

🚀 How to Use
Backend
Register → POST /api/register

Login → POST /api/login → get JWT

Add Authorization: Bearer <token> header for protected endpoints

Manage tasks via CRUD APIs

Frontend
Visit http://localhost:5173

Register or login

Add, edit, delete tasks with real-time updates

Logout to end session

📡 API Endpoints
Auth
POST /api/register → Register new user

POST /api/login → Login (JWT)

POST /api/logout → Logout

POST /api/refresh → Refresh JWT

GET /api/me → Current user info

Tasks
GET /api/tasks → List tasks

POST /api/tasks → Create task

GET /api/tasks/{id} → Get task

PUT /api/tasks/{id} → Update task

DELETE /api/tasks/{id} → Delete task

Email Verification
GET /api/email/verify/{id}/{hash} → Verify email

POST /api/email/resend → Resend verification

Events
TaskCreated, TaskUpdated, TaskDeleted broadcasted via Pusher

📂 Project Structure
csharp
Copier le code
todo-backend/      # Laravel API backend
 ├─ app/           # Models, controllers, policies
 ├─ config/        # Config files
 ├─ database/      # Migrations, seeds
 └─ routes/        # API routes

todo-frontend/     # Vue.js frontend
 ├─ src/           # Components, views, stores, assets
 ├─ public/        # Static files
 └─ vite.config.ts # Vite config
