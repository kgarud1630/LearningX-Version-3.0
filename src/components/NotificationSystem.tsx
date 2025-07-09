import React, { useState, useEffect } from 'react';
import { 
  Bell, X, Check, Info, AlertTriangle, CheckCircle, 
  Mail, MessageCircle, Award, BookOpen, DollarSign,
  Settings, Volume2, VolumeX, Smartphone, Monitor
} from 'lucide-react';

const NotificationSystem = () => {
  const [notifications, setNotifications] = useState([]);
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState({
    email: {
      courseUpdates: true,
      assignments: true,
      messages: true,
      marketing: false,
      achievements: true
    },
    push: {
      courseUpdates: true,
      assignments: true,
      messages: true,
      marketing: false,
      achievements: true
    },
    inApp: {
      courseUpdates: true,
      assignments: true,
      messages: true,
      marketing: true,
      achievements: true
    }
  });

  // Mock notifications data
  const mockNotifications = [
    {
      id: 1,
      type: 'course_update',
      title: 'New lesson available',
      message: 'Advanced React Patterns - Lesson 12 is now available',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      read: false,
      icon: BookOpen,
      color: 'blue',
      actionUrl: '/course/react-advanced/lesson-12'
    },
    {
      id: 2,
      type: 'assignment',
      title: 'Assignment due soon',
      message: 'JavaScript Fundamentals Quiz is due in 2 hours',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      read: false,
      icon: AlertTriangle,
      color: 'orange',
      actionUrl: '/assignment/js-quiz'
    },
    {
      id: 3,
      type: 'achievement',
      title: 'Achievement unlocked!',
      message: 'You earned the "Fast Learner" badge',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      read: true,
      icon: Award,
      color: 'yellow',
      actionUrl: '/profile/achievements'
    },
    {
      id: 4,
      type: 'message',
      title: 'New message from instructor',
      message: 'Sarah Johnson replied to your question',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      read: true,
      icon: MessageCircle,
      color: 'green',
      actionUrl: '/messages/sarah-johnson'
    },
    {
      id: 5,
      type: 'payment',
      title: 'Payment successful',
      message: 'Your enrollment in "Data Science Bootcamp" is confirmed',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      read: true,
      icon: DollarSign,
      color: 'green',
      actionUrl: '/course/data-science-bootcamp'
    }
  ];

  useEffect(() => {
    setNotifications(mockNotifications);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const removeNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now - timestamp) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  const getNotificationColor = (color) => {
    const colors = {
      blue: 'text-blue-600 bg-blue-100',
      green: 'text-green-600 bg-green-100',
      yellow: 'text-yellow-600 bg-yellow-100',
      orange: 'text-orange-600 bg-orange-100',
      red: 'text-red-600 bg-red-100',
      purple: 'text-purple-600 bg-purple-100'
    };
    return colors[color] || colors.blue;
  };

  const handleSettingChange = (category, setting, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value
      }
    }));
  };

  // Notification Toast Component
  const NotificationToast = ({ notification, onClose }) => (
    <div className="fixed top-4 right-4 bg-white rounded-xl shadow-lg border border-gray-200 p-4 max-w-sm z-50 animate-slide-in">
      <div className="flex items-start space-x-3">
        <div className={`p-2 rounded-lg ${getNotificationColor(notification.color)}`}>
          <notification.icon className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900 text-sm">{notification.title}</h4>
          <p className="text-gray-600 text-sm mt-1">{notification.message}</p>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );

  // Settings Modal
  const SettingsModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-semibold text-gray-900">Notification Settings</h3>
          <button
            onClick={() => setShowSettings(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="space-y-8">
          {/* Email Notifications */}
          <div>
            <div className="flex items-center mb-4">
              <Mail className="h-5 w-5 text-blue-600 mr-2" />
              <h4 className="text-lg font-semibold text-gray-900">Email Notifications</h4>
            </div>
            <div className="space-y-3">
              {Object.entries(settings.email).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="text-gray-700 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                  <button
                    onClick={() => handleSettingChange('email', key, !value)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      value ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        value ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Push Notifications */}
          <div>
            <div className="flex items-center mb-4">
              <Smartphone className="h-5 w-5 text-green-600 mr-2" />
              <h4 className="text-lg font-semibold text-gray-900">Push Notifications</h4>
            </div>
            <div className="space-y-3">
              {Object.entries(settings.push).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="text-gray-700 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                  <button
                    onClick={() => handleSettingChange('push', key, !value)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      value ? 'bg-green-600' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        value ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* In-App Notifications */}
          <div>
            <div className="flex items-center mb-4">
              <Monitor className="h-5 w-5 text-purple-600 mr-2" />
              <h4 className="text-lg font-semibold text-gray-900">In-App Notifications</h4>
            </div>
            <div className="space-y-3">
              {Object.entries(settings.inApp).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="text-gray-700 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                  <button
                    onClick={() => handleSettingChange('inApp', key, !value)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      value ? 'bg-purple-600' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        value ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4 mt-8">
          <button
            onClick={() => setShowSettings(false)}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => setShowSettings(false)}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative">
      {/* Notification Bell */}
      <div className="relative">
        <button className="relative p-2 text-gray-600 hover:text-gray-800 transition-colors">
          <Bell className="h-6 w-6" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </button>
      </div>

      {/* Notification Dropdown */}
      <div className="absolute right-0 mt-2 w-96 bg-white rounded-2xl shadow-xl border border-gray-200 z-40">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
            <div className="flex items-center space-x-2">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  Mark all read
                </button>
              )}
              <button
                onClick={() => setShowSettings(true)}
                className="text-gray-400 hover:text-gray-600"
              >
                <Settings className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div className="max-h-96 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-8 text-center">
              <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No notifications yet</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 hover:bg-gray-50 transition-colors ${
                    !notification.read ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg ${getNotificationColor(notification.color)}`}>
                      <notification.icon className="h-4 w-4" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className={`text-sm font-medium ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                          {notification.title}
                        </h4>
                        <div className="flex items-center space-x-1">
                          {!notification.read && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className="text-blue-600 hover:text-blue-700"
                            >
                              <Check className="h-4 w-4" />
                            </button>
                          )}
                          <button
                            onClick={() => removeNotification(notification.id)}
                            className="text-gray-400 hover:text-gray-600"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                      
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-gray-500">
                          {formatTimeAgo(notification.timestamp)}
                        </span>
                        {notification.actionUrl && (
                          <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                            View →
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <button className="w-full text-center text-blue-600 hover:text-blue-700 font-medium">
            View All Notifications
          </button>
        </div>
      </div>

      {/* Settings Modal */}
      {showSettings && <SettingsModal />}

      {/* Add custom CSS for animations */}
      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default NotificationSystem;