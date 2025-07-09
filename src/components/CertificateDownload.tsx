import React, { useState } from 'react';
import { Download, Share2, Award, Calendar, User, BookOpen, Star, ExternalLink } from 'lucide-react';

const CertificateDownload = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);

  const certificate = {
    id: "CERT-2024-001",
    courseName: "Complete Web Development Bootcamp",
    studentName: "John Doe",
    instructorName: "Sarah Johnson",
    completionDate: "2024-01-15",
    issueDate: "2024-01-16",
    grade: "A+",
    score: 95,
    duration: "52 hours",
    skills: ["HTML5", "CSS3", "JavaScript", "React", "Node.js", "MongoDB"],
    credentialUrl: "https://learnx.com/verify/CERT-2024-001"
  };

  const handleDownload = async (format: string) => {
    setIsDownloading(true);
    // Simulate download
    setTimeout(() => {
      setIsDownloading(false);
    }, 2000);
  };

  const handleShare = (platform: string) => {
    const text = `I just completed "${certificate.courseName}" and earned my certificate! 🎓`;
    const url = certificate.credentialUrl;
    
    switch (platform) {
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&title=${encodeURIComponent(text)}`);
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`);
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`);
        break;
    }
    setShareModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <Award className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Congratulations! 🎉
          </h1>
          <p className="text-lg text-gray-600">
            You've successfully completed the course and earned your certificate
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Certificate Preview */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {/* Certificate Design */}
              <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 p-8 text-white">
                {/* Decorative Elements */}
                <div className="absolute top-4 left-4 w-20 h-20 border-2 border-white opacity-20 rounded-full"></div>
                <div className="absolute bottom-4 right-4 w-16 h-16 border-2 border-white opacity-20 rounded-full"></div>
                <div className="absolute top-1/2 right-8 w-12 h-12 border border-white opacity-10 rotate-45"></div>
                
                <div className="relative z-10 text-center">
                  {/* Header */}
                  <div className="mb-8">
                    <div className="flex items-center justify-center mb-4">
                      <BookOpen className="h-8 w-8 mr-3" />
                      <span className="text-2xl font-bold">LearnX</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-2">Certificate of Completion</h2>
                    <div className="w-24 h-1 bg-white mx-auto"></div>
                  </div>

                  {/* Content */}
                  <div className="mb-8">
                    <p className="text-lg mb-4">This is to certify that</p>
                    <h3 className="text-3xl md:text-4xl font-bold mb-6">{certificate.studentName}</h3>
                    <p className="text-lg mb-2">has successfully completed</p>
                    <h4 className="text-2xl md:text-3xl font-semibold mb-6">{certificate.courseName}</h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold">{certificate.grade}</div>
                        <div className="text-sm opacity-90">Final Grade</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold">{certificate.score}%</div>
                        <div className="text-sm opacity-90">Score</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold">{certificate.duration}</div>
                        <div className="text-sm opacity-90">Duration</div>
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between text-sm">
                    <div>
                      <div className="font-semibold">{certificate.instructorName}</div>
                      <div className="opacity-90">Instructor</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold">Certificate ID</div>
                      <div className="opacity-90">{certificate.id}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{new Date(certificate.completionDate).toLocaleDateString()}</div>
                      <div className="opacity-90">Completion Date</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 bg-gray-50">
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => handleDownload('pdf')}
                    disabled={isDownloading}
                    className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-xl hover:bg-blue-700 disabled:bg-blue-400 transition-colors font-semibold flex items-center justify-center"
                  >
                    {isDownloading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Downloading...
                      </>
                    ) : (
                      <>
                        <Download className="h-5 w-5 mr-2" />
                        Download PDF
                      </>
                    )}
                  </button>
                  
                  <button
                    onClick={() => setShareModalOpen(true)}
                    className="flex-1 bg-green-600 text-white py-3 px-6 rounded-xl hover:bg-green-700 transition-colors font-semibold flex items-center justify-center"
                  >
                    <Share2 className="h-5 w-5 mr-2" />
                    Share Achievement
                  </button>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-4">
                  <button
                    onClick={() => handleDownload('png')}
                    className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors font-medium text-sm"
                  >
                    Download PNG
                  </button>
                  <button
                    onClick={() => handleDownload('jpg')}
                    className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors font-medium text-sm"
                  >
                    Download JPG
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Certificate Details */}
          <div className="space-y-6">
            {/* Course Info */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Course Details</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <BookOpen className="h-5 w-5 text-blue-600 mr-3" />
                  <div>
                    <div className="font-medium text-gray-900">{certificate.courseName}</div>
                    <div className="text-sm text-gray-600">Course Name</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <User className="h-5 w-5 text-green-600 mr-3" />
                  <div>
                    <div className="font-medium text-gray-900">{certificate.instructorName}</div>
                    <div className="text-sm text-gray-600">Instructor</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-purple-600 mr-3" />
                  <div>
                    <div className="font-medium text-gray-900">{new Date(certificate.completionDate).toLocaleDateString()}</div>
                    <div className="text-sm text-gray-600">Completion Date</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-600 mr-3" />
                  <div>
                    <div className="font-medium text-gray-900">{certificate.grade} ({certificate.score}%)</div>
                    <div className="text-sm text-gray-600">Final Grade</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Skills Earned */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Skills Earned</h3>
              <div className="flex flex-wrap gap-2">
                {certificate.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Verification */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Verification</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Certificate ID</div>
                  <div className="font-mono text-sm bg-gray-100 p-2 rounded">{certificate.id}</div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-600 mb-2">Verify Online</div>
                  <a
                    href={certificate.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-600 hover:text-blue-700 font-medium"
                  >
                    <ExternalLink className="h-4 w-4 mr-1" />
                    {certificate.credentialUrl}
                  </a>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-6 text-white">
              <h3 className="text-xl font-semibold mb-4">What's Next?</h3>
              <div className="space-y-3">
                <button className="w-full bg-white bg-opacity-20 hover:bg-opacity-30 py-2 px-4 rounded-lg transition-colors text-left">
                  Explore Advanced Courses
                </button>
                <button className="w-full bg-white bg-opacity-20 hover:bg-opacity-30 py-2 px-4 rounded-lg transition-colors text-left">
                  Join Our Community
                </button>
                <button className="w-full bg-white bg-opacity-20 hover:bg-opacity-30 py-2 px-4 rounded-lg transition-colors text-left">
                  Get Career Guidance
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Share Modal */}
        {shareModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
                Share Your Achievement
              </h3>
              
              <div className="space-y-4">
                <button
                  onClick={() => handleShare('linkedin')}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-xl hover:bg-blue-700 transition-colors font-semibold"
                >
                  Share on LinkedIn
                </button>
                
                <button
                  onClick={() => handleShare('twitter')}
                  className="w-full bg-sky-500 text-white py-3 px-6 rounded-xl hover:bg-sky-600 transition-colors font-semibold"
                >
                  Share on Twitter
                </button>
                
                <button
                  onClick={() => handleShare('facebook')}
                  className="w-full bg-blue-800 text-white py-3 px-6 rounded-xl hover:bg-blue-900 transition-colors font-semibold"
                >
                  Share on Facebook
                </button>
              </div>
              
              <button
                onClick={() => setShareModalOpen(false)}
                className="w-full mt-4 bg-gray-200 text-gray-800 py-3 px-6 rounded-xl hover:bg-gray-300 transition-colors font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CertificateDownload;