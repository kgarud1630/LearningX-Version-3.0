from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime, timedelta
from typing import Optional, Dict, Any
import secrets
import uuid

# Initialize FastAPI app
app = FastAPI(
    title="Authentication Microservice",
    description="A comprehensive authentication service with JWT, OAuth, and 2FA",
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
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
security = HTTPBearer()

# In-memory user storage
users_db: Dict[str, Dict[str, Any]] = {}

# Pydantic models
class UserSignup(BaseModel):
    email: EmailStr
    password: str
    full_name: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class OAuthRequest(BaseModel):
    provider: str  # "google" or "facebook"
    access_token: str
    email: EmailStr
    full_name: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str
    expires_in: int

class UserResponse(BaseModel):
    id: str
    email: str
    full_name: str
    is_verified: bool
    two_fa_enabled: bool
    created_at: datetime

class Enable2FARequest(BaseModel):
    enable: bool

# Utility functions
def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def get_user_by_email(email: str) -> Optional[Dict[str, Any]]:
    for user_id, user_data in users_db.items():
        if user_data["email"] == email:
            return {"id": user_id, **user_data}
    return None

def authenticate_user(email: str, password: str) -> Optional[Dict[str, Any]]:
    user = get_user_by_email(email)
    if not user:
        return None
    if not verify_password(password, user["hashed_password"]):
        return None
    return user

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(credentials.credentials, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    
    user = users_db.get(user_id)
    if user is None:
        raise credentials_exception
    return {"id": user_id, **user}

# Mock OAuth verification
def verify_oauth_token(provider: str, access_token: str, email: str) -> bool:
    # Mock verification - in production, you'd verify with actual OAuth providers
    mock_tokens = {
        "google": "mock_google_token_12345",
        "facebook": "mock_facebook_token_67890"
    }
    return access_token == mock_tokens.get(provider, "")

# Routes
@app.get("/")
async def root():
    return {
        "message": "Authentication Microservice",
        "version": "1.0.0",
        "endpoints": ["/signup", "/login", "/oauth", "/enable-2fa", "/profile"]
    }

@app.post("/signup", response_model=TokenResponse)
async def signup(user_data: UserSignup):
    # Check if user already exists
    if get_user_by_email(user_data.email):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Create new user
    user_id = str(uuid.uuid4())
    hashed_password = get_password_hash(user_data.password)
    
    users_db[user_id] = {
        "email": user_data.email,
        "full_name": user_data.full_name,
        "hashed_password": hashed_password,
        "is_verified": False,
        "two_fa_enabled": False,
        "created_at": datetime.utcnow(),
        "oauth_provider": None
    }
    
    # Generate access token
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user_id}, expires_delta=access_token_expires
    )
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "expires_in": ACCESS_TOKEN_EXPIRE_MINUTES * 60
    }

@app.post("/login", response_model=TokenResponse)
async def login(user_credentials: UserLogin):
    user = authenticate_user(user_credentials.email, user_credentials.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # In a real app, you'd check 2FA here if enabled
    if user.get("two_fa_enabled", False):
        # Mock 2FA check - in production, you'd verify OTP
        pass
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user["id"]}, expires_delta=access_token_expires
    )
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "expires_in": ACCESS_TOKEN_EXPIRE_MINUTES * 60
    }

@app.post("/oauth", response_model=TokenResponse)
async def oauth_login(oauth_data: OAuthRequest):
    # Verify OAuth token (mock implementation)
    if not verify_oauth_token(oauth_data.provider, oauth_data.access_token, oauth_data.email):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid OAuth token"
        )
    
    # Check if user exists
    user = get_user_by_email(oauth_data.email)
    
    if not user:
        # Create new user from OAuth
        user_id = str(uuid.uuid4())
        users_db[user_id] = {
            "email": oauth_data.email,
            "full_name": oauth_data.full_name,
            "hashed_password": None,  # OAuth users don't have passwords
            "is_verified": True,  # OAuth users are pre-verified
            "two_fa_enabled": False,
            "created_at": datetime.utcnow(),
            "oauth_provider": oauth_data.provider
        }
        user_id_for_token = user_id
    else:
        user_id_for_token = user["id"]
    
    # Generate access token
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user_id_for_token}, expires_delta=access_token_expires
    )
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "expires_in": ACCESS_TOKEN_EXPIRE_MINUTES * 60
    }

@app.post("/enable-2fa")
async def enable_2fa(
    request: Enable2FARequest,
    current_user: dict = Depends(get_current_user)
):
    user_id = current_user["id"]
    users_db[user_id]["two_fa_enabled"] = request.enable
    
    return {
        "message": f"2FA {'enabled' if request.enable else 'disabled'} successfully",
        "two_fa_enabled": request.enable
    }

@app.get("/profile", response_model=UserResponse)
async def get_profile(current_user: dict = Depends(get_current_user)):
    return UserResponse(
        id=current_user["id"],
        email=current_user["email"],
        full_name=current_user["full_name"],
        is_verified=current_user["is_verified"],
        two_fa_enabled=current_user["two_fa_enabled"],
        created_at=current_user["created_at"]
    )

@app.get("/users")
async def list_users():
    """Debug endpoint to see all registered users"""
    return {
        "total_users": len(users_db),
        "users": [
            {
                "id": user_id,
                "email": user_data["email"],
                "full_name": user_data["full_name"],
                "is_verified": user_data["is_verified"],
                "two_fa_enabled": user_data["two_fa_enabled"],
                "oauth_provider": user_data.get("oauth_provider")
            }
            for user_id, user_data in users_db.items()
        ]
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)