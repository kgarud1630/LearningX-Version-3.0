# FastAPI User Profile Management Microservice

A comprehensive user profile management microservice built with FastAPI, featuring profile management, role assignment, and user settings.

## Features

- **Profile Management**: Get and update user profiles (name, bio, photo URL)
- **Role Assignment**: Manage user roles (student, instructor, admin)
- **User Settings**: Language, timezone, and notification preferences
- **Role-based Access**: Admin-only role management
- **Mock Authentication**: JWT-like token simulation for testing
- **Comprehensive API**: RESTful endpoints with proper validation

## Installation

1. Install dependencies:
```bash
pip install -r profile_requirements.txt
```

2. Run the profile service:
```bash
python profile_service.py
```

The API will be available at `http://localhost:8001`

## Mock Users

The service comes with 5 pre-configured mock users:

| User ID | Name | Role | Email |
|---------|------|------|-------|
| user_001 | Alice Johnson | Instructor | alice.johnson@example.com |
| user_002 | Bob Smith | Student | bob.smith@example.com |
| user_003 | Carol Davis | Admin | carol.davis@example.com |
| user_004 | David Wilson | Instructor | david.wilson@example.com |
| user_005 | Emma Brown | Student | emma.brown@example.com |

## Authentication

For testing, use mock tokens in the format: `mock_token_{user_id}`

Examples:
- `mock_token_user_001` (Alice - Instructor)
- `mock_token_user_002` (Bob - Student)
- `mock_token_user_003` (Carol - Admin)

## API Endpoints

### Profile Management

#### GET `/profile/{user_id}`
Get user profile by ID.

**Response:**
```json
{
  "user_id": "user_001",
  "name": "Alice Johnson",
  "bio": "Passionate software developer and lifelong learner...",
  "photo_url": "https://images.pexels.com/photos/1239291/...",
  "role": "instructor",
  "email": "alice.johnson@example.com",
  "created_at": "2024-01-15T10:30:00",
  "updated_at": "2024-01-20T14:45:00"
}
```

#### GET `/profile/{user_id}/complete`
Get complete user profile including settings.

**Response:**
```json
{
  "profile": {
    "user_id": "user_001",
    "name": "Alice Johnson",
    "bio": "Passionate software developer...",
    "photo_url": "https://images.pexels.com/photos/1239291/...",
    "role": "instructor",
    "email": "alice.johnson@example.com",
    "created_at": "2024-01-15T10:30:00",
    "updated_at": "2024-01-20T14:45:00"
  },
  "settings": {
    "language": "en",
    "timezone": "America/New_York",
    "email_notifications": true,
    "push_notifications": true,
    "marketing_notifications": false
  }
}
```

#### PUT `/profile/update`
Update current user's profile (requires authentication).

**Headers:**
```
Authorization: Bearer mock_token_user_001
```

**Request Body:**
```json
{
  "name": "Alice Johnson (Updated)",
  "bio": "Updated bio text",
  "photo_url": "https://example.com/new-photo.jpg"
}
```

### Settings Management

#### GET `/settings/{user_id}`
Get user settings by ID.

**Response:**
```json
{
  "language": "en",
  "timezone": "UTC",
  "email_notifications": true,
  "push_notifications": true,
  "marketing_notifications": false
}
```

#### PUT `/settings/update`
Update current user's settings (requires authentication).

**Headers:**
```
Authorization: Bearer mock_token_user_001
```

**Request Body:**
```json
{
  "language": "es",
  "timezone": "America/Los_Angeles",
  "email_notifications": false,
  "push_notifications": true,
  "marketing_notifications": false
}
```

### Role Management

#### PUT `/profile/{user_id}/role`
Update user role (admin only).

**Headers:**
```
Authorization: Bearer mock_token_user_003
```

**Request Body:**
```json
{
  "role": "instructor"
}
```

### Listing and Metadata

#### GET `/profiles`
List all user profiles with optional filtering.

**Query Parameters:**
- `role`: Filter by role (student, instructor, admin)
- `limit`: Number of results (default: 10)
- `offset`: Pagination offset (default: 0)

#### GET `/roles`
Get available user roles.

#### GET `/languages`
Get available languages.

#### GET `/timezones`
Get available timezones.

## User Roles

- **Student**: Basic user with learning access
- **Instructor**: Can create and manage courses
- **Admin**: Full system access, can manage user roles

## Supported Languages

- English (en)
- Spanish (es)
- French (fr)
- German (de)
- Chinese (zh)
- Japanese (ja)

## Supported Timezones

- UTC
- America/New_York (EST)
- America/Los_Angeles (PST)
- Europe/London (GMT)
- Europe/Paris (CET)
- Asia/Tokyo (JST)
- Asia/Shanghai (CST)

## Testing

Run the comprehensive test suite:

```bash
python test_profile_service.py
```

This will test:
- Profile retrieval and updates
- Settings management
- Role assignment (admin only)
- Profile listing and filtering
- Metadata endpoints
- Authorization scenarios

## API Documentation

Visit `http://localhost:8001/docs` for interactive API documentation (Swagger UI).

## Production Considerations

For production deployment:

1. **Database Integration**: Replace in-memory storage with a real database
2. **Real Authentication**: Implement proper JWT token verification
3. **File Upload**: Add secure photo upload functionality
4. **Validation**: Enhanced input validation and sanitization
5. **Caching**: Add Redis for frequently accessed profiles
6. **Logging**: Comprehensive audit logging for profile changes
7. **Rate Limiting**: Implement API rate limiting
8. **Security**: Add proper CORS, HTTPS, and security headers

## Architecture

The service follows a clean architecture pattern:

- **Models**: Pydantic models for request/response validation
- **Storage**: In-memory dictionaries (easily replaceable with database)
- **Authentication**: Mock JWT verification (replaceable with real auth)
- **Endpoints**: RESTful API design with proper HTTP status codes
- **Error Handling**: Comprehensive error responses with meaningful messages

## Integration

This microservice is designed to work alongside the authentication service. In a production environment:

1. Both services would share the same user database
2. JWT tokens would be verified against the same secret key
3. User creation would trigger profile creation
4. Role changes would be logged and audited