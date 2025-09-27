import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "../api/client";
import { useAuth } from "../context/AuthContext";
import {
  Users,
  UserCog,
  BookOpen,
  FileCheck,
  MessageSquare,
  Bell,
  Activity,
  LogOut,
  BarChart3,
  UserX,
  ClipboardList,
  Sparkles,
  TrendingUp,
  School,
  Plus
} from "lucide-react";

export default function AdminDashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState({ users: [], total: 0 });
  const [homework, setHomework] = useState({ homework: [], total: 0 });
  const [notifications, setNotifications] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [systemStats, setSystemStats] = useState(null);
  const [classes, setClasses] = useState([]);
  const [newClass, setNewClass] = useState({ name: '', description: '' });
  const [showClassForm, setShowClassForm] = useState(false);
  const [pendingApprovals, setPendingApprovals] = useState([]);
  const [activeTab, setActiveTab] = useState("overview");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");
      if (!token) {
        setError("Authentication required. Please login again.");
        logout();
        navigate('/login', { replace: true });
        return;
      }

      const [analyticsRes, usersRes, homeworkRes, notificationsRes, submissionsRes, systemRes, classesRes, approvalsRes] = await Promise.all([
        authApi.getAnalytics().catch(() => ({
          data: {
            teachers: 0,
            students: 0,
            homework: 0,
            submissions: 0,
            discussions: 0,
            notifications: 0,
            activeUsers: 0,
            inactiveUsers: 0,
            recentHomework: [],
            recentSubmissions: []
          }
        })),
        authApi.get("/admin/users?limit=5").catch(() => ({
          data: { users: [], total: 0 }
        })),
        authApi.get("/admin/homework?limit=5").catch(() => ({
          data: { homework: [], total: 0 }
        })),
        authApi.get("/notifications").catch(() => ({ data: [] })),
        authApi.get("/admin/submissions").catch(() => ({ data: [] })),
        authApi.get("/admin/system-stats").catch(() => ({
          data: { weeklyHomework: 0, weeklySubmissions: 0 }
        })),
        authApi.get("/admin/classes").catch(() => ({ data: [] })),
        authApi.get("/admin/pending-approvals").catch(() => ({ data: [] }))
      ]);

      setStats(analyticsRes.data);
      setUsers(usersRes.data);
      setHomework(homeworkRes.data);
      setNotifications(notificationsRes.data);
      setSubmissions(submissionsRes.data);
      setSystemStats(systemRes.data);
      setClasses(classesRes.data);
      setPendingApprovals(approvalsRes.data);
    } catch (e) {
      console.error("Admin dashboard error:", e);
      if (e?.response?.status === 401) {
        setError("Session expired. Please login again.");
        logout();
        navigate('/login', { replace: true });
      } else {
        setError(e?.response?.data?.message || "Failed to load data. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const toggleUserStatus = async (userId) => {
    try {
      await authApi.patch(`/admin/users/${userId}/toggle`);
      loadData();
    } catch {
      setError("Failed to update user status");
    }
  };

  const deleteUser = async (userId) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      await authApi.delete(`/admin/users/${userId}`);
      loadData();
    } catch {
      setError("Failed to delete user");
    }
  };

  const deleteHomework = async (homeworkId) => {
    if (!confirm("Are you sure you want to delete this homework?")) return;
    try {
      await authApi.delete(`/admin/homework/${homeworkId}`);
      loadData();
    } catch {
      setError("Failed to delete homework");
    }
  };

  const createClass = async () => {
    if (!newClass.name.trim()) return;
    try {
      await authApi.post('/admin/classes', newClass);
      setNewClass({ name: '', description: '' });
      setShowClassForm(false);
      loadData();
    } catch {
      setError('Failed to create class');
    }
  };

  const deleteClass = async (classId) => {
    if (!confirm('Are you sure you want to delete this class?')) return;
    try {
      await authApi.delete(`/admin/classes/${classId}`);
      loadData();
    } catch {
      setError('Failed to delete class');
    }
  };

  const deleteSubmission = async (submissionId) => {
    if (!confirm('Are you sure you want to delete this submission?')) return;
    try {
      await authApi.delete(`/admin/submissions/${submissionId}`);
      loadData();
    } catch {
      setError('Failed to delete submission');
    }
  };

  const approveUser = async (userId) => {
    try {
      await authApi.patch(`/admin/users/${userId}/approve`);
      loadData();
    } catch {
      setError('Failed to approve user');
    }
  };

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-indigo-600 border-solid"></div>
        <p className="mt-4 font-medium bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent animate-pulse">
          Loading dashboard...
        </p>
      </div>
    );

  if (error)
    return (
      <div className="text-center p-8 bg-red-50 border border-red-200 rounded-xl shadow">
        <h3 className="text-lg font-semibold text-red-600 mb-2">⚠ Error</h3>
        <p className="text-red-500 mb-4">{error}</p>
        <button 
          onClick={loadData}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          Retry
        </button>
      </div>
    );

  const StatCard = ({ icon: Icon, label, value, color }) => (
    <div className={`relative overflow-hidden p-6 bg-gradient-to-br ${color} text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}>
      <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
      <div className="relative flex items-center">
        <div className="p-3 bg-white/20 rounded-lg mr-4">
          <Icon className="w-8 h-8" />
        </div>
        <div>
          <h3 className="text-3xl font-bold mb-1 animate-pulse">{value}</h3>
          <p className="opacity-90 text-sm font-medium">{label}</p>
        </div>
      </div>
      <div className="absolute bottom-2 right-2">
        <TrendingUp className="w-4 h-4 opacity-30" />
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white p-8 rounded-xl shadow-2xl mb-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
          <div className="absolute inset-0 bg-white/5 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:20px_20px]"></div>
        </div>
        <div className="relative flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold flex items-center mb-2">
              <div className="p-2 bg-white/20 rounded-lg mr-4">
                <BarChart3 className="w-10 h-10" />
              </div>
              <span className="bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent">
                Admin Dashboard
              </span>
              <Sparkles className="w-6 h-6 ml-2 animate-pulse" />
            </h1>
            <p className="text-lg opacity-90 font-medium">Manage your homework management system with style</p>
          </div>
          <button
            onClick={() => {
              logout();
              navigate('/login', { replace: true });
            }}
            className="flex items-center gap-2 px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition text-white"
          >
            <LogOut className="w-5 h-5" /> Logout
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 p-1 bg-gray-100 rounded-xl">
        {[
          { key: "overview", label: "Overview", icon: BarChart3 },
          { key: "users", label: "Users", icon: Users },
          { key: "approvals", label: `Approvals (${pendingApprovals.length})`, icon: UserCog },
          { key: "classes", label: "Classes", icon: School },
          { key: "homework", label: "Homework", icon: ClipboardList },
          { key: "notifications", label: "Notifications", icon: Bell },
          { key: "submissions", label: "Submissions", icon: FileCheck }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
              activeTab === tab.key
                ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg transform scale-105"
                : "text-gray-600 hover:bg-white hover:shadow-md"
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span className="font-medium">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Overview */}
      {activeTab === "overview" && (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <StatCard icon={UserCog} label="Teachers" value={stats?.teachers || 0} color="from-pink-500 to-rose-400" />
            <StatCard icon={Users} label="Students" value={stats?.students || 0} color="from-teal-500 to-emerald-400" />
            <StatCard icon={BookOpen} label="Homework" value={stats?.homework || 0} color="from-yellow-400 to-orange-500" />
            <StatCard icon={MessageSquare} label="Discussions" value={stats?.discussions || 0} color="from-green-500 to-lime-400" />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* System Stats */}
            <div className="p-6 shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl bg-gradient-to-br from-white to-blue-50">
              <h3 className="text-xl font-bold flex items-center mb-6 text-gray-800">
                <div className="p-2 bg-indigo-100 rounded-lg mr-3">
                  <Activity className="w-6 h-6 text-indigo-600" />
                </div>
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  System Activity
                </span>
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg hover:shadow-md transition-all">
                  <span className="font-medium text-gray-700">Active Users (7 days)</span>
                  <span className="bg-green-100 text-green-800 font-bold text-lg px-3 py-1 rounded-full">
                    {stats?.activeUsers || 0}
                  </span>
                </div>
                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-lg hover:shadow-md transition-all">
                  <span className="font-medium text-gray-700">Inactive Users</span>
                  <span className="bg-orange-100 text-orange-800 font-bold text-lg px-3 py-1 rounded-full">
                    {stats?.inactiveUsers || 0}
                  </span>
                </div>
                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg hover:shadow-md transition-all">
                  <span className="font-medium text-gray-700">Weekly Homework</span>
                  <span className="bg-blue-100 text-blue-800 font-bold text-lg px-3 py-1 rounded-full">
                    {systemStats?.weeklyHomework || 0}
                  </span>
                </div>
                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg hover:shadow-md transition-all">
                  <span className="font-medium text-gray-700">Weekly Submissions</span>
                  <span className="bg-purple-100 text-purple-800 font-bold text-lg px-3 py-1 rounded-full">
                    {systemStats?.weeklySubmissions || 0}
                  </span>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="p-6 shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl bg-gradient-to-br from-white to-purple-50">
              <h3 className="text-xl font-bold mb-6 text-gray-800">
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Recent Activity
                </span>
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg">
                  <h4 className="font-bold mb-4 text-blue-800 flex items-center">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Latest Homework
                  </h4>
                  <div className="space-y-2">
                    {stats?.recentHomework?.length > 0 ? stats.recentHomework.map((hw) => (
                      <div key={hw._id} className="flex justify-between items-center p-2 bg-white rounded-lg shadow-sm">
                        <span className="font-medium text-sm">{hw?.title || 'Untitled'}</span>
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded border">
                          {hw?.teacher?.name || 'Unknown'}
                        </span>
                      </div>
                    )) : (
                      <p className="text-gray-500 text-sm italic">No recent homework</p>
                    )}
                  </div>
                </div>
                <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg">
                  <h4 className="font-bold mb-4 text-green-800 flex items-center">
                    <FileCheck className="w-4 h-4 mr-2" />
                    Latest Submissions
                  </h4>
                  <div className="space-y-2">
                    {stats?.recentSubmissions?.length > 0 ? stats.recentSubmissions.filter(sub => sub?.homework?.title && sub?.student?.name).map((sub) => (
                      <div key={sub._id} className="flex justify-between items-center p-2 bg-white rounded-lg shadow-sm">
                        <span className="font-medium text-sm">{sub.homework.title}</span>
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded border">
                          {sub.student.name}
                        </span>
                      </div>
                    )) : (
                      <p className="text-gray-500 text-sm italic">No recent submissions</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Approvals Tab */}
      {activeTab === "approvals" && (
        <div className="p-6 shadow-lg rounded-xl bg-gradient-to-br from-white to-yellow-50">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg mr-3">
                <UserCog className="w-6 h-6 text-yellow-600" />
              </div>
              <span className="bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                Pending Teacher Approvals
              </span>
            </h3>
            <span className="bg-yellow-100 text-yellow-800 font-bold px-4 py-2 rounded-full">
              {pendingApprovals.length} Pending
            </span>
          </div>

          {pendingApprovals.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <UserCog className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No pending approvals</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-yellow-600 text-white">
                  <tr>
                    <th className="px-4 py-2 text-left">Name</th>
                    <th className="px-4 py-2 text-left">Email</th>
                    <th className="px-4 py-2">Classes</th>
                    <th className="px-4 py-2">Subjects</th>
                    <th className="px-4 py-2">Registered</th>
                    <th className="px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingApprovals.map((user) => (
                    <tr key={user._id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-2 font-medium">{user.name}</td>
                      <td className="px-4 py-2">{user.email}</td>
                      <td className="px-4 py-2">
                        {user.classes?.length > 0 ? (
                          <div className="flex flex-wrap gap-1">
                            {user.classes.map((cls, idx) => (
                              <span key={idx} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded border">
                                {cls}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="text-gray-400 text-xs">No classes</span>
                        )}
                      </td>
                      <td className="px-4 py-2">
                        {user.subjects?.length > 0 ? user.subjects.join(', ') : 'No subjects'}
                      </td>
                      <td className="px-4 py-2">{new Date(user.createdAt).toLocaleDateString()}</td>
                      <td className="px-4 py-2">
                        <button
                          onClick={() => approveUser(user._id)}
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

      {/* Classes Tab */}
      {activeTab === "classes" && (
        <div className="p-6 shadow-lg rounded-xl bg-gradient-to-br from-white to-green-50">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold flex items-center">
              <div className="p-2 bg-green-100 rounded-lg mr-3">
                <School className="w-6 h-6 text-green-600" />
              </div>
              <span className="bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
                Class Management
              </span>
            </h3>
            <button
              onClick={() => setShowClassForm(!showClassForm)}
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
            >
              <Plus className="w-4 h-4" />
              {showClassForm ? 'Cancel' : 'Create Class'}
            </button>
          </div>

          {showClassForm && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <h4 className="font-medium mb-3">Create New Class</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  placeholder="Class name (e.g., 10A, Grade-5-B)"
                  value={newClass.name}
                  onChange={(e) => setNewClass(prev => ({ ...prev, name: e.target.value }))}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
                />
                <input
                  placeholder="Description (optional)"
                  value={newClass.description}
                  onChange={(e) => setNewClass(prev => ({ ...prev, description: e.target.value }))}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
                />
              </div>
              <button
                onClick={createClass}
                className="mt-3 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
              >
                Create Class
              </button>
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-green-600 text-white">
                <tr>
                  <th className="px-4 py-2 text-left">Class Name</th>
                  <th className="px-4 py-2 text-left">Description</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Created By</th>
                  <th className="px-4 py-2">Created</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {classes.map((cls) => (
                  <tr key={cls._id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2 font-medium">{cls.name}</td>
                    <td className="px-4 py-2">{cls.description || 'No description'}</td>
                    <td className="px-4 py-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        cls.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {cls.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-4 py-2">{cls.createdBy?.name || 'Unknown'}</td>
                    <td className="px-4 py-2">{new Date(cls.createdAt).toLocaleDateString()}</td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => deleteClass(cls._id)}
                        className="px-3 py-1 rounded bg-red-500 text-white text-xs font-medium hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {classes.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <School className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No classes created yet</p>
            </div>
          )}
        </div>
      )}

      {/* Users Tab */}
      {activeTab === "users" && (
        <div className="p-6 shadow-lg rounded-xl bg-gradient-to-br from-white to-indigo-50">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold flex items-center">
              <div className="p-2 bg-indigo-100 rounded-lg mr-3">
                <Users className="w-6 h-6 text-indigo-600" />
              </div>
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                User Management
              </span>
            </h3>
            <span className="bg-indigo-100 text-indigo-800 font-bold px-4 py-2 rounded-full">
              {users.total} Total Users
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-indigo-600 text-white">
                <tr>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Email</th>
                  <th className="px-4 py-2">Role</th>
                  <th className="px-4 py-2">Classes</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.users.map((user) => (
                  <tr key={user._id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2">{user.name}</td>
                    <td className="px-4 py-2">{user.email}</td>
                    <td className="px-4 py-2 capitalize">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          user.role === "admin"
                            ? "bg-red-100 text-red-800"
                            : user.role === "teacher"
                            ? "bg-teal-100 text-teal-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      {user.role === 'student' && user.class ? (
                        <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded border">
                          {user.class}
                        </span>
                      ) : user.role === 'teacher' && user.classes?.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {user.classes.map((cls, idx) => (
                            <span key={idx} className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded border">
                              {cls}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-gray-400 text-xs">No classes</span>
                      )}
                    </td>
                    <td className="px-4 py-2">
                      <span 
                        className={`px-2 py-1 rounded text-xs font-medium ${user.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                      >
                        {user.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-4 py-2 flex gap-2">
                      <button
                        onClick={() => toggleUserStatus(user._id)}
                        className={`px-3 py-1 rounded text-xs font-medium ${user.isActive 
                          ? "border border-yellow-400 text-yellow-600 hover:bg-yellow-50" 
                          : "bg-green-500 hover:bg-green-600 text-white"
                        }`}
                      >
                        {user.isActive ? "Deactivate" : "Activate"}
                      </button>
                      {user.role !== "admin" && (
                        <button
                          onClick={() => deleteUser(user._id)}
                          className="px-3 py-1 rounded bg-red-500 text-white text-xs font-medium hover:bg-red-600 flex items-center gap-1"
                        >
                          <UserX className="w-4 h-4" /> Delete
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Homework Tab */}
      {activeTab === "homework" && (
        <div className="p-6 shadow-lg rounded-xl bg-gradient-to-br from-white to-orange-50">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg mr-3">
                <ClipboardList className="w-6 h-6 text-orange-600" />
              </div>
              <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Homework Management
              </span>
            </h3>
            <span className="bg-orange-100 text-orange-800 font-bold px-4 py-2 rounded-full">
              {homework.total} Total Assignments
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-indigo-600 text-white">
                <tr>
                  <th className="px-4 py-2 text-left">Title</th>
                  <th className="px-4 py-2 text-left">Subject</th>
                  <th className="px-4 py-2">Teacher</th>
                  <th className="px-4 py-2">Deadline</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {homework.homework.map((hw) => (
                  <tr key={hw._id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2">{hw?.title || 'Untitled'}</td>
                    <td className="px-4 py-2">{hw?.subject || 'Unknown'}</td>
                    <td className="px-4 py-2">{hw?.teacher?.name || 'Unknown'}</td>
                    <td className="px-4 py-2">{new Date(hw.deadline).toLocaleDateString()}</td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => deleteHomework(hw._id)}
                        className="px-3 py-1 rounded bg-red-500 text-white text-xs font-medium hover:bg-red-600 flex items-center gap-1"
                      >
                        <UserX className="w-4 h-4" /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === "notifications" && (
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Bell className="w-5 h-5 mr-2 text-indigo-600" /> Notifications Management
          </h3>

          <div className="space-y-4">
            {notifications.map((notification) => (
              <div key={notification._id} className="border rounded-lg p-4 hover:bg-gray-50">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{notification.title}</h4>
                    <p className="text-gray-600 text-sm mt-1">{notification.message}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                      <span>Type: {notification.type}</span>
                      <span>Created: {new Date(notification.createdAt).toLocaleDateString()}</span>
                      <span className={`px-2 py-1 rounded ${notification.isRead ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {notification.isRead ? 'Read' : 'Unread'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {notifications.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <Bell className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No notifications found</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Submissions Tab */}
      {activeTab === "submissions" && (
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <FileCheck className="w-5 h-5 mr-2 text-indigo-600" /> Submissions Management
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-indigo-600 text-white">
                <tr>
                  <th className="px-4 py-2 text-left">Student</th>
                  <th className="px-4 py-2 text-left">Homework</th>
                  <th className="px-4 py-2">Submitted</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Grade</th>
                  <th className="px-4 py-2">Early</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((submission) => (
                  <tr key={submission._id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2">{submission.student?.name || 'Unknown'}</td>
                    <td className="px-4 py-2">{submission.homework?.title || 'Unknown'}</td>
                    <td className="px-4 py-2">{new Date(submission.submittedAt).toLocaleDateString()}</td>
                    <td className="px-4 py-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        submission.status === 'graded' ? 'bg-green-100 text-green-800' :
                        submission.status === 'submitted' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {submission.status}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      {submission.grade ? (
                        <span className="font-medium">{submission.grade}</span>
                      ) : (
                        <span className="text-gray-400">Not graded</span>
                      )}
                    </td>
                    <td className="px-4 py-2">
                      {submission.isEarly ? (
                        <span className="text-green-600 font-medium">Yes</span>
                      ) : (
                        <span className="text-gray-400">No</span>
                      )}
                    </td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => deleteSubmission(submission._id)}
                        className="px-3 py-1 rounded bg-red-500 text-white text-xs font-medium hover:bg-red-600 flex items-center gap-1"
                      >
                        <UserX className="w-4 h-4" /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {submissions.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <FileCheck className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No submissions found</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
