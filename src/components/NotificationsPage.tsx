import React, { useState } from 'react';
import { 
  Bell, BellOff, Check, X, Star, MessageCircle, Award, 
  BookOpen, Users, Calendar, Settings, Filter, MoreVertical,
  Clock, CheckCircle, AlertCircle, Info
} from 'lucide-react';

const NotificationsPage = () => {
  const [filter, setFilter] = useState('all');
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'course_completion',
      title: 'Course Completed!',
      message: 'Congratulations! You\'ve completed "React Fundamentals"',
      time: '2 minutes ago',
      read: false,
      icon: Award,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      id: 2,
      type: 'new_message',
      title: 'New Message',
      message: 'Sarah Johnson replied to your question in "Advanced JavaScript"',
      time: '15 minutes ago',
      read: false,
      icon: MessageCircle,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      id: 3,
      type: 'assignment_due',
      title: 'Assignment Due Soon',
      message: 'React Component Project is due in 2 days',
      time: '1 hour ago',
      read: false,
      icon: AlertCircle,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    },
    {
      id: 4,
      type: 'live_class',
      title: 'Live Class Starting',
      message: 'Advanced React Patterns starts in 30 minutes',
      time: '2 hours ago',
      read: true,
      icon: Calendar,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      id: 5,
      type: 'achievement',
      title: 'New Badge Earned!',
      message: 'You earned the "Speed Learner" badge',
      time: '3 hours ago',
      read: true,
      icon: Star,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    },
    {
      id: 6,
      type: 'course_update',
      title: 'Course Updated',
      message: 'New lesson added to "Web Development Bootcamp"',
      time: '5 hours ago',
      read: true,
      icon: BookOpen,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100'
    },
    {
      id: 7,
      type: 'forum_reply',
      title: 'Forum Reply',
      message: 'Someone replied to your post in the JavaScript forum',
      time: '1 day ago',
      read: true,
      icon: Users,
      color: 'text-gray-600',
      bgColor: 'bg-gray-100'
    },
    {
      id: 8,
      type: 'system',
      title: 'System Update',
      message: 'New features have been added to the platform',
      time: '2 days ago',
      read: true,
      icon: Info,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    }
  ]);

  const filterOptions = [
    { value: 'all', label: 'All Notifications', count: notifications.length },
    { value: 'unread', label: 'Unread', count: notifications.filter(n => !n.read).length },
    { value: 'course_completion', label: 'Achievements', count: notifications.filter(n => n.type === 'course_completion' || n.type === 'achievement').length },
    { value: 'messages', label: 'Messages', count: notifications.filter(n => n.type === 'new_message' || n.type === 'forum_reply').length },
    { value: 'assignments', label: 'Assignments', count: notifications.filter(n => n.type === 'assignment_due').length },
    { value: 'live_class', label: 'Live Classes', count: notifications.filter(n => n.type === 'live_class').length }
  ];

  const getFilteredNotifications = () => {
    switch (filter) {
      case 'unread':
        return notifications.filter(n => !n.read);
      case 'course_completion':
        return notifications.filter(n => n.type === 'course_completion' || n.type === 'achievement');
      case 'messages':
        return notifications.filter(n => n.type === 'new_message' || n.type === 'forum_reply');
      case 'assignments':
        return notifications.filter(n => n.type === 'assignment_due');
      case 'live_class':
        return notifications.filter(n => n.type === 'live_class');
      default:
        return notifications;
    }
  };

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.read).length;
  const filteredNotifications = getFilteredNotifications();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="relative">
                <Bell className="h-8 w-8 text-blue-600 mr-3" />
                {unreadCount > 0 && (
                  <div className="absolute -top-2 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {unreadCount}
                  </div>
                )}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
                <p className="text-gray-600">Stay updated with your learning progress</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Mark All Read
                </button>
              )}
              <button className="text-gray-400 hover:text-gray-600 p-2">
                <Settings className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 rounded-xl p-4">
              <div className="text-2xl font-bold text-blue-600">{notifications.length}</div>
              <div className="text-blue-700 text-sm">Total</div>
            </div>
            <div className="bg-red-50 rounded-xl p-4">
              <div className="text-2xl font-bold text-red-600">{unreadCount}</div>
              <div className="text-red-700 text-sm">Unread</div>
            </div>
            <div className="bg-green-50 rounded-xl p-4">
              <div className="text-2xl font-bold text-green-600">
                {notifications.filter(n => n.type === 'course_completion' || n.type === 'achievement').length}
              </div>
              <div className="text-green-700 text-sm">Achievements</div>
            </div>
            <div className="bg-purple-50 rounded-xl p-4">
              <div className="text-2xl font-bold text-purple-600">
                {notifications.filter(n => n.type === 'live_class').length}
              </div>
              <div className="text-purple-700 text-sm">Live Classes</div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Filter Notifications</h3>
            <Filter className="h-5 w-5 text-gray-400" />
          </div>
          
          <div className="flex flex-wrap gap-2">
            {filterOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setFilter(option.value)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center ${
                  filter === option.value
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {option.label}
                {option.count > 0 && (
                  <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                    filter === option.value
                      ? 'bg-white bg-opacity-20'
                      : 'bg-gray-300'
                  }`}>
                    {option.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <BellOff className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No notifications</h3>
              <p className="text-gray-600">You're all caught up! Check back later for updates.</p>
            </div>
          ) : (
            filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`bg-white rounded-2xl shadow-lg p-6 transition-all hover:shadow-xl ${
                  !notification.read ? 'border-l-4 border-blue-500' : ''
                }`}
              >
                <div className="flex items-start space-x-4">
                  {/* Icon */}
                  <div className={`flex-shrink-0 w-12 h-12 rounded-full ${notification.bgColor} flex items-center justify-center`}>
                    <notification.icon className={`h-6 w-6 ${notification.color}`} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className={`text-lg font-semibold ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                          {notification.title}
                        </h4>
                        <p className="text-gray-600 mt-1">{notification.message}</p>
                        <div className="flex items-center mt-3 text-sm text-gray-500">
                          <Clock className="h-4 w-4 mr-1" />
                          {notification.time}
                          {!notification.read && (
                            <span className="ml-3 bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                              New
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center space-x-2 ml-4">
                        {!notification.read && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="text-blue-600 hover:text-blue-700 p-1"
                            title="Mark as read"
                          >
                            <Check className="h-4 w-4" />
                          </button>
                        )}
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className="text-red-600 hover:text-red-700 p-1"
                          title="Delete notification"
                        >
                          <X className="h-4 w-4" />
                        </button>
                        <button className="text-gray-400 hover:text-gray-600 p-1">
                          <MoreVertical className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Load More */}
        {filteredNotifications.length > 0 && (
          <div className="text-center mt-8">
            <button className="bg-gray-600 text-white px-8 py-3 rounded-xl hover:bg-gray-700 transition-colors font-semibold">
              Load More Notifications
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;