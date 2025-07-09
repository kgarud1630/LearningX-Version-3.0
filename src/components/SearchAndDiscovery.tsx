import React, { useState } from 'react';
import { 
  Search, Filter, Star, Clock, Users, BookOpen, TrendingUp,
  ChevronDown, Grid, List, SlidersHorizontal, Heart, Share2
} from 'lucide-react';

const SearchAndDiscovery = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedPrice, setSelectedPrice] = useState('all');
  const [sortBy, setSortBy] = useState('popularity');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    'all', 'Web Development', 'Data Science', 'Design', 'Marketing', 
    'Business', 'Programming', 'Mobile Development', 'Cybersecurity'
  ];

  const levels = ['all', 'Beginner', 'Intermediate', 'Advanced', 'Expert'];
  const priceRanges = ['all', 'Free', '$0-$50', '$50-$100', '$100+'];
  const sortOptions = [
    { value: 'popularity', label: 'Most Popular' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'newest', label: 'Newest' },
    { value: 'price_low', label: 'Price: Low to High' },
    { value: 'price_high', label: 'Price: High to Low' }
  ];

  const courses = [
    {
      id: 1,
      title: 'Complete Web Development Bootcamp',
      instructor: 'Sarah Johnson',
      rating: 4.9,
      students: 15420,
      duration: '52 hours',
      price: 99.99,
      originalPrice: 129.99,
      level: 'Beginner',
      category: 'Web Development',
      image: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Learn HTML, CSS, JavaScript, React, Node.js, and MongoDB',
      tags: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js'],
      bestseller: true,
      updated: '2024-01-15'
    },
    {
      id: 2,
      title: 'Data Science with Python',
      instructor: 'Michael Chen',
      rating: 4.8,
      students: 12350,
      duration: '48 hours',
      price: 89.99,
      originalPrice: 119.99,
      level: 'Intermediate',
      category: 'Data Science',
      image: 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Master data analysis, visualization, and machine learning',
      tags: ['Python', 'Pandas', 'NumPy', 'Machine Learning'],
      bestseller: false,
      updated: '2024-01-10'
    },
    {
      id: 3,
      title: 'UI/UX Design Fundamentals',
      instructor: 'Emily Rodriguez',
      rating: 4.9,
      students: 9840,
      duration: '36 hours',
      price: 79.99,
      originalPrice: 99.99,
      level: 'Beginner',
      category: 'Design',
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Learn design principles, user research, and prototyping',
      tags: ['Figma', 'Design Thinking', 'Prototyping', 'User Research'],
      bestseller: true,
      updated: '2024-01-12'
    },
    {
      id: 4,
      title: 'Digital Marketing Mastery',
      instructor: 'David Kim',
      rating: 4.7,
      students: 8900,
      duration: '42 hours',
      price: 69.99,
      originalPrice: 89.99,
      level: 'Intermediate',
      category: 'Marketing',
      image: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Complete guide to digital marketing and social media',
      tags: ['SEO', 'Social Media', 'Google Ads', 'Analytics'],
      bestseller: false,
      updated: '2024-01-08'
    },
    {
      id: 5,
      title: 'Advanced React Development',
      instructor: 'Alice Johnson',
      rating: 4.8,
      students: 6750,
      duration: '38 hours',
      price: 149.99,
      originalPrice: 199.99,
      level: 'Advanced',
      category: 'Web Development',
      image: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Deep dive into React hooks, context, and performance',
      tags: ['React', 'TypeScript', 'Redux', 'Testing'],
      bestseller: false,
      updated: '2024-01-20'
    },
    {
      id: 6,
      title: 'Cybersecurity Fundamentals',
      instructor: 'Robert Wilson',
      rating: 4.6,
      students: 5420,
      duration: '44 hours',
      price: 109.99,
      originalPrice: 139.99,
      level: 'Beginner',
      category: 'Cybersecurity',
      image: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Learn network security, ethical hacking, and risk management',
      tags: ['Network Security', 'Ethical Hacking', 'Risk Management'],
      bestseller: false,
      updated: '2024-01-05'
    }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
    const matchesPrice = selectedPrice === 'all' || 
                        (selectedPrice === 'Free' && course.price === 0) ||
                        (selectedPrice === '$0-$50' && course.price <= 50) ||
                        (selectedPrice === '$50-$100' && course.price > 50 && course.price <= 100) ||
                        (selectedPrice === '$100+' && course.price > 100);
    
    return matchesSearch && matchesCategory && matchesLevel && matchesPrice;
  });

  const sortedCourses = [...filteredCourses].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return new Date(b.updated).getTime() - new Date(a.updated).getTime();
      case 'price_low':
        return a.price - b.price;
      case 'price_high':
        return b.price - a.price;
      default: // popularity
        return b.students - a.students;
    }
  });

  const CourseCard = ({ course, isListView = false }) => (
    <div className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
      isListView ? 'flex' : ''
    }`}>
      <div className={isListView ? 'w-1/3' : ''}>
        <div className="relative">
          <img 
            src={course.image} 
            alt={course.title}
            className={`object-cover ${isListView ? 'w-full h-full' : 'w-full h-48'}`}
          />
          {course.bestseller && (
            <div className="absolute top-3 left-3 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              Bestseller
            </div>
          )}
          <div className="absolute top-3 right-3 bg-blue-600 text-white px-2 py-1 rounded-full text-sm font-semibold">
            ${course.price}
          </div>
          <button className="absolute bottom-3 right-3 bg-white bg-opacity-90 p-2 rounded-full hover:bg-opacity-100 transition-colors">
            <Heart className="h-4 w-4 text-gray-600" />
          </button>
        </div>
      </div>
      
      <div className={`p-6 ${isListView ? 'flex-1' : ''}`}>
        <div className="flex items-center justify-between mb-2">
          <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
            {course.category}
          </span>
          <span className="text-xs text-gray-500">{course.level}</span>
        </div>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
          {course.title}
        </h3>
        
        <p className="text-gray-600 mb-3 line-clamp-2">
          {course.description}
        </p>
        
        <div className="flex items-center mb-3">
          <img 
            src={`https://images.pexels.com/photos/${1000000 + course.id}/pexels-photo-${1000000 + course.id}.jpeg?auto=compress&cs=tinysrgb&w=50`}
            alt={course.instructor}
            className="w-6 h-6 rounded-full object-cover mr-2"
          />
          <span className="text-sm text-gray-600">{course.instructor}</span>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
            <span className="text-sm font-medium text-gray-700 mr-2">{course.rating}</span>
            <span className="text-sm text-gray-500">({course.students.toLocaleString()})</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="h-4 w-4 mr-1" />
            {course.duration}
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {course.tags.slice(0, 3).map((tag, index) => (
            <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-lg font-bold text-gray-900">${course.price}</span>
            {course.originalPrice > course.price && (
              <span className="text-sm text-gray-500 line-through ml-2">${course.originalPrice}</span>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <button className="text-gray-400 hover:text-gray-600 p-1">
              <Share2 className="h-4 w-4" />
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
              Enroll Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Discover Courses</h1>
          <p className="text-lg text-gray-600">Find the perfect course to advance your skills</p>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search for courses, instructors, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="bg-gray-600 text-white px-6 py-3 rounded-xl hover:bg-gray-700 transition-colors font-medium flex items-center"
            >
              <SlidersHorizontal className="h-5 w-5 mr-2" />
              Filters
            </button>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category === 'all' ? 'All Categories' : category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Level</label>
                  <select
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  >
                    {levels.map(level => (
                      <option key={level} value={level}>
                        {level === 'all' ? 'All Levels' : level}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
                  <select
                    value={selectedPrice}
                    onChange={(e) => setSelectedPrice(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  >
                    {priceRanges.map(range => (
                      <option key={range} value={range}>
                        {range === 'all' ? 'All Prices' : range}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  >
                    {sortOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">
              {sortedCourses.length} courses found
            </h2>
            {searchQuery && (
              <p className="text-gray-600">Results for "{searchQuery}"</p>
            )}
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <Grid className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <List className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Course Results */}
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' : 'space-y-6'}>
          {sortedCourses.map((course) => (
            <CourseCard key={course.id} course={course} isListView={viewMode === 'list'} />
          ))}
        </div>

        {/* Load More */}
        {sortedCourses.length > 0 && (
          <div className="text-center mt-12">
            <button className="bg-gray-600 text-white px-8 py-3 rounded-xl hover:bg-gray-700 transition-colors font-semibold">
              Load More Courses
            </button>
          </div>
        )}

        {/* No Results */}
        {sortedCourses.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No courses found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search criteria or browse our popular courses</p>
            <button 
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedLevel('all');
                setSelectedPrice('all');
              }}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors font-semibold"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchAndDiscovery;