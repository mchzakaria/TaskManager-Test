# 🚀 Task Manager - Full Stack Application

A modern, real-time task management application built with **Laravel** (backend) and **Vue.js** (frontend), featuring real-time notifications, user authentication, and a beautiful UI.

## ✨ Features

### 🔐 Authentication & User Management
- **JWT Token Authentication** - Secure token-based authentication
- **User Registration** - Complete registration with all required fields
  - Full Name, Email, Phone Number, Address
  - Profile Image Upload
  - Password with confirmation
- **User Profile Management** - Edit profile information and change password
- **User Data Isolation** - Complete separation of user data

### 📋 Task Management
- **Full CRUD Operations** - Create, Read, Update, Delete tasks
- **Rich Task Properties**:
  - Title (required)
  - Description (optional)
  - Priority (Low/Medium/High)
  - Due Date (optional)
  - Status (Pending/Completed)
- **Task Editing** - Inline editing with form switching
- **User-Specific Tasks** - Users only see their own tasks

### 🔔 Real-time Notifications
- **Automatic Notifications** - Created when tasks are added
- **Real-time Delivery** - Using Laravel Echo and Pusher
- **Toast Notifications** - Immediate feedback for users
- **Notification Badge** - Unread count indicator
- **Dedicated Notifications Page** - Full notification management
- **Read/Unread Status** - Track notification states

### 🎨 Modern UI/UX
- **Responsive Design** - Works on all device sizes
- **Tailwind CSS** - Modern styling framework
- **Navigation Component** - Consistent navigation across pages
- **Loading States** - Proper loading indicators
- **Error Handling** - Comprehensive error management
- **Smooth Animations** - Professional transitions

### 🏗️ Architecture & Best Practices
- **Service Layer** - Business logic separation
- **Repository Pattern** - Data access abstraction
- **SOLID Principles** - Clean, maintainable code
- **Event-Driven Architecture** - Broadcasting system
- **TypeScript Support** - Type-safe development

## 🛠️ Technology Stack

### Backend (Laravel)
- **Framework**: Laravel 10
- **Database**: MySQL/PostgreSQL
- **Authentication**: JWT (tymon/jwt-auth)
- **Real-time**: Laravel Echo + Pusher
- **File Upload**: Laravel Storage
- **Validation**: Form Request Classes
- **Testing**: PHPUnit

### Frontend (Vue.js)
- **Framework**: Vue.js 3 with Composition API
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Pinia
- **Routing**: Vue Router
- **HTTP Client**: Axios
- **Real-time**: Laravel Echo + Pusher-js

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **PHP 8.1+**
- **Node.js 16+**
- **Composer**
- **MySQL/PostgreSQL**
- **Git**

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone <repository-url>
cd TaskManager-Test
```

### 2. Backend Setup (Laravel)

#### Navigate to Backend Directory
```bash
cd todo-backend
```

#### Install Dependencies
```bash
composer install
```

#### Environment Configuration
```bash
cp .env.example .env
php artisan key:generate
```

#### Database Configuration
Edit `.env` file and update database settings:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=task_manager
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

#### Pusher Configuration (for Real-time Notifications)
1. Create a free account at [Pusher](https://pusher.com/)
2. Create a new app
3. Add Pusher credentials to `.env`:
```env
BROADCAST_DRIVER=pusher
PUSHER_APP_ID=your_app_id
PUSHER_APP_KEY=your_app_key
PUSHER_APP_SECRET=your_app_secret
PUSHER_APP_CLUSTER=mt1
```

#### Run Migrations
```bash
php artisan migrate
```

#### Create Storage Link
```bash
php artisan storage:link
```

#### Start Laravel Server
```bash
php artisan serve
```

The backend will be available at `http://localhost:8000`

### 3. Frontend Setup (Vue.js)

#### Navigate to Frontend Directory
```bash
cd ../todo-frontend
```

#### Install Dependencies
```bash
npm install
```

#### Environment Configuration
Create `.env` file in the frontend directory:
```env
# API Configuration
VITE_API_URL=http://localhost:8000

# Pusher Configuration (use same credentials as backend)
VITE_PUSHER_APP_KEY=your_pusher_app_key
VITE_PUSHER_APP_CLUSTER=mt1
```

#### Start Development Server
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

## 🧪 Testing the Application

### 1. Register a New User
1. Go to `http://localhost:5173/register`
2. Fill in all required fields:
   - Full Name
   - Email
   - Phone Number (optional)
   - Address (optional)
   - Profile Image (optional)
   - Password
   - Confirm Password

### 2. Login
1. Go to `http://localhost:5173/login`
2. Enter your email and password

### 3. Create Tasks
1. On the main page, you'll see the task creation form
2. Fill in task details:
   - Title (required)
   - Description (optional)
   - Priority (Low/Medium/High)
   - Due Date (optional)
   - Status (Pending/Completed)
3. Click "Add Task"

### 4. Test Real-time Notifications
1. Create a new task
2. You should see a toast notification appear
3. Check the Notifications page to see the notification
4. The notification badge should show the unread count

### 5. Test Task Management
- Edit tasks by clicking the "Edit" button
- Mark tasks as complete/incomplete
- Delete tasks
- Filter and search tasks

### 6. Test Profile Management
- Go to the Profile page
- Update your profile information
- Change your profile picture
- Change your password

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update user profile
- `PUT /api/auth/password` - Change password

### Tasks
- `GET /api/tasks` - Get user's tasks (with filters)
- `POST /api/tasks` - Create new task
- `GET /api/tasks/{id}` - Get specific task
- `PUT /api/tasks/{id}` - Update task
- `DELETE /api/tasks/{id}` - Delete task

### Notifications
- `GET /api/notifications` - Get user's notifications
- `GET /api/notifications/unread` - Get unread notifications
- `PUT /api/notifications/{id}/read` - Mark notification as read
- `PUT /api/notifications/read-all` - Mark all as read

## 🗄️ Database Schema

### Users Table
```sql
- id (Primary Key)
- name (VARCHAR)
- email (VARCHAR, Unique)
- phone_number (VARCHAR, Nullable)
- address (TEXT, Nullable)
- image (VARCHAR, Nullable)
- password (VARCHAR)
- email_verified_at (TIMESTAMP, Nullable)
- created_at, updated_at (TIMESTAMPS)
```

### Tasks Table
```sql
- id (Primary Key)
- user_id (Foreign Key)
- title (VARCHAR)
- description (TEXT, Nullable)
- priority (ENUM: low, medium, high)
- due_date (DATE, Nullable)
- status (ENUM: pending, completed)
- created_at, updated_at (TIMESTAMPS)
```

### Notifications Table
```sql
- id (Primary Key)
- user_id (Foreign Key)
- type (VARCHAR)
- message (TEXT)
- data (JSON, Nullable)
- read (BOOLEAN)
- created_at, updated_at (TIMESTAMPS)
```

## 🔒 Security Features

### Authentication & Authorization
- JWT token-based authentication
- User-specific data isolation
- Protected API routes
- Secure password hashing
- Token refresh mechanism

### Data Protection
- Input validation and sanitization
- SQL injection prevention
- XSS protection
- File upload security
- CORS configuration

### Real-time Security
- Private channels for notifications
- User-specific broadcasting
- Channel authorization
- Secure WebSocket connections

## 🚀 Production Deployment

### Backend Deployment
1. Set `APP_ENV=production` in `.env`
2. Configure production database
3. Set up Pusher credentials
4. Run migrations
5. Configure web server (Apache/Nginx)

### Frontend Deployment
1. Run `npm run build`
2. Deploy `dist/` folder to web server
3. Configure environment variables
4. Set up proper CORS headers

## 🐛 Troubleshooting

### Common Issues

#### Backend Issues
1. **Database Connection Error**
   - Check database credentials in `.env`
   - Ensure database exists
   - Run `php artisan migrate`

2. **Pusher Configuration Error**
   - Verify Pusher credentials in `.env`
   - Check if Pusher app is active
   - Ensure `BROADCAST_DRIVER=pusher`

3. **JWT Token Issues**
   - Run `php artisan jwt:secret`
   - Clear cache: `php artisan cache:clear`

#### Frontend Issues
1. **API Connection Error**
   - Check `VITE_API_URL` in `.env`
   - Ensure backend server is running
   - Check CORS configuration

2. **Real-time Notifications Not Working**
   - Verify Pusher credentials
   - Check browser console for errors
   - Ensure Echo is properly configured

3. **Build Errors**
   - Run `npm install` to ensure all dependencies
   - Clear node_modules and reinstall if needed

### Development Commands

#### Backend
```bash
# Run migrations
php artisan migrate

# Clear cache
php artisan cache:clear

# Generate JWT secret
php artisan jwt:secret

# Run tests
php artisan test

# Start server
php artisan serve
```

#### Frontend
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm run test
```

## 📚 Project Structure

```
TaskManager-Test/
├── todo-backend/          # Laravel API
│   ├── app/
│   │   ├── Http/Controllers/
│   │   ├── Models/
│   │   ├── Services/
│   │   ├── Repositories/
│   │   └── Events/
│   ├── database/migrations/
│   └── routes/
├── todo-frontend/         # Vue.js Frontend
│   ├── src/
│   │   ├── components/
│   │   ├── views/
│   │   ├── stores/
│   │   ├── router/
│   │   └── lib/
│   └── package.json
├── SETUP.md              # Detailed setup guide
├── PROJECT_SUMMARY.md    # Comprehensive project documentation
└── README.md            # This file
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).

## 🆘 Support

If you encounter any issues:
1. Check the troubleshooting section above
2. Review the console logs for errors
3. Ensure all environment variables are set correctly
4. Verify that both backend and frontend servers are running

## 🎯 Educational Value

This project demonstrates:
- Modern full-stack development
- Real-time application architecture
- Professional code organization
- Security best practices
- User experience design
- Testing strategies
- Deployment considerations

---

**Happy Coding! 🚀**
