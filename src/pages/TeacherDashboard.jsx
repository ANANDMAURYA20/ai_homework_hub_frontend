import { useState, useEffect } from "react";
import { homeworkApi, authApi } from "../api/client";
import { useAuth } from "../context/AuthContext";
import HomeworkForm from "../sections/HomeworkForm";
import ClassSelector from "../components/ClassSelector";
import NotesManager from "../components/NotesManager";

// Lucide React Icons
import {
  PlusCircle,
  BookOpen,
  BarChart3,
  FileText,
  UploadCloud,
  Star,
  Clock,
  Trash2,
  Eye,
  Paperclip,
  Loader2,
  X,
  UserCog,
} from "lucide-react";

export default function TeacherDashboard() {
  const { currentClass } = useAuth();
  const [homework, setHomework] = useState([]);

  const [submissions, setSubmissions] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedHomework, setSelectedHomework] = useState(null);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [showSubmissionDetail, setShowSubmissionDetail] = useState(false);
  const [pendingApprovals, setPendingApprovals] = useState([]);
  const [activeTab, setActiveTab] = useState('homework');

  useEffect(() => {
    loadData();
  }, [currentClass]);

  const loadData = async () => {
    try {
      const params = currentClass ? { class: currentClass } : {};
      const [hwRes, approvalsRes] = await Promise.all([
        homeworkApi.list(params),
        authApi.get('/teacher/pending-approvals').catch(() => ({ data: [] })),
      ]);
      setHomework(hwRes.data);
      setPendingApprovals(approvalsRes.data);
      
      // Auto-load all submissions
      if (hwRes.data.length > 0) {
        const submissionPromises = hwRes.data.map(async (hw) => {
          const { data } = await homeworkApi.getSubmissions(hw._id);
          return { homeworkId: hw._id, submissions: data };
        });
        const results = await Promise.all(submissionPromises);
        const submissionsMap = {};
        results.forEach(({ homeworkId, submissions }) => {
          submissionsMap[homeworkId] = submissions;
        });
        setSubmissions(submissionsMap);
      }
    } catch (error) {
      console.error("Failed to load data:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadSubmissions = async (homeworkId) => {
    try {
      const { data } = await homeworkApi.getSubmissions(homeworkId);
      setSubmissions((prev) => ({ ...prev, [homeworkId]: data }));
      setSelectedHomework(homeworkId);
    } catch (error) {
      console.error("Failed to load submissions:", error);
    }
  };

  const gradeSubmission = async (submissionId, grade, feedback) => {
    try {
      await homeworkApi.gradeSubmission(submissionId, { grade, feedback });
      // Reload all submissions to update the graded submission
      const submissionPromises = homework.map(async (hw) => {
        const { data } = await homeworkApi.getSubmissions(hw._id);
        return { homeworkId: hw._id, submissions: data };
      });
      const results = await Promise.all(submissionPromises);
      const submissionsMap = {};
      results.forEach(({ homeworkId, submissions }) => {
        submissionsMap[homeworkId] = submissions;
      });
      setSubmissions(submissionsMap);
      setShowSubmissionDetail(false);
      setSelectedSubmission(null);
    } catch (error) {
      console.error("Failed to grade submission:", error);
    }
  };

  const deleteSubmission = async (submissionId) => {
    if (!confirm("Delete this submission?")) return;
    try {
      await homeworkApi.deleteSubmission(submissionId);
      // Reload all submissions
      const submissionPromises = homework.map(async (hw) => {
        const { data } = await homeworkApi.getSubmissions(hw._id);
        return { homeworkId: hw._id, submissions: data };
      });
      const results = await Promise.all(submissionPromises);
      const submissionsMap = {};
      results.forEach(({ homeworkId, submissions }) => {
        submissionsMap[homeworkId] = submissions;
      });
      setSubmissions(submissionsMap);
      setShowSubmissionDetail(false);
      setSelectedSubmission(null);
    } catch (error) {
      console.error("Failed to delete submission:", error);
    }
  };

  const deleteHomework = async (id) => {
    if (!confirm("Delete this homework?")) return;
    try {
      await homeworkApi.remove(id);
      setHomework((prev) => prev.filter((hw) => hw._id !== id));
    } catch (error) {
      console.error("Failed to delete homework:", error);
    }
  };

  const approveStudent = async (studentId) => {
    try {
      await authApi.patch(`/teacher/users/${studentId}/approve`);
      loadData();
    } catch (error) {
      console.error("Failed to approve student:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-fade-in">
      {/* Header */}
      <div className="p-8 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-700 rounded-2xl shadow-xl text-white relative">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative z-10">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white to-purple-100 bg-clip-text text-transparent">
                Teacher Dashboard
              </h2>
              <p className="text-purple-100 text-lg">
                Manage your classes and assignments effectively.
                {currentClass && (
                  <span className="block text-sm mt-1 text-purple-200">
                    Current Class: {currentClass}
                  </span>
                )}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <ClassSelector />
              <button
                onClick={() => setShowForm(true)}
                className="flex items-center gap-2 px-4 py-2.5 bg-white/20 hover:bg-white/30 text-white rounded-lg font-medium transition-colors duration-200 backdrop-blur-sm"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Create Homework</span>
              </button>
            </div>
          </div>
        </div>
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/5 rounded-full animate-bounce"></div>
      </div>


      {/* Class Context Banner */}
      {currentClass && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start sm:items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
              <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-blue-800">
                Currently viewing: <span className="font-bold">{currentClass}</span>
              </p>
              <p className="text-xs text-blue-600 mt-1">
                All data is filtered for this class only.
              </p>
            </div>
          </div>
        </div>
      )}



      {/* Homework Form */}
      {showForm && (
        <div className="bg-white animate-fade-in border border-gray-200 shadow-sm rounded-xl p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg sm:text-xl font-semibold flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg mr-3">
                <PlusCircle className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
              </div>
              <span className="text-gray-900">
                Create New Homework
              </span>
            </h3>
            <button
              onClick={() => setShowForm(false)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          <HomeworkForm
            onCreated={(hw) => {
              setHomework((prev) => [hw, ...prev]);
              setShowForm(false);
            }}
          />
        </div>
      )}

      {/* Tabs */}
      <div className="flex flex-col sm:flex-row gap-2 bg-gray-50 p-2 rounded-xl mb-6">
        {[
          { key: "homework", label: "Homework", shortLabel: "HW", icon: BookOpen },
          { key: "notes", label: "Class Notes", shortLabel: "Notes", icon: FileText },
          { key: "submissions", label: "Submissions", shortLabel: "Sub", icon: UploadCloud },
          { key: "approvals", label: `Student Approvals (${pendingApprovals.length})`, shortLabel: `Approvals (${pendingApprovals.length})`, icon: UserCog }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center justify-center gap-2 px-3 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-all duration-200 text-sm sm:text-base flex-1 sm:flex-none ${
              activeTab === tab.key
                ? "bg-white text-blue-600 shadow-sm border border-blue-200"
                : "text-gray-600 hover:bg-white/50 hover:text-blue-500"
            }`}
          >
            <tab.icon className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">{tab.label}</span>
            <span className="sm:hidden">{tab.shortLabel}</span>
          </button>
        ))}
      </div>

      {/* Notes Tab */}
      {activeTab === "notes" && (
        <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-4 sm:p-6">
          <NotesManager currentClass={currentClass} />
        </div>
      )}

      {/* Homework Tab */}
      {activeTab === "homework" && (
        <div className="p-6 bg-white rounded-xl shadow-lg">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-indigo-600" />
                Your Homework
              </h2>
              <p className="text-gray-600 text-sm mt-1">Manage and track homework assignments</p>
            </div>
          </div>
          {homework.length === 0 ? (
            <div className="text-center py-12">
              <div className="flex flex-col items-center space-y-4">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                  <BookOpen className="w-8 h-8 text-gray-400" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">No homework created yet</h3>
                  <p className="text-gray-500">Create your first homework assignment to get started!</p>
                </div>
                <button
                  onClick={() => setShowForm(true)}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium rounded-lg shadow hover:shadow-lg transition-all duration-300"
                >
                  Create Your First Homework
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {homework.map((hw) => {
                const isPastDue = new Date(hw.deadline) < new Date();
                const submissionCount = submissions[hw._id]?.length || 0;
                const hasSubmissions = submissionCount > 0;
                const pdfAttachment = hw.attachments?.find(att => att.type === 'pdf');
                const getSubjectColor = (subject) => {
                  const colors = {
                    'Math': 'from-blue-500 to-cyan-500',
                    'Science': 'from-green-500 to-emerald-500', 
                    'English': 'from-purple-500 to-pink-500',
                    'History': 'from-orange-500 to-red-500',
                    'Physics': 'from-indigo-500 to-blue-500',
                    'Chemistry': 'from-teal-500 to-green-500',
                    'Biology': 'from-emerald-500 to-teal-500'
                  };
                  return colors[subject] || 'from-gray-500 to-slate-500';
                };

                return (
                  <div key={hw._id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden border border-gray-100">
                    {/* Thumbnail */}
                    {pdfAttachment ? (
                      <div className="w-full h-32 bg-gray-100 rounded-t-xl flex items-center justify-center relative overflow-hidden">
                        <iframe
                          src={`http://localhost:5000/uploads/${pdfAttachment.path}#toolbar=0&navpanes=0&scrollbar=0`}
                          className="w-full h-full border-0 pointer-events-none"
                          title={pdfAttachment.originalName}
                        />
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                          <div className="bg-white/90 px-2 py-1 rounded text-xs font-medium text-gray-800">
                            <FileText className="w-3 h-3 inline mr-1" />PDF
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className={`w-full h-32 bg-gradient-to-br ${getSubjectColor(hw.subject)} rounded-t-xl flex items-center justify-center relative overflow-hidden`}>
                        <div className="absolute inset-0 bg-black/10"></div>
                        <div className="relative z-10 text-center text-white">
                          <BookOpen className="w-8 h-8 mx-auto mb-2" />
                          <p className="text-sm font-medium truncate px-2">{hw.subject}</p>
                        </div>
                        <div className="absolute -top-4 -right-4 w-16 h-16 bg-white/10 rounded-full"></div>
                        <div className="absolute -bottom-2 -left-2 w-12 h-12 bg-white/5 rounded-full"></div>
                      </div>
                    )}
                    
                    {/* Content */}
                    <div className="p-5">
                      <div className="mb-3">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">{hw.title}</h3>
                          <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                            hasSubmissions ? "bg-green-100 text-green-800" :
                            isPastDue ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"
                          }`}>
                            {hasSubmissions ? <CheckCircle className="w-3 h-3" /> : isPastDue ? <Clock className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-gray-500 mb-2">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {new Date(hw.deadline).toLocaleDateString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <UploadCloud className="w-3 h-3" />
                            {submissionCount} submissions
                          </span>
                        </div>
                      </div>
                      
                      {hw.description && (
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{hw.description}</p>
                      )}
                      
                      {hw.attachments && hw.attachments.length > 0 && (
                        <div className="mb-3">
                          <p className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                            <Paperclip className="w-4 h-4" />
                            Attachments ({hw.attachments.length})
                          </p>
                        </div>
                      )}
                      
                      {/* Action Buttons */}
                      <div className="mt-4 pt-3 border-t border-gray-100 flex gap-2">
                        <button
                          onClick={() => setActiveTab('submissions')}
                          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition"
                        >
                          <Eye className="w-4 h-4" />
                          <span>View</span>
                        </button>
                        <button
                          onClick={() => deleteHomework(hw._id)}
                          className="flex items-center justify-center gap-2 px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Approvals Tab */}
      {activeTab === "approvals" && (
        <div className="p-6 bg-white rounded-xl shadow-lg">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent flex items-center gap-2">
                <UserCog className="w-6 h-6 text-yellow-600" />
                Student Approvals
              </h2>
              <p className="text-gray-600 text-sm mt-1">Review and approve pending student registrations</p>
            </div>
          </div>
          
          {pendingApprovals.length === 0 ? (
            <div className="text-center py-12">
              <div className="flex flex-col items-center space-y-4">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                  <UserCog className="w-8 h-8 text-gray-400" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">No pending approvals</h3>
                  <p className="text-gray-500">All students have been approved or no new registrations</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-yellow-600 text-white">
                  <tr>
                    <th className="px-4 py-2 text-left">Name</th>
                    <th className="px-4 py-2 text-left">Email</th>
                    <th className="px-4 py-2">Class</th>
                    <th className="px-4 py-2">Registered</th>
                    <th className="px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingApprovals.map((student) => (
                    <tr key={student._id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-2 font-medium">{student.name}</td>
                      <td className="px-4 py-2">{student.email}</td>
                      <td className="px-4 py-2">
                        <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded border">
                          {student.class}
                        </span>
                      </td>
                      <td className="px-4 py-2">{new Date(student.createdAt).toLocaleDateString()}</td>
                      <td className="px-4 py-2">
                        <button
                          onClick={() => approveStudent(student._id)}
                          className="px-3 py-1 rounded bg-green-500 text-white text-xs font-medium hover:bg-green-600"
                        >
                          Approve
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Submissions Tab */}
      {activeTab === "submissions" && (
        <div className="p-6 bg-white rounded-xl shadow-lg">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent flex items-center gap-2">
                <UploadCloud className="w-6 h-6 text-green-600" />
                Submissions
              </h2>
              <p className="text-gray-600 text-sm mt-1">Review and grade student submissions</p>
            </div>
          </div>
          
          {homework.length === 0 ? (
            <div className="text-center py-12">
              <div className="flex flex-col items-center space-y-4">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                  <UploadCloud className="w-8 h-8 text-gray-400" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">No submissions yet</h3>
                  <p className="text-gray-500">Create homework assignments to receive submissions</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {homework.map((hw) => {
                const hwSubmissions = submissions[hw._id] || [];
                return (
                  <div key={hw._id} className="border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition">
                    <div className="mb-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="text-xl font-bold text-gray-800">{hw.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">
                            Subject: {hw.subject} • Due: {new Date(hw.deadline).toLocaleDateString()}
                          </p>
                        </div>
                        <span className="bg-blue-100 text-blue-800 font-bold px-4 py-2 rounded-full">
                          {hwSubmissions.length} Submissions
                        </span>
                      </div>
                    </div>
                    
                    {hwSubmissions.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        <UploadCloud className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>No submissions yet</p>
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead className="bg-gray-100">
                            <tr>
                              <th className="px-4 py-3 text-left font-medium text-gray-700">Student</th>
                              <th className="px-4 py-3 text-left font-medium text-gray-700">Submitted</th>
                              <th className="px-4 py-3 text-center font-medium text-gray-700">Status</th>
                              <th className="px-4 py-3 text-center font-medium text-gray-700">Grade</th>
                              <th className="px-4 py-3 text-center font-medium text-gray-700">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {hwSubmissions.map((submission) => (
                              <tr key={submission._id} className="border-b hover:bg-gray-50">
                                <td className="px-4 py-3">
                                  <div className="flex items-center gap-2">
                                    <span className="font-medium text-gray-800">{submission.student.name}</span>
                                    {submission.isEarly && (
                                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">
                                        Early
                                      </span>
                                    )}
                                  </div>
                                </td>
                                <td className="px-4 py-3 text-gray-600">
                                  {new Date(submission.submittedAt).toLocaleDateString()}
                                </td>
                                <td className="px-4 py-3 text-center">
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    submission.grade ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                  }`}>
                                    {submission.grade ? 'Graded' : 'Pending'}
                                  </span>
                                </td>
                                <td className="px-4 py-3 text-center">
                                  {submission.grade ? (
                                    <span className="font-bold text-blue-600">{submission.grade}/100</span>
                                  ) : (
                                    <span className="text-gray-400">-</span>
                                  )}
                                </td>
                                <td className="px-4 py-3">
                                  <div className="flex justify-center gap-2">
                                    <button
                                      onClick={() => {
                                        setSelectedSubmission(submission);
                                        setShowSubmissionDetail(true);
                                      }}
                                      className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-xs font-medium transition"
                                    >
                                      <Eye className="w-3 h-3 inline mr-1" />View
                                    </button>
                                    <button
                                      onClick={() => deleteSubmission(submission._id)}
                                      className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 text-xs font-medium transition"
                                    >
                                      <Trash2 className="w-3 h-3 inline mr-1" />Delete
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Submission Detail Modal */}
      {showSubmissionDetail && selectedSubmission && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-4xl w-full mx-4 shadow-lg max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">
                Submission by {selectedSubmission.student.name}
              </h3>
              <button
                onClick={() => {
                  setShowSubmissionDetail(false);
                  setSelectedSubmission(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Submission Info */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Student:</span>
                    <span className="ml-2">{selectedSubmission.student.name}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Submitted:</span>
                    <span className="ml-2">{new Date(selectedSubmission.submittedAt).toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Status:</span>
                    <span className={`ml-2 px-2 py-1 rounded text-xs font-medium ${
                      selectedSubmission.isEarly ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {selectedSubmission.isEarly ? 'Early Submission' : 'On Time'}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Current Grade:</span>
                    <span className="ml-2">
                      {selectedSubmission.grade ? `${selectedSubmission.grade}/100` : 'Not graded'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Student Notes */}
              {selectedSubmission.notes && (
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Student Notes:</h4>
                  <div className="bg-white p-4 border rounded-lg">
                    <p className="text-gray-600">{selectedSubmission.notes}</p>
                  </div>
                </div>
              )}

              {/* Attachments */}
              {selectedSubmission.attachments && selectedSubmission.attachments.length > 0 && (
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Attachments:</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedSubmission.attachments.map((attachment, index) => (
                      <a
                        key={index}
                        href={`http://localhost:5000/uploads/${attachment.path}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition"
                      >
                        <Paperclip className="w-4 h-4 mr-2" />
                        {attachment.originalName}
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Current Feedback */}
              {selectedSubmission.feedback && (
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Current Feedback:</h4>
                  <div className="bg-green-50 p-4 border border-green-200 rounded-lg">
                    <p className="text-green-700">{selectedSubmission.feedback}</p>
                  </div>
                </div>
              )}

              {/* Grading Section */}
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-medium text-blue-700 mb-3">Grade this Submission:</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Grade (0-100)</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      defaultValue={selectedSubmission.grade || ''}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                      id="modal-grade"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Feedback (optional)</label>
                    <textarea
                      defaultValue={selectedSubmission.feedback || ''}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none h-24"
                      id="modal-feedback"
                      placeholder="Provide feedback to the student..."
                    />
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        const grade = document.getElementById('modal-grade').value;
                        const feedback = document.getElementById('modal-feedback').value;
                        if (grade) gradeSubmission(selectedSubmission._id, grade, feedback);
                      }}
                      className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 font-medium transition"
                    >
                      Submit Grade
                    </button>
                    <button
                      onClick={() => deleteSubmission(selectedSubmission._id)}
                      className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 font-medium transition"
                    >
                      Delete Submission
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

