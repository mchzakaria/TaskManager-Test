# Todo API Project

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

### 🔹 Frontend
- Responsive UI with **Tailwind CSS** and **shadcn-vue** components
- Authentication (login, register, profile, logout)
- Task management (add, edit, delete, list)
- Real-time task updates using **Laravel Echo + Pusher**
- State management with **Pinia**
- **Vite** for development and building

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
- A code editor (e.g., VS Code)

---

### 2. Clone the Repository
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
composer require tymon/jwt-auth
php artisan vendor:publish --provider="Tymon\JWTAuth\Providers\LaravelServiceProvider"
php artisan jwt:secret
d. Configure Environment
Copy .env.example → .env:

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

🛠 Troubleshooting
Backend
Missing PHP extensions → Install pdo, mbstring, openssl, tokenizer, xml, etc.

JWT errors → Run php artisan jwt:secret

Database errors → Check .env DB settings & migrations

Mail issues → Use MAIL_MAILER=log locally

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
