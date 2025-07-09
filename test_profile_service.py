import requests
import json

# Base URL for the Profile API
BASE_URL = "http://localhost:8001"

# Mock authentication tokens for testing
MOCK_TOKENS = {
    "user_001": "mock_token_user_001",  # Alice (Instructor)
    "user_002": "mock_token_user_002",  # Bob (Student)
    "user_003": "mock_token_user_003",  # Carol (Admin)
    "user_004": "mock_token_user_004",  # David (Instructor)
    "user_005": "mock_token_user_005"   # Emma (Student)
}

def test_get_profile():
    """Test getting user profile by ID"""
    print("Testing get profile...")
    
    user_id = "user_001"
    response = requests.get(f"{BASE_URL}/profile/{user_id}")
    print(f"Get Profile Response: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2, default=str)}")
    return response.status_code == 200

def test_get_complete_profile():
    """Test getting complete user profile with settings"""
    print("\nTesting get complete profile...")
    
    user_id = "user_002"
    response = requests.get(f"{BASE_URL}/profile/{user_id}/complete")
    print(f"Complete Profile Response: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2, default=str)}")
    return response.status_code == 200

def test_update_profile():
    """Test updating user profile"""
    print("\nTesting profile update...")
    
    user_id = "user_001"
    token = MOCK_TOKENS[user_id]
    headers = {"Authorization": f"Bearer {token}"}
    
    update_data = {
        "name": "Alice Johnson (Updated)",
        "bio": "Updated bio: Senior software developer and passionate educator with expertise in full-stack development.",
        "photo_url": "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400"
    }
    
    response = requests.put(f"{BASE_URL}/profile/update", json=update_data, headers=headers)
    print(f"Update Profile Response: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2, default=str)}")
    return response.status_code == 200

def test_get_settings():
    """Test getting user settings"""
    print("\nTesting get settings...")
    
    user_id = "user_003"
    response = requests.get(f"{BASE_URL}/settings/{user_id}")
    print(f"Get Settings Response: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2, default=str)}")
    return response.status_code == 200

def test_update_settings():
    """Test updating user settings"""
    print("\nTesting settings update...")
    
    user_id = "user_002"
    token = MOCK_TOKENS[user_id]
    headers = {"Authorization": f"Bearer {token}"}
    
    update_data = {
        "language": "es",
        "timezone": "America/Los_Angeles",
        "email_notifications": False,
        "push_notifications": True,
        "marketing_notifications": False
    }
    
    response = requests.put(f"{BASE_URL}/settings/update", json=update_data, headers=headers)
    print(f"Update Settings Response: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2, default=str)}")
    return response.status_code == 200

def test_update_user_role():
    """Test updating user role (admin only)"""
    print("\nTesting role update (admin action)...")
    
    admin_token = MOCK_TOKENS["user_003"]  # Carol is admin
    headers = {"Authorization": f"Bearer {admin_token}"}
    
    target_user_id = "user_005"
    role_data = {"role": "instructor"}
    
    response = requests.put(f"{BASE_URL}/profile/{target_user_id}/role", json=role_data, headers=headers)
    print(f"Update Role Response: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2, default=str)}")
    return response.status_code == 200

def test_list_profiles():
    """Test listing profiles with filtering"""
    print("\nTesting profile listing...")
    
    # Test without filter
    response = requests.get(f"{BASE_URL}/profiles")
    print(f"List All Profiles Response: {response.status_code}")
    print(f"Total profiles: {response.json().get('total', 0)}")
    
    # Test with role filter
    response = requests.get(f"{BASE_URL}/profiles?role=student&limit=5")
    print(f"List Student Profiles Response: {response.status_code}")
    print(f"Student profiles: {response.json().get('total', 0)}")
    
    return response.status_code == 200

def test_get_metadata():
    """Test getting available roles, languages, and timezones"""
    print("\nTesting metadata endpoints...")
    
    # Test roles
    response = requests.get(f"{BASE_URL}/roles")
    print(f"Roles Response: {response.status_code}")
    print(f"Available roles: {len(response.json().get('roles', []))}")
    
    # Test languages
    response = requests.get(f"{BASE_URL}/languages")
    print(f"Languages Response: {response.status_code}")
    print(f"Available languages: {len(response.json().get('languages', []))}")
    
    # Test timezones
    response = requests.get(f"{BASE_URL}/timezones")
    print(f"Timezones Response: {response.status_code}")
    print(f"Available timezones: {len(response.json().get('timezones', []))}")
    
    return response.status_code == 200

def test_unauthorized_access():
    """Test unauthorized access scenarios"""
    print("\nTesting unauthorized access...")
    
    # Try to update profile without token
    update_data = {"name": "Unauthorized Update"}
    response = requests.put(f"{BASE_URL}/profile/update", json=update_data)
    print(f"Unauthorized Profile Update: {response.status_code}")
    
    # Try to update role as non-admin
    student_token = MOCK_TOKENS["user_002"]  # Bob is student
    headers = {"Authorization": f"Bearer {student_token}"}
    role_data = {"role": "admin"}
    
    response = requests.put(f"{BASE_URL}/profile/user_001/role", json=role_data, headers=headers)
    print(f"Non-admin Role Update: {response.status_code}")
    
    return response.status_code == 403  # Should be forbidden

if __name__ == "__main__":
    print("Starting Profile Management API Tests")
    print("=" * 60)
    
    tests = [
        ("Get Profile", test_get_profile),
        ("Get Complete Profile", test_get_complete_profile),
        ("Update Profile", test_update_profile),
        ("Get Settings", test_get_settings),
        ("Update Settings", test_update_settings),
        ("Update User Role", test_update_user_role),
        ("List Profiles", test_list_profiles),
        ("Get Metadata", test_get_metadata),
        ("Unauthorized Access", test_unauthorized_access)
    ]
    
    results = []
    for test_name, test_func in tests:
        try:
            result = test_func()
            results.append((test_name, "PASS" if result else "FAIL"))
        except Exception as e:
            print(f"Error in {test_name}: {e}")
            results.append((test_name, "ERROR"))
    
    print("\n" + "=" * 60)
    print("Test Results Summary:")
    print("=" * 60)
    for test_name, status in results:
        print(f"{test_name:<25} {status}")
    
    print("\n" + "=" * 60)
    print("Tests completed!")
    print("\nTo run the service:")
    print("python profile_service.py")
    print("\nAPI Documentation available at:")
    print("http://localhost:8001/docs")