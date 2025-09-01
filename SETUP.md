# Task Manager - Complete Setup Guide

This guide will help you set up the complete Task Manager application with Laravel backend and Vue.js frontend, including real-time notifications.

## Prerequisites

- PHP 8.1+
- Node.js 16+
- Composer
- MySQL/PostgreSQL
- Git

## Project Structure

```
TaskManager-Test/
├── todo-backend/          # Laravel API
├── todo-frontend/         # Vue.js Frontend
└── SETUP.md              # This file
```

## Step 1: Backend Setup (Laravel)

### 1.1 Navigate to Backend Directory
```bash
cd todo-backend
```

### 1.2 Install Dependencies
```bash
composer install
```

### 1.3 Environment Configuration
```bash
cp .env.example .env
php artisan key:generate
```

### 1.4 Database Configuration
Edit `.env` file and update database settings:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=task_manager
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

### 1.5 Pusher Configuration (for Real-time Notifications)
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

### 1.6 Run Migrations
```bash
php artisan migrate
```

### 1.7 Start Laravel Server
```bash
php artisan serve
```

The backend will be available at `http://localhost:8000`

## Step 2: Frontend Setup (Vue.js)

### 2.1 Navigate to Frontend Directory
```bash
cd ../todo-frontend
```

### 2.2 Install Dependencies
```bash
npm install
```

### 2.3 Environment Configuration
Create `.env` file in the frontend directory:
```env
# API Configuration
VITE_API_URL=http://localhost:8000

# Pusher Configuration (use same credentials as backend)
VITE_PUSHER_APP_KEY=your_pusher_app_key
VITE_PUSHER_APP_CLUSTER=mt1
```

### 2.4 Start Development Server
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

## Step 3: Testing the Application

### 3.1 Register a New User
1. Go to `http://localhost:5173/register`
2. Fill in all required fields:
   - Full Name
   - Email
   - Phone Number (optional)
   - Address (optional)
   - Profile Image (optional)
   - Password
   - Confirm Password

### 3.2 Login
1. Go to `http://localhost:5173/login`
2. Enter your email and password

### 3.3 Create Tasks
1. On the main page, you'll see the task creation form
2. Fill in task details:
   - Title (required)
   - Description (optional)
   - Priority (Low/Medium/High)
   - Due Date (optional)
   - Status (Pending/Completed)
3. Click "Add Task"

### 3.4 Test Real-time Notifications
1. Create a new task
2. You should see a toast notification appear
3. Check the Notifications page to see the notification
4. The notification badge should show the unread count

### 3.5 Test Task Management
- Edit tasks by clicking the "Edit" button
- Mark tasks as complete/incomplete
- Delete tasks
- Filter and search tasks

## Step 4: Features Overview

### ✅ Implemented Features

#### Authentication
- User registration with all required fields
- JWT-based authentication
- Password confirmation
- Profile image upload
- Secure logout

#### Task Management
- Create, read, update, delete tasks
- Task priority levels (Low, Medium, High)
- Due date management
- Task status tracking
- User-specific task isolation
- Edit functionality

#### Real-time Notifications
- Automatic notification creation on task creation
- Real-time delivery using Pusher
- Toast notifications for immediate feedback
- Notification badge with unread count
- Dedicated notifications page
- Mark as read functionality

#### Modern UI/UX
- Responsive design with Tailwind CSS
- Navigation component
- Loading states
- Error handling
- Smooth animations
- Professional styling

#### Security
- User data isolation
- JWT token authentication
- Input validation
- File upload security
- Protected routes

## Step 5: API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### Tasks
- `GET /api/tasks` - Get user's tasks
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/{id}` - Update task
- `DELETE /api/tasks/{id}` - Delete task

### Notifications
- `GET /api/notifications` - Get user's notifications
- `PUT /api/notifications/{id}/read` - Mark notification as read
- `PUT /api/notifications/read-all` - Mark all as read

## Step 6: Troubleshooting

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

## Step 7: Production Deployment

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

## Support

If you encounter any issues:
1. Check the troubleshooting section above
2. Review the console logs for errors
3. Ensure all environment variables are set correctly
4. Verify that both backend and frontend servers are running

## License

This project is open-sourced software licensed under the MIT license.
