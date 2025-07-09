import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X, BookOpen, User, LogIn, Bell, Search, ShoppingCart, Settings } from 'lucide-react';

const Navbar = ({ 
  currentPage, 
  setCurrentPage, 
  isLoggedIn, 
  userRole, 
  onLogin, 
  onRegister, 
  onLogout 
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handlePageChange = (page) => {
    if (page === 'home') {
      navigate('/');
    } else {
      navigate(`/${page}`);
    }
    setCurrentPage(page);
    setIsMenuOpen(false);
  };

  const navigationItems = [
    { id: 'home', label: 'Home' },
    { id: 'courses', label: 'Courses' },
    { id: 'blog', label: 'Blog' },
    { id: 'forum', label: 'Community' },
    ...(isLoggedIn ? [
      { id: 'progress', label: 'My Learning' },
      ...(userRole === 'instructor' ? [{ id: 'teach', label: 'Teach' }] : []),
      ...(userRole === 'admin' ? [{ id: 'admin', label: 'Admin' }] : [])
    ] : [])
  ];

  const userMenuItems = [
    { id: 'progress', label: 'My Learning', icon: BookOpen },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'gamification', label: 'Achievements', icon: User },
    { id: 'privacy', label: 'Privacy Settings', icon: Settings },
    ...(userRole === 'admin' ? [
      { id: 'admin', label: 'Admin Dashboard', icon: Settings },
      { id: 'audit-log', label: 'Audit Log', icon: Settings }
    ] : [])
  ];

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => handlePageChange('home')}>
            <BookOpen className="h-8 w-8 text-blue-600 mr-2" />
            <span className="font-bold text-xl text-gray-900">LearnX</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handlePageChange(item.id)}
                className={`transition-colors font-medium ${
                  currentPage === item.id
                    ? 'text-blue-600 border-b-2 border-blue-600 pb-1'
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {!isLoggedIn ? (
              <>
                <button
                  onClick={onLogin}
                  className="flex items-center text-gray-700 hover:text-blue-600 transition-colors font-medium"
                >
                  <LogIn className="h-4 w-4 mr-1" />
                  Login
                </button>
                <button
                  onClick={onRegister}
                  className="flex items-center text-gray-700 hover:text-blue-600 transition-colors font-medium"
                >
                  <User className="h-4 w-4 mr-1" />
                  Register
                </button>
                <button
                  onClick={() => handlePageChange('courses')}
                  className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors font-medium"
                >
                  Browse Courses
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => handlePageChange('courses')}
                  className="text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <Search className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handlePageChange('checkout')}
                  className="text-gray-700 hover:text-blue-600 transition-colors relative"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    2
                  </span>
                </button>
                <button
                  onClick={() => handlePageChange('notifications')}
                  className="text-gray-700 hover:text-blue-600 transition-colors relative"
                >
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    3
                  </span>
                </button>
                
                {/* User Menu */}
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-white" />
                    </div>
                    <span className="font-medium capitalize">{userRole}</span>
                  </button>
                  
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                      {userMenuItems.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => {
                            handlePageChange(item.id);
                            setShowUserMenu(false);
                          }}
                          className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center"
                        >
                          <item.icon className="h-4 w-4 mr-3" />
                          {item.label}
                        </button>
                      ))}
                      <hr className="my-2" />
                      <button
                        onClick={() => {
                          onLogout();
                          setShowUserMenu(false);
                        }}
                        className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handlePageChange(item.id)}
                  className={`block w-full text-left px-3 py-2 transition-colors font-medium ${
                    currentPage === item.id
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              
              <div className="pt-4 pb-3 border-t border-gray-200">
                {!isLoggedIn ? (
                  <div className="flex flex-col space-y-2 px-3">
                    <button
                      onClick={onLogin}
                      className="flex items-center text-gray-700 hover:text-blue-600 transition-colors font-medium py-2"
                    >
                      <LogIn className="h-4 w-4 mr-2" />
                      Login
                    </button>
                    <button
                      onClick={onRegister}
                      className="flex items-center text-gray-700 hover:text-blue-600 transition-colors font-medium py-2"
                    >
                      <User className="h-4 w-4 mr-2" />
                      Register
                    </button>
                    <button
                      onClick={() => handlePageChange('courses')}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium mt-2"
                    >
                      Browse Courses
                    </button>
                  </div>
                ) : (
                  <div className="px-3">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">Welcome back!</div>
                        <div className="text-sm text-gray-600 capitalize">{userRole}</div>
                      </div>
                    </div>
                    
                    {userMenuItems.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => handlePageChange(item.id)}
                        className="w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100 flex items-center"
                      >
                        <item.icon className="h-4 w-4 mr-3" />
                        {item.label}
                      </button>
                    ))}
                    
                    <button
                      onClick={onLogout}
                      className="w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 mt-2"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;