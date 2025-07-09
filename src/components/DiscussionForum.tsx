import React, { useState } from 'react';
import { 
  MessageCircle, ThumbsUp, ThumbsDown, Reply, Search, Filter,
  Pin, Star, Clock, User, Tag, Send, Paperclip, MoreVertical,
  ChevronDown, ChevronUp, Award, CheckCircle
} from 'lucide-react';

const DiscussionForum = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [searchQuery, setSearchQuery] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [showNewPost, setShowNewPost] = useState(false);
  const [expandedPosts, setExpandedPosts] = useState(new Set());

  const categories = [
    { id: 'all', name: 'All Discussions', count: 156 },
    { id: 'general', name: 'General', count: 45 },
    { id: 'web-dev', name: 'Web Development', count: 38 },
    { id: 'data-science', name: 'Data Science', count: 29 },
    { id: 'design', name: 'Design', count: 22 },
    { id: 'career', name: 'Career Advice', count: 18 },
    { id: 'help', name: 'Help & Support', count: 4 }
  ];

  const posts = [
    {
      id: 1,
      title: "Best practices for React component organization?",
      content: "I'm working on a large React project and struggling with how to organize my components. What are some best practices you follow for folder structure and component architecture?",
      author: {
        name: "Alex Chen",
        avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150",
        role: "Student",
        reputation: 245
      },
      category: "web-dev",
      tags: ["React", "Architecture", "Best Practices"],
      createdAt: "2024-01-25T10:30:00Z",
      updatedAt: "2024-01-25T14:20:00Z",
      likes: 12,
      dislikes: 1,
      replies: 8,
      views: 156,
      isPinned: false,
      isSolved: false,
      replies: [
        {
          id: 101,
          content: "I recommend organizing by feature rather than by file type. Create folders for each major feature and include all related components, hooks, and styles together.",
          author: {
            name: "Sarah Johnson",
            avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150",
            role: "Instructor",
            reputation: 1250
          },
          createdAt: "2024-01-25T11:15:00Z",
          likes: 8,
          dislikes: 0,
          isAccepted: true
        },
        {
          id: 102,
          content: "Also consider using index.js files for cleaner imports and follow a consistent naming convention throughout your project.",
          author: {
            name: "Mike Rodriguez",
            avatar: "https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=150",
            role: "Student",
            reputation: 89
          },
          createdAt: "2024-01-25T12:30:00Z",
          likes: 5,
          dislikes: 0,
          isAccepted: false
        }
      ]
    },
    {
      id: 2,
      title: "How to transition from bootcamp to first developer job?",
      content: "I just finished a web development bootcamp and I'm feeling overwhelmed about job searching. What should I focus on to make myself more attractive to employers?",
      author: {
        name: "Emma Davis",
        avatar: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150",
        role: "Student",
        reputation: 67
      },
      category: "career",
      tags: ["Career", "Job Search", "Bootcamp"],
      createdAt: "2024-01-24T16:45:00Z",
      updatedAt: "2024-01-25T09:20:00Z",
      likes: 24,
      dislikes: 0,
      replies: 15,
      views: 289,
      isPinned: true,
      isSolved: false
    },
    {
      id: 3,
      title: "Understanding Python decorators - need help!",
      content: "I'm struggling to understand how decorators work in Python. Can someone explain them in simple terms with practical examples?",
      author: {
        name: "David Kim",
        avatar: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150",
        role: "Student",
        reputation: 156
      },
      category: "data-science",
      tags: ["Python", "Decorators", "Programming"],
      createdAt: "2024-01-24T14:20:00Z",
      updatedAt: "2024-01-24T18:45:00Z",
      likes: 18,
      dislikes: 2,
      replies: 12,
      views: 234,
      isPinned: false,
      isSolved: true
    }
  ];

  const togglePostExpansion = (postId) => {
    const newExpanded = new Set(expandedPosts);
    if (newExpanded.has(postId)) {
      newExpanded.delete(postId);
    } else {
      newExpanded.add(postId);
    }
    setExpandedPosts(newExpanded);
  };

  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'Instructor': return 'text-blue-600 bg-blue-100';
      case 'Admin': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Discussion Forum</h1>
              <p className="text-gray-600">Connect with fellow learners and get help from instructors</p>
            </div>
            <button
              onClick={() => setShowNewPost(!showNewPost)}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors font-semibold"
            >
              New Discussion
            </button>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search discussions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            >
              <option value="recent">Most Recent</option>
              <option value="popular">Most Popular</option>
              <option value="unanswered">Unanswered</option>
              <option value="solved">Solved</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center justify-between ${
                      selectedCategory === category.id
                        ? 'bg-blue-100 text-blue-700'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <span>{category.name}</span>
                    <span className="text-sm text-gray-500">{category.count}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Forum Stats */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Forum Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Posts</span>
                  <span className="font-medium">1,247</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Active Users</span>
                  <span className="font-medium">89</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Solved Questions</span>
                  <span className="font-medium">892</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Expert Contributors</span>
                  <span className="font-medium">23</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* New Post Form */}
            {showNewPost && (
              <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Start a New Discussion</h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Discussion title..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <select className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
                      <option>Select Category</option>
                      <option>General</option>
                      <option>Web Development</option>
                      <option>Data Science</option>
                      <option>Design</option>
                      <option>Career Advice</option>
                    </select>
                    
                    <input
                      type="text"
                      placeholder="Tags (comma separated)"
                      className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>
                  
                  <textarea
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    placeholder="Write your question or start a discussion..."
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                  
                  <div className="flex items-center justify-between">
                    <button className="text-gray-600 hover:text-gray-800 flex items-center">
                      <Paperclip className="h-5 w-5 mr-2" />
                      Attach File
                    </button>
                    
                    <div className="flex space-x-3">
                      <button
                        onClick={() => setShowNewPost(false)}
                        className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                      <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        Post Discussion
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Discussion Posts */}
            <div className="space-y-6">
              {filteredPosts.map((post) => (
                <div key={post.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <div className="p-6">
                    {/* Post Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={post.author.avatar}
                          alt={post.author.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <div className="flex items-center space-x-2">
                            <h4 className="font-semibold text-gray-900">{post.author.name}</h4>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(post.author.role)}`}>
                              {post.author.role}
                            </span>
                            {post.author.reputation > 1000 && (
                              <Award className="h-4 w-4 text-yellow-500" />
                            )}
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <Clock className="h-4 w-4 mr-1" />
                            {formatTimeAgo(post.createdAt)}
                            <span className="mx-2">•</span>
                            <span>{post.views} views</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {post.isPinned && <Pin className="h-5 w-5 text-blue-600" />}
                        {post.isSolved && <CheckCircle className="h-5 w-5 text-green-600" />}
                        <button className="text-gray-400 hover:text-gray-600">
                          <MoreVertical className="h-5 w-5" />
                        </button>
                      </div>
                    </div>

                    {/* Post Title */}
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{post.title}</h3>

                    {/* Post Content */}
                    <p className="text-gray-700 mb-4">{post.content}</p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag, index) => (
                        <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-sm">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Post Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div className="flex items-center space-x-4">
                        <button className="flex items-center text-gray-600 hover:text-green-600 transition-colors">
                          <ThumbsUp className="h-5 w-5 mr-1" />
                          {post.likes}
                        </button>
                        <button className="flex items-center text-gray-600 hover:text-red-600 transition-colors">
                          <ThumbsDown className="h-5 w-5 mr-1" />
                          {post.dislikes}
                        </button>
                        <button
                          onClick={() => togglePostExpansion(post.id)}
                          className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
                        >
                          <MessageCircle className="h-5 w-5 mr-1" />
                          {post.replies} replies
                        </button>
                      </div>
                      
                      <button
                        onClick={() => togglePostExpansion(post.id)}
                        className="flex items-center text-blue-600 hover:text-blue-700 transition-colors"
                      >
                        {expandedPosts.has(post.id) ? (
                          <>
                            <ChevronUp className="h-5 w-5 mr-1" />
                            Hide Replies
                          </>
                        ) : (
                          <>
                            <ChevronDown className="h-5 w-5 mr-1" />
                            Show Replies
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Replies */}
                  {expandedPosts.has(post.id) && post.replies && (
                    <div className="border-t border-gray-200 bg-gray-50">
                      <div className="p-6 space-y-4">
                        {post.replies.map((reply) => (
                          <div key={reply.id} className={`bg-white rounded-xl p-4 ${reply.isAccepted ? 'border-2 border-green-200' : ''}`}>
                            <div className="flex items-start space-x-3">
                              <img
                                src={reply.author.avatar}
                                alt={reply.author.name}
                                className="w-8 h-8 rounded-full object-cover"
                              />
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-2">
                                  <span className="font-medium text-gray-900">{reply.author.name}</span>
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(reply.author.role)}`}>
                                    {reply.author.role}
                                  </span>
                                  {reply.isAccepted && (
                                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium flex items-center">
                                      <CheckCircle className="h-3 w-3 mr-1" />
                                      Accepted Answer
                                    </span>
                                  )}
                                  <span className="text-sm text-gray-500">{formatTimeAgo(reply.createdAt)}</span>
                                </div>
                                <p className="text-gray-700 mb-3">{reply.content}</p>
                                <div className="flex items-center space-x-3">
                                  <button className="flex items-center text-gray-600 hover:text-green-600 transition-colors text-sm">
                                    <ThumbsUp className="h-4 w-4 mr-1" />
                                    {reply.likes}
                                  </button>
                                  <button className="flex items-center text-gray-600 hover:text-blue-600 transition-colors text-sm">
                                    <Reply className="h-4 w-4 mr-1" />
                                    Reply
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                        
                        {/* Reply Form */}
                        <div className="bg-white rounded-xl p-4">
                          <div className="flex space-x-3">
                            <img
                              src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150"
                              alt="Your avatar"
                              className="w-8 h-8 rounded-full object-cover"
                            />
                            <div className="flex-1">
                              <textarea
                                placeholder="Write a reply..."
                                rows={3}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                              />
                              <div className="flex justify-end mt-2">
                                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                                  <Send className="h-4 w-4 mr-2" />
                                  Reply
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-8">
              <button className="bg-gray-600 text-white px-8 py-3 rounded-xl hover:bg-gray-700 transition-colors font-semibold">
                Load More Discussions
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscussionForum;