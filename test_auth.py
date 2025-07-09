import requests
import json

# Base URL for the API
BASE_URL = "http://localhost:8000"

def test_signup():
    """Test user signup"""
    print("Testing user signup...")
    
    signup_data = {
        "email": "john.doe@example.com",
        "password": "securepassword123",
        "full_name": "John Doe"
    }
    
    response = requests.post(f"{BASE_URL}/signup", json=signup_data)
    print(f"Signup Response: {response.status_code}")
    print(f"Response: {response.json()}")
    
    if response.status_code == 200:
        return response.json()["access_token"]
    return None

def test_login():
    """Test user login"""
    print("\nTesting user login...")
    
    login_data = {
        "email": "john.doe@example.com",
        "password": "securepassword123"
    }
    
    response = requests.post(f"{BASE_URL}/login", json=login_data)
    print(f"Login Response: {response.status_code}")
    print(f"Response: {response.json()}")
    
    if response.status_code == 200:
        return response.json()["access_token"]
    return None

def test_oauth():
    """Test OAuth login"""
    print("\nTesting OAuth login...")
    
    oauth_data = {
        "provider": "google",
        "access_token": "mock_google_token_12345",
        "email": "jane.smith@gmail.com",
        "full_name": "Jane Smith"
    }
    
    response = requests.post(f"{BASE_URL}/oauth", json=oauth_data)
    print(f"OAuth Response: {response.status_code}")
    print(f"Response: {response.json()}")
    
    if response.status_code == 200:
        return response.json()["access_token"]
    return None

def test_enable_2fa(token):
    """Test enabling 2FA"""
    print("\nTesting 2FA enable...")
    
    headers = {"Authorization": f"Bearer {token}"}
    enable_2fa_data = {"enable": True}
    
    response = requests.post(f"{BASE_URL}/enable-2fa", json=enable_2fa_data, headers=headers)
    print(f"Enable 2FA Response: {response.status_code}")
    print(f"Response: {response.json()}")

def test_profile(token):
    """Test getting user profile"""
    print("\nTesting profile retrieval...")
    
    headers = {"Authorization": f"Bearer {token}"}
    
    response = requests.get(f"{BASE_URL}/profile", headers=headers)
    print(f"Profile Response: {response.status_code}")
    print(f"Response: {response.json()}")

def test_list_users():
    """Test listing all users (debug endpoint)"""
    print("\nTesting user list...")
    
    response = requests.get(f"{BASE_URL}/users")
    print(f"Users Response: {response.status_code}")
    print(f"Response: {response.json()}")

if __name__ == "__main__":
    print("Starting Authentication API Tests")
    print("=" * 50)
    
    # Test signup
    signup_token = test_signup()
    
    # Test login
    login_token = test_login()
    
    # Test OAuth
    oauth_token = test_oauth()
    
    # Use the first available token for authenticated requests
    token = signup_token or login_token or oauth_token
    
    if token:
        # Test 2FA
        test_enable_2fa(token)
        
        # Test profile
        test_profile(token)
    
    # Test user listing
    test_list_users()
    
    print("\n" + "=" * 50)
    print("Tests completed!")