from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, HttpUrl
from jose import JWTError, jwt
from datetime import datetime
from typing import Optional, Dict, Any, List
from enum import Enum
import uuid

# Initialize FastAPI app
app = FastAPI(
    title="User Profile Management Microservice",
    description="A comprehensive user profile management service with roles and settings",
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
SECRET_KEY = "your-secret-key-change-in-production"
ALGORITHM = "HS256"
security = HTTPBearer()

# Enums
class UserRole(str, Enum):
    STUDENT = "student"
    INSTRUCTOR = "instructor"
    ADMIN = "admin"

class Language(str, Enum):
    ENGLISH = "en"
    SPANISH = "es"
    FRENCH = "fr"
    GERMAN = "de"
    CHINESE = "zh"
    JAPANESE = "ja"

class Timezone(str, Enum):
    UTC = "UTC"
    EST = "America/New_York"
    PST = "America/Los_Angeles"
    GMT = "Europe/London"
    CET = "Europe/Paris"
    JST = "Asia/Tokyo"
    CST = "Asia/Shanghai"

# Pydantic models
class UserProfile(BaseModel):
    user_id: str
    name: str
    bio: Optional[str] = None
    photo_url: Optional[HttpUrl] = None
    role: UserRole
    email: str
    created_at: datetime
    updated_at: datetime

class UserSettings(BaseModel):
    language: Language
    timezone: Timezone
    email_notifications: bool
    push_notifications: bool
    marketing_notifications: bool

class ProfileUpdateRequest(BaseModel):
    name: Optional[str] = None
    bio: Optional[str] = None
    photo_url: Optional[HttpUrl] = None

class SettingsUpdateRequest(BaseModel):
    language: Optional[Language] = None
    timezone: Optional[Timezone] = None
    email_notifications: Optional[bool] = None
    push_notifications: Optional[bool] = None
    marketing_notifications: Optional[bool] = None

class RoleUpdateRequest(BaseModel):
    role: UserRole

class CompleteProfileResponse(BaseModel):
    profile: UserProfile
    settings: UserSettings

# Mock user data storage
profiles_db: Dict[str, Dict[str, Any]] = {
    "user_001": {
        "user_id": "user_001",
        "name": "Alice Johnson",
        "bio": "Passionate software developer and lifelong learner. Love teaching others about web development and data science.",
        "photo_url": "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300",
        "role": UserRole.INSTRUCTOR,
        "email": "alice.johnson@example.com",
        "created_at": datetime(2024, 1, 15, 10, 30, 0),
        "updated_at": datetime(2024, 1, 20, 14, 45, 0)
    },
    "user_002": {
        "user_id": "user_002",
        "name": "Bob Smith",
        "bio": "Computer science student exploring machine learning and AI. Always eager to learn new technologies.",
        "photo_url": "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300",
        "role": UserRole.STUDENT,
        "email": "bob.smith@example.com",
        "created_at": datetime(2024, 1, 10, 9, 15, 0),
        "updated_at": datetime(2024, 1, 18, 16, 20, 0)
    },
    "user_003": {
        "user_id": "user_003",
        "name": "Carol Davis",
        "bio": "Platform administrator with 10+ years experience in educational technology. Ensuring the best learning experience for everyone.",
        "photo_url": "https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=300",
        "role": UserRole.ADMIN,
        "email": "carol.davis@example.com",
        "created_at": datetime(2024, 1, 5, 8, 0, 0),
        "updated_at": datetime(2024, 1, 22, 11, 30, 0)
    },
    "user_004": {
        "user_id": "user_004",
        "name": "David Wilson",
        "bio": "UX/UI designer turned instructor. Teaching design principles and user experience best practices.",
        "photo_url": "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=300",
        "role": UserRole.INSTRUCTOR,
        "email": "david.wilson@example.com",
        "created_at": datetime(2024, 1, 12, 14, 20, 0),
        "updated_at": datetime(2024, 1, 19, 10, 15, 0)
    },
    "user_005": {
        "user_id": "user_005",
        "name": "Emma Brown",
        "bio": "Marketing professional learning data analytics to enhance campaign performance.",
        "photo_url": "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=300",
        "role": UserRole.STUDENT,
        "email": "emma.brown@example.com",
        "created_at": datetime(2024, 1, 8, 13, 45, 0),
        "updated_at": datetime(2024, 1, 16, 9, 30, 0)
    }
}

settings_db: Dict[str, Dict[str, Any]] = {
    "user_001": {
        "language": Language.ENGLISH,
        "timezone": Timezone.EST,
        "email_notifications": True,
        "push_notifications": True,
        "marketing_notifications": False
    },
    "user_002": {
        "language": Language.ENGLISH,
        "timezone": Timezone.PST,
        "email_notifications": True,
        "push_notifications": False,
        "marketing_notifications": True
    },
    "user_003": {
        "language": Language.ENGLISH,
        "timezone": Timezone.UTC,
        "email_notifications": True,
        "push_notifications": True,
        "marketing_notifications": False
    },
    "user_004": {
        "language": Language.FRENCH,
        "timezone": Timezone.CET,
        "email_notifications": False,
        "push_notifications": True,
        "marketing_notifications": False
    },
    "user_005": {
        "language": Language.SPANISH,
        "timezone": Timezone.EST,
        "email_notifications": True,
        "push_notifications": True,
        "marketing_notifications": True
    }
}

# Utility functions
async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """Mock authentication - in production, verify JWT token"""
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    # Mock JWT verification - in production, decode and verify the token
    # For demo purposes, we'll extract user_id from a mock token format
    try:
        # Mock token format: "mock_token_user_001"
        if not credentials.credentials.startswith("mock_token_"):
            raise credentials_exception
        
        user_id = credentials.credentials.replace("mock_token_", "")
        if user_id not in profiles_db:
            raise credentials_exception
            
        return user_id
    except Exception:
        raise credentials_exception

def get_profile_by_id(user_id: str) -> Optional[Dict[str, Any]]:
    """Get user profile by ID"""
    return profiles_db.get(user_id)

def get_settings_by_id(user_id: str) -> Optional[Dict[str, Any]]:
    """Get user settings by ID"""
    return settings_db.get(user_id)

# Routes
@app.get("/")
async def root():
    return {
        "message": "User Profile Management Microservice",
        "version": "1.0.0",
        "endpoints": ["/profile/{user_id}", "/profile/update", "/settings/{user_id}", "/settings/update", "/roles"]
    }

@app.get("/profile/{user_id}", response_model=UserProfile)
async def get_profile(user_id: str):
    """Get user profile by ID"""
    profile = get_profile_by_id(user_id)
    if not profile:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User profile not found"
        )
    
    return UserProfile(**profile)

@app.get("/profile/{user_id}/complete", response_model=CompleteProfileResponse)
async def get_complete_profile(user_id: str):
    """Get complete user profile including settings"""
    profile = get_profile_by_id(user_id)
    settings = get_settings_by_id(user_id)
    
    if not profile:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User profile not found"
        )
    
    if not settings:
        # Create default settings if none exist
        settings = {
            "language": Language.ENGLISH,
            "timezone": Timezone.UTC,
            "email_notifications": True,
            "push_notifications": True,
            "marketing_notifications": False
        }
        settings_db[user_id] = settings
    
    return CompleteProfileResponse(
        profile=UserProfile(**profile),
        settings=UserSettings(**settings)
    )

@app.put("/profile/update")
async def update_profile(
    update_data: ProfileUpdateRequest,
    current_user_id: str = Depends(get_current_user)
):
    """Update current user's profile"""
    if current_user_id not in profiles_db:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User profile not found"
        )
    
    profile = profiles_db[current_user_id]
    
    # Update only provided fields
    update_dict = update_data.dict(exclude_unset=True)
    for field, value in update_dict.items():
        if field == "photo_url" and value:
            profile[field] = str(value)  # Convert HttpUrl to string
        else:
            profile[field] = value
    
    # Update timestamp
    profile["updated_at"] = datetime.utcnow()
    
    return {
        "message": "Profile updated successfully",
        "profile": UserProfile(**profile)
    }

@app.get("/settings/{user_id}", response_model=UserSettings)
async def get_settings(user_id: str):
    """Get user settings by ID"""
    settings = get_settings_by_id(user_id)
    if not settings:
        # Return default settings if none exist
        default_settings = {
            "language": Language.ENGLISH,
            "timezone": Timezone.UTC,
            "email_notifications": True,
            "push_notifications": True,
            "marketing_notifications": False
        }
        settings_db[user_id] = default_settings
        return UserSettings(**default_settings)
    
    return UserSettings(**settings)

@app.put("/settings/update")
async def update_settings(
    update_data: SettingsUpdateRequest,
    current_user_id: str = Depends(get_current_user)
):
    """Update current user's settings"""
    if current_user_id not in settings_db:
        # Create default settings if none exist
        settings_db[current_user_id] = {
            "language": Language.ENGLISH,
            "timezone": Timezone.UTC,
            "email_notifications": True,
            "push_notifications": True,
            "marketing_notifications": False
        }
    
    settings = settings_db[current_user_id]
    
    # Update only provided fields
    update_dict = update_data.dict(exclude_unset=True)
    for field, value in update_dict.items():
        settings[field] = value
    
    return {
        "message": "Settings updated successfully",
        "settings": UserSettings(**settings)
    }

@app.put("/profile/{user_id}/role")
async def update_user_role(
    user_id: str,
    role_data: RoleUpdateRequest,
    current_user_id: str = Depends(get_current_user)
):
    """Update user role (admin only)"""
    # Check if current user is admin
    current_profile = get_profile_by_id(current_user_id)
    if not current_profile or current_profile["role"] != UserRole.ADMIN:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only administrators can update user roles"
        )
    
    # Check if target user exists
    if user_id not in profiles_db:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User profile not found"
        )
    
    # Update role
    profiles_db[user_id]["role"] = role_data.role
    profiles_db[user_id]["updated_at"] = datetime.utcnow()
    
    return {
        "message": f"User role updated to {role_data.role}",
        "user_id": user_id,
        "new_role": role_data.role
    }

@app.get("/profiles")
async def list_profiles(
    role: Optional[UserRole] = None,
    limit: int = 10,
    offset: int = 0
):
    """List all user profiles with optional role filtering"""
    profiles = list(profiles_db.values())
    
    # Filter by role if specified
    if role:
        profiles = [p for p in profiles if p["role"] == role]
    
    # Apply pagination
    total = len(profiles)
    profiles = profiles[offset:offset + limit]
    
    return {
        "total": total,
        "limit": limit,
        "offset": offset,
        "profiles": [UserProfile(**profile) for profile in profiles]
    }

@app.get("/roles")
async def get_available_roles():
    """Get list of available user roles"""
    return {
        "roles": [
            {"value": role.value, "label": role.value.title()}
            for role in UserRole
        ]
    }

@app.get("/languages")
async def get_available_languages():
    """Get list of available languages"""
    language_names = {
        Language.ENGLISH: "English",
        Language.SPANISH: "Español",
        Language.FRENCH: "Français",
        Language.GERMAN: "Deutsch",
        Language.CHINESE: "中文",
        Language.JAPANESE: "日本語"
    }
    
    return {
        "languages": [
            {"value": lang.value, "label": language_names[lang]}
            for lang in Language
        ]
    }

@app.get("/timezones")
async def get_available_timezones():
    """Get list of available timezones"""
    timezone_names = {
        Timezone.UTC: "UTC (Coordinated Universal Time)",
        Timezone.EST: "EST (Eastern Standard Time)",
        Timezone.PST: "PST (Pacific Standard Time)",
        Timezone.GMT: "GMT (Greenwich Mean Time)",
        Timezone.CET: "CET (Central European Time)",
        Timezone.JST: "JST (Japan Standard Time)",
        Timezone.CST: "CST (China Standard Time)"
    }
    
    return {
        "timezones": [
            {"value": tz.value, "label": timezone_names[tz]}
            for tz in Timezone
        ]
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)