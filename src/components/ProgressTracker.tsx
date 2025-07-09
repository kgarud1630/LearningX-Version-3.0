import React, { useState } from 'react';
import { 
  BookOpen, Clock, CheckCircle, Play, Award, TrendingUp, 
  Calendar, Target, BarChart3, Star, Trophy, Zap
} from 'lucide-react';

const ProgressTracker = () => {
  const [selectedCourse, setSelectedCourse] = useState('course_001');

  const enrolledCourses = [
    {
      id: 'course_001',
      title: 'Complete Web Development Bootcamp',
      instructor: 'Sarah Johnson',
      progress: 68,
      completedLessons: 34,
      totalLessons: 50,
      timeSpent: 42,
      estimatedTime: 52,
      lastAccessed: '2024-01-25',
      nextLesson: 'Advanced JavaScript Concepts',
      image: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: 'course_002',
      title: 'Data Science with Python',
      instructor: 'Michael Chen',
      progress: 45,
      completedLessons: 18,
      totalLessons: 40,
      timeSpent: 28,
      estimatedTime: 48,
      lastAccessed: '2024-01-23',
      nextLesson: 'Machine Learning Basics',
      image: 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: 'course_003',
      title: 'UI/UX Design Fundamentals',
      instructor: 'Emily Rodriguez',
      progress: 90,
      completedLessons: 32,
      totalLessons: 36,
      timeSpent: 34,
      estimatedTime: 36,
      lastAccessed: '2024-01-24',
      nextLesson: 'Final Project Review',
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=300'
    }
  ];

  const selectedCourseData = enrolledCourses.find(course => course.id === selectedCourse);

  const weeklyProgress = [
    { day: 'Mon', hours: 2.5, lessons: 3 },
    { day: 'Tue', hours: 1.8, lessons: 2 },
    { day: 'Wed', hours: 3.2, lessons: 4 },
    { day: 'Thu', hours: 0, lessons: 0 },
    { day: 'Fri', hours: 2.1, lessons: 2 },
    { day: 'Sat', hours: 4.5, lessons: 6 },
    { day: 'Sun', hours: 1.5, lessons: 1 }
  ];

  const achievements = [
    { id: 1, title: 'First Course Started', icon: '🎯', earned: true, date: '2024-01-10' },
    { id: 2, title: 'Week Streak', icon: '🔥', earned: true, date: '2024-01-17' },
    { id: 3, title: 'Fast Learner', icon: '⚡', earned: true, date: '2024-01-20' },
    { id: 4, title: 'Course Completed', icon: '🏆', earned: false, progress: 90 },
    { id: 5, title: 'Quiz Master', icon: '🧠', earned: false, progress: 75 },
    { id: 6, title: 'Dedicated Student', icon: '📚', earned: false, progress: 60 }
  ];

  const upcomingDeadlines = [
    { title: 'JavaScript Quiz', course: 'Web Development', dueDate: '2024-01-28', type: 'quiz' },
    { title: 'Final Project', course: 'UI/UX Design', dueDate: '2024-01-30', type: 'project' },
    { title: 'Data Analysis Assignment', course: 'Data Science', dueDate: '2024-02-02', type: 'assignment' }
  ];

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 60) return 'bg-blue-500';
    if (progress >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Learning Progress</h1>
              <p className="text-gray-600">Track your learning journey and achievements</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">3</div>
                <div className="text-sm text-gray-600">Active Courses</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">68%</div>
                <div className="text-sm text-gray-600">Avg Progress</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">104h</div>
                <div className="text-sm text-gray-600">Total Time</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Course Selection */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Your Courses</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {enrolledCourses.map((course) => (
                  <button
                    key={course.id}
                    onClick={() => setSelectedCourse(course.id)}
                    className={`p-4 rounded-xl border-2 transition-all text-left ${
                      selectedCourse === course.id 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-24 object-cover rounded-lg mb-3"
                    />
                    <h4 className="font-medium text-gray-900 text-sm mb-2">{course.title}</h4>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-600">{course.progress}% complete</span>
                      <span className="text-xs text-gray-600">{course.completedLessons}/{course.totalLessons}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(course.progress)}`}
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Detailed Course Progress */}
            {selectedCourseData && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-900">{selectedCourseData.title}</h3>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                    <Play className="h-4 w-4 mr-2" />
                    Continue Learning
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                  <div className="bg-blue-50 rounded-xl p-4">
                    <div className="flex items-center mb-2">
                      <BarChart3 className="h-5 w-5 text-blue-600 mr-2" />
                      <span className="text-sm text-blue-700">Progress</span>
                    </div>
                    <div className="text-2xl font-bold text-blue-600">{selectedCourseData.progress}%</div>
                  </div>

                  <div className="bg-green-50 rounded-xl p-4">
                    <div className="flex items-center mb-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                      <span className="text-sm text-green-700">Completed</span>
                    </div>
                    <div className="text-2xl font-bold text-green-600">
                      {selectedCourseData.completedLessons}/{selectedCourseData.totalLessons}
                    </div>
                  </div>

                  <div className="bg-purple-50 rounded-xl p-4">
                    <div className="flex items-center mb-2">
                      <Clock className="h-5 w-5 text-purple-600 mr-2" />
                      <span className="text-sm text-purple-700">Time Spent</span>
                    </div>
                    <div className="text-2xl font-bold text-purple-600">{selectedCourseData.timeSpent}h</div>
                  </div>

                  <div className="bg-orange-50 rounded-xl p-4">
                    <div className="flex items-center mb-2">
                      <Target className="h-5 w-5 text-orange-600 mr-2" />
                      <span className="text-sm text-orange-700">Remaining</span>
                    </div>
                    <div className="text-2xl font-bold text-orange-600">
                      {selectedCourseData.estimatedTime - selectedCourseData.timeSpent}h
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">Next Lesson</h4>
                      <p className="text-gray-600">{selectedCourseData.nextLesson}</p>
                    </div>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      Start Now
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Weekly Activity */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Weekly Activity</h3>
              <div className="grid grid-cols-7 gap-4">
                {weeklyProgress.map((day, index) => (
                  <div key={index} className="text-center">
                    <div className="text-sm text-gray-600 mb-2">{day.day}</div>
                    <div className="bg-gray-200 rounded-lg h-24 flex items-end justify-center p-2">
                      <div 
                        className="bg-blue-500 rounded w-full transition-all duration-300"
                        style={{ height: `${(day.hours / 5) * 100}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-2">{day.hours}h</div>
                    <div className="text-xs text-gray-500">{day.lessons} lessons</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Achievements */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Trophy className="h-5 w-5 mr-2 text-yellow-500" />
                Achievements
              </h3>
              <div className="space-y-3">
                {achievements.map((achievement) => (
                  <div 
                    key={achievement.id} 
                    className={`flex items-center p-3 rounded-lg ${
                      achievement.earned ? 'bg-yellow-50 border border-yellow-200' : 'bg-gray-50'
                    }`}
                  >
                    <div className="text-2xl mr-3">{achievement.icon}</div>
                    <div className="flex-1">
                      <div className={`font-medium ${achievement.earned ? 'text-yellow-800' : 'text-gray-600'}`}>
                        {achievement.title}
                      </div>
                      {achievement.earned ? (
                        <div className="text-xs text-yellow-600">Earned {achievement.date}</div>
                      ) : (
                        <div className="text-xs text-gray-500">{achievement.progress}% progress</div>
                      )}
                    </div>
                    {achievement.earned && (
                      <CheckCircle className="h-5 w-5 text-yellow-600" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Deadlines */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-red-500" />
                Upcoming Deadlines
              </h3>
              <div className="space-y-3">
                {upcomingDeadlines.map((deadline, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900 text-sm">{deadline.title}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        deadline.type === 'quiz' ? 'bg-blue-100 text-blue-700' :
                        deadline.type === 'project' ? 'bg-green-100 text-green-700' :
                        'bg-purple-100 text-purple-700'
                      }`}>
                        {deadline.type}
                      </span>
                    </div>
                    <div className="text-xs text-gray-600 mb-1">{deadline.course}</div>
                    <div className="text-xs text-red-600 font-medium">Due: {deadline.dueDate}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Study Streak */}
            <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-6 text-white">
              <div className="flex items-center mb-4">
                <Zap className="h-6 w-6 mr-2" />
                <h3 className="text-lg font-semibold">Study Streak</h3>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">7 Days</div>
                <div className="text-orange-100">Keep it up! You're on fire! 🔥</div>
              </div>
            </div>

            {/* Learning Goals */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">This Week's Goals</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Complete 5 lessons</span>
                  <span className="text-green-600 font-medium">4/5</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '80%' }}></div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Study 10 hours</span>
                  <span className="text-blue-600 font-medium">8.5/10</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Take 2 quizzes</span>
                  <span className="text-purple-600 font-medium">1/2</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: '50%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;