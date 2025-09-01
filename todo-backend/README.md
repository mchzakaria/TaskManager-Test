# Task Manager Backend

A Laravel-based REST API for task management with real-time notifications.

## Features

- ✅ **JWT Authentication**: Secure token-based authentication
- ✅ **Task Management**: Full CRUD operations with user isolation
- ✅ **Real-time Notifications**: Broadcasting with Laravel Echo and Pusher
- ✅ **File Upload**: Profile image upload support
- ✅ **Service & Repository Pattern**: Clean architecture implementation
- ✅ **SOLID Principles**: Well-structured, maintainable code
- ✅ **Comprehensive Documentation**: Detailed code comments

## Requirements

- PHP 8.1+
- Laravel 10+
- MySQL/PostgreSQL
- Composer
- Pusher account (for real-time notifications)

## Installation

### 1. Clone and Install Dependencies
```bash
composer install
```

### 2. Environment Setup
Copy the environment file and configure your database:
```bash
cp .env.example .env
php artisan key:generate
```

### 3. Database Configuration
Update your `.env` file with database credentials:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=task_manager
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

### 4. Pusher Configuration
Add your Pusher credentials to `.env`:
```env
BROADCAST_DRIVER=pusher
PUSHER_APP_ID=your_app_id
PUSHER_APP_KEY=your_app_key
PUSHER_APP_SECRET=your_app_secret
PUSHER_APP_CLUSTER=mt1
```

### 5. Run Migrations
```bash
php artisan migrate
```

### 6. Start Development Server
```bash
php artisan serve
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/refresh` - Refresh JWT token
- `GET /api/auth/me` - Get current user

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
- `PUT /api/notifications/read-all` - Mark all notifications as read

## Architecture

### Service Layer
- **TaskService**: Handles task business logic
- **NotificationService**: Manages notification creation and broadcasting
- **AuthService**: Authentication and user management

### Repository Pattern
- **TaskRepository**: Data access for tasks
- **UserRepository**: Data access for users
- **NotificationRepository**: Data access for notifications

### Events & Broadcasting
- **TaskCreated**: Broadcasted when a task is created
- **TaskUpdated**: Broadcasted when a task is updated
- **TaskDeleted**: Broadcasted when a task is deleted
- **NotificationCreated**: Broadcasted when a notification is created

## Database Schema

### Users Table
- `id` - Primary key
- `name` - User's full name
- `email` - Unique email address
- `phone_number` - Optional phone number
- `address` - Optional address
- `image` - Profile image path
- `password` - Hashed password
- `email_verified_at` - Email verification timestamp
- `created_at`, `updated_at` - Timestamps

### Tasks Table
- `id` - Primary key
- `user_id` - Foreign key to users
- `title` - Task title
- `description` - Task description
- `priority` - Priority level (low, medium, high)
- `due_date` - Task due date
- `status` - Task status (pending, completed)
- `created_at`, `updated_at` - Timestamps

### Notifications Table
- `id` - Primary key
- `user_id` - Foreign key to users
- `type` - Notification type
- `message` - Notification message
- `data` - JSON data for additional information
- `read` - Read status boolean
- `created_at`, `updated_at` - Timestamps

## Security Features

### Authentication
- JWT token-based authentication
- Token refresh mechanism
- Secure password hashing
- Email verification support

### Authorization
- User-specific data isolation
- Middleware protection for all routes
- Ownership verification for all operations

### Data Validation
- Comprehensive input validation
- File upload security
- SQL injection prevention
- XSS protection

## Real-time Features

### Broadcasting
- Laravel Echo integration
- Pusher for real-time communication
- Private channels for user-specific notifications
- Event-driven architecture

### Notifications
- Automatic notification creation
- Real-time delivery
- Read/unread status tracking
- Rich notification data

## Code Quality

### SOLID Principles
- **Single Responsibility**: Each class has one reason to change
- **Open/Closed**: Open for extension, closed for modification
- **Liskov Substitution**: Subtypes are substitutable
- **Interface Segregation**: Clients depend on specific interfaces
- **Dependency Inversion**: High-level modules don't depend on low-level modules

### Best Practices
- Comprehensive error handling
- Detailed logging
- Input validation and sanitization
- Proper HTTP status codes
- Consistent API responses

## Testing

### Unit Tests
```bash
php artisan test
```

### Feature Tests
```bash
php artisan test --testsuite=Feature
```

## Deployment

### Production Setup
1. Set `APP_ENV=production` in `.env`
2. Configure production database
3. Set up Pusher credentials
4. Run migrations
5. Configure web server (Apache/Nginx)

### Environment Variables
```env
APP_ENV=production
APP_DEBUG=false
APP_URL=https://your-domain.com
DB_CONNECTION=mysql
BROADCAST_DRIVER=pusher
CACHE_DRIVER=redis
SESSION_DRIVER=redis
QUEUE_CONNECTION=redis
```

## Contributing

1. Follow PSR-12 coding standards
2. Write comprehensive tests
3. Document new features
4. Follow SOLID principles
5. Use meaningful commit messages

## License

This project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
