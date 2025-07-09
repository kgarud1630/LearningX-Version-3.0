import React, { useState } from 'react';
import { 
  Users, BookOpen, DollarSign, TrendingUp, Eye, Settings,
  Calendar, Award, MessageCircle, AlertTriangle, CheckCircle,
  BarChart3, PieChart, Activity, Download, Filter, Search
} from 'lucide-react';

const AdminDashboard = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('7days');
  const [activeTab, setActiveTab] = useState('overview');

  const stats = {
    totalUsers: 15420,
    totalCourses: 156,
    totalRevenue: 245680,
    activeUsers: 8934,
    newUsersToday: 47,
    coursesPublishedToday: 3,
    revenueToday: 2340,
    supportTickets: 12
  };

  const recentActivity = [
    { id: 1, type: 'user_signup', user: 'John Doe', action: 'signed up', time: '2 minutes ago', status: 'success' },
    { id: 2, type: 'course_published', user: 'Sarah Johnson', action: 'published "Advanced React"', time: '15 minutes ago', status: 'success' },
    { id: 3, type: 'payment', user: 'Mike Chen', action: 'purchased course for $99', time: '23 minutes ago', status: 'success' },
    { id: 4, type: 'support_ticket', user: 'Emma Davis', action: 'opened support ticket', time: '1 hour ago', status: 'warning' },
    { id: 5, type: 'course_review', user: 'Alex Rodriguez', action: 'left 5-star review', time: '2 hours ago', status: 'success' }
  ];

  const topCourses = [
    { id: 1, title: 'Complete Web Development Bootcamp', students: 15420, revenue: 45260, rating: 4.9 },
    { id: 2, title: 'Data Science with Python', students: 12350, revenue: 38450, rating: 4.8 },
    { id: 3, title: 'UI/UX Design Fundamentals', students: 9840, revenue: 29520, rating: 4.9 },
    { id: 4, title: 'Digital Marketing Mastery', students: 8900, revenue: 26700, rating: 4.7 },
    { id: 5, title: 'Advanced React Development', students: 6750, revenue: 33750, rating: 4.8 }
  ];

  const userGrowth = [
    { month: 'Jan', users: 1200, revenue: 18500 },
    { month: 'Feb', users: 1450, revenue: 22300 },
    { month: 'Mar', users: 1680, revenue: 25800 },
    { month: 'Apr', users: 1920, revenue: 29600 },
    { month: 'May', users: 2150, revenue: 33200 },
    { month: 'Jun', users: 2380, revenue: 36800 }
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case 'user_signup': return <Users className="h-4 w-4 text-green-600" />;
      case 'course_published': return <BookOpen className="h-4 w-4 text-blue-600" />;
      case 'payment': return <DollarSign className="h-4 w-4 text-green-600" />;
      case 'support_ticket': return <MessageCircle className="h-4 w-4 text-yellow-600" />;
      case 'course_review': return <Award className="h-4 w-4 text-purple-600" />;
      default: return <Activity className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'success': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
              <p className="text-gray-600">Monitor platform performance and manage operations</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <select
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              >
                <option value="24hours">Last 24 hours</option>
                <option value="7days">Last 7 days</option>
                <option value="30days">Last 30 days</option>
                <option value="90days">Last 90 days</option>
              </select>
              
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </button>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-100 p-3 rounded-xl">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <span className="text-green-600 text-sm font-medium">+12.5%</span>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{stats.totalUsers.toLocaleString()}</div>
            <div className="text-gray-600 text-sm">Total Users</div>
            <div className="text-xs text-gray-500 mt-2">+{stats.newUsersToday} today</div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-100 p-3 rounded-xl">
                <BookOpen className="h-6 w-6 text-green-600" />
              </div>
              <span className="text-green-600 text-sm font-medium">+8.3%</span>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{stats.totalCourses}</div>
            <div className="text-gray-600 text-sm">Total Courses</div>
            <div className="text-xs text-gray-500 mt-2">+{stats.coursesPublishedToday} published today</div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-purple-100 p-3 rounded-xl">
                <DollarSign className="h-6 w-6 text-purple-600" />
              </div>
              <span className="text-green-600 text-sm font-medium">+15.7%</span>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">${stats.totalRevenue.toLocaleString()}</div>
            <div className="text-gray-600 text-sm">Total Revenue</div>
            <div className="text-xs text-gray-500 mt-2">+${stats.revenueToday} today</div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-orange-100 p-3 rounded-xl">
                <TrendingUp className="h-6 w-6 text-orange-600" />
              </div>
              <span className="text-green-600 text-sm font-medium">+5.2%</span>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{stats.activeUsers.toLocaleString()}</div>
            <div className="text-gray-600 text-sm">Active Users</div>
            <div className="text-xs text-gray-500 mt-2">Last 30 days</div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-2xl shadow-lg mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'overview', label: 'Overview', icon: BarChart3 },
                { id: 'users', label: 'Users', icon: Users },
                { id: 'courses', label: 'Courses', icon: BookOpen },
                { id: 'revenue', label: 'Revenue', icon: DollarSign },
                { id: 'support', label: 'Support', icon: MessageCircle }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <tab.icon className="h-5 w-5 mr-2" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* User Growth Chart */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">User Growth</h3>
                  <div className="bg-gray-50 rounded-xl p-6">
                    <div className="flex items-end space-x-2 h-40">
                      {userGrowth.map((data, index) => (
                        <div key={index} className="flex-1 flex flex-col items-center">
                          <div 
                            className="bg-blue-500 rounded-t w-full transition-all duration-300"
                            style={{ height: `${(data.users / 2500) * 100}%` }}
                          ></div>
                          <div className="text-xs text-gray-600 mt-2">{data.month}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Revenue Chart */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trend</h3>
                  <div className="bg-gray-50 rounded-xl p-6">
                    <div className="flex items-end space-x-2 h-40">
                      {userGrowth.map((data, index) => (
                        <div key={index} className="flex-1 flex flex-col items-center">
                          <div 
                            className="bg-green-500 rounded-t w-full transition-all duration-300"
                            style={{ height: `${(data.revenue / 40000) * 100}%` }}
                          ></div>
                          <div className="text-xs text-gray-600 mt-2">{data.month}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Users Tab */}
            {activeTab === 'users' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">User Management</h3>
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <input
                        type="text"
                        placeholder="Search users..."
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      />
                    </div>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      Add User
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="bg-blue-50 rounded-xl p-4">
                    <div className="text-2xl font-bold text-blue-600">8,934</div>
                    <div className="text-blue-700">Active Users</div>
                  </div>
                  <div className="bg-green-50 rounded-xl p-4">
                    <div className="text-2xl font-bold text-green-600">1,247</div>
                    <div className="text-green-700">Instructors</div>
                  </div>
                  <div className="bg-purple-50 rounded-xl p-4">
                    <div className="text-2xl font-bold text-purple-600">47</div>
                    <div className="text-purple-700">New Today</div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <Users className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">User management interface would be implemented here</p>
                </div>
              </div>
            )}

            {/* Courses Tab */}
            {activeTab === 'courses' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Top Performing Courses</h3>
                <div className="space-y-4">
                  {topCourses.map((course, index) => (
                    <div key={course.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center space-x-4">
                        <div className="text-lg font-bold text-gray-600">#{index + 1}</div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{course.title}</h4>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span>{course.students.toLocaleString()} students</span>
                            <span>${course.revenue.toLocaleString()} revenue</span>
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-yellow-400 mr-1" />
                              {course.rating}
                            </div>
                          </div>
                        </div>
                      </div>
                      <button className="text-blue-600 hover:text-blue-700">
                        <Eye className="h-5 w-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Revenue Tab */}
            {activeTab === 'revenue' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Revenue Analytics</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-green-50 rounded-xl p-6">
                    <div className="text-2xl font-bold text-green-600">${stats.totalRevenue.toLocaleString()}</div>
                    <div className="text-green-700">Total Revenue</div>
                    <div className="text-sm text-green-600 mt-2">+15.7% from last month</div>
                  </div>
                  <div className="bg-blue-50 rounded-xl p-6">
                    <div className="text-2xl font-bold text-blue-600">$89.50</div>
                    <div className="text-blue-700">Average Order Value</div>
                    <div className="text-sm text-blue-600 mt-2">+8.3% from last month</div>
                  </div>
                  <div className="bg-purple-50 rounded-xl p-6">
                    <div className="text-2xl font-bold text-purple-600">2,847</div>
                    <div className="text-purple-700">Total Orders</div>
                    <div className="text-sm text-purple-600 mt-2">+12.1% from last month</div>
                  </div>
                </div>
              </div>
            )}

            {/* Support Tab */}
            {activeTab === 'support' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Support Tickets</h3>
                  <div className="flex items-center space-x-2">
                    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
                      {stats.supportTickets} Open
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-red-50 rounded-xl p-4">
                    <div className="text-xl font-bold text-red-600">12</div>
                    <div className="text-red-700 text-sm">Open</div>
                  </div>
                  <div className="bg-yellow-50 rounded-xl p-4">
                    <div className="text-xl font-bold text-yellow-600">8</div>
                    <div className="text-yellow-700 text-sm">In Progress</div>
                  </div>
                  <div className="bg-green-50 rounded-xl p-4">
                    <div className="text-xl font-bold text-green-600">156</div>
                    <div className="text-green-700 text-sm">Resolved</div>
                  </div>
                  <div className="bg-blue-50 rounded-xl p-4">
                    <div className="text-xl font-bold text-blue-600">2.4h</div>
                    <div className="text-blue-700 text-sm">Avg Response</div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">Support ticket management interface would be implemented here</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center space-x-4">
                  <div className="bg-white p-2 rounded-lg">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">
                      {activity.user} {activity.action}
                    </div>
                    <div className="text-sm text-gray-600">{activity.time}</div>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(activity.status)}`}>
                  {activity.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;