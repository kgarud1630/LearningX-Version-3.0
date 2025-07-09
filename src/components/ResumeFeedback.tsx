import React, { useState } from 'react';
import { 
  Upload, FileText, Download, Star, AlertCircle, CheckCircle, 
  TrendingUp, User, Briefcase, GraduationCap, Award, 
  Eye, Edit, RefreshCw, Target, Lightbulb, Zap
} from 'lucide-react';

const ResumeFeedback = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(true); // Set to true to show demo results

  const analysisResults = {
    overallScore: 78,
    grade: 'B+',
    strengths: [
      'Strong technical skills section',
      'Relevant work experience',
      'Clear and professional formatting',
      'Good use of action verbs'
    ],
    improvements: [
      'Add quantifiable achievements',
      'Include more relevant keywords',
      'Expand on project descriptions',
      'Add a professional summary'
    ],
    sections: {
      contact: { score: 85, status: 'good', feedback: 'Complete contact information with professional email' },
      summary: { score: 60, status: 'needs_improvement', feedback: 'Consider adding a compelling professional summary' },
      experience: { score: 80, status: 'good', feedback: 'Good experience section, add more quantifiable results' },
      education: { score: 90, status: 'excellent', feedback: 'Well-structured education section' },
      skills: { score: 75, status: 'good', feedback: 'Relevant skills listed, consider organizing by category' },
      projects: { score: 70, status: 'needs_improvement', feedback: 'Add more technical project details and outcomes' }
    },
    keywords: {
      found: ['JavaScript', 'React', 'Node.js', 'Python', 'Git', 'Agile'],
      missing: ['TypeScript', 'AWS', 'Docker', 'CI/CD', 'Testing', 'API Development'],
      score: 65
    },
    atsCompatibility: 82,
    recommendations: [
      {
        type: 'critical',
        title: 'Add Quantifiable Achievements',
        description: 'Include specific numbers, percentages, or metrics to demonstrate your impact',
        example: 'Instead of "Improved website performance" write "Improved website performance by 40%, reducing load time from 3s to 1.8s"'
      },
      {
        type: 'important',
        title: 'Include Missing Keywords',
        description: 'Add relevant industry keywords to improve ATS compatibility',
        keywords: ['TypeScript', 'AWS', 'Docker']
      },
      {
        type: 'suggestion',
        title: 'Enhance Project Descriptions',
        description: 'Provide more details about your projects including technologies used and outcomes achieved'
      }
    ]
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;
    
    setIsAnalyzing(true);
    // Simulate analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
    }, 3000);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-green-100';
    if (score >= 60) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'excellent':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'good':
        return <CheckCircle className="h-5 w-5 text-blue-600" />;
      case 'needs_improvement':
        return <AlertCircle className="h-5 w-5 text-yellow-600" />;
      default:
        return <AlertCircle className="h-5 w-5 text-red-600" />;
    }
  };

  const getRecommendationIcon = (type: string) => {
    switch (type) {
      case 'critical':
        return <AlertCircle className="h-5 w-5 text-red-600" />;
      case 'important':
        return <TrendingUp className="h-5 w-5 text-yellow-600" />;
      default:
        return <Lightbulb className="h-5 w-5 text-blue-600" />;
    }
  };

  if (!showResults) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Resume Feedback & Analysis
            </h1>
            <p className="text-lg text-gray-600">
              Get AI-powered insights to improve your resume and increase your chances of landing interviews
            </p>
          </div>

          {/* Upload Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Upload Your Resume</h3>
            
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-blue-400 transition-colors">
              <input
                type="file"
                onChange={handleFileSelect}
                className="hidden"
                id="resume-upload"
                accept=".pdf,.doc,.docx"
              />
              <label htmlFor="resume-upload" className="cursor-pointer">
                <Upload className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <div className="text-xl font-medium text-gray-900 mb-2">
                  {selectedFile ? selectedFile.name : 'Choose your resume file'}
                </div>
                <div className="text-gray-500">
                  PDF, DOC, or DOCX up to 10MB
                </div>
              </label>
            </div>

            {selectedFile && (
              <div className="mt-6 flex items-center justify-between p-4 bg-blue-50 rounded-xl">
                <div className="flex items-center">
                  <FileText className="h-8 w-8 text-blue-600 mr-3" />
                  <div>
                    <div className="font-medium text-gray-900">{selectedFile.name}</div>
                    <div className="text-sm text-gray-600">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                  className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 disabled:bg-blue-400 transition-colors font-semibold flex items-center"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Zap className="h-5 w-5 mr-2" />
                      Analyze Resume
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-xl mb-4">
                <Target className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">ATS Optimization</h3>
              <p className="text-gray-600">Ensure your resume passes Applicant Tracking Systems</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl mb-4">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Performance Score</h3>
              <p className="text-gray-600">Get detailed scoring across all resume sections</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-xl mb-4">
                <Lightbulb className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Smart Suggestions</h3>
              <p className="text-gray-600">Receive actionable recommendations for improvement</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl mr-4">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Resume Analysis Results</h1>
                <p className="text-gray-600">Comprehensive feedback for your resume</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center">
                <Download className="h-4 w-4 mr-2" />
                Download Report
              </button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center">
                <RefreshCw className="h-4 w-4 mr-2" />
                Analyze Again
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Results */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overall Score */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Overall Assessment</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${getScoreBgColor(analysisResults.overallScore)} mb-4`}>
                    <span className={`text-2xl font-bold ${getScoreColor(analysisResults.overallScore)}`}>
                      {analysisResults.overallScore}
                    </span>
                  </div>
                  <div className="text-lg font-semibold text-gray-900">Overall Score</div>
                  <div className="text-gray-600">Grade: {analysisResults.grade}</div>
                </div>

                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-100 mb-4">
                    <span className="text-2xl font-bold text-blue-600">{analysisResults.atsCompatibility}%</span>
                  </div>
                  <div className="text-lg font-semibold text-gray-900">ATS Compatible</div>
                  <div className="text-gray-600">Applicant Tracking</div>
                </div>

                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-purple-100 mb-4">
                    <span className="text-2xl font-bold text-purple-600">{analysisResults.keywords.score}%</span>
                  </div>
                  <div className="text-lg font-semibold text-gray-900">Keyword Match</div>
                  <div className="text-gray-600">Industry Relevance</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-green-700 mb-3 flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Strengths
                  </h4>
                  <ul className="space-y-2">
                    {analysisResults.strengths.map((strength, index) => (
                      <li key={index} className="text-gray-700 flex items-start">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        {strength}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-orange-700 mb-3 flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2" />
                    Areas for Improvement
                  </h4>
                  <ul className="space-y-2">
                    {analysisResults.improvements.map((improvement, index) => (
                      <li key={index} className="text-gray-700 flex items-start">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        {improvement}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Section Analysis */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Section-by-Section Analysis</h3>
              
              <div className="space-y-4">
                {Object.entries(analysisResults.sections).map(([section, data]) => (
                  <div key={section} className="border border-gray-200 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        {getStatusIcon(data.status)}
                        <h4 className="font-semibold text-gray-900 ml-3 capitalize">
                          {section.replace('_', ' ')}
                        </h4>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreBgColor(data.score)} ${getScoreColor(data.score)}`}>
                        {data.score}/100
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm">{data.feedback}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Detailed Recommendations</h3>
              
              <div className="space-y-6">
                {analysisResults.recommendations.map((rec, index) => (
                  <div key={index} className="border border-gray-200 rounded-xl p-6">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mr-4">
                        {getRecommendationIcon(rec.type)}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-2">{rec.title}</h4>
                        <p className="text-gray-600 mb-3">{rec.description}</p>
                        
                        {rec.example && (
                          <div className="bg-gray-50 rounded-lg p-3 text-sm">
                            <div className="font-medium text-gray-700 mb-1">Example:</div>
                            <div className="text-gray-600">{rec.example}</div>
                          </div>
                        )}
                        
                        {rec.keywords && (
                          <div className="flex flex-wrap gap-2 mt-3">
                            {rec.keywords.map((keyword, idx) => (
                              <span key={idx} className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                                {keyword}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Keywords Analysis */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Keywords Analysis</h3>
              
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Match Score</span>
                  <span className="font-medium">{analysisResults.keywords.score}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${analysisResults.keywords.score}%` }}
                  ></div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-green-700 mb-2">Found Keywords</h4>
                  <div className="flex flex-wrap gap-1">
                    {analysisResults.keywords.found.map((keyword, index) => (
                      <span key={index} className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-red-700 mb-2">Missing Keywords</h4>
                  <div className="flex flex-wrap gap-1">
                    {analysisResults.keywords.missing.map((keyword, index) => (
                      <span key={index} className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs">
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              
              <div className="space-y-3">
                <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-xl hover:bg-blue-700 transition-colors font-medium flex items-center">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Resume
                </button>
                
                <button className="w-full bg-green-600 text-white py-3 px-4 rounded-xl hover:bg-green-700 transition-colors font-medium flex items-center">
                  <Download className="h-4 w-4 mr-2" />
                  Download Optimized
                </button>
                
                <button className="w-full bg-purple-600 text-white py-3 px-4 rounded-xl hover:bg-purple-700 transition-colors font-medium flex items-center">
                  <Eye className="h-4 w-4 mr-2" />
                  Preview Changes
                </button>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
              <h3 className="text-lg font-semibold mb-4">Pro Tips</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <Star className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                  Tailor your resume for each job application
                </li>
                <li className="flex items-start">
                  <Star className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                  Use action verbs to start bullet points
                </li>
                <li className="flex items-start">
                  <Star className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                  Keep your resume to 1-2 pages maximum
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeFeedback;