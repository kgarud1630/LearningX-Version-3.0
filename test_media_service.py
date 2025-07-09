import requests
import json

# Base URL for the Media API
BASE_URL = "http://localhost:8003"

# Mock authentication tokens for testing
MOCK_TOKENS = {
    "instructor_001": "mock_token_instructor_001",  # Alice
    "instructor_002": "mock_token_instructor_002",  # Bob
    "instructor_003": "mock_token_instructor_003",  # Carol
    "instructor_004": "mock_token_instructor_004",  # David
}

def test_add_video():
    """Test adding a video to a course"""
    print("Testing video upload...")
    
    instructor_id = "instructor_001"
    token = MOCK_TOKENS[instructor_id]
    headers = {"Authorization": f"Bearer {token}"}
    
    course_id = "course_001"
    video_data = {
        "title": "CSS Fundamentals",
        "description": "Learn the basics of CSS styling and layout",
        "video_url": "https://www.youtube.com/watch?v=1PnVor36_40",
        "provider": "youtube",
        "duration_minutes": 35,
        "thumbnail_url": "https://img.youtube.com/vi/1PnVor36_40/maxresdefault.jpg"
    }
    
    response = requests.post(f"{BASE_URL}/course/{course_id}/add-video", json=video_data, headers=headers)
    print(f"Add Video Response: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2, default=str)}")
    
    if response.status_code == 200:
        return response.json()["media_id"]
    return None

def test_add_document():
    """Test adding a document to a course"""
    print("\nTesting document upload...")
    
    instructor_id = "instructor_001"
    token = MOCK_TOKENS[instructor_id]
    headers = {"Authorization": f"Bearer {token}"}
    
    course_id = "course_001"
    document_data = {
        "title": "CSS Reference Guide",
        "description": "Comprehensive CSS properties and selectors reference",
        "document_url": "https://example.com/documents/css-reference.pdf",
        "document_type": "pdf",
        "file_size_mb": 3.2
    }
    
    response = requests.post(f"{BASE_URL}/course/{course_id}/add-document", json=document_data, headers=headers)
    print(f"Add Document Response: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2, default=str)}")
    
    if response.status_code == 200:
        return response.json()["media_id"]
    return None

def test_add_quiz():
    """Test adding a quiz to a course"""
    print("\nTesting quiz upload...")
    
    instructor_id = "instructor_001"
    token = MOCK_TOKENS[instructor_id]
    headers = {"Authorization": f"Bearer {token}"}
    
    course_id = "course_001"
    quiz_data = {
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
                "correct_answer": True,
                "explanation": "CSS indeed stands for Cascading Style Sheets",
                "points": 1
            },
            {
                "question_id": "css_q3",
                "question_text": "What does the 'margin' property control?",
                "question_type": "short_answer",
                "correct_answer": "space outside the element border",
                "explanation": "Margin controls the space outside an element's border",
                "points": 3
            }
        ]
    }
    
    response = requests.post(f"{BASE_URL}/course/{course_id}/add-quiz", json=quiz_data, headers=headers)
    print(f"Add Quiz Response: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2, default=str)}")
    
    if response.status_code == 200:
        return response.json()["media_id"]
    return None

def test_get_course_media():
    """Test getting all media for a course"""
    print("\nTesting get course media...")
    
    course_id = "course_001"
    response = requests.get(f"{BASE_URL}/course/{course_id}/media")
    print(f"Get Course Media Response: {response.status_code}")
    
    if response.status_code == 200:
        data = response.json()
        print(f"Total Videos: {data['total_videos']}")
        print(f"Total Documents: {data['total_documents']}")
        print(f"Total Quizzes: {data['total_quizzes']}")
        print(f"Total Duration: {data['total_duration_minutes']} minutes")
        print(f"Media Items: {len(data['media_items'])}")
    
    return response.status_code == 200

def test_get_media_item():
    """Test getting a specific media item"""
    print("\nTesting get media item...")
    
    media_id = "media_001"
    response = requests.get(f"{BASE_URL}/media/{media_id}")
    print(f"Get Media Item Response: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2, default=str)}")
    
    return response.status_code == 200

def test_update_media_item():
    """Test updating a media item"""
    print("\nTesting media item update...")
    
    instructor_id = "instructor_001"
    token = MOCK_TOKENS[instructor_id]
    headers = {"Authorization": f"Bearer {token}"}
    
    media_id = "media_001"
    update_data = {
        "title": "Introduction to HTML (Updated)",
        "description": "Updated description: Learn the fundamentals of HTML structure, syntax, and best practices",
        "order_index": 5
    }
    
    response = requests.put(f"{BASE_URL}/media/{media_id}/update", params=update_data, headers=headers)
    print(f"Update Media Response: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2, default=str)}")
    
    return response.status_code == 200

def test_reorder_media():
    """Test reordering media items in a course"""
    print("\nTesting media reordering...")
    
    instructor_id = "instructor_001"
    token = MOCK_TOKENS[instructor_id]
    headers = {"Authorization": f"Bearer {token}"}
    
    course_id = "course_001"
    
    # First get current media to know the IDs
    response = requests.get(f"{BASE_URL}/course/{course_id}/media")
    if response.status_code == 200:
        media_items = response.json()["media_items"]
        media_ids = [item["media_id"] for item in media_items]
        
        # Reverse the order for testing
        new_order = list(reversed(media_ids))
        
        response = requests.put(f"{BASE_URL}/course/{course_id}/reorder-media", json=new_order, headers=headers)
        print(f"Reorder Media Response: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2, default=str)}")
        
        return response.status_code == 200
    
    return False

def test_delete_media_item(media_id):
    """Test deleting a media item"""
    print(f"\nTesting media deletion for {media_id}...")
    
    instructor_id = "instructor_001"
    token = MOCK_TOKENS[instructor_id]
    headers = {"Authorization": f"Bearer {token}"}
    
    response = requests.delete(f"{BASE_URL}/media/{media_id}", headers=headers)
    print(f"Delete Media Response: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2, default=str)}")
    
    return response.status_code == 200

def test_get_metadata():
    """Test getting metadata endpoints"""
    print("\nTesting metadata endpoints...")
    
    # Test media types
    response = requests.get(f"{BASE_URL}/media-types")
    print(f"Media Types Response: {response.status_code}")
    print(f"Available media types: {len(response.json().get('media_types', []))}")
    
    # Test video providers
    response = requests.get(f"{BASE_URL}/video-providers")
    print(f"Video Providers Response: {response.status_code}")
    print(f"Available providers: {len(response.json().get('providers', []))}")
    
    # Test document types
    response = requests.get(f"{BASE_URL}/document-types")
    print(f"Document Types Response: {response.status_code}")
    print(f"Available document types: {len(response.json().get('document_types', []))}")
    
    # Test question types
    response = requests.get(f"{BASE_URL}/question-types")
    print(f"Question Types Response: {response.status_code}")
    print(f"Available question types: {len(response.json().get('question_types', []))}")
    
    return response.status_code == 200

def test_unauthorized_access():
    """Test unauthorized access scenarios"""
    print("\nTesting unauthorized access...")
    
    # Try to add video without token
    video_data = {
        "title": "Unauthorized Video",
        "video_url": "https://youtube.com/watch?v=test",
        "provider": "youtube"
    }
    response = requests.post(f"{BASE_URL}/course/course_001/add-video", json=video_data)
    print(f"Unauthorized Video Upload: {response.status_code}")
    
    # Try to add media to someone else's course
    instructor_token = MOCK_TOKENS["instructor_002"]  # Bob trying to add to Alice's course
    headers = {"Authorization": f"Bearer {instructor_token}"}
    
    response = requests.post(f"{BASE_URL}/course/course_001/add-video", json=video_data, headers=headers)
    print(f"Unauthorized Course Access: {response.status_code}")
    
    return response.status_code in [401, 403]  # Should be unauthorized or forbidden

if __name__ == "__main__":
    print("Starting Course Media Management API Tests")
    print("=" * 60)
    
    # Test adding different media types
    new_video_id = test_add_video()
    new_document_id = test_add_document()
    new_quiz_id = test_add_quiz()
    
    tests = [
        ("Get Course Media", test_get_course_media),
        ("Get Media Item", test_get_media_item),
        ("Update Media Item", test_update_media_item),
        ("Reorder Media", test_reorder_media),
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
    
    # Test deletion with newly created media
    if new_video_id:
        try:
            delete_result = test_delete_media_item(new_video_id)
            results.append(("Delete Video", "PASS" if delete_result else "FAIL"))
        except Exception as e:
            print(f"Error in Delete Video: {e}")
            results.append(("Delete Video", "ERROR"))
    
    print("\n" + "=" * 60)
    print("Test Results Summary:")
    print("=" * 60)
    for test_name, status in results:
        print(f"{test_name:<25} {status}")
    
    print("\n" + "=" * 60)
    print("Tests completed!")
    print("\nTo run the service:")
    print("python media_service.py")
    print("\nAPI Documentation available at:")
    print("http://localhost:8003/docs")