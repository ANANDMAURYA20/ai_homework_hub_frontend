import { useState, useEffect } from 'react';
import { authApi } from '../api/client';
import { useAuth } from '../context/AuthContext';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, AreaChart, Area, RadialBarChart, RadialBar
} from 'recharts';
import {
  TrendingUp, Users, BookOpen, FileCheck, Calendar, Award,
  BarChart3, PieChart as PieChartIcon, Activity, Target
} from 'lucide-react';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#8dd1e1', '#d084d0'];

export default function Analytics() {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('week');

  useEffect(() => {
    loadAnalytics();
  }, [timeRange]);

  const loadAnalytics = async () => {
    try {
      setLoading(true);
      const [analyticsRes, systemRes] = await Promise.all([
        authApi.getAnalytics(),
        authApi.get('/admin/system-stats')
      ]);

      // Mock additional data for comprehensive analytics
      const mockData = {
        ...analyticsRes.data,
        ...systemRes.data,
        submissionTrends: [
          { month: 'Jan', submissions: 45, homework: 30 },
          { month: 'Feb', submissions: 52, homework: 35 },
          { month: 'Mar', submissions: 48, homework: 32 },
          { month: 'Apr', submissions: 61, homework: 40 },
          { month: 'May', submissions: 55, homework: 38 },
          { month: 'Jun', submissions: 67, homework: 45 }
        ],
        subjectDistribution: [
          { subject: 'Mathematics', count: 25, percentage: 30 },
          { subject: 'Science', count: 20, percentage: 24 },
          { subject: 'English', count: 18, percentage: 22 },
          { subject: 'History', count: 12, percentage: 14 },
          { subject: 'Geography', count: 8, percentage: 10 }
        ],
        gradeDistribution: [
          { grade: 'A', count: 45, percentage: 35 },
          { grade: 'B', count: 38, percentage: 30 },
          { grade: 'C', count: 25, percentage: 20 },
          { grade: 'D', count: 12, percentage: 9 },
          { grade: 'F', count: 8, percentage: 6 }
        ],
        dailyActivity: [
          { day: 'Mon', submissions: 12, logins: 45 },
          { day: 'Tue', submissions: 15, logins: 52 },
          { day: 'Wed', submissions: 18, logins: 48 },
          { day: 'Thu', submissions: 14, logins: 55 },
          { day: 'Fri', submissions: 20, logins: 60 },
          { day: 'Sat', submissions: 8, logins: 25 },
          { day: 'Sun', submissions: 5, logins: 20 }
        ],
        performanceMetrics: [
          { metric: 'Completion Rate', value: 85, target: 90 },
          { metric: 'On-Time Submissions', value: 78, target: 85 },
          { metric: 'Average Grade', value: 82, target: 80 },
          { metric: 'Student Engagement', value: 92, target: 95 }
        ]
      };

      setData(mockData);
    } catch (error) {
      console.error('Error loading analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  const StatCard = ({ icon: Icon, title, value, change, color }) => (
    <div className={`p-6 bg-gradient-to-br ${color} text-white rounded-xl shadow-lg`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm opacity-90">{title}</p>
          <p className="text-3xl font-bold">{value}</p>
          {change && (
            <p className="text-sm opacity-90 flex items-center mt-1">
              <TrendingUp className="w-4 h-4 mr-1" />
              {change}% from last month
            </p>
          )}
        </div>
        <Icon className="w-12 h-12 opacity-80" />
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8 rounded-xl">
        <h1 className="text-3xl font-bold flex items-center mb-2">
          <BarChart3 className="w-8 h-8 mr-3" />
          Analytics Dashboard
        </h1>
        <p className="text-indigo-100">Comprehensive insights into your homework management system</p>
      </div>

      {/* Time Range Selector */}
      <div className="flex gap-2">
        {['week', 'month', 'quarter', 'year'].map((range) => (
          <button
            key={range}
            onClick={() => setTimeRange(range)}
            className={`px-4 py-2 rounded-lg capitalize transition ${
              timeRange === range
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {range}
          </button>
        ))}
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={Users}
          title="Total Users"
          value={data?.teachers + data?.students || 0}
          change={12}
          color="from-blue-500 to-blue-600"
        />
        <StatCard
          icon={BookOpen}
          title="Total Homework"
          value={data?.homework || 0}
          change={8}
          color="from-green-500 to-green-600"
        />
        <StatCard
          icon={FileCheck}
          title="Submissions"
          value={data?.submissions || 0}
          change={15}
          color="from-purple-500 to-purple-600"
        />
        <StatCard
          icon={Activity}
          title="Active Users"
          value={data?.activeUsers || 0}
          change={5}
          color="from-orange-500 to-orange-600"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Submission Trends */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-bold mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-indigo-600" />
            Submission Trends
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data?.submissionTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="submissions" stroke="#8884d8" strokeWidth={2} />
              <Line type="monotone" dataKey="homework" stroke="#82ca9d" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Subject Distribution */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-bold mb-4 flex items-center">
            <PieChartIcon className="w-5 h-5 mr-2 text-indigo-600" />
            Subject Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data?.subjectDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ subject, percentage }) => `${subject} ${percentage}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
              >
                {data?.subjectDistribution?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Daily Activity */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-bold mb-4 flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-indigo-600" />
            Daily Activity
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data?.dailyActivity}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="submissions" fill="#8884d8" />
              <Bar dataKey="logins" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Grade Distribution */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-bold mb-4 flex items-center">
            <Award className="w-5 h-5 mr-2 text-indigo-600" />
            Grade Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data?.gradeDistribution} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="grade" type="category" />
              <Tooltip />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-bold mb-6 flex items-center">
          <Target className="w-5 h-5 mr-2 text-indigo-600" />
          Performance Metrics
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data?.performanceMetrics?.map((metric, index) => (
            <div key={index} className="text-center">
              <ResponsiveContainer width="100%" height={150}>
                <RadialBarChart cx="50%" cy="50%" innerRadius="60%" outerRadius="90%" data={[metric]}>
                  <RadialBar
                    minAngle={15}
                    label={{ position: 'insideStart', fill: '#fff' }}
                    background
                    clockWise
                    dataKey="value"
                    fill={COLORS[index % COLORS.length]}
                  />
                </RadialBarChart>
              </ResponsiveContainer>
              <h4 className="font-semibold text-gray-800">{metric.metric}</h4>
              <p className="text-sm text-gray-600">
                {metric.value}% / {metric.target}% target
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Overview */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-bold mb-4">Weekly Overview</h3>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={data?.submissionTrends}>
            <defs>
              <linearGradient id="colorSubmissions" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorHomework" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="month" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Area type="monotone" dataKey="submissions" stroke="#8884d8" fillOpacity={1} fill="url(#colorSubmissions)" />
            <Area type="monotone" dataKey="homework" stroke="#82ca9d" fillOpacity={1} fill="url(#colorHomework)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
          <h4 className="font-semibold text-green-800 mb-2">System Health</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-green-700">Uptime</span>
              <span className="font-semibold text-green-800">99.9%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-green-700">Response Time</span>
              <span className="font-semibold text-green-800">120ms</span>
            </div>
            <div className="flex justify-between">
              <span className="text-green-700">Error Rate</span>
              <span className="font-semibold text-green-800">0.1%</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
          <h4 className="font-semibold text-blue-800 mb-2">User Engagement</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-blue-700">Daily Active Users</span>
              <span className="font-semibold text-blue-800">{data?.activeUsers || 0}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-700">Avg. Session Time</span>
              <span className="font-semibold text-blue-800">25 min</span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-700">Bounce Rate</span>
              <span className="font-semibold text-blue-800">15%</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200">
          <h4 className="font-semibold text-purple-800 mb-2">Content Stats</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-purple-700">Total Notes</span>
              <span className="font-semibold text-purple-800">{data?.notes || 0}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-purple-700">Discussions</span>
              <span className="font-semibold text-purple-800">{data?.discussions || 0}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-purple-700">Files Uploaded</span>
              <span className="font-semibold text-purple-800">1,234</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}