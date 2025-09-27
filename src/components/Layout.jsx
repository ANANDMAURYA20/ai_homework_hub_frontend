import { useAuth } from '../context/AuthContext';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import NotificationBell from './NotificationBell';
import AIChatbot from './AIChatbot';
import {
  LayoutDashboard,
  BarChart3,
  BookOpen,
  FileText,
  PlusCircle,
  GraduationCap,
  LogOut,
} from "lucide-react";

export default function Layout({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getNavItems = () => {
    if (!user) return [];

    if (user.role === 'admin') {
      return [
        { path: '/', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
        { path: '/analytics', label: 'Analytics', icon: <BarChart3 size={18} /> }
      ];
    }
    
    if (user.role === 'teacher') {
      return [
        { path: '/', label: 'My Classes', icon: <GraduationCap size={18} /> },
        { path: '/create-homework', label: 'Create Homework', icon: <PlusCircle size={18} /> },
        { path: '/analytics', label: 'Analytics', icon: <BarChart3 size={18} /> }
      ];
    }
    
    if (user.role === 'student') {
      return [
        { path: '/', label: 'My Homework', icon: <BookOpen size={18} /> },
        { path: '/homework', label: 'All Homework', icon: <FileText size={18} /> },
        { path: '/analytics', label: 'Analytics', icon: <BarChart3 size={18} /> }
      ];
    }
    
    return [];
  };

  if (!user) return children;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo + Nav Items */}
            <div className="flex items-center space-x-4 lg:space-x-8">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                HomeworkHub
              </h1>
              <div className="hidden md:flex space-x-1 lg:space-x-4">
                {getNavItems().map(item => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-all duration-200 text-sm lg:text-base ${
                      location.pathname === item.path
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    {item.icon}
                    <span className="hidden lg:inline">{item.label}</span>
                  </Link>
                ))}
              </div>
            </div>
            
            {/* Right Side */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              <NotificationBell />
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="text-right hidden sm:block">
                  <p className="text-gray-900 font-semibold text-sm">{user.name}</p>
                  <p className="text-gray-500 text-xs capitalize">{user.role}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-xs sm:text-sm font-medium rounded-lg shadow-sm transition-colors duration-200"
                >
                  <LogOut size={14} className="sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Page Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {children}
      </main>
      
      {/* AI Chatbot */}
      <AIChatbot />
    </div>
  );
}
