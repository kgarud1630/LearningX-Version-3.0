# FastAPI Course Reviews and Ratings Microservice

A comprehensive course review and rating management microservice built with FastAPI, enabling students to review courses and providing detailed rating analytics.

## Features

- **Course Reviews**: Students can post detailed reviews with ratings (1-5 stars)
- **Rating Analytics**: Comprehensive statistics including average ratings and distribution
- **Review Management**: Update and delete reviews with proper authorization
- **Helpful Voting**: Mark reviews as helpful to surface quality feedback
- **Advanced Sorting**: Sort reviews by rating, date, or helpfulness
- **Top Courses**: Discover top-rated courses based on ratings and review count
- **User Reviews**: View all reviews by a specific user
- **Mock Authentication**: JWT-like token simulation for testing

## Installation

1. Install dependencies:
```bash
pip install -r reviews_requirements.txt
```

2. Run the reviews service:
```bash
python reviews_service.py
```

The API will be available at `http://localhost:8004`

## Mock Users

The service comes with 8 pre-configured mock users:

| User ID | Name | Role | Avatar |
|---------|------|------|--------|
| user_001 | Alice Johnson | Instructor | Profile Image |
| user_002 | Bob Smith | Student | Profile Image |
| user_003 | Carol Davis | Admin | Profile Image |
| user_004 | David Wilson | Instructor | Profile Image |
| user_005 | Emma Brown | Student | Profile Image |
| user_006 | Frank Miller | Student | Profile Image |
| user_007 | Grace Lee | Student | Profile Image |
| user_008 | Henry Chen | Student | Profile Image |

## Authentication

For testing, use mock tokens in the format: `mock_token_{user_id}`

Examples:
- `mock_token_user_002` (Bob - Student)
- `mock_token_user_005` (Emma - Student)
- `mock_token_user_003` (Carol - Admin)

## API Endpoints

### Review Management

#### POST `/reviews/create`
Create a new review for a course (requires authentication).

**Headers:**
```
Authorization: Bearer mock_token_user_002
```

**Request Body:**
```json
{
  "course_id": "course_001",
  "rating": 5,
  "comment": "Excellent course! Very comprehensive and well-structured."
}
```

**Response:**
```json
{
  "review_id": "uuid-string",
  "course_id": "course_001",
  "user_id": "user_002",
  "user_name": "Bob Smith",
  "user_avatar": "https://images.pexels.com/photos/...",
  "rating": 5,
  "comment": "Excellent course! Very comprehensive...",
  "helpful_count": 0,
  "created_at": "2024-01-01T12:00:00",
  "updated_at": "2024-01-01T12:00:00"
}
```

#### GET `/reviews/course/{course_id}`
Get all reviews for a course with sorting and pagination.

**Query Parameters:**
- `sort_by`: Sort criteria (rating_high, rating_low, date_new, date_old, helpful)
- `page`: Page number (default: 1)
- `limit`: Results per page (default: 10)

**Response:**
```json
{
  "total": 15,
  "reviews": [...],
  "page": 1,
  "limit": 10,
  "average_rating": 4.6,
  "rating_distribution": {
    "1": 0,
    "2": 1,
    "3": 2,
    "4": 5,
    "5": 7
  }
}
```

#### GET `/reviews/{review_id}`
Get a specific review by ID.

#### PUT `/reviews/{review_id}/update`
Update a review (only by review author).

**Headers:**
```
Authorization: Bearer mock_token_user_002
```

**Request Body:**
```json
{
  "rating": 4,
  "comment": "Updated review content"
}
```

#### DELETE `/reviews/{review_id}`
Delete a review (only by review author or admin).

### Review Interaction

#### PUT `/reviews/{review_id}/helpful`
Mark a review as helpful or not helpful.

**Headers:**
```
Authorization: Bearer mock_token_user_005
```

**Request Body:**
```json
{
  "helpful": true
}
```

### Course Analytics

#### GET `/courses/{course_id}/rating-stats`
Get comprehensive rating statistics for a course.

**Response:**
```json
{
  "course_id": "course_001",
  "total_reviews": 15,
  "average_rating": 4.6,
  "rating_distribution": {
    "1": 0,
    "2": 1,
    "3": 2,
    "4": 5,
    "5": 7
  },
  "recent_reviews": [...]
}
```

#### GET `/reviews/top-rated`
Get top-rated courses based on average rating and review count.

**Query Parameters:**
- `limit`: Number of courses to return (default: 10)

### User Reviews

#### GET `/reviews/user/{user_id}`
Get all reviews by a specific user.

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Results per page (default: 10)

## Review Features

### Rating System
- **1-5 Star Scale**: Standard rating system with validation
- **Average Calculation**: Automatic calculation of course average ratings
- **Rating Distribution**: Breakdown of ratings by star count
- **Weighted Scoring**: Top courses algorithm considers both rating and review count

### Review Quality
- **Helpful Voting**: Users can mark reviews as helpful
- **Comment Validation**: Optional detailed comments with reviews
- **Update Capability**: Users can modify their reviews
- **Duplicate Prevention**: One review per user per course

### Sorting Options
- **Rating High to Low**: Best rated reviews first
- **Rating Low to High**: Lowest rated reviews first
- **Date New to Old**: Most recent reviews first
- **Date Old to New**: Oldest reviews first
- **Most Helpful**: Reviews with most helpful votes first

## Business Rules

### Review Authorization
- **Students Only**: Only students can create reviews
- **No Self-Reviews**: Instructors cannot review their own courses
- **One Review Per Course**: Users can only review each course once
- **Owner/Admin Delete**: Only review authors or admins can delete reviews

### Rating Validation
- **Range Validation**: Ratings must be between 1 and 5
- **Required Field**: Rating is mandatory for all reviews
- **Integer Only**: No decimal ratings allowed

### Helpful Voting
- **No Self-Voting**: Users cannot mark their own reviews as helpful
- **Simple Counter**: Tracks total helpful votes per review
- **Authenticated Only**: Must be logged in to vote

## Testing

Run the comprehensive test suite:

```bash
python test_reviews_service.py
```

This will test:
- Review creation and management
- Course rating statistics
- Review sorting and pagination
- Helpful voting system
- User review listings
- Top-rated course discovery
- Authorization scenarios
- Invalid data handling

## API Documentation

Visit `http://localhost:8004/docs` for interactive API documentation (Swagger UI).

## Production Considerations

For production deployment:

1. **Database Integration**: Replace in-memory storage with a real database
2. **Real Authentication**: Implement proper JWT token verification
3. **Review Moderation**: Add content moderation and spam detection
4. **Helpful Vote Tracking**: Track which users voted on which reviews
5. **Review Analytics**: Advanced analytics and reporting
6. **Notification System**: Notify instructors of new reviews
7. **Review Verification**: Verify that users completed the course before reviewing
8. **Sentiment Analysis**: Automatic sentiment analysis of review comments

## Architecture

The service follows a clean architecture pattern:

- **Models**: Pydantic models for request/response validation
- **Storage**: In-memory dictionaries (easily replaceable with database)
- **Authentication**: Mock JWT verification (replaceable with real auth)
- **Business Logic**: Comprehensive validation and authorization rules
- **Analytics**: Real-time rating calculations and statistics

## Integration

This microservice is designed to work alongside:

1. **Authentication Service** (port 8000): User login and JWT tokens
2. **Profile Service** (port 8001): User profile management
3. **Course Service** (port 8002): Course creation and management
4. **Media Service** (port 8003): Course content management
5. **Enrollment Service**: Student course enrollments (future)

In a production environment, all services would share the same database and authentication system, creating a complete learning management platform with robust review and rating capabilities.

## Security Features

- **Authorization Validation**: Proper access control for all operations
- **Input Validation**: Comprehensive validation of all inputs
- **Rate Limiting Ready**: Designed for easy rate limiting integration
- **SQL Injection Prevention**: Parameterized queries when using real database
- **XSS Prevention**: Input sanitization for review comments

## Future Enhancements

- **Review Photos**: Allow users to attach images to reviews
- **Review Responses**: Allow instructors to respond to reviews
- **Review Templates**: Guided review creation with prompts
- **Review Rewards**: Gamification for quality review contributions
- **Advanced Analytics**: Detailed review sentiment and trend analysis
- **Review Verification**: Verify course completion before allowing reviews
- **Review Flagging**: Community-driven review quality control