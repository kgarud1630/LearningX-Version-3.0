# FastAPI Course Management Microservice

A comprehensive course management microservice built with FastAPI, enabling instructors to create, manage, and publish their courses.

## Features

- **Course Creation**: Create new courses with detailed information
- **Course Management**: Edit, update, and delete courses
- **Course Publishing**: Publish draft courses to make them available
- **Instructor Dashboard**: View all courses created by an instructor
- **Course Filtering**: Filter courses by category, level, status, and instructor
- **Mock Authentication**: JWT-like token simulation for testing
- **Comprehensive API**: RESTful endpoints with proper validation

## Installation

1. Install dependencies:
```bash
pip install -r course_requirements.txt
```

2. Run the course service:
```bash
python course_service.py
```

The API will be available at `http://localhost:8002`

## Mock Instructors

The service comes with 4 pre-configured mock instructors:

| Instructor ID | Name | Email |
|---------------|------|-------|
| instructor_001 | Alice Johnson | alice@example.com |
| instructor_002 | Bob Smith | bob@example.com |
| instructor_003 | Carol Davis | carol@example.com |
| instructor_004 | David Wilson | david@example.com |

## Authentication

For testing, use mock tokens in the format: `mock_token_{instructor_id}`

Examples:
- `mock_token_instructor_001` (Alice)
- `mock_token_instructor_002` (Bob)
- `mock_token_instructor_003` (Carol)

## API Endpoints

### Course Management

#### POST `/courses/create`
Create a new course (requires authentication).

**Headers:**
```
Authorization: Bearer mock_token_instructor_001
```

**Request Body:**
```json
{
  "title": "Complete Web Development Bootcamp",
  "description": "Learn HTML, CSS, JavaScript, React, Node.js, and MongoDB",
  "category": "web_development",
  "level": "beginner",
  "price": 99.99,
  "thumbnail_url": "https://example.com/thumbnail.jpg",
  "duration_hours": 52,
  "prerequisites": ["Basic computer skills"],
  "learning_objectives": [
    "Build responsive websites",
    "Create web applications",
    "Deploy to the cloud"
  ]
}
```

**Response:**
```json
{
  "course_id": "uuid-string",
  "instructor_id": "instructor_001",
  "title": "Complete Web Development Bootcamp",
  "description": "Learn HTML, CSS, JavaScript...",
  "category": "web_development",
  "level": "beginner",
  "price": 99.99,
  "thumbnail_url": "https://example.com/thumbnail.jpg",
  "duration_hours": 52,
  "prerequisites": ["Basic computer skills"],
  "learning_objectives": ["Build responsive websites", "..."],
  "status": "draft",
  "enrollment_count": 0,
  "rating": 0.0,
  "created_at": "2024-01-01T12:00:00",
  "updated_at": "2024-01-01T12:00:00"
}
```

#### GET `/courses/{course_id}`
Get course details by ID.

**Response:**
```json
{
  "course_id": "course_001",
  "instructor_id": "instructor_001",
  "title": "Complete Web Development Bootcamp",
  "description": "Learn HTML, CSS, JavaScript...",
  "category": "web_development",
  "level": "beginner",
  "price": 99.99,
  "status": "published",
  "enrollment_count": 1542,
  "rating": 4.8,
  "created_at": "2024-01-15T10:30:00",
  "updated_at": "2024-01-20T14:45:00"
}
```

#### PUT `/courses/{course_id}/update`
Update course details (only by course owner).

**Headers:**
```
Authorization: Bearer mock_token_instructor_001
```

**Request Body:**
```json
{
  "title": "Updated Course Title",
  "description": "Updated description",
  "price": 109.99,
  "status": "published"
}
```

#### DELETE `/courses/{course_id}`
Delete a course (only by course owner).

**Headers:**
```
Authorization: Bearer mock_token_instructor_001
```

### Course Listing

#### GET `/courses`
List all courses with optional filtering.

**Query Parameters:**
- `category`: Filter by category (web_development, data_science, design, etc.)
- `level`: Filter by level (beginner, intermediate, advanced, expert)
- `status`: Filter by status (draft, published, archived)
- `instructor_id`: Filter by instructor
- `page`: Page number (default: 1)
- `limit`: Results per page (default: 10)

**Response:**
```json
{
  "total": 4,
  "courses": [...],
  "page": 1,
  "limit": 10
}
```

#### GET `/my-courses`
Get courses created by the current instructor (requires authentication).

**Headers:**
```
Authorization: Bearer mock_token_instructor_001
```

**Query Parameters:**
- `status`: Filter by status
- `page`: Page number
- `limit`: Results per page

### Course Publishing

#### PUT `/courses/{course_id}/publish`
Publish a draft course (only by course owner).

**Headers:**
```
Authorization: Bearer mock_token_instructor_001
```

**Response:**
```json
{
  "message": "Course published successfully",
  "course_id": "course_001",
  "status": "published"
}
```

### Metadata

#### GET `/categories`
Get available course categories.

**Response:**
```json
{
  "categories": [
    {"value": "web_development", "label": "Web Development"},
    {"value": "data_science", "label": "Data Science"},
    {"value": "design", "label": "Design"},
    ...
  ]
}
```

#### GET `/levels`
Get available course levels.

#### GET `/instructors`
Get list of instructors (for admin/debugging).

## Course Categories

- Web Development
- Data Science
- Design
- Marketing
- Business
- Programming
- Mobile Development
- Cybersecurity

## Course Levels

- Beginner
- Intermediate
- Advanced
- Expert

## Course Status

- **Draft**: Course is being created/edited, not visible to students
- **Published**: Course is live and available for enrollment
- **Archived**: Course is no longer active but remains accessible

## Testing

Run the comprehensive test suite:

```bash
python test_course_service.py
```

This will test:
- Course creation and management
- Course updates and publishing
- Course listing and filtering
- Instructor dashboard functionality
- Authorization scenarios
- Metadata endpoints

## API Documentation

Visit `http://localhost:8002/docs` for interactive API documentation (Swagger UI).

## Production Considerations

For production deployment:

1. **Database Integration**: Replace in-memory storage with a real database
2. **Real Authentication**: Implement proper JWT token verification
3. **File Upload**: Add secure thumbnail/video upload functionality
4. **Content Management**: Add lesson/module management within courses
5. **Search**: Implement full-text search for courses
6. **Analytics**: Add course performance and enrollment analytics
7. **Notifications**: Notify students of course updates
8. **Payment Integration**: Connect with payment processing for course purchases

## Architecture

The service follows a clean architecture pattern:

- **Models**: Pydantic models for request/response validation
- **Storage**: In-memory dictionaries (easily replaceable with database)
- **Authentication**: Mock JWT verification (replaceable with real auth)
- **Endpoints**: RESTful API design with proper HTTP status codes
- **Authorization**: Course ownership validation for sensitive operations

## Integration

This microservice is designed to work alongside:

1. **Authentication Service** (port 8000): User login and JWT tokens
2. **Profile Service** (port 8001): Instructor profile management
3. **Enrollment Service**: Student course enrollments (future)
4. **Content Service**: Course lessons and materials (future)

In a production environment, all services would share the same user database and authentication system.