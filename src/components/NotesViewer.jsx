import React, { useState, useEffect } from 'react';
import { authApi } from '../api/client';
import { FileText, Calendar, User, Download, BookOpen, Sparkles } from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const NotesViewer = ({ currentClass }) => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [showSummary, setShowSummary] = useState({});

  useEffect(() => {
    fetchNotes();
  }, [currentClass, selectedSubject]);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const params = {};
      if (currentClass) params.class = currentClass;
      if (selectedSubject) params.subject = selectedSubject;
      
      const response = await authApi.get('/notes', { params });
      setNotes(response.data);
      
      // Extract unique subjects
      const uniqueSubjects = [...new Set(response.data.map(note => note.subject))];
      setSubjects(uniqueSubjects);
    } catch (error) {
      console.error('Error fetching notes:', error);
    } finally {
      setLoading(false);
    }
  };

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

  const getFileIcon = (type) => {
    switch (type) {
      case 'pdf': return '📄';
      case 'image': return '🖼️';
      case 'doc': return '📝';
      default: return '📎';
    }
  };

  const createThumbnail = (note) => {
    const pdfAttachment = note.attachments?.find(att => att.type === 'pdf');
    
    if (pdfAttachment) {
      return (
        <div className="w-full h-32 bg-gray-100 rounded-t-xl flex items-center justify-center relative overflow-hidden">
          <iframe
            src={`${API_BASE_URL}/uploads/${pdfAttachment.path}#toolbar=0&navpanes=0&scrollbar=0`}
            className="w-full h-full border-0 pointer-events-none"
            title={pdfAttachment.originalName}
          />
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
            <div className="bg-white/90 px-2 py-1 rounded text-xs font-medium text-gray-800">
              📄 PDF
            </div>
          </div>
        </div>
      );
    }
    
    return (
      <div className={`w-full h-32 bg-gradient-to-br ${getSubjectColor(note.subject)} rounded-t-xl flex items-center justify-center relative overflow-hidden`}>
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 text-center text-white">
          <BookOpen className="w-8 h-8 mx-auto mb-2" />
          <p className="text-sm font-medium truncate px-2">{note.subject}</p>
        </div>
        <div className="absolute -top-4 -right-4 w-16 h-16 bg-white/10 rounded-full"></div>
        <div className="absolute -bottom-2 -left-2 w-12 h-12 bg-white/5 rounded-full"></div>
      </div>
    );
  };

  return (
    <div className="notes-viewer">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-2">
            <FileText className="w-6 h-6 text-indigo-600" />
            Class Notes
          </h2>
          <p className="text-gray-600 text-sm mt-1">Your study materials and class notes</p>
        </div>
        <select
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 bg-white shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
        >
          <option value="">All Subjects</option>
          {subjects.map(subject => (
            <option key={subject} value={subject}>{subject}</option>
          ))}
        </select>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
            <p className="text-gray-600">Loading notes...</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.map((note) => (
          <div key={note._id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden border border-gray-100">
            {/* Thumbnail */}
            {createThumbnail(note)}
            
            {/* Content */}
            <div className="p-5">
              <div className="mb-3">
                <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">{note.title}</h3>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(note.createdAt).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    {note.teacher?.name}
                  </span>
                </div>
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
                      <p className="text-sm text-purple-700 leading-relaxed">{note.aiSummary}</p>
                    </div>
                  )}
                </div>
              )}
              
              {note.attachments && note.attachments.length > 0 && (
                <div className="mt-3">
                  <p className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-1">
                    <Download className="w-4 h-4" />
                    Study Materials ({note.attachments.length})
                  </p>
                  <div className="space-y-2">
                    {note.attachments.map((attachment, index) => (
                      <a
                        key={index}
                        href={`${API_BASE_URL}/uploads/${attachment.path}`}
                        className={`flex items-center gap-3 p-3 rounded-lg transition-colors border ${
                          attachment.type === 'pdf' 
                            ? 'bg-red-50 hover:bg-red-100 border-red-200 text-red-800'
                            : 'bg-gray-50 hover:bg-gray-100 border-gray-200 text-gray-800'
                        }`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className="text-lg flex-shrink-0">{getFileIcon(attachment.type)}</span>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{attachment.originalName}</p>
                          <p className="text-xs opacity-75 capitalize">{attachment.type} file</p>
                        </div>
                        <Download className="w-4 h-4 flex-shrink-0 opacity-60" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Class Badge */}
              <div className="mt-4 pt-3 border-t border-gray-100">
                <span className="inline-flex items-center px-2 py-1 bg-indigo-100 text-indigo-800 text-xs font-medium rounded-full">
                  {note.class}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {notes.length === 0 && !loading && (
        <div className="text-center py-12">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
              <FileText className="w-8 h-8 text-gray-400" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">No notes found</h3>
              <p className="text-gray-500">
                {selectedSubject 
                  ? `No notes available for ${selectedSubject}` 
                  : 'No notes available yet. Check back later!'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotesViewer;