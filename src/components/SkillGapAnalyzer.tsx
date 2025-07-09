import React, { useState } from 'react';
import { 
  Target, TrendingUp, BookOpen, Star, Clock, Award, 
  CheckCircle, AlertTriangle, ArrowRight, BarChart3,
  Lightbulb, Zap, Users, Calendar, Filter, Search
} from 'lucide-react';

const SkillGapAnalyzer = () => {
  const [selectedRole, setSelectedRole] = useState('frontend-developer');
  const [experienceLevel, setExperienceLevel] = useState('intermediate');
  const [showRecommendations, setShowRecommendations] = useState(true);

  const targetRoles = [
    { value: 'frontend-developer', label: 'Frontend Developer' },
    { value: 'backend-developer', label: 'Backend Developer' },
    { value: 'fullstack-developer', label: 'Full Stack Developer' },
    { value: 'data-scientist', label: 'Data Scientist' },
    { value: 'devops-engineer', label: 'DevOps Engineer' },
    { value: 'mobile-developer', label: 'Mobile Developer' }
  ];

  const analysisResults = {
    overallMatch: 72,
    skillsAnalyzed: 24,
    strongSkills: 8,
    skillGaps: 6,
    learningTime: '3-4 months',
    marketDemand: 'High',
    salaryRange: '$75,000 - $120,000',
    
    skillCategories: [
      {
        name: 'Frontend Technologies',
        progress: 85,
        skills: [
          { name: 'HTML/CSS', level: 'Expert', required: 'Expert', match: true, experience: '3+ years' },
          { name: 'JavaScript', level: 'Advanced', required: 'Expert', match: false, experience: '2+ years' },
          { name: 'React', level: 'Advanced', required: 'Advanced', match: true, experience: '2+ years' },
          { name: 'TypeScript', level: 'Beginner', required: 'Intermediate', match: false, experience: '6 months' },
          { name: 'Vue.js', level: 'None', required: 'Intermediate', match: false, experience: 'None' }
        ]
      },
      {
        name: 'Development Tools',
        progress: 70,
        skills: [
          { name: 'Git/GitHub', level: 'Advanced', required: 'Advanced', match: true, experience: '2+ years' },
          { name: 'Webpack', level: 'Intermediate', required: 'Intermediate', match: true, experience: '1+ year' },
          { name: 'Docker', level: 'Beginner', required: 'Intermediate', match: false, experience: '3 months' },
          { name: 'CI/CD', level: 'None', required: 'Beginner', match: false, experience: 'None' }
        ]
      },
      {
        name: 'Testing & Quality',
        progress: 45,
        skills: [
          { name: 'Unit Testing', level: 'Beginner', required: 'Intermediate', match: false, experience: '3 months' },
          { name: 'Jest', level: 'Beginner', required: 'Intermediate', match: false, experience: '2 months' },
          { name: 'Cypress', level: 'None', required: 'Beginner', match: false, experience: 'None' },
          { name: 'Code Review', level: 'Intermediate', required: 'Advanced', match: false, experience: '1+ year' }
        ]
      },
      {
        name: 'Soft Skills',
        progress: 80,
        skills: [
          { name: 'Communication', level: 'Advanced', required: 'Advanced', match: true, experience: 'Strong' },
          { name: 'Problem Solving', level: 'Advanced', required: 'Advanced', match: true, experience: 'Strong' },
          { name: 'Team Collaboration', level: 'Intermediate', required: 'Advanced', match: false, experience: 'Good' },
          { name: 'Project Management', level: 'Beginner', required: 'Intermediate', match: false, experience: 'Basic' }
        ]
      }
    ],

    recommendations: [
      {
        priority: 'high',
        skill: 'TypeScript',
        currentLevel: 'Beginner',
        targetLevel: 'Intermediate',
        timeToLearn: '4-6 weeks',
        courses: [
          { title: 'TypeScript Fundamentals', provider: 'LearnX', duration: '8 hours', rating: 4.8 },
          { title: 'Advanced TypeScript Patterns', provider: 'LearnX', duration: '12 hours', rating: 4.7 }
        ],
        projects: [
          'Convert existing JavaScript project to TypeScript',
          'Build a type-safe API client'
        ]
      },
      {
        priority: 'high',
        skill: 'Testing (Jest/Cypress)',
        currentLevel: 'Beginner',
        targetLevel: 'Intermediate',
        timeToLearn: '6-8 weeks',
        courses: [
          { title: 'Complete Testing Guide', provider: 'LearnX', duration: '16 hours', rating: 4.9 },
          { title: 'E2E Testing with Cypress', provider: 'LearnX', duration: '10 hours', rating: 4.6 }
        ],
        projects: [
          'Add comprehensive tests to existing project',
          'Set up automated testing pipeline'
        ]
      },
      {
        priority: 'medium',
        skill: 'Vue.js',
        currentLevel: 'None',
        targetLevel: 'Intermediate',
        timeToLearn: '8-10 weeks',
        courses: [
          { title: 'Vue.js Complete Guide', provider: 'LearnX', duration: '24 hours', rating: 4.8 },
          { title: 'Vue 3 Composition API', provider: 'LearnX', duration: '14 hours', rating: 4.7 }
        ],
        projects: [
          'Build a Vue.js application from scratch',
          'Migrate React component to Vue'
        ]
      }
    ],

    careerPath: [
      { stage: 'Current', title: 'Junior Frontend Developer', match: 85, timeframe: 'Now' },
      { stage: 'Next', title: 'Frontend Developer', match: 72, timeframe: '3-6 months' },
      { stage: 'Future', title: 'Senior Frontend Developer', match: 45, timeframe: '1-2 years' },
      { stage: 'Goal', title: 'Lead Frontend Developer', match: 25, timeframe: '2-3 years' }
    ]
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getSkillLevelColor = (level: string) => {
    switch (level) {
      case 'Expert': return 'bg-green-500';
      case 'Advanced': return 'bg-blue-500';
      case 'Intermediate': return 'bg-yellow-500';
      case 'Beginner': return 'bg-orange-500';
      default: return 'bg-gray-300';
    }
  };

  const getMatchIcon = (match: boolean) => {
    return match ? (
      <CheckCircle className="h-5 w-5 text-green-600" />
    ) : (
      <AlertTriangle className="h-5 w-5 text-orange-600" />
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl mr-4">
                <Target className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Skill Gap Analysis</h1>
                <p className="text-gray-600">Identify skills needed for your target role</p>
              </div>
            </div>
          </div>

          {/* Role Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Target Role</label>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              >
                {targetRoles.map(role => (
                  <option key={role.value} value={role.value}>{role.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Experience Level</label>
              <select
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              >
                <option value="entry">Entry Level (0-1 years)</option>
                <option value="intermediate">Intermediate (2-4 years)</option>
                <option value="senior">Senior (5+ years)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <BarChart3 className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-blue-600">{analysisResults.overallMatch}%</span>
            </div>
            <div className="text-gray-900 font-semibold">Overall Match</div>
            <div className="text-gray-600 text-sm">Role compatibility</div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <span className="text-2xl font-bold text-green-600">{analysisResults.strongSkills}</span>
            </div>
            <div className="text-gray-900 font-semibold">Strong Skills</div>
            <div className="text-gray-600 text-sm">Meeting requirements</div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <AlertTriangle className="h-8 w-8 text-orange-600" />
              <span className="text-2xl font-bold text-orange-600">{analysisResults.skillGaps}</span>
            </div>
            <div className="text-gray-900 font-semibold">Skill Gaps</div>
            <div className="text-gray-600 text-sm">Need improvement</div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <Clock className="h-8 w-8 text-purple-600" />
              <span className="text-lg font-bold text-purple-600">{analysisResults.learningTime}</span>
            </div>
            <div className="text-gray-900 font-semibold">Learning Time</div>
            <div className="text-gray-600 text-sm">To close gaps</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Skills Analysis */}
          <div className="lg:col-span-2 space-y-8">
            {/* Skill Categories */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Skills Breakdown</h3>
              
              {analysisResults.skillCategories.map((category, index) => (
                <div key={index} className="mb-8 last:mb-0">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold text-gray-900">{category.name}</h4>
                    <span className="text-sm font-medium text-gray-600">{category.progress}% match</span>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${category.progress}%` }}
                    ></div>
                  </div>

                  <div className="space-y-3">
                    {category.skills.map((skill, skillIndex) => (
                      <div key={skillIndex} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <div className="flex items-center flex-1">
                          {getMatchIcon(skill.match)}
                          <div className="ml-3 flex-1">
                            <div className="font-medium text-gray-900">{skill.name}</div>
                            <div className="text-sm text-gray-600">Experience: {skill.experience}</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                          <div className="text-center">
                            <div className="text-xs text-gray-500 mb-1">Current</div>
                            <div className={`px-2 py-1 rounded-full text-xs font-medium text-white ${getSkillLevelColor(skill.level)}`}>
                              {skill.level || 'None'}
                            </div>
                          </div>
                          
                          <ArrowRight className="h-4 w-4 text-gray-400" />
                          
                          <div className="text-center">
                            <div className="text-xs text-gray-500 mb-1">Required</div>
                            <div className={`px-2 py-1 rounded-full text-xs font-medium text-white ${getSkillLevelColor(skill.required)}`}>
                              {skill.required}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Learning Recommendations */}
            {showRecommendations && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">Learning Recommendations</h3>
                
                <div className="space-y-6">
                  {analysisResults.recommendations.map((rec, index) => (
                    <div key={index} className="border border-gray-200 rounded-xl p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <h4 className="text-lg font-semibold text-gray-900 mr-3">{rec.skill}</h4>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(rec.priority)}`}>
                              {rec.priority} priority
                            </span>
                          </div>
                          <div className="text-sm text-gray-600 mb-3">
                            {rec.currentLevel} → {rec.targetLevel} • {rec.timeToLearn}
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h5 className="font-medium text-gray-900 mb-3 flex items-center">
                            <BookOpen className="h-4 w-4 mr-2" />
                            Recommended Courses
                          </h5>
                          <div className="space-y-2">
                            {rec.courses.map((course, courseIndex) => (
                              <div key={courseIndex} className="bg-gray-50 rounded-lg p-3">
                                <div className="font-medium text-gray-900 text-sm">{course.title}</div>
                                <div className="flex items-center justify-between text-xs text-gray-600 mt-1">
                                  <span>{course.provider} • {course.duration}</span>
                                  <div className="flex items-center">
                                    <Star className="h-3 w-3 text-yellow-500 mr-1" />
                                    {course.rating}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h5 className="font-medium text-gray-900 mb-3 flex items-center">
                            <Lightbulb className="h-4 w-4 mr-2" />
                            Practice Projects
                          </h5>
                          <div className="space-y-2">
                            {rec.projects.map((project, projectIndex) => (
                              <div key={projectIndex} className="bg-blue-50 rounded-lg p-3">
                                <div className="text-sm text-blue-900">{project}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Career Path */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Career Progression</h3>
              
              <div className="space-y-4">
                {analysisResults.careerPath.map((stage, index) => (
                  <div key={index} className="relative">
                    <div className={`p-4 rounded-xl border-2 ${
                      stage.stage === 'Current' ? 'border-green-200 bg-green-50' :
                      stage.stage === 'Next' ? 'border-blue-200 bg-blue-50' :
                      'border-gray-200 bg-gray-50'
                    }`}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium text-gray-900">{stage.title}</div>
                        <div className="text-sm font-medium text-gray-600">{stage.match}%</div>
                      </div>
                      <div className="text-sm text-gray-600 mb-2">{stage.timeframe}</div>
                      <div className="w-full bg-gray-200 rounded-full h-1">
                        <div 
                          className={`h-1 rounded-full transition-all duration-300 ${
                            stage.stage === 'Current' ? 'bg-green-500' :
                            stage.stage === 'Next' ? 'bg-blue-500' :
                            'bg-gray-400'
                          }`}
                          style={{ width: `${stage.match}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    {index < analysisResults.careerPath.length - 1 && (
                      <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-4 bg-gray-300 mt-2"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Market Insights */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Market Insights</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Market Demand</span>
                  <span className="font-medium text-green-600">{analysisResults.marketDemand}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Salary Range</span>
                  <span className="font-medium text-gray-900">{analysisResults.salaryRange}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Skills Analyzed</span>
                  <span className="font-medium text-gray-900">{analysisResults.skillsAnalyzed}</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
              <h3 className="text-lg font-semibold mb-4">Take Action</h3>
              
              <div className="space-y-3">
                <button className="w-full bg-white bg-opacity-20 hover:bg-opacity-30 py-3 px-4 rounded-xl transition-colors font-medium">
                  Create Learning Plan
                </button>
                
                <button className="w-full bg-white bg-opacity-20 hover:bg-opacity-30 py-3 px-4 rounded-xl transition-colors font-medium">
                  Browse Courses
                </button>
                
                <button className="w-full bg-white bg-opacity-20 hover:bg-opacity-30 py-3 px-4 rounded-xl transition-colors font-medium">
                  Find Mentors
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillGapAnalyzer;