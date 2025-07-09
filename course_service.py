from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, HttpUrl
from datetime import datetime
from typing import Optional, Dict, Any, List
from enum import Enum
import uuid

# Initialize FastAPI app
app = FastAPI(
    title="Course Management Microservice",
    description="A comprehensive course management service for instructors",
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
class CourseCategory(str, Enum):
    WEB_DEVELOPMENT = "web_development"
    DATA_SCIENCE = "data_science"
    DESIGN = "design"
    MARKETING = "marketing"
    BUSINESS = "business"
    PROGRAMMING = "programming"
    MOBILE_DEVELOPMENT = "mobile_development"
    CYBERSECURITY = "cybersecurity"

class CourseLevel(str, Enum):
    BEGINNER = "beginner"
    INTERMEDIATE = "intermediate"
    ADVANCED = "advanced"
    EXPERT = "expert"

class CourseStatus(str, Enum):
    DRAFT = "draft"
    PUBLISHED = "published"
    ARCHIVED = "archived"

# Pydantic models
class CourseCreate(BaseModel):
    title: str
    description: str
    category: CourseCategory
    level: CourseLevel
    price: Optional[float] = 0.0
    thumbnail_url: Optional[HttpUrl] = None
    duration_hours: Optional[int] = None
    prerequisites: Optional[List[str]] = []
    learning_objectives: Optional[List[str]] = []

class CourseUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    category: Optional[CourseCategory] = None
    level: Optional[CourseLevel] = None
    price: Optional[float] = None
    thumbnail_url: Optional[HttpUrl] = None
    duration_hours: Optional[int] = None
    prerequisites: Optional[List[str]] = None
    learning_objectives: Optional[List[str]] = None
    status: Optional[CourseStatus] = None

class Course(BaseModel):
    course_id: str
    instructor_id: str
    title: str
    description: str
    category: CourseCategory
    level: CourseLevel
    price: float
    thumbnail_url: Optional[HttpUrl] = None
    duration_hours: Optional[int] = None
    prerequisites: List[str]
    learning_objectives: List[str]
    status: CourseStatus
    enrollment_count: int
    rating: float
    created_at: datetime
    updated_at: datetime

class CourseListResponse(BaseModel):
    total: int
    courses: List[Course]
    page: int
    limit: int

# Mock instructor data for validation
mock_instructors = {
    "instructor_001": {"name": "Alice Johnson", "email": "alice@example.com"},
    "instructor_002": {"name": "Bob Smith", "email": "bob@example.com"},
    "instructor_003": {"name": "Carol Davis", "email": "carol@example.com"},
    "instructor_004": {"name": "David Wilson", "email": "david@example.com"},
}

# In-memory course storage
courses_db: Dict[str, Dict[str, Any]] = {
    "course_001": {
        "course_id": "course_001",
        "instructor_id": "instructor_001",
        "title": "Complete Web Development Bootcamp",
        "description": "Learn HTML, CSS, JavaScript, React, Node.js, and MongoDB. Build real-world projects and become a full-stack developer.",
        "category": CourseCategory.WEB_DEVELOPMENT,
        "level": CourseLevel.BEGINNER,
        "price": 99.99,
        "thumbnail_url": "https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=600",
        "duration_hours": 52,
        "prerequisites": ["Basic computer skills", "No programming experience required"],
        "learning_objectives": [
            "Build responsive websites with HTML and CSS",
            "Create interactive web applications with JavaScript",
            "Develop full-stack applications with React and Node.js",
            "Deploy applications to the cloud"
        ],
        "status": CourseStatus.PUBLISHED,
        "enrollment_count": 1542,
        "rating": 4.8,
        "created_at": datetime(2024, 1, 15, 10, 30, 0),
        "updated_at": datetime(2024, 1, 20, 14, 45, 0)
    },
    "course_002": {
        "course_id": "course_002",
        "instructor_id": "instructor_002",
        "title": "Data Science with Python",
        "description": "Master data analysis, visualization, and machine learning using Python, pandas, matplotlib, and scikit-learn.",
        "category": CourseCategory.DATA_SCIENCE,
        "level": CourseLevel.INTERMEDIATE,
        "price": 129.99,
        "thumbnail_url": "https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=600",
        "duration_hours": 48,
        "prerequisites": ["Basic Python knowledge", "High school mathematics"],
        "learning_objectives": [
            "Analyze data using pandas and NumPy",
            "Create visualizations with matplotlib and seaborn",
            "Build machine learning models",
            "Work with real-world datasets"
        ],
        "status": CourseStatus.PUBLISHED,
        "enrollment_count": 987,
        "rating": 4.7,
        "created_at": datetime(2024, 1, 10, 9, 15, 0),
        "updated_at": datetime(2024, 1, 18, 16, 20, 0)
    },
    "course_003": {
        "course_id": "course_003",
        "instructor_id": "instructor_003",
        "title": "UI/UX Design Fundamentals",
        "description": "Learn design principles, user research, wireframing, prototyping, and create stunning user interfaces.",
        "category": CourseCategory.DESIGN,
        "level": CourseLevel.BEGINNER,
        "price": 79.99,
        "thumbnail_url": "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=600",
        "duration_hours": 36,
        "prerequisites": ["No design experience required", "Access to design software (Figma recommended)"],
        "learning_objectives": [
            "Understand design principles and color theory",
            "Conduct user research and create personas",
            "Design wireframes and prototypes",
            "Create responsive design systems"
        ],
        "status": CourseStatus.PUBLISHED,
        "enrollment_count": 756,
        "rating": 4.9,
        "created_at": datetime(2024, 1, 12, 14, 20, 0),
        "updated_at": datetime(2024, 1, 19, 10, 15, 0)
    },
    "course_004": {
        "course_id": "course_004",
        "instructor_id": "instructor_001",
        "title": "Advanced React Development",
        "description": "Deep dive into React hooks, context, performance optimization, testing, and advanced patterns.",
        "category": CourseCategory.WEB_DEVELOPMENT,
        "level": CourseLevel.ADVANCED,
        "price": 149.99,
        "thumbnail_url": "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=600",
        "duration_hours": 42,
        "prerequisites": ["Solid JavaScript knowledge", "Basic React experience", "Understanding of ES6+"],
        "learning_objectives": [
            "Master React hooks and custom hooks",
            "Implement advanced state management",
            "Optimize React application performance",
            "Write comprehensive tests for React components"
        ],
        "status": CourseStatus.DRAFT,
        "enrollment_count": 0,
        "rating": 0.0,
        "created_at": datetime(2024, 1, 22, 11, 30, 0),
        "updated_at": datetime(2024, 1, 22, 11, 30, 0)
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

def get_course_by_id(course_id: str) -> Optional[Dict[str, Any]]:
    """Get course by ID"""
    return courses_db.get(course_id)

def filter_courses_by_instructor(instructor_id: str) -> List[Dict[str, Any]]:
    """Get all courses by instructor"""
    return [course for course in courses_db.values() if course["instructor_id"] == instructor_id]

# Routes
@app.get("/")
async def root():
    return {
        "message": "Course Management Microservice",
        "version": "1.0.0",
        "endpoints": ["/courses", "/courses/create", "/courses/{course_id}", "/courses/{course_id}/update"]
    }

@app.post("/courses/create", response_model=Course)
async def create_course(
    course_data: CourseCreate,
    instructor_id: str = Depends(get_current_instructor)
):
    """Create a new course"""
    course_id = str(uuid.uuid4())
    
    new_course = {
        "course_id": course_id,
        "instructor_id": instructor_id,
        "title": course_data.title,
        "description": course_data.description,
        "category": course_data.category,
        "level": course_data.level,
        "price": course_data.price or 0.0,
        "thumbnail_url": str(course_data.thumbnail_url) if course_data.thumbnail_url else None,
        "duration_hours": course_data.duration_hours,
        "prerequisites": course_data.prerequisites or [],
        "learning_objectives": course_data.learning_objectives or [],
        "status": CourseStatus.DRAFT,
        "enrollment_count": 0,
        "rating": 0.0,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    }
    
    courses_db[course_id] = new_course
    
    return Course(**new_course)

@app.get("/courses/{course_id}", response_model=Course)
async def get_course(course_id: str):
    """Get course by ID"""
    course = get_course_by_id(course_id)
    if not course:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Course not found"
        )
    
    return Course(**course)

@app.put("/courses/{course_id}/update", response_model=Course)
async def update_course(
    course_id: str,
    update_data: CourseUpdate,
    instructor_id: str = Depends(get_current_instructor)
):
    """Update course (only by course owner)"""
    course = get_course_by_id(course_id)
    if not course:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Course not found"
        )
    
    # Check if instructor owns the course
    if course["instructor_id"] != instructor_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You can only update your own courses"
        )
    
    # Update only provided fields
    update_dict = update_data.dict(exclude_unset=True)
    for field, value in update_dict.items():
        if field == "thumbnail_url" and value:
            course[field] = str(value)  # Convert HttpUrl to string
        else:
            course[field] = value
    
    # Update timestamp
    course["updated_at"] = datetime.utcnow()
    
    return Course(**course)

@app.delete("/courses/{course_id}")
async def delete_course(
    course_id: str,
    instructor_id: str = Depends(get_current_instructor)
):
    """Delete course (only by course owner)"""
    course = get_course_by_id(course_id)
    if not course:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Course not found"
        )
    
    # Check if instructor owns the course
    if course["instructor_id"] != instructor_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You can only delete your own courses"
        )
    
    del courses_db[course_id]
    
    return {"message": "Course deleted successfully", "course_id": course_id}

@app.get("/courses", response_model=CourseListResponse)
async def list_courses(
    category: Optional[CourseCategory] = None,
    level: Optional[CourseLevel] = None,
    status: Optional[CourseStatus] = None,
    instructor_id: Optional[str] = None,
    page: int = 1,
    limit: int = 10
):
    """List courses with optional filtering"""
    courses = list(courses_db.values())
    
    # Apply filters
    if category:
        courses = [c for c in courses if c["category"] == category]
    if level:
        courses = [c for c in courses if c["level"] == level]
    if status:
        courses = [c for c in courses if c["status"] == status]
    if instructor_id:
        courses = [c for c in courses if c["instructor_id"] == instructor_id]
    
    # Apply pagination
    total = len(courses)
    start = (page - 1) * limit
    end = start + limit
    courses = courses[start:end]
    
    return CourseListResponse(
        total=total,
        courses=[Course(**course) for course in courses],
        page=page,
        limit=limit
    )

@app.get("/my-courses", response_model=CourseListResponse)
async def get_my_courses(
    status: Optional[CourseStatus] = None,
    page: int = 1,
    limit: int = 10,
    instructor_id: str = Depends(get_current_instructor)
):
    """Get courses created by the current instructor"""
    courses = filter_courses_by_instructor(instructor_id)
    
    # Apply status filter if provided
    if status:
        courses = [c for c in courses if c["status"] == status]
    
    # Apply pagination
    total = len(courses)
    start = (page - 1) * limit
    end = start + limit
    courses = courses[start:end]
    
    return CourseListResponse(
        total=total,
        courses=[Course(**course) for course in courses],
        page=page,
        limit=limit
    )

@app.put("/courses/{course_id}/publish")
async def publish_course(
    course_id: str,
    instructor_id: str = Depends(get_current_instructor)
):
    """Publish a course (change status from draft to published)"""
    course = get_course_by_id(course_id)
    if not course:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Course not found"
        )
    
    # Check if instructor owns the course
    if course["instructor_id"] != instructor_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You can only publish your own courses"
        )
    
    if course["status"] != CourseStatus.DRAFT:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Only draft courses can be published"
        )
    
    course["status"] = CourseStatus.PUBLISHED
    course["updated_at"] = datetime.utcnow()
    
    return {
        "message": "Course published successfully",
        "course_id": course_id,
        "status": CourseStatus.PUBLISHED
    }

@app.get("/categories")
async def get_categories():
    """Get available course categories"""
    return {
        "categories": [
            {"value": cat.value, "label": cat.value.replace("_", " ").title()}
            for cat in CourseCategory
        ]
    }

@app.get("/levels")
async def get_levels():
    """Get available course levels"""
    return {
        "levels": [
            {"value": level.value, "label": level.value.title()}
            for level in CourseLevel
        ]
    }

@app.get("/instructors")
async def get_instructors():
    """Get list of instructors (for admin/debugging)"""
    return {
        "instructors": [
            {"id": instructor_id, **instructor_data}
            for instructor_id, instructor_data in mock_instructors.items()
        ]
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8002)