import { useState, useEffect } from "react";
import { homeworkApi } from "../api/client";
import { useAuth } from "../context/AuthContext";
import ClassSelector from "../components/ClassSelector";
import NotesViewer from "../components/NotesViewer";
import {
  BookOpen,
  CheckCircle,
  Clock,
  Star,
  Paperclip,
  Calendar,
  User,
  Upload,
  FileText,
  X,
  Download,
  Sparkles,
} from "lucide-react"; 

export default function StudentDashboard() {
  const { user, currentClass } = useAuth();
  const [homework, setHomework] = useState([]);
  const [activeTab, setActiveTab] = useState('assignments');
  const [loading, setLoading] = useState(true);
  const [selectedHomework, setSelectedHomework] = useState(null);
  const [showSubmissionForm, setShowSubmissionForm] = useState(false);
  const [submissionContent, setSubmissionContent] = useState("");
  const [submissionFile, setSubmissionFile] = useState(null);
  const [showSummary, setShowSummary] = useState({});

  useEffect(() => {
    loadData();
  }, [currentClass]);

  const loadData = async () => {
    try {
      const params = currentClass ? { class: currentClass } : {};
      const hwRes = await homeworkApi.list(params);
      setHomework(hwRes.data);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };



  const downloadAttachment = async (homeworkId, attachmentId, filename) => {
    try {
      const response = await homeworkApi.downloadAttachment(homeworkId, attachmentId);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading attachment:', error);
    }
  };

  const submitHomework = async (homeworkId) => {
    try {
      const formData = new FormData();
      if (submissionContent) formData.append("notes", submissionContent);
      if (submissionFile) formData.append("attachments", submissionFile);

      await homeworkApi.submit(homeworkId, formData);
      setShowSubmissionForm(false);
      setSubmissionContent("");
      setSubmissionFile(null);
      setSelectedHomework(null);
      loadData();

    } catch (error) {
      console.error("Error submitting homework:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          <div className="text-lg font-medium text-gray-600">
            Loading Dashboard...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="p-8 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 rounded-2xl shadow-xl text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative z-10">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                Welcome back, {user?.name}! 👋
              </h2>
              <p className="text-blue-100 text-lg">
                Stay on top of your assignments and progress.
                {(currentClass || user?.class) && (
                  <span className="block text-sm mt-1 text-blue-200">
                    Class: {currentClass || user?.class}
                  </span>
                )}
              </p>
            </div>
            <div className="flex items-center">
              <ClassSelector />
            </div>
          </div>
        </div>
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/5 rounded-full animate-bounce"></div>
      </div>

      {/* Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-sm font-medium">Total Assignments</p>
              <p className="text-3xl font-bold text-blue-700 mt-1">
                {homework.length}
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <BookOpen className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 text-sm font-medium">Completed</p>
              <p className="text-3xl font-bold text-green-700 mt-1">
                {homework.filter(hw => hw.completedBy?.includes(user?.id) || !!hw.userSubmission).length}
              </p>
              <p className="text-xs text-green-500 mt-1">
                {homework.length > 0 ? Math.round((homework.filter(hw => hw.completedBy?.includes(user?.id) || !!hw.userSubmission).length / homework.length) * 100) : 0}% completion rate
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>
        </div>
        <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 border border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-600 text-sm font-medium">Pending</p>
              <p className="text-3xl font-bold text-orange-700 mt-1">
                {homework.filter(hw => !hw.completedBy?.includes(user?.id) && !hw.userSubmission && new Date(hw.deadline) > new Date()).length}
              </p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <Clock className="w-8 h-8 text-orange-600" />
            </div>
          </div>
        </div>
        <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 border border-red-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-600 text-sm font-medium">Overdue</p>
              <p className="text-3xl font-bold text-red-700 mt-1">
                {homework.filter(hw => !hw.completedBy?.includes(user?.id) && !hw.userSubmission && new Date(hw.deadline) < new Date()).length}
              </p>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <Clock className="w-8 h-8 text-red-600" />
            </div>
          </div>
        </div>
      </div>



      {/* Deadline Reminders */}
      {homework.filter(hw => {
        const daysUntilDeadline = Math.ceil((new Date(hw.deadline) - new Date()) / (1000 * 60 * 60 * 24));
        return daysUntilDeadline <= 3 && daysUntilDeadline >= 0 && !hw.completedBy?.includes(user?.id) && !hw.userSubmission;
      }).length > 0 && (
        <div className="p-6 bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-yellow-800 flex items-center gap-2">
            <Clock className="w-5 h-5" /> Deadline Reminders
          </h3>
          <div className="space-y-3">
            {homework.filter(hw => {
              const daysUntilDeadline = Math.ceil((new Date(hw.deadline) - new Date()) / (1000 * 60 * 60 * 24));
              return daysUntilDeadline <= 3 && daysUntilDeadline >= 0 && !hw.completedBy?.includes(user?.id) && !hw.userSubmission;
            }).map(hw => {
              const daysUntilDeadline = Math.ceil((new Date(hw.deadline) - new Date()) / (1000 * 60 * 60 * 24));
              const hoursUntilDeadline = Math.ceil((new Date(hw.deadline) - new Date()) / (1000 * 60 * 60));
              
              return (
                <div key={hw._id} className="flex items-center justify-between p-3 bg-white rounded-lg border border-yellow-200">
                  <div>
                    <h4 className="font-medium text-gray-800">{hw.title}</h4>
                    <p className="text-sm text-gray-600">{hw.subject}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-medium ${
                      daysUntilDeadline === 0 ? 'text-red-600' : 
                      daysUntilDeadline === 1 ? 'text-orange-600' : 'text-yellow-600'
                    }`}>
                      {daysUntilDeadline === 0 ? 
                        `Due in ${hoursUntilDeadline}h` : 
                        `Due in ${daysUntilDeadline} day${daysUntilDeadline > 1 ? 's' : ''}`
                      }
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(hw.deadline).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex flex-col sm:flex-row gap-2 bg-gray-50 p-2 rounded-xl mb-6">
        {[
          { key: "assignments", label: "Assignments", icon: BookOpen },
          { key: "notes", label: "Class Notes", icon: FileText }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 text-base flex-1 ${
              activeTab === tab.key
                ? "bg-white text-blue-600 shadow-sm border border-blue-200"
                : "text-gray-600 hover:bg-white/50 hover:text-blue-500"
            }`}
          >
            <tab.icon className="w-5 h-5" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Assignments Tab */}
      {activeTab === "assignments" && (
        <div className="p-6 bg-white rounded-xl shadow-lg">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-indigo-600" />
                Your Assignments
              </h2>
              <p className="text-gray-600 text-sm mt-1">Track and submit your homework assignments</p>
            </div>
          </div>

          {homework.length === 0 ? (
            <div className="text-center py-12">
              <div className="flex flex-col items-center space-y-4">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                  <BookOpen className="w-8 h-8 text-gray-400" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">No assignments found</h3>
                  <p className="text-gray-500">No assignments available yet. Check back later!</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {homework.map((hw) => {
                const isOverdue = new Date(hw.deadline) < new Date();
                const isSubmitted = hw.completedBy?.includes(user?.id) || !!hw.userSubmission;
                const submission = hw.userSubmission;
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
                            📄 PDF
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
                            isSubmitted ? "bg-green-100 text-green-800" :
                            isOverdue ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"
                          }`}>
                            {isSubmitted ? "✓" : isOverdue ? "!" : "⏳"}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-gray-500 mb-2">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(hw.deadline).toLocaleDateString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            {hw.teacher?.name}
                          </span>
                        </div>
                        {submission?.grade && (
                          <div className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full mb-2">
                            Grade: {submission.grade}/100
                          </div>
                        )}
                      </div>
                      
                      {hw.description && (
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{hw.description}</p>
                      )}
                      
                      {hw.aiSummary && (
                        <div className="mb-3">
                          <button
                            onClick={() => setShowSummary(prev => ({ ...prev, [hw._id]: !prev[hw._id] }))}
                            className="flex items-center gap-2 px-3 py-2 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-lg transition-colors mb-2"
                          >
                            <Sparkles className="w-4 h-4" />
                            <span className="text-sm font-medium">AI Summary</span>
                          </button>
                          {showSummary[hw._id] && (
                            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-100">
                              <p className="text-sm text-purple-700 leading-relaxed">{hw.aiSummary}</p>
                            </div>
                          )}
                        </div>
                      )}
                      
                      {hw.attachments && hw.attachments.length > 0 && (
                        <div className="mt-3">
                          <p className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-1">
                            <Download className="w-4 h-4" />
                            Attachments ({hw.attachments.length})
                          </p>
                          <div className="space-y-2">
                            {hw.attachments.map((attachment, index) => (
                              <button
                                key={index}
                                onClick={() => downloadAttachment(hw._id, attachment._id, attachment.originalName)}
                                className={`flex items-center gap-3 p-3 rounded-lg transition-colors border w-full text-left ${
                                  attachment.type === 'pdf' 
                                    ? 'bg-red-50 hover:bg-red-100 border-red-200 text-red-800'
                                    : 'bg-gray-50 hover:bg-gray-100 border-gray-200 text-gray-800'
                                }`}
                              >
                                <span className="text-lg flex-shrink-0">
                                  {attachment.type === 'pdf' ? '📄' : attachment.type === 'image' ? '🖼️' : attachment.type === 'doc' ? '📝' : '📎'}
                                </span>
                                <div className="flex-1 min-w-0">
                                  <p className="font-medium text-sm truncate">{attachment.originalName}</p>
                                  <p className="text-xs opacity-75 capitalize">{attachment.type} file</p>
                                </div>
                                <Download className="w-4 h-4 flex-shrink-0 opacity-60" />
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {submission?.feedback && (
                        <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
                          <p className="text-sm font-medium text-blue-700 mb-1">Teacher Feedback:</p>
                          <p className="text-sm text-blue-600">{submission.feedback}</p>
                        </div>
                      )}
                      
                      {/* Action Button */}
                      <div className="mt-4 pt-3 border-t border-gray-100">
                        {!isSubmitted ? (
                          <button
                            onClick={() => {
                              setSelectedHomework(hw._id);
                              setShowSubmissionForm(true);
                            }}
                            className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
                              isOverdue 
                                ? "bg-red-500 hover:bg-red-600 text-white" 
                                : "bg-blue-500 hover:bg-blue-600 text-white"
                            }`}
                          >
                            <Upload className="w-4 h-4" /> 
                            {isOverdue ? "Submit Late" : "Submit Assignment"}
                          </button>
                        ) : (
                          <div className="flex items-center justify-center gap-2 text-green-600 font-medium">
                            <CheckCircle className="w-4 h-4" /> 
                            <span>Submitted</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Notes Tab */}
      {activeTab === "notes" && (
        <div className="p-6 bg-white rounded-xl shadow-lg">
          <NotesViewer currentClass={currentClass} />
        </div>
      )}

      {/* Submission Modal */}
      {showSubmissionForm && selectedHomework && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4 shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Submit Assignment</h3>
              <button
                onClick={() => {
                  setShowSubmissionForm(false);
                  setSelectedHomework(null);
                  setSubmissionContent("");
                  setSubmissionFile(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content (optional)
                </label>
                <textarea
                  value={submissionContent}
                  onChange={(e) => setSubmissionContent(e.target.value)}
                  className="input w-full h-32 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                  placeholder="Write your submission..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Attachment (optional)
                </label>
                <input
                  type="file"
                  onChange={(e) => setSubmissionFile(e.target.files[0])}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                             file:rounded-lg file:border-0
                             file:text-sm file:font-semibold
                             file:bg-blue-50 file:text-blue-600
                             hover:file:bg-blue-100"
                />
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => submitHomework(selectedHomework)}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium rounded-lg shadow hover:shadow-lg transition-all duration-300 flex-1 flex items-center justify-center"
                  disabled={!submissionContent && !submissionFile}
                >
                  <Upload className="w-4 h-4 mr-1" /> Submit
                </button>
                <button
                  onClick={() => {
                    setShowSubmissionForm(false);
                    setSelectedHomework(null);
                    setSubmissionContent("");
                    setSubmissionFile(null);
                  }}
                  className="px-6 py-3 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

