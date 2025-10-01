import React, { useState, useEffect } from 'react';
import { authApi } from '../api/client';
import {
  FileText,
  Plus,
  X,
  Calendar,
  School,
  Sparkles,
  Trash2,
  Download,
  Paperclip,
  BookOpen
} from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const NotesManager = ({ currentClass }) => {
  const [notes, setNotes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSummary, setShowSummary] = useState({});
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    subject: '',
    class: currentClass || '',
    attachments: []
  });

  useEffect(() => {
    fetchNotes();
  }, [currentClass]);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const params = currentClass ? { class: currentClass } : {};
      const response = await authApi.get('/notes', { params });
      setNotes(response.data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('subject', formData.subject);
      formDataToSend.append('class', formData.class);
      
      Array.from(formData.attachments).forEach(file => {
        formDataToSend.append('attachments', file);
      });

      await authApi.post('/notes', formDataToSend);
      setShowForm(false);
      setFormData({ title: '', description: '', subject: '', class: currentClass || '', attachments: [] });
      fetchNotes();
    } catch (error) {
      console.error('Error creating note:', error);
      alert('Error creating note');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this note?')) return;
    try {
      await authApi.delete(`/notes/${id}`);
      fetchNotes();
    } catch (error) {
      console.error('Error deleting note:', error);
      alert('Error deleting note');
    }
  };

  const handleSummarize = async (note) => {
    try {
      setLoading(true);
      const content = `Title: ${note.title}\nSubject: ${note.subject}\nDescription: ${note.description || 'No description provided'}`;
      const response = await authApi.post('/ai/summarize', { content, type: 'notes' });
      
      // Save the AI summary to the database
      await authApi.patch(`/notes/${note._id}`, { aiSummary: response.data.summary });
      
      // Update the local state
      const updatedNotes = notes.map(n => 
        n._id === note._id 
          ? { ...n, aiSummary: response.data.summary }
          : n
      );
      setNotes(updatedNotes);
      
      // Show success message
      alert('AI Summary generated successfully!');
    } catch (error) {
      console.error('Error generating summary:', error);
      alert('Error generating AI summary. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="notes-manager">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-2">
            <FileText className="w-6 h-6 text-indigo-600" />
            Class Notes
          </h2>
          <p className="text-gray-600 text-sm mt-1">Create and manage class notes and materials</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200"
        >
          {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          <span>{showForm ? 'Cancel' : 'Add Note'}</span>
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-lg font-semibold mb-4">Create New Note</h3>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="Note Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="border rounded px-3 py-2"
                required
              />
              <input
                type="text"
                placeholder="Subject"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="border rounded px-3 py-2"
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Class"
                value={formData.class}
                onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                className="border rounded px-3 py-2 w-full"
                required
              />
            </div>
            <div className="mb-4">
              <textarea
                placeholder="Description/Content"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="border rounded px-3 py-2 w-full h-32"
                rows="4"
              />
            </div>
            <div className="mb-4">
              <input
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt"
                onChange={(e) => setFormData({ ...formData, attachments: e.target.files })}
                className="border rounded px-3 py-2 w-full"
              />
              <p className="text-sm text-gray-500 mt-1">
                Supported formats: PDF, DOC, DOCX, JPG, PNG, TXT
              </p>
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                disabled={loading}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
              >
                {loading ? 'Creating...' : 'Create Note'}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {loading && <div className="text-center py-4">Loading...</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {notes.map((note) => {
          // Get thumbnail from attachments (first image) or use default
          const imageAttachment = note.attachments?.find(att => 
            att.type === 'image' || att.originalName?.match(/\.(jpg|jpeg|png|gif|webp)$/i)
          );
          const pdfAttachment = note.attachments?.find(att => att.type === 'pdf');
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
            <div key={note._id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden border border-gray-100">
              {/* Thumbnail */}
              {pdfAttachment ? (
                <div className="w-full h-32 bg-gray-100 rounded-t-xl flex items-center justify-center relative overflow-hidden">
                  <iframe
                    src={`${API_BASE_URL}/uploads/${pdfAttachment.path}#toolbar=0&navpanes=0&scrollbar=0`}
                    className="w-full h-full border-0 pointer-events-none"
                    title={pdfAttachment.originalName}
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <div className="bg-white/90 px-2 py-1 rounded text-xs font-medium text-gray-800">
                      <FileText className="w-3 h-3 inline mr-1" />PDF
                    </div>
                  </div>
                </div>
              ) : imageAttachment ? (
                <div className="w-full h-32 bg-gray-100 rounded-t-xl flex items-center justify-center relative overflow-hidden">
                  <img 
                    src={`${API_BASE_URL}/uploads/${imageAttachment.path}`}
                    alt={note.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <div className="bg-white/90 px-2 py-1 rounded text-xs font-medium text-gray-800">
                      Image
                    </div>
                  </div>
                </div>
              ) : (
                <div className={`w-full h-32 bg-gradient-to-br ${getSubjectColor(note.subject)} rounded-t-xl flex items-center justify-center relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="relative z-10 text-center text-white">
                    <BookOpen className="w-8 h-8 mx-auto mb-2" />
                    <p className="text-sm font-medium truncate px-2">{note.subject}</p>
                  </div>
                  <div className="absolute -top-4 -right-4 w-16 h-16 bg-white/10 rounded-full"></div>
                  <div className="absolute -bottom-2 -left-2 w-12 h-12 bg-white/5 rounded-full"></div>
                </div>
              )}

              {/* Card content */}
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{note.title}</h3>
                
                <div className="flex items-center gap-4 text-xs text-gray-500 mb-2">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(note.createdAt).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <School className="w-3 h-3" />
                    {note.class}
                  </span>
                </div>

                {note.description && (
                  <p className="text-gray-600 text-sm mb-3 line-clamp-3">{note.description}</p>
                )}
                
                {note.aiSummary && (
                  <div className="mb-3">
                    <button
                      onClick={() => setShowSummary(prev => ({ ...prev, [note._id]: !prev[note._id] }))}
                      className="flex items-center gap-2 px-3 py-2 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-lg transition-colors mb-2"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span className="text-sm font-medium">AI Summary</span>
                    </button>
                    {showSummary[note._id] && (
                      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-100">
                        <p className="text-sm text-purple-700 leading-relaxed whitespace-pre-wrap">{note.aiSummary}</p>
                      </div>
                    )}
                  </div>
                )}
                
                {note.attachments && note.attachments.length > 0 && (
                  <div className="mt-3">
                    <p className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-1">
                      <Download className="w-4 h-4" />
                      Attachments ({note.attachments.length})
                    </p>
                    <div className="space-y-2">
                      {note.attachments.slice(0, 2).map((attachment, index) => (
                        <a
                          key={index}
                          href={`/api/notes/${note._id}/download/${index}`}
                          className={`flex items-center gap-3 p-3 rounded-lg transition-colors border w-full text-left ${
                            attachment.type === 'pdf' 
                              ? 'bg-red-50 hover:bg-red-100 border-red-200 text-red-800'
                              : 'bg-gray-50 hover:bg-gray-100 border-gray-200 text-gray-800'
                          }`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FileText className="w-4 h-4 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate">{attachment.originalName}</p>
                            <p className="text-xs opacity-75 capitalize">{attachment.type} file</p>
                          </div>
                          <Download className="w-4 h-4 flex-shrink-0 opacity-60" />
                        </a>
                      ))}
                      {note.attachments.length > 2 && (
                        <div className="text-center">
                          <span className="text-xs text-gray-500">+{note.attachments.length - 2} more files</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                
                {/* Action Buttons */}
                <div className="mt-4 pt-3 border-t border-gray-100 flex gap-2">
                  <button
                    onClick={() => handleSummarize(note)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg text-sm font-medium transition"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>AI Summary</span>
                  </button>
                  <button
                    onClick={() => handleDelete(note._id)}
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

      {notes.length === 0 && !loading && (
        <div className="text-center py-12">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
              <FileText className="w-8 h-8 text-gray-400" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">No notes found</h3>
              <p className="text-gray-500">Create your first note to get started!</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotesManager;