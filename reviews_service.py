from fastapi import FastAPI, HTTPException, Depends, status, Query
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime
from typing import Optional, Dict, Any, List
from enum import Enum
import uuid

# Initialize FastAPI app
app = FastAPI(
    title="Course Reviews and Ratings Microservice",
    description="A comprehensive course review and rating management service",
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
class SortBy(str, Enum):
    RATING_HIGH = "rating_high"
    RATING_LOW = "rating_low"
    DATE_NEW = "date_new"
    DATE_OLD = "date_old"
    HELPFUL = "helpful"

class UserRole(str, Enum):
    STUDENT = "student"
    INSTRUCTOR = "instructor"
    ADMIN = "admin"

# Pydantic models
class ReviewCreate(BaseModel):
    course_id: str
    rating: int  # 1-5 stars
    comment: Optional[str] = None
    
    class Config:
        schema_extra = {
            "example": {
                "course_id": "course_001",
                "rating": 5,
                "comment": "Excellent course! Very comprehensive and well-structured."
            }
        }

class ReviewUpdate(BaseModel):
    rating: Optional[int] = None
    comment: Optional[str] = None

class Review(BaseModel):
    review_id: str
    course_id: str
    user_id: str
    user_name: str
    user_avatar: Optional[str] = None
    rating: int
    comment: Optional[str] = None
    helpful_count: int
    created_at: datetime
    updated_at: datetime

class CourseRatingStats(BaseModel):
    course_id: str
    total_reviews: int
    average_rating: float
    rating_distribution: Dict[str, int]  # "1": count, "2": count, etc.
    recent_reviews: List[Review]

class ReviewListResponse(BaseModel):
    total: int
    reviews: List[Review]
    page: int
    limit: int
    average_rating: float
    rating_distribution: Dict[str, int]

class HelpfulRequest(BaseModel):
    helpful: bool

# Mock user data for validation
mock_users = {
    "user_001": {"name": "Alice Johnson", "role": "instructor", "avatar": "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150"},
    "user_002": {"name": "Bob Smith", "role": "student", "avatar": "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150"},
    "user_003": {"name": "Carol Davis", "role": "admin", "avatar": "https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=150"},
    "user_004": {"name": "David Wilson", "role": "instructor", "avatar": "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150"},
    "user_005": {"name": "Emma Brown", "role": "student", "avatar": "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150"},
    "user_006": {"name": "Frank Miller", "role": "student", "avatar": "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150"},
    "user_007": {"name": "Grace Lee", "role": "student", "avatar": "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150"},
    "user_008": {"name": "Henry Chen", "role": "student", "avatar": "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150"},
}

# Mock course data for validation
mock_courses = {
    "course_001": {"title": "Complete Web Development Bootcamp", "instructor_id": "user_001"},
    "course_002": {"title": "Data Science with Python", "instructor_id": "user_004"},
    "course_003": {"title": "UI/UX Design Fundamentals", "instructor_id": "user_001"},
    "course_004": {"title": "Advanced React Development", "instructor_id": "user_004"},
}

# In-memory reviews storage
reviews_db: Dict[str, Dict[str, Any]] = {
    "review_001": {
        "review_id": "review_001",
        "course_id": "course_001",
        "user_id": "user_002",
        "user_name": "Bob Smith",
        "user_avatar": "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150",
        "rating": 5,
        "comment": "Outstanding course! The instructor explains everything clearly and the projects are very practical. I learned so much and feel confident building web applications now.",
        "helpful_count": 12,
        "created_at": datetime(2024, 1, 20, 14, 30, 0),
        "updated_at": datetime(2024, 1, 20, 14, 30, 0)
    },
    "review_002": {
        "review_id": "review_002",
        "course_id": "course_001",
        "user_id": "user_005",
        "user_name": "Emma Brown",
        "user_avatar": "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150",
        "rating": 4,
        "comment": "Great course overall. The content is comprehensive and up-to-date. Would have liked more advanced topics covered.",
        "helpful_count": 8,
        "created_at": datetime(2024, 1, 18, 10, 15, 0),
        "updated_at": datetime(2024, 1, 18, 10, 15, 0)
    },
    "review_003": {
        "review_id": "review_003",
        "course_id": "course_001",
        "user_id": "user_006",
        "user_name": "Frank Miller",
        "user_avatar": "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150",
        "rating": 5,
        "comment": "Perfect for beginners! I had zero programming experience and now I can build websites. The step-by-step approach is excellent.",
        "helpful_count": 15,
        "created_at": datetime(2024, 1, 22, 16, 45, 0),
        "updated_at": datetime(2024, 1, 22, 16, 45, 0)
    },
    "review_004": {
        "review_id": "review_004",
        "course_id": "course_002",
        "user_id": "user_007",
        "user_name": "Grace Lee",
        "user_avatar": "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150",
        "rating": 4,
        "comment": "Solid data science course. Good coverage of pandas, matplotlib, and scikit-learn. Could use more real-world datasets.",
        "helpful_count": 6,
        "created_at": datetime(2024, 1, 19, 11, 20, 0),
        "updated_at": datetime(2024, 1, 19, 11, 20, 0)
    },
    "review_005": {
        "review_id": "review_005",
        "course_id": "course_002",
        "user_id": "user_008",
        "user_name": "Henry Chen",
        "user_avatar": "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150",
        "rating": 5,
        "comment": "Excellent instructor and well-structured curriculum. The machine learning section was particularly helpful for my career transition.",
        "helpful_count": 9,
        "created_at": datetime(2024, 1, 21, 9, 30, 0),
        "updated_at": datetime(2024, 1, 21, 9, 30, 0)
    },
    "review_006": {
        "review_id": "review_006",
        "course_id": "course_003",
        "user_id": "user_002",
        "user_name": "Bob Smith",
        "user_avatar": "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150",
        "rating": 4,
        "comment": "Great introduction to UI/UX design. Learned a lot about user research and design principles. More hands-on exercises would be beneficial.",
        "helpful_count": 7,
        "created_at": datetime(2024, 1, 17, 13, 15, 0),
        "updated_at": datetime(2024, 1, 17, 13, 15, 0)
    }
}

# Utility functions
async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """Mock authentication - extract user ID from token"""
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    try:
        # Mock token format: "mock_token_user_001"
        if not credentials.credentials.startswith("mock_token_"):
            raise credentials_exception
        
        user_id = credentials.credentials.replace("mock_token_", "")
        if user_id not in mock_users:
            raise credentials_exception
            
        return user_id
    except Exception:
        raise credentials_exception

def validate_course_exists(course_id: str):
    """Validate that course exists"""
    if course_id not in mock_courses:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Course not found"
        )

def validate_rating(rating: int):
    """Validate rating is between 1 and 5"""
    if rating < 1 or rating > 5:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Rating must be between 1 and 5"
        )

def calculate_rating_stats(course_id: str) -> Dict[str, Any]:
    """Calculate rating statistics for a course"""
    course_reviews = [r for r in reviews_db.values() if r["course_id"] == course_id]
    
    if not course_reviews:
        return {
            "total_reviews": 0,
            "average_rating": 0.0,
            "rating_distribution": {"1": 0, "2": 0, "3": 0, "4": 0, "5": 0}
        }
    
    total_reviews = len(course_reviews)
    total_rating = sum(r["rating"] for r in course_reviews)
    average_rating = round(total_rating / total_reviews, 1)
    
    # Calculate rating distribution
    rating_distribution = {"1": 0, "2": 0, "3": 0, "4": 0, "5": 0}
    for review in course_reviews:
        rating_distribution[str(review["rating"])] += 1
    
    return {
        "total_reviews": total_reviews,
        "average_rating": average_rating,
        "rating_distribution": rating_distribution
    }

def sort_reviews(reviews: List[Dict[str, Any]], sort_by: SortBy) -> List[Dict[str, Any]]:
    """Sort reviews based on the specified criteria"""
    if sort_by == SortBy.RATING_HIGH:
        return sorted(reviews, key=lambda x: x["rating"], reverse=True)
    elif sort_by == SortBy.RATING_LOW:
        return sorted(reviews, key=lambda x: x["rating"])
    elif sort_by == SortBy.DATE_NEW:
        return sorted(reviews, key=lambda x: x["created_at"], reverse=True)
    elif sort_by == SortBy.DATE_OLD:
        return sorted(reviews, key=lambda x: x["created_at"])
    elif sort_by == SortBy.HELPFUL:
        return sorted(reviews, key=lambda x: x["helpful_count"], reverse=True)
    else:
        return reviews

# Routes
@app.get("/")
async def root():
    return {
        "message": "Course Reviews and Ratings Microservice",
        "version": "1.0.0",
        "endpoints": [
            "/reviews/create",
            "/reviews/course/{course_id}",
            "/reviews/{review_id}",
            "/courses/{course_id}/rating-stats"
        ]
    }

@app.post("/reviews/create", response_model=Review)
async def create_review(
    review_data: ReviewCreate,
    user_id: str = Depends(get_current_user)
):
    """Create a new review for a course"""
    validate_course_exists(review_data.course_id)
    validate_rating(review_data.rating)
    
    # Check if user already reviewed this course
    existing_review = next(
        (r for r in reviews_db.values() 
         if r["course_id"] == review_data.course_id and r["user_id"] == user_id),
        None
    )
    
    if existing_review:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="You have already reviewed this course. Use the update endpoint to modify your review."
        )
    
    # Check if user is trying to review their own course
    course = mock_courses[review_data.course_id]
    if course["instructor_id"] == user_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Instructors cannot review their own courses"
        )
    
    review_id = str(uuid.uuid4())
    user_info = mock_users[user_id]
    
    new_review = {
        "review_id": review_id,
        "course_id": review_data.course_id,
        "user_id": user_id,
        "user_name": user_info["name"],
        "user_avatar": user_info.get("avatar"),
        "rating": review_data.rating,
        "comment": review_data.comment,
        "helpful_count": 0,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    }
    
    reviews_db[review_id] = new_review
    
    return Review(**new_review)

@app.get("/reviews/course/{course_id}", response_model=ReviewListResponse)
async def get_course_reviews(
    course_id: str,
    sort_by: SortBy = SortBy.DATE_NEW,
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=100)
):
    """Get all reviews for a course with sorting and pagination"""
    validate_course_exists(course_id)
    
    # Get all reviews for the course
    course_reviews = [r for r in reviews_db.values() if r["course_id"] == course_id]
    
    # Sort reviews
    sorted_reviews = sort_reviews(course_reviews, sort_by)
    
    # Calculate statistics
    stats = calculate_rating_stats(course_id)
    
    # Apply pagination
    total = len(sorted_reviews)
    start = (page - 1) * limit
    end = start + limit
    paginated_reviews = sorted_reviews[start:end]
    
    return ReviewListResponse(
        total=total,
        reviews=[Review(**review) for review in paginated_reviews],
        page=page,
        limit=limit,
        average_rating=stats["average_rating"],
        rating_distribution=stats["rating_distribution"]
    )

@app.get("/reviews/{review_id}", response_model=Review)
async def get_review(review_id: str):
    """Get a specific review by ID"""
    review = reviews_db.get(review_id)
    if not review:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Review not found"
        )
    
    return Review(**review)

@app.put("/reviews/{review_id}/update", response_model=Review)
async def update_review(
    review_id: str,
    update_data: ReviewUpdate,
    user_id: str = Depends(get_current_user)
):
    """Update a review (only by the review author)"""
    review = reviews_db.get(review_id)
    if not review:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Review not found"
        )
    
    # Check if user owns the review
    if review["user_id"] != user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You can only update your own reviews"
        )
    
    # Update only provided fields
    update_dict = update_data.dict(exclude_unset=True)
    for field, value in update_dict.items():
        if field == "rating" and value is not None:
            validate_rating(value)
        review[field] = value
    
    # Update timestamp
    review["updated_at"] = datetime.utcnow()
    
    return Review(**review)

@app.delete("/reviews/{review_id}")
async def delete_review(
    review_id: str,
    user_id: str = Depends(get_current_user)
):
    """Delete a review (only by the review author or admin)"""
    review = reviews_db.get(review_id)
    if not review:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Review not found"
        )
    
    # Check if user owns the review or is admin
    user_role = mock_users[user_id]["role"]
    if review["user_id"] != user_id and user_role != UserRole.ADMIN:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You can only delete your own reviews"
        )
    
    del reviews_db[review_id]
    
    return {
        "message": "Review deleted successfully",
        "review_id": review_id
    }

@app.put("/reviews/{review_id}/helpful")
async def mark_review_helpful(
    review_id: str,
    helpful_data: HelpfulRequest,
    user_id: str = Depends(get_current_user)
):
    """Mark a review as helpful or not helpful"""
    review = reviews_db.get(review_id)
    if not review:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Review not found"
        )
    
    # Users cannot mark their own reviews as helpful
    if review["user_id"] == user_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="You cannot mark your own review as helpful"
        )
    
    # For simplicity, we'll just increment/decrement the helpful count
    # In a real system, you'd track which users marked each review as helpful
    if helpful_data.helpful:
        review["helpful_count"] += 1
    else:
        review["helpful_count"] = max(0, review["helpful_count"] - 1)
    
    return {
        "message": f"Review marked as {'helpful' if helpful_data.helpful else 'not helpful'}",
        "review_id": review_id,
        "helpful_count": review["helpful_count"]
    }

@app.get("/courses/{course_id}/rating-stats", response_model=CourseRatingStats)
async def get_course_rating_stats(course_id: str):
    """Get comprehensive rating statistics for a course"""
    validate_course_exists(course_id)
    
    stats = calculate_rating_stats(course_id)
    
    # Get recent reviews (last 5)
    course_reviews = [r for r in reviews_db.values() if r["course_id"] == course_id]
    recent_reviews = sorted(course_reviews, key=lambda x: x["created_at"], reverse=True)[:5]
    
    return CourseRatingStats(
        course_id=course_id,
        total_reviews=stats["total_reviews"],
        average_rating=stats["average_rating"],
        rating_distribution=stats["rating_distribution"],
        recent_reviews=[Review(**review) for review in recent_reviews]
    )

@app.get("/reviews/user/{user_id}")
async def get_user_reviews(
    user_id: str,
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=100)
):
    """Get all reviews by a specific user"""
    if user_id not in mock_users:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    # Get all reviews by the user
    user_reviews = [r for r in reviews_db.values() if r["user_id"] == user_id]
    
    # Sort by date (newest first)
    sorted_reviews = sorted(user_reviews, key=lambda x: x["created_at"], reverse=True)
    
    # Apply pagination
    total = len(sorted_reviews)
    start = (page - 1) * limit
    end = start + limit
    paginated_reviews = sorted_reviews[start:end]
    
    return {
        "total": total,
        "reviews": [Review(**review) for review in paginated_reviews],
        "page": page,
        "limit": limit,
        "user_name": mock_users[user_id]["name"]
    }

@app.get("/reviews/top-rated")
async def get_top_rated_courses(limit: int = Query(10, ge=1, le=50)):
    """Get top-rated courses based on average rating and review count"""
    course_stats = {}
    
    for course_id in mock_courses.keys():
        stats = calculate_rating_stats(course_id)
        if stats["total_reviews"] >= 2:  # Minimum 2 reviews to be considered
            course_stats[course_id] = {
                "course_id": course_id,
                "course_title": mock_courses[course_id]["title"],
                "average_rating": stats["average_rating"],
                "total_reviews": stats["total_reviews"],
                "rating_score": stats["average_rating"] * min(stats["total_reviews"] / 10, 1)  # Weight by review count
            }
    
    # Sort by rating score (combination of rating and review count)
    top_courses = sorted(
        course_stats.values(),
        key=lambda x: x["rating_score"],
        reverse=True
    )[:limit]
    
    return {
        "top_rated_courses": top_courses
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8004)