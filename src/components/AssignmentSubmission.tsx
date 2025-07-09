import React, { useState } from 'react';
import { Upload, FileText, Calendar, Clock, CheckCircle, AlertCircle, Download } from 'lucide-react';

const AssignmentSubmission = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [submissionText, setSubmissionText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const assignment = {
    title: "React Component Architecture Project",
    description: "Build a complete e-commerce product page using React components with proper state management and responsive design.",
    dueDate: "2024-02-15",
    maxPoints: 100,
    submissionFormat: ["PDF", "ZIP", "DOC"],
    instructions: [
      "Create a responsive product page component",
      "Implement add to cart functionality",
      "Include proper error handling",
      "Write unit tests for key components",
      "Submit source code and documentation"
    ]
  };

  const previousSubmissions = [
    {
      id: 1,
      submittedAt: "2024-01-20T14:30:00",
      fileName: "react-project-v1.zip",
      status: "graded",
      score: 85,
      feedback: "Great work on component structure. Consider improving error handling."
    },
    {
      id: 2,
      submittedAt: "2024-01-22T16:45:00",
      fileName: "react-project-v2.zip",
      status: "pending",
      score: null,
      feedback: null
    }
  ];

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSelectedFile(null);
      setSubmissionText('');
    }, 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'graded': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'late': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{assignment.title}</h1>
              <p className="text-lg text-gray-600">{assignment.description}</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Due Date</div>
              <div className="flex items-center text-lg font-semibold text-red-600">
                <Calendar className="h-5 w-5 mr-2" />
                {new Date(assignment.dueDate).toLocaleDateString()}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 rounded-xl p-4">
              <div className="text-sm text-blue-600 font-medium">Max Points</div>
              <div className="text-2xl font-bold text-blue-700">{assignment.maxPoints}</div>
            </div>
            <div className="bg-green-50 rounded-xl p-4">
              <div className="text-sm text-green-600 font-medium">Time Remaining</div>
              <div className="text-2xl font-bold text-green-700">5 days</div>
            </div>
            <div className="bg-purple-50 rounded-xl p-4">
              <div className="text-sm text-purple-600 font-medium">Submissions</div>
              <div className="text-2xl font-bold text-purple-700">{previousSubmissions.length}</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Instructions */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Instructions</h3>
              <ul className="space-y-3">
                {assignment.instructions.map((instruction, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{instruction}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Accepted Formats</h3>
              <div className="flex flex-wrap gap-2">
                {assignment.submissionFormat.map((format) => (
                  <span key={format} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    {format}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Submission Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Submit Assignment</h3>
              
              {/* File Upload */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload File
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors">
                  <input
                    type="file"
                    onChange={handleFileSelect}
                    className="hidden"
                    id="file-upload"
                    accept=".pdf,.zip,.doc,.docx"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <div className="text-lg font-medium text-gray-900 mb-2">
                      {selectedFile ? selectedFile.name : 'Choose a file to upload'}
                    </div>
                    <div className="text-sm text-gray-500">
                      PDF, ZIP, DOC up to 50MB
                    </div>
                  </label>
                </div>
              </div>

              {/* Text Submission */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Comments (Optional)
                </label>
                <textarea
                  value={submissionText}
                  onChange={(e) => setSubmissionText(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="Add any comments or notes about your submission..."
                />
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={!selectedFile || isSubmitting}
                className="w-full bg-blue-600 text-white py-4 px-6 rounded-xl hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-semibold text-lg flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <Upload className="h-5 w-5 mr-2" />
                    Submit Assignment
                  </>
                )}
              </button>
            </div>

            {/* Previous Submissions */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Previous Submissions</h3>
              
              {previousSubmissions.length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No previous submissions</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {previousSubmissions.map((submission) => (
                    <div key={submission.id} className="border border-gray-200 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <FileText className="h-5 w-5 text-gray-400 mr-3" />
                          <span className="font-medium text-gray-900">{submission.fileName}</span>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(submission.status)}`}>
                          {submission.status}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Submitted:</span>
                          <div className="font-medium">{new Date(submission.submittedAt).toLocaleString()}</div>
                        </div>
                        {submission.score && (
                          <div>
                            <span className="text-gray-500">Score:</span>
                            <div className="font-medium text-green-600">{submission.score}/{assignment.maxPoints}</div>
                          </div>
                        )}
                        <div className="flex items-center">
                          <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center">
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </button>
                        </div>
                      </div>
                      
                      {submission.feedback && (
                        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                          <div className="text-sm text-gray-500 mb-1">Instructor Feedback:</div>
                          <div className="text-gray-700">{submission.feedback}</div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignmentSubmission;