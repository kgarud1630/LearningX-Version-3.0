import React, { useState } from 'react';
import { Shield, Eye, Download, Trash2, Settings, Lock, Globe, Mail, Bell, Users, Database, FileText, CheckCircle, AlertTriangle, Info, ExternalLink, ToggleLeft as Toggle, Save, RefreshCw } from 'lucide-react';

const GDPRSettings = () => {
  const [activeTab, setActiveTab] = useState('privacy');
  const [settings, setSettings] = useState({
    dataProcessing: {
      essential: true,
      analytics: false,
      marketing: false,
      personalization: true,
      thirdParty: false
    },
    communications: {
      courseUpdates: true,
      promotionalEmails: false,
      weeklyNewsletter: true,
      smsNotifications: false,
      pushNotifications: true
    },
    dataSharing: {
      improvementAnalytics: true,
      marketResearch: false,
      partnerOffers: false,
      publicProfile: false
    },
    retention: {
      accountData: '2-years',
      learningProgress: 'indefinite',
      communicationHistory: '1-year',
      analyticsData: '6-months'
    }
  });

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState('');

  const dataCategories = [
    {
      name: 'Account Information',
      description: 'Name, email, password, profile picture',
      dataPoints: ['Full Name', 'Email Address', 'Profile Photo', 'Account Preferences'],
      retention: '2 years after account deletion',
      purpose: 'Account management and authentication'
    },
    {
      name: 'Learning Data',
      description: 'Course progress, quiz scores, certificates',
      dataPoints: ['Course Enrollments', 'Progress Tracking', 'Quiz Results', 'Certificates Earned'],
      retention: 'Indefinite (for certificate verification)',
      purpose: 'Track learning progress and provide certificates'
    },
    {
      name: 'Usage Analytics',
      description: 'How you interact with our platform',
      dataPoints: ['Page Views', 'Time Spent', 'Feature Usage', 'Device Information'],
      retention: '6 months',
      purpose: 'Improve platform performance and user experience'
    },
    {
      name: 'Communication History',
      description: 'Support tickets, messages, feedback',
      dataPoints: ['Support Conversations', 'Feedback Submissions', 'Forum Posts', 'Direct Messages'],
      retention: '1 year',
      purpose: 'Provide customer support and improve services'
    }
  ];

  const legalBasis = [
    {
      type: 'Legitimate Interest',
      description: 'We process data to improve our services and provide better user experience',
      examples: ['Platform analytics', 'Security monitoring', 'Service optimization']
    },
    {
      type: 'Contractual Necessity',
      description: 'Data processing required to provide the service you signed up for',
      examples: ['Account management', 'Course delivery', 'Certificate generation']
    },
    {
      type: 'Consent',
      description: 'You have explicitly agreed to data processing for specific purposes',
      examples: ['Marketing emails', 'Third-party integrations', 'Optional analytics']
    },
    {
      type: 'Legal Obligation',
      description: 'We are required by law to process certain data',
      examples: ['Tax records', 'Fraud prevention', 'Regulatory compliance']
    }
  ];

  const handleSettingChange = (category: string, setting: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [setting]: value
      }
    }));
  };

  const handleSaveSettings = () => {
    // Save settings logic here
    console.log('Saving settings:', settings);
  };

  const handleDataExport = (type: string) => {
    // Data export logic here
    console.log('Exporting data:', type);
  };

  const handleAccountDeletion = () => {
    if (deleteConfirmation === 'DELETE MY ACCOUNT') {
      // Account deletion logic here
      console.log('Deleting account');
      setShowDeleteModal(false);
    }
  };

  const ToggleSwitch = ({ enabled, onChange }: { enabled: boolean; onChange: (value: boolean) => void }) => (
    <button
      onClick={() => onChange(!enabled)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        enabled ? 'bg-blue-600' : 'bg-gray-300'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl mr-4">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Privacy & Data Settings</h1>
                <p className="text-gray-600">Manage your data privacy preferences and GDPR rights</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={handleSaveSettings}
                className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors font-semibold flex items-center"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-2xl shadow-lg mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'privacy', label: 'Privacy Controls', icon: Shield },
                { id: 'data', label: 'Data Management', icon: Database },
                { id: 'rights', label: 'Your Rights', icon: FileText },
                { id: 'legal', label: 'Legal Basis', icon: Info }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <tab.icon className="h-5 w-5 mr-2" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Privacy Controls Tab */}
            {activeTab === 'privacy' && (
              <div className="space-y-8">
                {/* Data Processing Preferences */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Data Processing Preferences</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">Essential Data Processing</div>
                        <div className="text-sm text-gray-600">Required for basic platform functionality</div>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm text-gray-500 mr-3">Always On</span>
                        <div className="bg-gray-300 rounded-full h-6 w-11 flex items-center">
                          <div className="bg-white h-4 w-4 rounded-full ml-6"></div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">Analytics & Performance</div>
                        <div className="text-sm text-gray-600">Help us improve the platform with usage analytics</div>
                      </div>
                      <ToggleSwitch
                        enabled={settings.dataProcessing.analytics}
                        onChange={(value) => handleSettingChange('dataProcessing', 'analytics', value)}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">Marketing & Promotions</div>
                        <div className="text-sm text-gray-600">Personalized course recommendations and offers</div>
                      </div>
                      <ToggleSwitch
                        enabled={settings.dataProcessing.marketing}
                        onChange={(value) => handleSettingChange('dataProcessing', 'marketing', value)}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">Personalization</div>
                        <div className="text-sm text-gray-600">Customize your learning experience</div>
                      </div>
                      <ToggleSwitch
                        enabled={settings.dataProcessing.personalization}
                        onChange={(value) => handleSettingChange('dataProcessing', 'personalization', value)}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">Third-Party Integrations</div>
                        <div className="text-sm text-gray-600">Share data with integrated services</div>
                      </div>
                      <ToggleSwitch
                        enabled={settings.dataProcessing.thirdParty}
                        onChange={(value) => handleSettingChange('dataProcessing', 'thirdParty', value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Communication Preferences */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Communication Preferences</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">Course Updates</div>
                        <div className="text-sm text-gray-600">Important updates about your enrolled courses</div>
                      </div>
                      <ToggleSwitch
                        enabled={settings.communications.courseUpdates}
                        onChange={(value) => handleSettingChange('communications', 'courseUpdates', value)}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">Promotional Emails</div>
                        <div className="text-sm text-gray-600">Special offers and new course announcements</div>
                      </div>
                      <ToggleSwitch
                        enabled={settings.communications.promotionalEmails}
                        onChange={(value) => handleSettingChange('communications', 'promotionalEmails', value)}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">Weekly Newsletter</div>
                        <div className="text-sm text-gray-600">Learning tips and platform updates</div>
                      </div>
                      <ToggleSwitch
                        enabled={settings.communications.weeklyNewsletter}
                        onChange={(value) => handleSettingChange('communications', 'weeklyNewsletter', value)}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">Push Notifications</div>
                        <div className="text-sm text-gray-600">Browser notifications for important updates</div>
                      </div>
                      <ToggleSwitch
                        enabled={settings.communications.pushNotifications}
                        onChange={(value) => handleSettingChange('communications', 'pushNotifications', value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Data Management Tab */}
            {activeTab === 'data' && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Your Data Categories</h3>
                  <div className="space-y-6">
                    {dataCategories.map((category, index) => (
                      <div key={index} className="border border-gray-200 rounded-xl p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900">{category.name}</h4>
                            <p className="text-gray-600">{category.description}</p>
                          </div>
                          <button
                            onClick={() => handleDataExport(category.name)}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center"
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Export
                          </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <div className="font-medium text-gray-700 mb-2">Data Points</div>
                            <ul className="space-y-1">
                              {category.dataPoints.map((point, idx) => (
                                <li key={idx} className="text-gray-600">• {point}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <div className="font-medium text-gray-700 mb-2">Retention Period</div>
                            <div className="text-gray-600">{category.retention}</div>
                          </div>
                          <div>
                            <div className="font-medium text-gray-700 mb-2">Purpose</div>
                            <div className="text-gray-600">{category.purpose}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Data Export */}
                <div className="bg-blue-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Download className="h-5 w-5 mr-2" />
                    Export All Your Data
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Download a complete copy of all your personal data in a machine-readable format.
                  </p>
                  <button
                    onClick={() => handleDataExport('all')}
                    className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors font-semibold"
                  >
                    Request Data Export
                  </button>
                </div>
              </div>
            )}

            {/* Your Rights Tab */}
            {activeTab === 'rights' && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Your GDPR Rights</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border border-gray-200 rounded-xl p-6">
                      <div className="flex items-center mb-4">
                        <Eye className="h-6 w-6 text-blue-600 mr-3" />
                        <h4 className="text-lg font-semibold text-gray-900">Right to Access</h4>
                      </div>
                      <p className="text-gray-600 mb-4">
                        You have the right to know what personal data we hold about you and how we use it.
                      </p>
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                        Request Access
                      </button>
                    </div>

                    <div className="border border-gray-200 rounded-xl p-6">
                      <div className="flex items-center mb-4">
                        <Settings className="h-6 w-6 text-green-600 mr-3" />
                        <h4 className="text-lg font-semibold text-gray-900">Right to Rectification</h4>
                      </div>
                      <p className="text-gray-600 mb-4">
                        You can request correction of inaccurate or incomplete personal data.
                      </p>
                      <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium">
                        Request Correction
                      </button>
                    </div>

                    <div className="border border-gray-200 rounded-xl p-6">
                      <div className="flex items-center mb-4">
                        <Trash2 className="h-6 w-6 text-red-600 mr-3" />
                        <h4 className="text-lg font-semibold text-gray-900">Right to Erasure</h4>
                      </div>
                      <p className="text-gray-600 mb-4">
                        You can request deletion of your personal data under certain circumstances.
                      </p>
                      <button
                        onClick={() => setShowDeleteModal(true)}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium"
                      >
                        Delete Account
                      </button>
                    </div>

                    <div className="border border-gray-200 rounded-xl p-6">
                      <div className="flex items-center mb-4">
                        <Lock className="h-6 w-6 text-purple-600 mr-3" />
                        <h4 className="text-lg font-semibold text-gray-900">Right to Portability</h4>
                      </div>
                      <p className="text-gray-600 mb-4">
                        You can request your data in a portable format to transfer to another service.
                      </p>
                      <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors font-medium">
                        Export Data
                      </button>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Data Protection Officer</h3>
                  <p className="text-gray-600 mb-4">
                    For any privacy-related questions or to exercise your rights, contact our Data Protection Officer:
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 text-gray-500 mr-2" />
                      <span className="text-gray-700">privacy@learnx.com</span>
                    </div>
                    <div className="flex items-center">
                      <Globe className="h-4 w-4 text-gray-500 mr-2" />
                      <a href="#" className="text-blue-600 hover:text-blue-700">Privacy Policy</a>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Legal Basis Tab */}
            {activeTab === 'legal' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Legal Basis for Data Processing</h3>
                  <p className="text-gray-600 mb-6">
                    Under GDPR, we must have a legal basis for processing your personal data. Here are the legal bases we rely on:
                  </p>
                </div>

                <div className="space-y-6">
                  {legalBasis.map((basis, index) => (
                    <div key={index} className="border border-gray-200 rounded-xl p-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">{basis.type}</h4>
                      <p className="text-gray-600 mb-4">{basis.description}</p>
                      <div>
                        <div className="font-medium text-gray-700 mb-2">Examples:</div>
                        <ul className="space-y-1">
                          {basis.examples.map((example, idx) => (
                            <li key={idx} className="text-gray-600 flex items-center">
                              <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                              {example}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-blue-50 rounded-xl p-6">
                  <div className="flex items-start">
                    <Info className="h-6 w-6 text-blue-600 mr-3 mt-1" />
                    <div>
                      <h4 className="font-semibold text-blue-900 mb-2">Important Note</h4>
                      <p className="text-blue-800">
                        You have the right to object to processing based on legitimate interests. 
                        You can also withdraw consent at any time for processing based on consent.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Account Deletion Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full">
              <div className="flex items-center mb-6">
                <AlertTriangle className="h-8 w-8 text-red-600 mr-3" />
                <h3 className="text-2xl font-semibold text-gray-900">Delete Account</h3>
              </div>
              
              <div className="mb-6">
                <p className="text-gray-600 mb-4">
                  This action cannot be undone. All your data, including course progress and certificates, will be permanently deleted.
                </p>
                <p className="text-gray-600 mb-4">
                  Type <strong>DELETE MY ACCOUNT</strong> to confirm:
                </p>
                <input
                  type="text"
                  value={deleteConfirmation}
                  onChange={(e) => setDeleteConfirmation(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
                  placeholder="DELETE MY ACCOUNT"
                />
              </div>
              
              <div className="flex space-x-4">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-3 px-6 rounded-xl hover:bg-gray-300 transition-colors font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAccountDeletion}
                  disabled={deleteConfirmation !== 'DELETE MY ACCOUNT'}
                  className="flex-1 bg-red-600 text-white py-3 px-6 rounded-xl hover:bg-red-700 disabled:bg-red-300 disabled:cursor-not-allowed transition-colors font-semibold"
                >
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GDPRSettings;