import { useEffect, useState } from 'react';
import { homeworkApi } from '../api/client';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';

export default function HomeworkList() {
  const { user } = useAuth();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = await homeworkApi.list();
      setList(data);
    } catch (e) {
      setError(e?.response?.data?.message || 'Failed to load');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-xl">Loading...</div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="card">
          <p className="text-red-600">{error}</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">All Homework 📝</h2>
            <p className="text-gray-600 mt-2">Browse all available assignments</p>
          </div>
        </div>

        <div className="card">
          {list.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📚</div>
              <p className="text-gray-500">No homework assignments available</p>
            </div>
          ) : (
            <div className="space-y-4">
              {list.map((hw) => {
                const isOverdue = new Date(hw.deadline) < new Date();
                const isSubmitted = hw.completedBy?.includes(user?.id) || !!hw.userSubmission;
                const submission = hw.userSubmission;
                
                return (
                  <div key={hw._id} className="border border-gray-200 rounded-lg p-4 hover-lift">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="text-lg font-semibold">{hw.title}</h4>
                          <span className={`badge ${
                            isSubmitted ? 'badge-success' : isOverdue ? 'badge-danger' : 'badge-warning'
                          }`}>
                            {isSubmitted ? 'Submitted' : isOverdue ? 'Overdue' : 'Pending'}
                          </span>
                          {submission?.grade && (
                            <span className="badge badge-info">{submission.grade}/100</span>
                          )}
                        </div>
                        <p className="text-gray-600 mb-3">{hw.description}</p>
                        
                        {/* AI Summary */}
                        {hw.aiSummary && (
                          <div className="mb-3 p-3 bg-purple-50 border border-purple-200 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-purple-600 font-medium text-sm flex items-center gap-1">
                🤖 AI Summary
                              </span>
                            </div>
                            <p className="text-purple-700 text-sm">{hw.aiSummary}</p>
                          </div>
                        )}
                        <div className="flex items-center space-x-6 text-sm text-gray-500">
                          <span>📅 Due: {new Date(hw.deadline).toLocaleDateString()}</span>
                          <span>👨🏫 {hw.teacher?.name}</span>
                          {hw.attachments?.length > 0 && (
                            <span>📎 {hw.attachments.length} attachment{hw.attachments.length > 1 ? 's' : ''}</span>
                          )}
                        </div>
                        {hw.attachments?.length > 0 && (
                          <div className="mt-3 space-y-2">
                            <p className="text-sm font-medium text-gray-700">Attachments:</p>
                            <div className="flex flex-wrap gap-2">
                              {hw.attachments.map((attachment, index) => (
                                <a
                                  key={index}
                                  href={`http://localhost:5000/uploads/${attachment.path}`}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm hover:bg-blue-200 transition"
                                >
                                  {attachment.type === 'pdf' && '📄'}
                                  {attachment.type === 'image' && '🖼️'}
                                  {attachment.type === 'doc' && '📝'}
                                  {attachment.type === 'other' && '📎'}
                                  <span className="ml-1">{attachment.originalName}</span>
                                </a>
                              ))}
                            </div>
                          </div>
                        )}
                        {submission?.feedback && (
                          <div className="mt-3 p-3 bg-blue-50 rounded">
                            <p className="text-sm font-medium text-blue-700">Teacher Feedback:</p>
                            <p className="text-blue-600">{submission.feedback}</p>
                          </div>
                        )}
                      </div>
                      <div className="flex space-x-2">

                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}



