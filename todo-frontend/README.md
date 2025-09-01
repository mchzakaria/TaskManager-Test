# Task Manager Frontend

A modern Vue.js application for managing tasks with real-time notifications.

## Features

- ✅ **User Authentication**: JWT-based authentication with registration and login
- ✅ **Task Management**: Full CRUD operations for tasks
- ✅ **Real-time Notifications**: Live notifications using Laravel Echo and Pusher
- ✅ **Modern UI**: Clean, responsive design with Tailwind CSS
- ✅ **TypeScript**: Full TypeScript support for better development experience
- ✅ **State Management**: Pinia for reactive state management

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Configuration
Create a `.env` file in the frontend directory with the following variables:

```env
# API Configuration
VITE_API_URL=http://localhost:8000

# Pusher Configuration for Real-time Notifications
VITE_PUSHER_APP_KEY=your-pusher-app-key
VITE_PUSHER_APP_CLUSTER=mt1
```

### 3. Pusher Setup
1. Create a free account at [Pusher](https://pusher.com/)
2. Create a new app
3. Copy your app key and cluster to the environment variables
4. Update the backend `.env` file with the same Pusher credentials

### 4. Run Development Server
```bash
npm run dev
```

## Project Structure

```
src/
├── api/              # API configuration
├── components/       # Reusable Vue components
├── lib/             # Utility libraries (Echo, etc.)
├── router/          # Vue Router configuration
├── stores/          # Pinia stores
├── types/           # TypeScript type definitions
├── utils/           # Utility functions
└── views/           # Page components
```

## Key Features Implementation

### Real-time Notifications
- Uses Laravel Echo and Pusher for real-time communication
- Automatic notification creation when tasks are created
- Toast notifications for immediate feedback
- Notification badge showing unread count

### User Authentication
- JWT token-based authentication
- Secure token storage in localStorage
- Automatic token refresh
- Protected routes with authentication guards

### Task Management
- Create, read, update, and delete tasks
- Task filtering by priority, status, and search
- Due date management
- Priority levels (Low, Medium, High)
- Status tracking (Pending, Completed)

### Modern UI/UX
- Responsive design with Tailwind CSS
- Loading states and error handling
- Form validation
- Smooth animations and transitions
- Intuitive navigation

## API Endpoints

The frontend communicates with the Laravel backend through these endpoints:

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/tasks` - Get user's tasks
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/{id}` - Update task
- `DELETE /api/tasks/{id}` - Delete task
- `GET /api/notifications` - Get user's notifications
- `PUT /api/notifications/{id}/read` - Mark notification as read

## Development

### Adding New Features
1. Create components in `src/components/`
2. Add stores in `src/stores/` for state management
3. Update types in `src/types/` for TypeScript support
4. Add routes in `src/router/index.ts`

### Styling
- Uses Tailwind CSS for styling
- Custom CSS classes in `src/assets/`
- Responsive design principles

### State Management
- Pinia stores for global state
- Reactive data with Vue 3 Composition API
- Type-safe state management with TypeScript

## Production Build

```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment.
