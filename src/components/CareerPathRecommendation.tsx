import React, { useState } from 'react';
import { 
  MapPin, TrendingUp, Star, Clock, DollarSign, Users, 
  BookOpen, Award, Target, ArrowRight, CheckCircle,
  Briefcase, GraduationCap, Lightbulb, Calendar,
  BarChart3, Filter, Search, ExternalLink
} from 'lucide-react';

const CareerPathRecommendation = () => {
  const [selectedPath, setSelectedPath] = useState(0);
  const [timeframe, setTimeframe] = useState('1-year');
  const [showDetails, setShowDetails] = useState(false);

  const userProfile = {
    currentRole: 'Junior Frontend Developer',
    experience: '1.5 years',
    skills: ['HTML/CSS', 'JavaScript', 'React', 'Git'],
    interests: ['Web Development', 'UI/UX Design', 'Mobile Development'],
    goals: 'Advance to senior level and increase salary'
  };

  const careerPaths = [
    {
      id: 1,
      title: 'Senior Frontend Developer',
      match: 85,
      timeToAchieve: '12-18 months',
      salaryIncrease: '+40%',
      demandLevel: 'High',
      description: 'Lead frontend development projects and mentor junior developers',
      currentSalary: '$65,000',
      targetSalary: '$90,000',
      companies: ['Google', 'Meta', 'Netflix', 'Airbnb'],
      
      roadmap: [
        {
          phase: 'Phase 1: Advanced Skills',
          duration: '3-4 months',
          skills: ['TypeScript', 'Advanced React Patterns', 'State Management', 'Performance Optimization'],
          courses: [
            { title: 'Advanced React Development', duration: '20 hours', provider: 'LearnX' },
            { title: 'TypeScript Mastery', duration: '15 hours', provider: 'LearnX' }
          ],
          projects: ['Build a complex SPA with TypeScript', 'Optimize existing React application']
        },
        {
          phase: 'Phase 2: Leadership & Architecture',
          duration: '4-6 months',
          skills: ['System Design', 'Code Review', 'Team Leadership', 'Architecture Patterns'],
          courses: [
            { title: 'Frontend Architecture', duration: '18 hours', provider: 'LearnX' },
            { title: 'Tech Leadership Fundamentals', duration: '12 hours', provider: 'LearnX' }
          ],
          projects: ['Design and implement a component library', 'Lead a small development team']
        },
        {
          phase: 'Phase 3: Specialization',
          duration: '6-8 months',
          skills: ['Micro-frontends', 'Testing Strategy', 'CI/CD', 'Mentoring'],
          courses: [
            { title: 'Advanced Testing Strategies', duration: '16 hours', provider: 'LearnX' },
            { title: 'Micro-frontend Architecture', duration: '14 hours', provider: 'LearnX' }
          ],
          projects: ['Implement micro-frontend architecture', 'Establish testing best practices']
        }
      ],

      benefits: [
        'Higher salary and better benefits',
        'Technical leadership opportunities',
        'Influence on product decisions',
        'Mentoring and team building experience'
      ],

      challenges: [
        'Increased responsibility and accountability',
        'Need to balance coding with leadership',
        'Staying current with rapidly evolving technologies',
        'Managing team dynamics and conflicts'
      ]
    },
    {
      id: 2,
      title: 'Full Stack Developer',
      match: 75,
      timeToAchieve: '18-24 months',
      salaryIncrease: '+50%',
      demandLevel: 'Very High',
      description: 'Work across the entire technology stack from frontend to backend',
      currentSalary: '$65,000',
      targetSalary: '$95,000',
      companies: ['Stripe', 'Shopify', 'Atlassian', 'GitHub'],
      
      roadmap: [
        {
          phase: 'Phase 1: Backend Fundamentals',
          duration: '4-6 months',
          skills: ['Node.js', 'Express.js', 'Database Design', 'API Development'],
          courses: [
            { title: 'Complete Node.js Development', duration: '25 hours', provider: 'LearnX' },
            { title: 'Database Design & SQL', duration: '18 hours', provider: 'LearnX' }
          ],
          projects: ['Build a REST API with Node.js', 'Design and implement a database schema']
        },
        {
          phase: 'Phase 2: Advanced Backend',
          duration: '6-8 months',
          skills: ['Microservices', 'Authentication', 'Caching', 'Message Queues'],
          courses: [
            { title: 'Microservices Architecture', duration: '22 hours', provider: 'LearnX' },
            { title: 'Advanced Authentication & Security', duration: '16 hours', provider: 'LearnX' }
          ],
          projects: ['Build a microservices application', 'Implement OAuth and JWT authentication']
        },
        {
          phase: 'Phase 3: DevOps & Deployment',
          duration: '8-10 months',
          skills: ['Docker', 'AWS/Cloud', 'CI/CD', 'Monitoring'],
          courses: [
            { title: 'Docker & Containerization', duration: '14 hours', provider: 'LearnX' },
            { title: 'AWS for Developers', duration: '20 hours', provider: 'LearnX' }
          ],
          projects: ['Deploy applications using Docker', 'Set up CI/CD pipeline']
        }
      ],

      benefits: [
        'Versatility across technology stack',
        'Higher market value and salary',
        'Better understanding of system architecture',
        'More job opportunities and flexibility'
      ],

      challenges: [
        'Need to master multiple technologies',
        'Keeping up with both frontend and backend trends',
        'Deeper learning curve',
        'Potential for becoming jack-of-all-trades'
      ]
    },
    {
      id: 3,
      title: 'UI/UX Developer',
      match: 70,
      timeToAchieve: '15-20 months',
      salaryIncrease: '+35%',
      demandLevel: 'High',
      description: 'Bridge the gap between design and development with focus on user experience',
      currentSalary: '$65,000',
      targetSalary: '$85,000',
      companies: ['Adobe', 'Figma', 'Spotify', 'Uber'],
      
      roadmap: [
        {
          phase: 'Phase 1: Design Fundamentals',
          duration: '3-5 months',
          skills: ['Design Principles', 'Figma/Sketch', 'User Research', 'Prototyping'],
          courses: [
            { title: 'UI/UX Design Fundamentals', duration: '24 hours', provider: 'LearnX' },
            { title: 'User Research & Testing', duration: '16 hours', provider: 'LearnX' }
          ],
          projects: ['Design a complete user interface', 'Conduct user research study']
        },
        {
          phase: 'Phase 2: Advanced Design & Animation',
          duration: '5-7 months',
          skills: ['Advanced CSS/Animations', 'Design Systems', 'Accessibility', 'Motion Design'],
          courses: [
            { title: 'Advanced CSS & Animations', duration: '18 hours', provider: 'LearnX' },
            { title: 'Design Systems & Component Libraries', duration: '20 hours', provider: 'LearnX' }
          ],
          projects: ['Create a comprehensive design system', 'Build animated user interfaces']
        },
        {
          phase: 'Phase 3: Specialization',
          duration: '7-8 months',
          skills: ['Mobile UI/UX', 'Data Visualization', 'Conversion Optimization', 'A/B Testing'],
          courses: [
            { title: 'Mobile UI/UX Design', duration: '16 hours', provider: 'LearnX' },
            { title: 'Data Visualization & D3.js', duration: '22 hours', provider: 'LearnX' }
          ],
          projects: ['Design mobile-first applications', 'Create interactive data visualizations']
        }
      ],

      benefits: [
        'Creative and technical skill combination',
        'High impact on user satisfaction',
        'Growing demand for UX-focused developers',
        'Opportunity to work on diverse projects'
      ],

      challenges: [
        'Need to develop design eye and technical skills',
        'Balancing user needs with technical constraints',
        'Staying current with design trends',
        'Communicating effectively with designers and developers'
      ]
    }
  ];

  const selectedCareerPath = careerPaths[selectedPath];

  const getMatchColor = (match: number) => {
    if (match >= 80) return 'text-green-600 bg-green-100';
    if (match >= 70) return 'text-blue-600 bg-blue-100';
    return 'text-yellow-600 bg-yellow-100';
  };

  const getDemandColor = (demand: string) => {
    switch (demand) {
      case 'Very High': return 'text-green-600 bg-green-100';
      case 'High': return 'text-blue-600 bg-blue-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-xl mr-4">
                <MapPin className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Career Path Recommendations</h1>
                <p className="text-gray-600">Discover your next career move with personalized guidance</p>
              </div>
            </div>
          </div>

          {/* Current Profile */}
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Current Profile</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <div className="text-sm text-gray-600">Current Role</div>
                <div className="font-medium text-gray-900">{userProfile.currentRole}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Experience</div>
                <div className="font-medium text-gray-900">{userProfile.experience}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Top Skills</div>
                <div className="font-medium text-gray-900">{userProfile.skills.slice(0, 2).join(', ')}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Career Goal</div>
                <div className="font-medium text-gray-900">Senior Level</div>
              </div>
            </div>
          </div>
        </div>

        {/* Career Path Options */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {careerPaths.map((path, index) => (
            <div
              key={path.id}
              onClick={() => setSelectedPath(index)}
              className={`bg-white rounded-2xl shadow-lg p-6 cursor-pointer transition-all hover:shadow-xl ${
                selectedPath === index ? 'ring-2 ring-blue-500 bg-blue-50' : ''
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">{path.title}</h3>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getMatchColor(path.match)}`}>
                  {path.match}% match
                </span>
              </div>

              <p className="text-gray-600 mb-4">{path.description}</p>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    Timeline
                  </span>
                  <span className="font-medium">{path.timeToAchieve}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-600 flex items-center">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Salary Increase
                  </span>
                  <span className="font-medium text-green-600">{path.salaryIncrease}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-600 flex items-center">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Demand
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDemandColor(path.demandLevel)}`}>
                    {path.demandLevel}
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="text-sm text-gray-600 mb-2">Top Companies</div>
                <div className="flex flex-wrap gap-1">
                  {path.companies.slice(0, 3).map((company, idx) => (
                    <span key={idx} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                      {company}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Path View */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              {selectedCareerPath.title} - Detailed Roadmap
            </h2>
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors font-semibold"
            >
              {showDetails ? 'Hide Details' : 'Show Details'}
            </button>
          </div>

          {/* Salary Progression */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="text-sm text-gray-600 mb-2">Current Salary</div>
              <div className="text-2xl font-bold text-gray-900">{selectedCareerPath.currentSalary}</div>
            </div>
            <div className="bg-blue-50 rounded-xl p-6">
              <div className="text-sm text-blue-600 mb-2">Target Salary</div>
              <div className="text-2xl font-bold text-blue-600">{selectedCareerPath.targetSalary}</div>
            </div>
            <div className="bg-green-50 rounded-xl p-6">
              <div className="text-sm text-green-600 mb-2">Salary Increase</div>
              <div className="text-2xl font-bold text-green-600">{selectedCareerPath.salaryIncrease}</div>
            </div>
          </div>

          {/* Roadmap Phases */}
          <div className="space-y-8">
            {selectedCareerPath.roadmap.map((phase, index) => (
              <div key={index} className="border border-gray-200 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">{phase.phase}</h3>
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                    {phase.duration}
                  </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Skills */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                      <Target className="h-4 w-4 mr-2" />
                      Skills to Learn
                    </h4>
                    <div className="space-y-2">
                      {phase.skills.map((skill, skillIndex) => (
                        <div key={skillIndex} className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                          <span className="text-gray-700">{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Courses */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Recommended Courses
                    </h4>
                    <div className="space-y-2">
                      {phase.courses.map((course, courseIndex) => (
                        <div key={courseIndex} className="bg-gray-50 rounded-lg p-3">
                          <div className="font-medium text-gray-900 text-sm">{course.title}</div>
                          <div className="text-xs text-gray-600 mt-1">
                            {course.provider} • {course.duration}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Projects */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                      <Lightbulb className="h-4 w-4 mr-2" />
                      Practice Projects
                    </h4>
                    <div className="space-y-2">
                      {phase.projects.map((project, projectIndex) => (
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

          {/* Benefits and Challenges */}
          {showDetails && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <div>
                <h3 className="text-lg font-semibold text-green-700 mb-4 flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Benefits & Opportunities
                </h3>
                <ul className="space-y-2">
                  {selectedCareerPath.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-orange-700 mb-4 flex items-center">
                  <Target className="h-5 w-5 mr-2" />
                  Challenges & Considerations
                </h3>
                <ul className="space-y-2">
                  {selectedCareerPath.challenges.map((challenge, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-700">{challenge}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-8 border-t border-gray-200">
            <button className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-xl hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center">
              <Calendar className="h-5 w-5 mr-2" />
              Create Learning Plan
            </button>
            <button className="flex-1 bg-green-600 text-white py-3 px-6 rounded-xl hover:bg-green-700 transition-colors font-semibold flex items-center justify-center">
              <BookOpen className="h-5 w-5 mr-2" />
              Browse Courses
            </button>
            <button className="flex-1 bg-purple-600 text-white py-3 px-6 rounded-xl hover:bg-purple-700 transition-colors font-semibold flex items-center justify-center">
              <Users className="h-5 w-5 mr-2" />
              Find Mentors
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerPathRecommendation;