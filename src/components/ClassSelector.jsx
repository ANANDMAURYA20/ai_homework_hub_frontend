import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { classApi } from '../api/client';
import { ChevronDown, Users, BookOpen, Check, Layers } from 'lucide-react';

export default function ClassSelector() {
  const { user, currentClass, switchClass } = useAuth();
  const [classes, setClasses] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadClasses();
  }, []);

  const loadClasses = async () => {
    try {
      const { data } = await classApi.getClasses();
      setClasses(data.classes);
    } catch (error) {
      console.error('Failed to load classes:', error);
    }
  };

  const handleClassSwitch = async (classCode) => {
    setLoading(true);
    try {
      await switchClass(classCode);
      setShowDropdown(false);
    } catch (error) {
      console.error('Failed to switch class:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!user || user.role === 'admin' || classes.length <= 1) {
    return null;
  }

  return (
    <div className="relative w-full sm:w-auto">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center justify-between w-full gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-2.5 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 shadow-sm text-sm sm:text-base"
        disabled={loading}
      >
        <div className="flex items-center gap-2 min-w-0 flex-1">
          {user.role === 'teacher' ? (
            <div className="p-1 sm:p-1.5 bg-blue-100 rounded-lg flex-shrink-0">
              <BookOpen className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
            </div>
          ) : (
            <div className="p-1 sm:p-1.5 bg-blue-100 rounded-lg flex-shrink-0">
              <Users className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
            </div>
          )}
          <div className="text-left min-w-0 flex-1">
            <div className="text-xs text-gray-500 font-medium uppercase tracking-wide hidden sm:block">
              {user.role === 'teacher' ? 'Teaching' : 'Class'}
            </div>
            <div className="text-sm font-medium text-gray-900 flex items-center gap-2">
              <span className="truncate">{currentClass || 'All Classes'}</span>
              {classes.length > 1 && (
                <span className="px-1.5 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full font-bold flex-shrink-0">
                  {classes.length}
                </span>
              )}
            </div>
          </div>
        </div>
        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 flex-shrink-0 ${
          showDropdown ? 'rotate-180' : ''
        }`} />
      </button>

      {showDropdown && (
        <div className="absolute top-full left-0 mt-2 w-full sm:min-w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-[9999] overflow-hidden">
          <div className="p-3 bg-gray-50 border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-900">
                  {user.role === 'teacher' ? 'Your Classes' : 'Available Classes'}
                </span>
              </div>
              <div className="px-2 py-1 bg-gray-200 text-gray-700 text-xs font-medium rounded-full">
                {classes.length} {classes.length === 1 ? 'Class' : 'Classes'}
              </div>
            </div>
          </div>
          <div className="py-1 max-h-60 sm:max-h-80 overflow-y-auto">
            {user.role === 'teacher' && (
              <button
                onClick={() => handleClassSwitch('')}
                className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors duration-200 flex items-center justify-between ${
                  !currentClass ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-700'
                }`}
                disabled={loading}
              >
                <div className="flex items-center gap-3">
                  <div className="p-1.5 bg-gray-100 rounded-lg">
                    <Layers className="w-3 h-3 text-gray-600" />
                  </div>
                  <span>All Classes</span>
                </div>
                {!currentClass && <Check className="w-4 h-4 text-blue-600" />}
              </button>
            )}
            {classes.map((classCode) => (
              <button
                key={classCode}
                onClick={() => handleClassSwitch(classCode)}
                className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors duration-200 flex items-center justify-between ${
                  currentClass === classCode ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-700'
                }`}
                disabled={loading}
              >
                <div className="flex items-center gap-3">
                  <div className="p-1.5 bg-gray-100 rounded-lg">
                    {user.role === 'teacher' ? (
                      <BookOpen className="w-3 h-3 text-gray-600" />
                    ) : (
                      <Users className="w-3 h-3 text-gray-600" />
                    )}
                  </div>
                  <div>
                    <div className="font-medium">{classCode}</div>
                    <div className="text-xs text-gray-500 hidden sm:block">
                      {user.role === 'teacher' ? 'Teaching Class' : 'Student Class'}
                    </div>
                  </div>
                </div>
                {currentClass === classCode && <Check className="w-4 h-4 text-blue-600" />}
              </button>
            ))}
          </div>
          {loading && (
            <div className="p-3 bg-gray-50 border-t">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
                Switching class...
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}