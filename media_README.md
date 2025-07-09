# FastAPI Course Media Management Microservice

A comprehensive media management microservice built with FastAPI, enabling instructors to upload and manage videos, documents, and quizzes for their courses.

## Features

- **Video Upload**: Add YouTube/Vimeo videos or custom video links
- **Document Upload**: Upload PDF, DOC, PPT files via URL
- **Quiz Creation**: Create interactive quizzes with multiple question types
- **Media Organization**: Order and organize media within courses and lessons
- **Content Management**: Update, delete, and reorder media items
- **Mock Authentication**: JWT-like token simulation for testing
- **Comprehensive API**: RESTful endpoints with proper validation

## Installation

1. Install dependencies:
```bash
pip install -r media_requirements.txt
```

2. Run the media service:
```bash
python media_service.py
```

The API will be available at `http://localhost:8003`

## Mock Data

The service comes with sample media items including:
- HTML introduction video (YouTube)
- HTML cheat sheet document (PDF)
- HTML basics quiz with multiple question types

## Authentication

For testing, use mock tokens in the format: `mock_token_{instructor_id}`

Examples:
- `mock_token_instructor_001` (Alice)
- `mock_token_instructor_002` (Bob)
- `mock_token_instructor_003` (Carol)

## API Endpoints

### Video Management

#### POST `/course/{course_id}/add-video`
Add a video to a course.

**Headers:**
```
Authorization: Bearer mock_token_instructor_001
```

**Query Parameters:**
- `lesson_id` (optional): Associate video with specific lesson

**Request Body:**
```json
{
  "title": "CSS Fundamentals",
  "description": "Learn the basics of CSS styling and layout",
  "video_url": "https://www.youtube.com/watch?v=1PnVor36_40",
  "provider": "youtube",
  "duration_minutes": 35,
  "thumbnail_url": "https://img.youtube.com/vi/1PnVor36_40/maxresdefault.jpg"
}
```

**Response:**
```json
{
  "media_id": "uuid-string",
  "course_id": "course_001",
  "lesson_id": null,
  "media_type": "video",
  "title": "CSS Fundamentals",
  "description": "Learn the basics of CSS styling and layout",
  "order_index": 1,
  "video_url": "https://www.youtube.com/watch?v=1PnVor36_40",
  "provider": "youtube",
  "duration_minutes": 35,
  "thumbnail_url": "https://img.youtube.com/vi/1PnVor36_40/maxresdefault.jpg",
  "created_at": "2024-01-01T12:00:00",
  "updated_at": "2024-01-01T12:00:00"
}
```

### Document Management

#### POST `/course/{course_id}/add-document`
Add a document to a course.

**Headers:**
```
Authorization: Bearer mock_token_instructor_001
```

**Request Body:**
```json
{
  "title": "CSS Reference Guide",
  "description": "Comprehensive CSS properties and selectors reference",
  "document_url": "https://example.com/documents/css-reference.pdf",
  "document_type": "pdf",
  "file_size_mb": 3.2
}
```

### Quiz Management

#### POST `/course/{course_id}/add-quiz`
Add a quiz to a course.

**Headers:**
```
Authorization: Bearer mock_token_instructor_001
```

**Request Body:**
```json
{
  "title": "CSS Basics Quiz",
  "description": "Test your understanding of CSS fundamentals",
  "time_limit_minutes": 20,
  "passing_score": 75,
  "questions": [
    {
      "question_id": "css_q1",
      "question_text": "Which CSS property is used to change the text color?",
      "question_type": "multiple_choice",
      "options": ["color", "text-color", "font-color", "text-style"],
      "correct_answer": 0,
      "explanation": "The 'color' property is used to set the text color in CSS",
      "points": 2
    },
    {
      "question_id": "css_q2",
      "question_text": "CSS stands for Cascading Style Sheets.",
      "question_type": "true_false",
      "options": ["True", "False"],
      "correct_answer": true,
      "explanation": "CSS indeed stands for Cascading Style Sheets",
      "points": 1
    }
  ]
}
```

### Media Retrieval

#### GET `/course/{course_id}/media`
Get all media for a course.

**Response:**
```json
{
  "course_id": "course_001",
  "total_videos": 2,
  "total_documents": 1,
  "total_quizzes": 1,
  "total_duration_minutes": 60,
  "media_items": [...]
}
```

#### GET `/media/{media_id}`
Get a specific media item.

### Media Management

#### PUT `/media/{media_id}/update`
Update a media item (only by course owner).

**Headers:**
```
Authorization: Bearer mock_token_instructor_001
```

**Query Parameters:**
- `title`: New title
- `description`: New description
- `order_index`: New position in course

#### DELETE `/media/{media_id}`
Delete a media item (only by course owner).

#### PUT `/course/{course_id}/reorder-media`
Reorder media items in a course.

**Headers:**
```
Authorization: Bearer mock_token_instructor_001
```

**Request Body:**
```json
["media_id_1", "media_id_2", "media_id_3"]
```

### Metadata

#### GET `/media-types`
Get available media types (video, document, quiz).

#### GET `/video-providers`
Get available video providers (youtube, vimeo, custom).

#### GET `/document-types`
Get available document types (pdf, doc, docx, ppt, pptx).

#### GET `/question-types`
Get available quiz question types (multiple_choice, true_false, short_answer, essay).

## Media Types

### Videos
- **YouTube**: Direct YouTube video links
- **Vimeo**: Direct Vimeo video links  
- **Custom**: Any video URL (self-hosted, etc.)

### Documents
- **PDF**: Portable Document Format
- **DOC/DOCX**: Microsoft Word documents
- **PPT/PPTX**: Microsoft PowerPoint presentations

### Quizzes
- **Multiple Choice**: Questions with 2-6 options
- **True/False**: Boolean questions
- **Short Answer**: Text input questions
- **Essay**: Long-form text responses

## Quiz Features

- **Flexible Scoring**: Custom points per question
- **Time Limits**: Optional quiz time restrictions
- **Passing Scores**: Configurable minimum scores
- **Explanations**: Optional explanations for answers
- **Question Types**: Support for various question formats

## Testing

Run the comprehensive test suite:

```bash
python test_media_service.py
```

This will test:
- Video, document, and quiz uploads
- Media retrieval and management
- Media reordering and updates
- Authorization scenarios
- Metadata endpoints

## API Documentation

Visit `http://localhost:8003/docs` for interactive API documentation (Swagger UI).

## Production Considerations

For production deployment:

1. **File Storage**: Implement actual file upload to cloud storage (AWS S3, etc.)
2. **Video Processing**: Add video transcoding and thumbnail generation
3. **Content Validation**: Validate uploaded content for security
4. **CDN Integration**: Use CDN for media delivery
5. **Analytics**: Track media engagement and completion rates
6. **Accessibility**: Add closed captions and transcripts
7. **Compression**: Optimize file sizes for faster loading
8. **Backup**: Implement media backup and recovery

## Architecture

The service follows a clean architecture pattern:

- **Models**: Pydantic models for request/response validation
- **Storage**: In-memory dictionaries (easily replaceable with database)
- **Authentication**: Mock JWT verification (replaceable with real auth)
- **Media Types**: Extensible enum-based media type system
- **Ordering**: Automatic media ordering within courses/lessons

## Integration

This microservice is designed to work alongside:

1. **Authentication Service** (port 8000): User login and JWT tokens
2. **Profile Service** (port 8001): Instructor profile management  
3. **Course Service** (port 8002): Course creation and management
4. **Enrollment Service**: Student course enrollments (future)
5. **Progress Service**: Track student progress through media (future)

In a production environment, all services would share the same database and authentication system, creating a complete learning management platform.

## Security Features

- **Course Ownership Validation**: Only course owners can manage media
- **Input Validation**: Comprehensive validation of all inputs
- **URL Validation**: Proper URL format validation for media links
- **Authorization**: Token-based access control
- **Error Handling**: Secure error messages without information leakage

## Future Enhancements

- **Live Streaming**: Support for live video sessions
- **Interactive Videos**: Add hotspots and interactive elements
- **Adaptive Quizzes**: Dynamic difficulty adjustment
- **Collaborative Documents**: Real-time document collaboration
- **Media Analytics**: Detailed engagement metrics
- **Mobile Optimization**: Mobile-specific media formats