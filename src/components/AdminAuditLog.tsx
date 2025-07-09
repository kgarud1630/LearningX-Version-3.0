import React, { useState } from 'react';
import { 
  Search, Filter, Download, Calendar, User, Activity, 
  Shield, AlertTriangle, CheckCircle, XCircle, Eye,
  ChevronDown, RefreshCw, Clock, Database
} from 'lucide-react';

const AdminAuditLog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAction, setSelectedAction] = useState('all');
  const [selectedUser, setSelectedUser] = useState('all');
  const [dateRange, setDateRange] = useState('7days');
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const auditLogs = [
    {
      id: 1,
      timestamp: '2024-01-25T14:30:00Z',
      user: 'admin@learnx.com',
      userName: 'Carol Davis',
      action: 'USER_ROLE_CHANGED',
      resource: 'User Profile',
      resourceId: 'user_005',
      details: 'Changed role from student to instructor for Emma Brown',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      status: 'success',
      severity: 'medium'
    },
    {
      id: 2,
      timestamp: '2024-01-25T14:15:00Z',
      user: 'instructor_001@learnx.com',
      userName: 'Alice Johnson',
      action: 'COURSE_PUBLISHED',
      resource: 'Course',
      resourceId: 'course_004',
      details: 'Published course "Advanced React Development"',
      ipAddress: '192.168.1.101',
      userAgent: 'Mozilla/5.0 (macOS; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
      status: 'success',
      severity: 'low'
    },
    {
      id: 3,
      timestamp: '2024-01-25T13:45:00Z',
      user: 'system@learnx.com',
      userName: 'System',
      action: 'LOGIN_FAILED',
      resource: 'Authentication',
      resourceId: 'auth_attempt_123',
      details: 'Failed login attempt for user john.doe@example.com - Invalid password',
      ipAddress: '203.0.113.45',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      status: 'failed',
      severity: 'high'
    },
    {
      id: 4,
      timestamp: '2024-01-25T13:30:00Z',
      user: 'instructor_002@learnx.com',
      userName: 'Bob Smith',
      action: 'COURSE_CREATED',
      resource: 'Course',
      resourceId: 'course_005',
      details: 'Created new course "Machine Learning Basics"',
      ipAddress: '192.168.1.102',
      userAgent: 'Mozilla/5.0 (Ubuntu; Linux x86_64) AppleWebKit/537.36',
      status: 'success',
      severity: 'low'
    },
    {
      id: 5,
      timestamp: '2024-01-25T12:20:00Z',
      user: 'admin@learnx.com',
      userName: 'Carol Davis',
      action: 'USER_DELETED',
      resource: 'User Profile',
      resourceId: 'user_999',
      details: 'Deleted user account for spam violation - test.user@spam.com',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      status: 'success',
      severity: 'high'
    },
    {
      id: 6,
      timestamp: '2024-01-25T11:45:00Z',
      user: 'student_001@learnx.com',
      userName: 'John Doe',
      action: 'PAYMENT_PROCESSED',
      resource: 'Payment',
      resourceId: 'payment_789',
      details: 'Payment processed for course enrollment - $99.99',
      ipAddress: '192.168.1.103',
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15',
      status: 'success',
      severity: 'low'
    },
    {
      id: 7,
      timestamp: '2024-01-25T11:30:00Z',
      user: 'system@learnx.com',
      userName: 'System',
      action: 'BACKUP_COMPLETED',
      resource: 'Database',
      resourceId: 'backup_20240125',
      details: 'Daily database backup completed successfully - 2.3GB',
      ipAddress: '127.0.0.1',
      userAgent: 'System/1.0',
      status: 'success',
      severity: 'low'
    },
    {
      id: 8,
      timestamp: '2024-01-25T10:15:00Z',
      user: 'instructor_003@learnx.com',
      userName: 'David Wilson',
      action: 'CONTENT_MODERATED',
      resource: 'Course Content',
      resourceId: 'content_456',
      details: 'Flagged inappropriate content in course discussion',
      ipAddress: '192.168.1.104',
      userAgent: 'Mozilla/5.0 (macOS; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
      status: 'success',
      severity: 'medium'
    }
  ];

  const actionTypes = [
    'all', 'USER_CREATED', 'USER_DELETED', 'USER_ROLE_CHANGED', 'LOGIN_FAILED',
    'COURSE_CREATED', 'COURSE_PUBLISHED', 'COURSE_DELETED', 'PAYMENT_PROCESSED',
    'CONTENT_MODERATED', 'BACKUP_COMPLETED', 'SYSTEM_UPDATE'
  ];

  const users = [
    'all', 'admin@learnx.com', 'instructor_001@learnx.com', 'instructor_002@learnx.com',
    'system@learnx.com', 'student_001@learnx.com'
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'failed':
        return <XCircle className="h-5 w-5 text-red-600" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
      default:
        return <Activity className="h-5 w-5 text-gray-600" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.userName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAction = selectedAction === 'all' || log.action === selectedAction;
    const matchesUser = selectedUser === 'all' || log.user === selectedUser;
    
    return matchesSearch && matchesAction && matchesUser;
  });

  const totalPages = Math.ceil(filteredLogs.length / 10);
  const paginatedLogs = filteredLogs.slice((currentPage - 1) * 10, currentPage * 10);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Audit Log</h1>
                <p className="text-gray-600">Monitor system activities and user actions</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center">
                <Download className="h-4 w-4 mr-2" />
                Export
              </button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 rounded-xl p-4">
              <div className="text-2xl font-bold text-blue-600">{auditLogs.length}</div>
              <div className="text-blue-700 text-sm">Total Events</div>
            </div>
            <div className="bg-green-50 rounded-xl p-4">
              <div className="text-2xl font-bold text-green-600">
                {auditLogs.filter(log => log.status === 'success').length}
              </div>
              <div className="text-green-700 text-sm">Successful</div>
            </div>
            <div className="bg-red-50 rounded-xl p-4">
              <div className="text-2xl font-bold text-red-600">
                {auditLogs.filter(log => log.status === 'failed').length}
              </div>
              <div className="text-red-700 text-sm">Failed</div>
            </div>
            <div className="bg-yellow-50 rounded-xl p-4">
              <div className="text-2xl font-bold text-yellow-600">
                {auditLogs.filter(log => log.severity === 'high').length}
              </div>
              <div className="text-yellow-700 text-sm">High Severity</div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center text-gray-600 hover:text-gray-800"
            >
              <Filter className="h-5 w-5 mr-2" />
              {showFilters ? 'Hide' : 'Show'} Filters
              <ChevronDown className={`h-4 w-4 ml-1 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search logs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Action Type</label>
                <select
                  value={selectedAction}
                  onChange={(e) => setSelectedAction(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  {actionTypes.map(action => (
                    <option key={action} value={action}>
                      {action === 'all' ? 'All Actions' : action.replace(/_/g, ' ')}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">User</label>
                <select
                  value={selectedUser}
                  onChange={(e) => setSelectedUser(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  {users.map(user => (
                    <option key={user} value={user}>
                      {user === 'all' ? 'All Users' : user}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option value="1day">Last 24 hours</option>
                  <option value="7days">Last 7 days</option>
                  <option value="30days">Last 30 days</option>
                  <option value="90days">Last 90 days</option>
                </select>
              </div>

              <div className="flex items-end">
                <button className="w-full bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors font-medium">
                  Clear Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Audit Log Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Timestamp
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Resource
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Severity
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900">
                        <Clock className="h-4 w-4 text-gray-400 mr-2" />
                        {formatTimestamp(log.timestamp)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <User className="h-4 w-4 text-gray-400 mr-2" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{log.userName}</div>
                          <div className="text-sm text-gray-500">{log.user}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900">
                        {log.action.replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Database className="h-4 w-4 text-gray-400 mr-2" />
                        <div>
                          <div className="text-sm text-gray-900">{log.resource}</div>
                          <div className="text-sm text-gray-500">{log.resourceId}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getStatusIcon(log.status)}
                        <span className="ml-2 text-sm text-gray-900 capitalize">{log.status}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getSeverityColor(log.severity)}`}>
                        {log.severity}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-3">
                        <Eye className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing {((currentPage - 1) * 10) + 1} to {Math.min(currentPage * 10, filteredLogs.length)} of {filteredLogs.length} results
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`px-3 py-1 border rounded-md text-sm font-medium ${
                      currentPage === index + 1
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
                
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Log Details Modal would go here */}
      </div>
    </div>
  );
};

export default AdminAuditLog;