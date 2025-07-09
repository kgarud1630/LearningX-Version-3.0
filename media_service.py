from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, HttpUrl
from datetime import datetime
from typing import Optional, Dict, Any, List, Union
from enum import Enum
import uuid

# Initialize FastAPI app
app = FastAPI(
    title="Course Media Management Microservice",
    description="A comprehensive media management service for course content",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Security configuration
security = HTTPBearer()

# Enums
class MediaType(str, Enum):
    VIDEO = "video"
    DOCUMENT = "document"
    QUIZ = "quiz"

class VideoProvider(str, Enum):
    YOUTUBE = "youtube"
    VIMEO = "vimeo"
    CUSTOM = "custom"

class DocumentType(str, Enum):
    PDF = "pdf"
    DOC = "doc"
    DOCX = "docx"
    PPT = "ppt"
    PPTX = "pptx"

class QuestionType(str, Enum):
    MULTIPLE_CHOICE = "multiple_choice"
    TRUE_FALSE = "true_false"
    SHORT_ANSWER = "short_answer"
    ESSAY = "essay"

# Pydantic models
class QuizQuestion(BaseModel):
    question_id: str
    question_text: str
    question_type: QuestionType
    options: Optional[List[str]] = None  # For multiple choice
    correct_answer: Union[str, int, bool]  # Flexible answer type
    explanation: Optional[str] = None
    points: int = 1

class Quiz(BaseModel):
    quiz_id: str
    title: str
    description: Optional[str] = None
    time_limit_minutes: Optional[int] = None
    passing_score: int = 70
    questions: List[QuizQuestion]
    total_points: int
    created_at: datetime
    updated_at: datetime

class VideoUpload(BaseModel):
    title: str
    description: Optional[str] = None
    video_url: HttpUrl
    provider: VideoProvider
    duration_minutes: Optional[int] = None
    thumbnail_url: Optional[HttpUrl] = None

class DocumentUpload(BaseModel):
    title: str
    description: Optional[str] = None
    document_url: HttpUrl
    document_type: DocumentType
    file_size_mb: Optional[float] = None

class QuizUpload(BaseModel):
    title: str
    description: Optional[str] = None
    time_limit_minutes: Optional[int] = None
    passing_score: int = 70
    questions: List[QuizQuestion]

class MediaItem(BaseModel):
    media_id: str
    course_id: str
    lesson_id: Optional[str] = None
    media_type: MediaType
    title: str
    description: Optional[str] = None
    order_index: int
    created_at: datetime
    updated_at: datetime
    
    # Video specific fields
    video_url: Optional[HttpUrl] = None
    provider: Optional[VideoProvider] = None
    duration_minutes: Optional[int] = None
    thumbnail_url: Optional[HttpUrl] = None
    
    # Document specific fields
    document_url: Optional[HttpUrl] = None
    document_type: Optional[DocumentType] = None
    file_size_mb: Optional[float] = None
    
    # Quiz specific fields
    quiz_data: Optional[Quiz] = None

class CourseMedia(BaseModel):
    course_id: str
    total_videos: int
    total_documents: int
    total_quizzes: int
    total_duration_minutes: int
    media_items: List[MediaItem]

# Mock instructor data for validation
mock_instructors = {
    "instructor_001": {"name": "Alice Johnson", "email": "alice@example.com"},
    "instructor_002": {"name": "Bob Smith", "email": "bob@example.com"},
    "instructor_003": {"name": "Carol Davis", "email": "carol@example.com"},
    "instructor_004": {"name": "David Wilson", "email": "david@example.com"},
}

# Mock course data for validation
mock_courses = {
    "course_001": {"instructor_id": "instructor_001", "title": "Complete Web Development Bootcamp"},
    "course_002": {"instructor_id": "instructor_002", "title": "Data Science with Python"},
    "course_003": {"instructor_id": "instructor_003", "title": "UI/UX Design Fundamentals"},
    "course_004": {"instructor_id": "instructor_001", "title": "Advanced React Development"},
}

# In-memory media storage
media_db: Dict[str, Dict[str, Any]] = {
    "media_001": {
        "media_id": "media_001",
        "course_id": "course_001",
        "lesson_id": "lesson_001",
        "media_type": MediaType.VIDEO,
        "title": "Introduction to HTML",
        "description": "Learn the basics of HTML structure and syntax",
        "order_index": 1,
        "video_url": "https://www.youtube.com/watch?v=UB1O30fR-EE",
        "provider": VideoProvider.YOUTUBE,
        "duration_minutes": 25,
        "thumbnail_url": "https://img.youtube.com/vi/UB1O30fR-EE/maxresdefault.jpg",
        "created_at": datetime(2024, 1, 15, 10, 30, 0),
        "updated_at": datetime(2024, 1, 15, 10, 30, 0)
    },
    "media_002": {
        "media_id": "media_002",
        "course_id": "course_001",
        "lesson_id": "lesson_001",
        "media_type": MediaType.DOCUMENT,
        "title": "HTML Cheat Sheet",
        "description": "Quick reference guide for HTML tags and attributes",
        "order_index": 2,
        "document_url": "https://example.com/documents/html-cheat-sheet.pdf",
        "document_type": DocumentType.PDF,
        "file_size_mb": 2.5,
        "created_at": datetime(2024, 1, 15, 11, 0, 0),
        "updated_at": datetime(2024, 1, 15, 11, 0, 0)
    },
    "media_003": {
        "media_id": "media_003",
        "course_id": "course_001",
        "lesson_id": "lesson_002",
        "media_type": MediaType.QUIZ,
        "title": "HTML Basics Quiz",
        "description": "Test your understanding of HTML fundamentals",
        "order_index": 3,
        "quiz_data": {
            "quiz_id": "quiz_001",
            "title": "HTML Basics Quiz",
            "description": "Test your understanding of HTML fundamentals",
            "time_limit_minutes": 15,
            "passing_score": 80,
            "questions": [
                {
                    "question_id": "q1",
                    "question_text": "What does HTML stand for?",
                    "question_type": QuestionType.MULTIPLE_CHOICE,
                    "options": [
                        "Hyper Text Markup Language",
                        "High Tech Modern Language",
                        "Home Tool Markup Language",
                        "Hyperlink and Text Markup Language"
                    ],
                    "correct_answer": 0,
                    "explanation": "HTML stands for Hyper Text Markup Language",
                    "points": 2
                },
                {
                    "question_id": "q2",
                    "question_text": "HTML is a programming language.",
                    "question_type": QuestionType.TRUE_FALSE,
                    "options": ["True", "False"],
                    "correct_answer": False,
                    "explanation": "HTML is a markup language, not a programming language",
                    "points": 1
                }
            ],
            "total_points": 3,
            "created_at": datetime(2024, 1, 15, 12, 0, 0),
            "updated_at": datetime(2024, 1, 15, 12, 0, 0)
        },
        "created_at": datetime(2024, 1, 15, 12, 0, 0),
        "updated_at": datetime(2024, 1, 15, 12, 0, 0)
    }
}

# Utility functions
async def get_current_instructor(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """Mock authentication - extract instructor ID from token"""
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    try:
        # Mock token format: "mock_token_instructor_001"
        if not credentials.credentials.startswith("mock_token_"):
            raise credentials_exception
        
        instructor_id = credentials.credentials.replace("mock_token_", "")
        if instructor_id not in mock_instructors:
            raise credentials_exception
            
        return instructor_id
    except Exception:
        raise credentials_exception

def validate_course_ownership(course_id: str, instructor_id: str):
    """Validate that instructor owns the course"""
    course = mock_courses.get(course_id)
    if not course:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Course not found"
        )
    
    if course["instructor_id"] != instructor_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You can only manage media for your own courses"
        )

def get_next_order_index(course_id: str, lesson_id: Optional[str] = None) -> int:
    """Get the next order index for media in a course/lesson"""
    media_items = [
        item for item in media_db.values() 
        if item["course_id"] == course_id and 
        (lesson_id is None or item.get("lesson_id") == lesson_id)
    ]
    
    if not media_items:
        return 1
    
    return max(item["order_index"] for item in media_items) + 1

# Routes
@app.get("/")
async def root():
    return {
        "message": "Course Media Management Microservice",
        "version": "1.0.0",
        "endpoints": [
            "/course/{course_id}/add-video",
            "/course/{course_id}/add-document", 
            "/course/{course_id}/add-quiz",
            "/course/{course_id}/media"
        ]
    }

@app.post("/course/{course_id}/add-video", response_model=MediaItem)
async def add_video_to_course(
    course_id: str,
    video_data: VideoUpload,
    lesson_id: Optional[str] = None,
    instructor_id: str = Depends(get_current_instructor)
):
    """Add a video to a course"""
    validate_course_ownership(course_id, instructor_id)
    
    media_id = str(uuid.uuid4())
    order_index = get_next_order_index(course_id, lesson_id)
    
    new_media = {
        "media_id": media_id,
        "course_id": course_id,
        "lesson_id": lesson_id,
        "media_type": MediaType.VIDEO,
        "title": video_data.title,
        "description": video_data.description,
        "order_index": order_index,
        "video_url": str(video_data.video_url),
        "provider": video_data.provider,
        "duration_minutes": video_data.duration_minutes,
        "thumbnail_url": str(video_data.thumbnail_url) if video_data.thumbnail_url else None,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    }
    
    media_db[media_id] = new_media
    
    return MediaItem(**new_media)

@app.post("/course/{course_id}/add-document", response_model=MediaItem)
async def add_document_to_course(
    course_id: str,
    document_data: DocumentUpload,
    lesson_id: Optional[str] = None,
    instructor_id: str = Depends(get_current_instructor)
):
    """Add a document to a course"""
    validate_course_ownership(course_id, instructor_id)
    
    media_id = str(uuid.uuid4())
    order_index = get_next_order_index(course_id, lesson_id)
    
    new_media = {
        "media_id": media_id,
        "course_id": course_id,
        "lesson_id": lesson_id,
        "media_type": MediaType.DOCUMENT,
        "title": document_data.title,
        "description": document_data.description,
        "order_index": order_index,
        "document_url": str(document_data.document_url),
        "document_type": document_data.document_type,
        "file_size_mb": document_data.file_size_mb,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    }
    
    media_db[media_id] = new_media
    
    return MediaItem(**new_media)

@app.post("/course/{course_id}/add-quiz", response_model=MediaItem)
async def add_quiz_to_course(
    course_id: str,
    quiz_data: QuizUpload,
    lesson_id: Optional[str] = None,
    instructor_id: str = Depends(get_current_instructor)
):
    """Add a quiz to a course"""
    validate_course_ownership(course_id, instructor_id)
    
    media_id = str(uuid.uuid4())
    quiz_id = str(uuid.uuid4())
    order_index = get_next_order_index(course_id, lesson_id)
    
    # Calculate total points
    total_points = sum(q.points for q in quiz_data.questions)
    
    # Create quiz object
    quiz_obj = {
        "quiz_id": quiz_id,
        "title": quiz_data.title,
        "description": quiz_data.description,
        "time_limit_minutes": quiz_data.time_limit_minutes,
        "passing_score": quiz_data.passing_score,
        "questions": [q.dict() for q in quiz_data.questions],
        "total_points": total_points,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    }
    
    new_media = {
        "media_id": media_id,
        "course_id": course_id,
        "lesson_id": lesson_id,
        "media_type": MediaType.QUIZ,
        "title": quiz_data.title,
        "description": quiz_data.description,
        "order_index": order_index,
        "quiz_data": quiz_obj,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    }
    
    media_db[media_id] = new_media
    
    return MediaItem(**new_media)

@app.get("/course/{course_id}/media", response_model=CourseMedia)
async def get_course_media(course_id: str):
    """Get all media for a course"""
    course = mock_courses.get(course_id)
    if not course:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Course not found"
        )
    
    # Filter media for this course
    course_media_items = [
        item for item in media_db.values() 
        if item["course_id"] == course_id
    ]
    
    # Sort by order index
    course_media_items.sort(key=lambda x: x["order_index"])
    
    # Calculate statistics
    total_videos = len([item for item in course_media_items if item["media_type"] == MediaType.VIDEO])
    total_documents = len([item for item in course_media_items if item["media_type"] == MediaType.DOCUMENT])
    total_quizzes = len([item for item in course_media_items if item["media_type"] == MediaType.QUIZ])
    
    total_duration = sum(
        item.get("duration_minutes", 0) 
        for item in course_media_items 
        if item["media_type"] == MediaType.VIDEO and item.get("duration_minutes")
    )
    
    return CourseMedia(
        course_id=course_id,
        total_videos=total_videos,
        total_documents=total_documents,
        total_quizzes=total_quizzes,
        total_duration_minutes=total_duration,
        media_items=[MediaItem(**item) for item in course_media_items]
    )

@app.get("/media/{media_id}", response_model=MediaItem)
async def get_media_item(media_id: str):
    """Get a specific media item"""
    media_item = media_db.get(media_id)
    if not media_item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Media item not found"
        )
    
    return MediaItem(**media_item)

@app.put("/media/{media_id}/update")
async def update_media_item(
    media_id: str,
    title: Optional[str] = None,
    description: Optional[str] = None,
    order_index: Optional[int] = None,
    instructor_id: str = Depends(get_current_instructor)
):
    """Update a media item"""
    media_item = media_db.get(media_id)
    if not media_item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Media item not found"
        )
    
    # Validate course ownership
    validate_course_ownership(media_item["course_id"], instructor_id)
    
    # Update fields
    if title is not None:
        media_item["title"] = title
    if description is not None:
        media_item["description"] = description
    if order_index is not None:
        media_item["order_index"] = order_index
    
    media_item["updated_at"] = datetime.utcnow()
    
    return {
        "message": "Media item updated successfully",
        "media_id": media_id,
        "media_item": MediaItem(**media_item)
    }

@app.delete("/media/{media_id}")
async def delete_media_item(
    media_id: str,
    instructor_id: str = Depends(get_current_instructor)
):
    """Delete a media item"""
    media_item = media_db.get(media_id)
    if not media_item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Media item not found"
        )
    
    # Validate course ownership
    validate_course_ownership(media_item["course_id"], instructor_id)
    
    del media_db[media_id]
    
    return {
        "message": "Media item deleted successfully",
        "media_id": media_id
    }

@app.put("/course/{course_id}/reorder-media")
async def reorder_course_media(
    course_id: str,
    media_order: List[str],  # List of media_ids in desired order
    instructor_id: str = Depends(get_current_instructor)
):
    """Reorder media items in a course"""
    validate_course_ownership(course_id, instructor_id)
    
    # Validate all media IDs belong to the course
    course_media_ids = {
        item["media_id"] for item in media_db.values() 
        if item["course_id"] == course_id
    }
    
    if set(media_order) != course_media_ids:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Media order list must contain all media IDs for the course"
        )
    
    # Update order indices
    for index, media_id in enumerate(media_order, 1):
        media_db[media_id]["order_index"] = index
        media_db[media_id]["updated_at"] = datetime.utcnow()
    
    return {
        "message": "Media order updated successfully",
        "course_id": course_id,
        "new_order": media_order
    }

@app.get("/media-types")
async def get_media_types():
    """Get available media types"""
    return {
        "media_types": [
            {"value": media_type.value, "label": media_type.value.title()}
            for media_type in MediaType
        ]
    }

@app.get("/video-providers")
async def get_video_providers():
    """Get available video providers"""
    return {
        "providers": [
            {"value": provider.value, "label": provider.value.title()}
            for provider in VideoProvider
        ]
    }

@app.get("/document-types")
async def get_document_types():
    """Get available document types"""
    return {
        "document_types": [
            {"value": doc_type.value, "label": doc_type.value.upper()}
            for doc_type in DocumentType
        ]
    }

@app.get("/question-types")
async def get_question_types():
    """Get available quiz question types"""
    return {
        "question_types": [
            {"value": q_type.value, "label": q_type.value.replace("_", " ").title()}
            for q_type in QuestionType
        ]
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8003)