import { BookOpen, Users, BarChart3, MessageSquare, Shield, Settings, FileText, Code, Database, Lock, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Documentation = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black">
      {/* Header */}
      <header className="bg-gray-800/50 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-white">HomeworkHub Documentation</span>
            </div>
            <Link 
              to="/landing" 
              className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors duration-200"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <nav className="sticky top-8 space-y-4">
              <div className="bg-gray-800/50 rounded-lg p-4">
                <h3 className="text-white font-semibold mb-3">Quick Start</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="#getting-started" className="text-gray-300 hover:text-white">Getting Started</a></li>
                  <li><a href="#user-roles" className="text-gray-300 hover:text-white">User Roles</a></li>
                  <li><a href="#features" className="text-gray-300 hover:text-white">Features</a></li>
                </ul>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-4">
                <h3 className="text-white font-semibold mb-3">User Guides</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="#student-guide" className="text-gray-300 hover:text-white">Student Guide</a></li>
                  <li><a href="#teacher-guide" className="text-gray-300 hover:text-white">Teacher Guide</a></li>
                  <li><a href="#admin-guide" className="text-gray-300 hover:text-white">Admin Guide</a></li>
                </ul>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-4">
                <h3 className="text-white font-semibold mb-3">Technical</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="#api" className="text-gray-300 hover:text-white">API Reference</a></li>
                  <li><a href="#security" className="text-gray-300 hover:text-white">Security</a></li>
                </ul>
              </div>
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-12">
            {/* Getting Started */}
            <section id="getting-started" className="bg-gray-800/30 rounded-lg p-8">
              <div className="flex items-center mb-6">
                <BookOpen className="h-8 w-8 text-indigo-500 mr-3" />
                <h2 className="text-3xl font-bold text-white">Getting Started</h2>
              </div>
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 text-lg mb-6">
                  Welcome to HomeworkHub! This comprehensive platform streamlines homework management for educational institutions.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gray-700/50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-white mb-3">1. Create Account</h3>
                    <p className="text-gray-300">Sign up with your email and choose your role (Student, Teacher, or Admin).</p>
                  </div>
                  <div className="bg-gray-700/50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-white mb-3">2. Set Up Profile</h3>
                    <p className="text-gray-300">Complete your profile with necessary information and preferences.</p>
                  </div>
                  <div className="bg-gray-700/50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-white mb-3">3. Join Classes</h3>
                    <p className="text-gray-300">Students join classes, Teachers create them, Admins manage institutions.</p>
                  </div>
                  <div className="bg-gray-700/50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-white mb-3">4. Start Managing</h3>
                    <p className="text-gray-300">Begin creating, assigning, and tracking homework assignments.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* User Roles */}
            <section id="user-roles" className="bg-gray-800/30 rounded-lg p-8">
              <div className="flex items-center mb-6">
                <Users className="h-8 w-8 text-blue-500 mr-3" />
                <h2 className="text-3xl font-bold text-white">User Roles</h2>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-blue-600/20 p-6 rounded-lg border border-blue-500/30">
                  <Users className="h-12 w-12 text-blue-400 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-3">Students</h3>
                  <ul className="text-gray-300 space-y-2">
                    <li>• Submit homework assignments</li>
                    <li>• Track progress and grades</li>
                    <li>• Participate in discussions</li>
                    <li>• Receive notifications</li>
                  </ul>
                </div>
                <div className="bg-indigo-600/20 p-6 rounded-lg border border-indigo-500/30">
                  <BookOpen className="h-12 w-12 text-indigo-400 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-3">Teachers</h3>
                  <ul className="text-gray-300 space-y-2">
                    <li>• Create and assign homework</li>
                    <li>• Grade submissions</li>
                    <li>• Monitor student progress</li>
                    <li>• Manage class discussions</li>
                  </ul>
                </div>
                <div className="bg-purple-600/20 p-6 rounded-lg border border-purple-500/30">
                  <Shield className="h-12 w-12 text-purple-400 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-3">Admins</h3>
                  <ul className="text-gray-300 space-y-2">
                    <li>• Manage users and permissions</li>
                    <li>• View system analytics</li>
                    <li>• Configure institution settings</li>
                    <li>• Monitor platform usage</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Features */}
            <section id="features" className="bg-gray-800/30 rounded-lg p-8">
              <div className="flex items-center mb-6">
                <Settings className="h-8 w-8 text-green-500 mr-3" />
                <h2 className="text-3xl font-bold text-white">Key Features</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <FileText className="h-6 w-6 text-green-400 mt-1" />
                    <div>
                      <h4 className="text-lg font-semibold text-white">Assignment Management</h4>
                      <p className="text-gray-300">Create, distribute, and track homework assignments with file attachments and due dates.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <BarChart3 className="h-6 w-6 text-blue-400 mt-1" />
                    <div>
                      <h4 className="text-lg font-semibold text-white">Analytics Dashboard</h4>
                      <p className="text-gray-300">Comprehensive insights into student performance and engagement metrics.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <MessageSquare className="h-6 w-6 text-purple-400 mt-1" />
                    <div>
                      <h4 className="text-lg font-semibold text-white">Discussion Forums</h4>
                      <p className="text-gray-300">Interactive Q&A discussions with upvoting and teacher moderation.</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Database className="h-6 w-6 text-yellow-400 mt-1" />
                    <div>
                      <h4 className="text-lg font-semibold text-white">File Management</h4>
                      <p className="text-gray-300">Secure file upload, storage, and sharing for assignments and resources.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Lock className="h-6 w-6 text-red-400 mt-1" />
                    <div>
                      <h4 className="text-lg font-semibold text-white">Security & Privacy</h4>
                      <p className="text-gray-300">Enterprise-grade security with role-based access control and data encryption.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Code className="h-6 w-6 text-indigo-400 mt-1" />
                    <div>
                      <h4 className="text-lg font-semibold text-white">API Integration</h4>
                      <p className="text-gray-300">RESTful API for custom integrations and third-party applications.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Student Guide */}
            <section id="student-guide" className="bg-gray-800/30 rounded-lg p-8">
              <h2 className="text-3xl font-bold text-white mb-6">Student Guide</h2>
              <div className="space-y-6">
                <div className="bg-gray-700/50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-white mb-3">Submitting Homework</h3>
                  <ol className="text-gray-300 space-y-2 list-decimal list-inside">
                    <li>Navigate to your dashboard and select the assignment</li>
                    <li>Upload your files or enter text responses</li>
                    <li>Review your submission before finalizing</li>
                    <li>Click "Submit" to complete the assignment</li>
                  </ol>
                </div>
                <div className="bg-gray-700/50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-white mb-3">Tracking Progress</h3>
                  <p className="text-gray-300">
                    View your grades, feedback, and overall progress in the Analytics section. 
                    Track completion rates and identify areas for improvement.
                  </p>
                </div>
              </div>
            </section>

            {/* Teacher Guide */}
            <section id="teacher-guide" className="bg-gray-800/30 rounded-lg p-8">
              <h2 className="text-3xl font-bold text-white mb-6">Teacher Guide</h2>
              <div className="space-y-6">
                <div className="bg-gray-700/50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-white mb-3">Creating Assignments</h3>
                  <ol className="text-gray-300 space-y-2 list-decimal list-inside">
                    <li>Click "Create Homework" from your dashboard</li>
                    <li>Fill in assignment details, instructions, and due date</li>
                    <li>Attach any necessary files or resources</li>
                    <li>Select target students or classes</li>
                    <li>Publish the assignment</li>
                  </ol>
                </div>
                <div className="bg-gray-700/50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-white mb-3">Grading & Feedback</h3>
                  <p className="text-gray-300">
                    Review student submissions, provide grades and detailed feedback. 
                    Use the analytics dashboard to identify students who need additional support.
                  </p>
                </div>
              </div>
            </section>

            {/* Admin Guide */}
            <section id="admin-guide" className="bg-gray-800/30 rounded-lg p-8">
              <h2 className="text-3xl font-bold text-white mb-6">Admin Guide</h2>
              <div className="space-y-6">
                <div className="bg-gray-700/50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-white mb-3">User Management</h3>
                  <p className="text-gray-300">
                    Create and manage user accounts, assign roles, and configure permissions. 
                    Monitor user activity and manage institutional settings.
                  </p>
                </div>
                <div className="bg-gray-700/50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-white mb-3">System Analytics</h3>
                  <p className="text-gray-300">
                    Access comprehensive analytics including platform usage, performance metrics, 
                    and institutional insights to make data-driven decisions.
                  </p>
                </div>
              </div>
            </section>

            {/* API Reference */}
            <section id="api" className="bg-gray-800/30 rounded-lg p-8">
              <h2 className="text-3xl font-bold text-white mb-6">API Reference</h2>
              <div className="bg-gray-900/50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-white mb-4">Base URL</h3>
                <code className="text-green-400 bg-gray-800 px-3 py-1 rounded">
                  https://api.homeworkhub.com/v1
                </code>
                <h3 className="text-xl font-semibold text-white mb-4 mt-6">Authentication</h3>
                <p className="text-gray-300 mb-4">All API requests require authentication using JWT tokens:</p>
                <code className="text-green-400 bg-gray-800 px-3 py-1 rounded block">
                  Authorization: Bearer &lt;your-jwt-token&gt;
                </code>
                <h3 className="text-xl font-semibold text-white mb-4 mt-6">Common Endpoints</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <span className="bg-blue-600 text-white px-2 py-1 rounded text-sm">GET</span>
                    <code className="text-gray-300">/homework</code>
                    <span className="text-gray-400">- Get all homework assignments</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="bg-green-600 text-white px-2 py-1 rounded text-sm">POST</span>
                    <code className="text-gray-300">/homework</code>
                    <span className="text-gray-400">- Create new homework</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="bg-blue-600 text-white px-2 py-1 rounded text-sm">GET</span>
                    <code className="text-gray-300">/users/profile</code>
                    <span className="text-gray-400">- Get user profile</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Security */}
            <section id="security" className="bg-gray-800/30 rounded-lg p-8">
              <h2 className="text-3xl font-bold text-white mb-6">Security</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-700/50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-white mb-3">Data Protection</h3>
                  <ul className="text-gray-300 space-y-2">
                    <li>• End-to-end encryption</li>
                    <li>• Secure file storage</li>
                    <li>• Regular security audits</li>
                    <li>• GDPR compliance</li>
                  </ul>
                </div>
                <div className="bg-gray-700/50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-white mb-3">Access Control</h3>
                  <ul className="text-gray-300 space-y-2">
                    <li>• Role-based permissions</li>
                    <li>• Multi-factor authentication</li>
                    <li>• Session management</li>
                    <li>• Audit logging</li>
                  </ul>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documentation;