import requests
import json

# Base URL for the Course API
BASE_URL = "http://localhost:8002"

# Mock authentication tokens for testing
MOCK_TOKENS = {
    "instructor_001": "mock_token_instructor_001",  # Alice
    "instructor_002": "mock_token_instructor_002",  # Bob
    "instructor_003": "mock_token_instructor_003",  # Carol
    "instructor_004": "mock_token_instructor_004",  # David
}

def test_create_course():
    """Test creating a new course"""
    print("Testing course creation...")
    
    instructor_id = "instructor_001"
    token = MOCK_TOKENS[instructor_id]
    headers = {"Authorization": f"Bearer {token}"}
    
    course_data = {
        "title": "Advanced JavaScript Concepts",
        "description": "Deep dive into closures, prototypes, async programming, and modern ES6+ features.",
        "category": "web_development",
        "level": "intermediate",
        "price": 89.99,
        "thumbnail_url": "https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=600",
        "duration_hours": 25,
        "prerequisites": ["Basic JavaScript knowledge", "Understanding of HTML/CSS"],
        "learning_objectives": [
            "Master JavaScript closures and scope",
            "Understand prototypal inheritance",
            "Work with async/await and Promises",
            "Use modern ES6+ features effectively"
        ]
    }
    
    response = requests.post(f"{BASE_URL}/courses/create", json=course_data, headers=headers)
    print(f"Create Course Response: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2, default=str)}")
    
    if response.status_code == 200:
        return response.json()["course_id"]
    return None

def test_get_course():
    """Test getting a course by ID"""
    print("\nTesting get course...")
    
    course_id = "course_001"
    response = requests.get(f"{BASE_URL}/courses/{course_id}")
    print(f"Get Course Response: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2, default=str)}")
    return response.status_code == 200

def test_update_course():
    """Test updating a course"""
    print("\nTesting course update...")
    
    instructor_id = "instructor_001"
    token = MOCK_TOKENS[instructor_id]
    headers = {"Authorization": f"Bearer {token}"}
    
    course_id = "course_001"
    update_data = {
        "title": "Complete Web Development Bootcamp (Updated)",
        "description": "Updated description: Learn HTML, CSS, JavaScript, React, Node.js, and MongoDB with the latest industry practices.",
        "price": 109.99,
        "duration_hours": 55
    }
    
    response = requests.put(f"{BASE_URL}/courses/{course_id}/update", json=update_data, headers=headers)
    print(f"Update Course Response: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2, default=str)}")
    return response.status_code == 200

def test_list_courses():
    """Test listing courses with filters"""
    print("\nTesting course listing...")
    
    # Test without filters
    response = requests.get(f"{BASE_URL}/courses")
    print(f"List All Courses Response: {response.status_code}")
    print(f"Total courses: {response.json().get('total', 0)}")
    
    # Test with category filter
    response = requests.get(f"{BASE_URL}/courses?category=web_development&limit=5")
    print(f"List Web Development Courses Response: {response.status_code}")
    print(f"Web development courses: {response.json().get('total', 0)}")
    
    # Test with level filter
    response = requests.get(f"{BASE_URL}/courses?level=beginner")
    print(f"List Beginner Courses Response: {response.status_code}")
    print(f"Beginner courses: {response.json().get('total', 0)}")
    
    return response.status_code == 200

def test_my_courses():
    """Test getting instructor's own courses"""
    print("\nTesting my courses...")
    
    instructor_id = "instructor_001"
    token = MOCK_TOKENS[instructor_id]
    headers = {"Authorization": f"Bearer {token}"}
    
    response = requests.get(f"{BASE_URL}/my-courses", headers=headers)
    print(f"My Courses Response: {response.status_code}")
    print(f"My courses count: {response.json().get('total', 0)}")
    
    # Test with status filter
    response = requests.get(f"{BASE_URL}/my-courses?status=published", headers=headers)
    print(f"My Published Courses Response: {response.status_code}")
    print(f"My published courses: {response.json().get('total', 0)}")
    
    return response.status_code == 200

def test_publish_course():
    """Test publishing a course"""
    print("\nTesting course publishing...")
    
    instructor_id = "instructor_001"
    token = MOCK_TOKENS[instructor_id]
    headers = {"Authorization": f"Bearer {token}"}
    
    course_id = "course_004"  # This is a draft course
    response = requests.put(f"{BASE_URL}/courses/{course_id}/publish", headers=headers)
    print(f"Publish Course Response: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2, default=str)}")
    return response.status_code == 200

def test_delete_course(course_id):
    """Test deleting a course"""
    print(f"\nTesting course deletion for course {course_id}...")
    
    instructor_id = "instructor_001"
    token = MOCK_TOKENS[instructor_id]
    headers = {"Authorization": f"Bearer {token}"}
    
    response = requests.delete(f"{BASE_URL}/courses/{course_id}", headers=headers)
    print(f"Delete Course Response: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2, default=str)}")
    return response.status_code == 200

def test_get_metadata():
    """Test getting categories and levels"""
    print("\nTesting metadata endpoints...")
    
    # Test categories
    response = requests.get(f"{BASE_URL}/categories")
    print(f"Categories Response: {response.status_code}")
    print(f"Available categories: {len(response.json().get('categories', []))}")
    
    # Test levels
    response = requests.get(f"{BASE_URL}/levels")
    print(f"Levels Response: {response.status_code}")
    print(f"Available levels: {len(response.json().get('levels', []))}")
    
    # Test instructors
    response = requests.get(f"{BASE_URL}/instructors")
    print(f"Instructors Response: {response.status_code}")
    print(f"Available instructors: {len(response.json().get('instructors', []))}")
    
    return response.status_code == 200

def test_unauthorized_access():
    """Test unauthorized access scenarios"""
    print("\nTesting unauthorized access...")
    
    # Try to create course without token
    course_data = {"title": "Unauthorized Course", "description": "Test", "category": "web_development", "level": "beginner"}
    response = requests.post(f"{BASE_URL}/courses/create", json=course_data)
    print(f"Unauthorized Course Creation: {response.status_code}")
    
    # Try to update someone else's course
    instructor_token = MOCK_TOKENS["instructor_002"]  # Bob trying to update Alice's course
    headers = {"Authorization": f"Bearer {instructor_token}"}
    update_data = {"title": "Hacked Course"}
    
    response = requests.put(f"{BASE_URL}/courses/course_001/update", json=update_data, headers=headers)
    print(f"Unauthorized Course Update: {response.status_code}")
    
    return response.status_code in [401, 403]  # Should be unauthorized or forbidden

if __name__ == "__main__":
    print("Starting Course Management API Tests")
    print("=" * 60)
    
    # Create a new course and get its ID for testing
    new_course_id = test_create_course()
    
    tests = [
        ("Get Course", test_get_course),
        ("Update Course", test_update_course),
        ("List Courses", test_list_courses),
        ("My Courses", test_my_courses),
        ("Publish Course", test_publish_course),
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
    
    # Test deletion with the newly created course
    if new_course_id:
        try:
            delete_result = test_delete_course(new_course_id)
            results.append(("Delete Course", "PASS" if delete_result else "FAIL"))
        except Exception as e:
            print(f"Error in Delete Course: {e}")
            results.append(("Delete Course", "ERROR"))
    
    print("\n" + "=" * 60)
    print("Test Results Summary:")
    print("=" * 60)
    for test_name, status in results:
        print(f"{test_name:<25} {status}")
    
    print("\n" + "=" * 60)
    print("Tests completed!")
    print("\nTo run the service:")
    print("python course_service.py")
    print("\nAPI Documentation available at:")
    print("http://localhost:8002/docs")