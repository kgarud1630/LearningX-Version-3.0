import requests
import json

# Base URL for the Reviews API
BASE_URL = "http://localhost:8004"

# Mock authentication tokens for testing
MOCK_TOKENS = {
    "user_001": "mock_token_user_001",  # Alice (Instructor)
    "user_002": "mock_token_user_002",  # Bob (Student)
    "user_003": "mock_token_user_003",  # Carol (Admin)
    "user_004": "mock_token_user_004",  # David (Instructor)
    "user_005": "mock_token_user_005",  # Emma (Student)
    "user_006": "mock_token_user_006",  # Frank (Student)
    "user_007": "mock_token_user_007",  # Grace (Student)
    "user_008": "mock_token_user_008",  # Henry (Student)
}

def test_create_review():
    """Test creating a new review"""
    print("Testing review creation...")
    
    user_id = "user_002"  # Bob (Student)
    token = MOCK_TOKENS[user_id]
    headers = {"Authorization": f"Bearer {token}"}
    
    review_data = {
        "course_id": "course_004",
        "rating": 4,
        "comment": "Great advanced React course! Learned a lot about hooks and performance optimization. Would recommend to anyone with basic React knowledge."
    }
    
    response = requests.post(f"{BASE_URL}/reviews/create", json=review_data, headers=headers)
    print(f"Create Review Response: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2, default=str)}")
    
    if response.status_code == 200:
        return response.json()["review_id"]
    return None

def test_get_course_reviews():
    """Test getting reviews for a course"""
    print("\nTesting get course reviews...")
    
    course_id = "course_001"
    
    # Test without sorting
    response = requests.get(f"{BASE_URL}/reviews/course/{course_id}")
    print(f"Get Course Reviews Response: {response.status_code}")
    
    if response.status_code == 200:
        data = response.json()
        print(f"Total reviews: {data['total']}")
        print(f"Average rating: {data['average_rating']}")
        print(f"Rating distribution: {data['rating_distribution']}")
    
    # Test with sorting by rating (high to low)
    response = requests.get(f"{BASE_URL}/reviews/course/{course_id}?sort_by=rating_high&limit=5")
    print(f"Sorted Reviews Response: {response.status_code}")
    
    # Test with sorting by helpful count
    response = requests.get(f"{BASE_URL}/reviews/course/{course_id}?sort_by=helpful&limit=3")
    print(f"Most Helpful Reviews Response: {response.status_code}")
    
    return response.status_code == 200

def test_get_review():
    """Test getting a specific review"""
    print("\nTesting get specific review...")
    
    review_id = "review_001"
    response = requests.get(f"{BASE_URL}/reviews/{review_id}")
    print(f"Get Review Response: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2, default=str)}")
    
    return response.status_code == 200

def test_update_review():
    """Test updating a review"""
    print("\nTesting review update...")
    
    user_id = "user_002"  # Bob (Student)
    token = MOCK_TOKENS[user_id]
    headers = {"Authorization": f"Bearer {token}"}
    
    review_id = "review_001"  # Bob's review
    update_data = {
        "rating": 5,
        "comment": "Updated review: This course exceeded all my expectations! The instructor is amazing and the content is top-notch. Highly recommended!"
    }
    
    response = requests.put(f"{BASE_URL}/reviews/{review_id}/update", json=update_data, headers=headers)
    print(f"Update Review Response: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2, default=str)}")
    
    return response.status_code == 200

def test_mark_helpful():
    """Test marking a review as helpful"""
    print("\nTesting mark review as helpful...")
    
    user_id = "user_005"  # Emma (Student)
    token = MOCK_TOKENS[user_id]
    headers = {"Authorization": f"Bearer {token}"}
    
    review_id = "review_001"  # Bob's review
    helpful_data = {"helpful": True}
    
    response = requests.put(f"{BASE_URL}/reviews/{review_id}/helpful", json=helpful_data, headers=headers)
    print(f"Mark Helpful Response: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2, default=str)}")
    
    return response.status_code == 200

def test_get_rating_stats():
    """Test getting course rating statistics"""
    print("\nTesting course rating statistics...")
    
    course_id = "course_001"
    response = requests.get(f"{BASE_URL}/courses/{course_id}/rating-stats")
    print(f"Rating Stats Response: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2, default=str)}")
    
    return response.status_code == 200

def test_get_user_reviews():
    """Test getting reviews by a specific user"""
    print("\nTesting get user reviews...")
    
    user_id = "user_002"  # Bob's reviews
    response = requests.get(f"{BASE_URL}/reviews/user/{user_id}")
    print(f"User Reviews Response: {response.status_code}")
    
    if response.status_code == 200:
        data = response.json()
        print(f"Total reviews by user: {data['total']}")
        print(f"User name: {data['user_name']}")
    
    return response.status_code == 200

def test_get_top_rated_courses():
    """Test getting top-rated courses"""
    print("\nTesting top-rated courses...")
    
    response = requests.get(f"{BASE_URL}/reviews/top-rated?limit=5")
    print(f"Top Rated Courses Response: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2, default=str)}")
    
    return response.status_code == 200

def test_delete_review(review_id):
    """Test deleting a review"""
    print(f"\nTesting review deletion for {review_id}...")
    
    user_id = "user_002"  # Bob (Student) - owner of the review
    token = MOCK_TOKENS[user_id]
    headers = {"Authorization": f"Bearer {token}"}
    
    response = requests.delete(f"{BASE_URL}/reviews/{review_id}", headers=headers)
    print(f"Delete Review Response: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2, default=str)}")
    
    return response.status_code == 200

def test_unauthorized_scenarios():
    """Test various unauthorized access scenarios"""
    print("\nTesting unauthorized scenarios...")
    
    # Try to create review without token
    review_data = {"course_id": "course_001", "rating": 5, "comment": "Unauthorized review"}
    response = requests.post(f"{BASE_URL}/reviews/create", json=review_data)
    print(f"Unauthorized Review Creation: {response.status_code}")
    
    # Try to review own course (instructor reviewing their own course)
    instructor_token = MOCK_TOKENS["user_001"]  # Alice (Instructor of course_001)
    headers = {"Authorization": f"Bearer {instructor_token}"}
    review_data = {"course_id": "course_001", "rating": 5, "comment": "Self review"}
    
    response = requests.post(f"{BASE_URL}/reviews/create", json=review_data, headers=headers)
    print(f"Self Course Review: {response.status_code}")
    
    # Try to update someone else's review
    other_user_token = MOCK_TOKENS["user_005"]  # Emma trying to update Bob's review
    headers = {"Authorization": f"Bearer {other_user_token}"}
    update_data = {"rating": 1, "comment": "Hacked review"}
    
    response = requests.put(f"{BASE_URL}/reviews/review_001/update", json=update_data, headers=headers)
    print(f"Unauthorized Review Update: {response.status_code}")
    
    # Try to create duplicate review
    student_token = MOCK_TOKENS["user_002"]  # Bob trying to review course_001 again
    headers = {"Authorization": f"Bearer {student_token}"}
    review_data = {"course_id": "course_001", "rating": 3, "comment": "Duplicate review"}
    
    response = requests.post(f"{BASE_URL}/reviews/create", json=review_data, headers=headers)
    print(f"Duplicate Review Creation: {response.status_code}")
    
    return response.status_code in [400, 401, 403]  # Should be bad request, unauthorized, or forbidden

def test_invalid_data():
    """Test invalid data scenarios"""
    print("\nTesting invalid data scenarios...")
    
    user_id = "user_002"
    token = MOCK_TOKENS[user_id]
    headers = {"Authorization": f"Bearer {token}"}
    
    # Invalid rating (out of range)
    review_data = {"course_id": "course_002", "rating": 6, "comment": "Invalid rating"}
    response = requests.post(f"{BASE_URL}/reviews/create", json=review_data, headers=headers)
    print(f"Invalid Rating (6): {response.status_code}")
    
    # Invalid rating (negative)
    review_data = {"course_id": "course_002", "rating": -1, "comment": "Negative rating"}
    response = requests.post(f"{BASE_URL}/reviews/create", json=review_data, headers=headers)
    print(f"Invalid Rating (-1): {response.status_code}")
    
    # Non-existent course
    review_data = {"course_id": "course_999", "rating": 4, "comment": "Non-existent course"}
    response = requests.post(f"{BASE_URL}/reviews/create", json=review_data, headers=headers)
    print(f"Non-existent Course: {response.status_code}")
    
    return response.status_code in [400, 404]  # Should be bad request or not found

if __name__ == "__main__":
    print("Starting Course Reviews and Ratings API Tests")
    print("=" * 60)
    
    # Create a new review and get its ID for testing
    new_review_id = test_create_review()
    
    tests = [
        ("Get Course Reviews", test_get_course_reviews),
        ("Get Specific Review", test_get_review),
        ("Update Review", test_update_review),
        ("Mark Review Helpful", test_mark_helpful),
        ("Get Rating Statistics", test_get_rating_stats),
        ("Get User Reviews", test_get_user_reviews),
        ("Get Top Rated Courses", test_get_top_rated_courses),
        ("Unauthorized Scenarios", test_unauthorized_scenarios),
        ("Invalid Data Scenarios", test_invalid_data)
    ]
    
    results = []
    for test_name, test_func in tests:
        try:
            result = test_func()
            results.append((test_name, "PASS" if result else "FAIL"))
        except Exception as e:
            print(f"Error in {test_name}: {e}")
            results.append((test_name, "ERROR"))
    
    # Test deletion with the newly created review
    if new_review_id:
        try:
            delete_result = test_delete_review(new_review_id)
            results.append(("Delete Review", "PASS" if delete_result else "FAIL"))
        except Exception as e:
            print(f"Error in Delete Review: {e}")
            results.append(("Delete Review", "ERROR"))
    
    print("\n" + "=" * 60)
    print("Test Results Summary:")
    print("=" * 60)
    for test_name, status in results:
        print(f"{test_name:<25} {status}")
    
    print("\n" + "=" * 60)
    print("Tests completed!")
    print("\nTo run the service:")
    print("python reviews_service.py")
    print("\nAPI Documentation available at:")
    print("http://localhost:8004/docs")