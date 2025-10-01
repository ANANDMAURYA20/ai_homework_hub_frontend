import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { USERS, classApi } from '../api/client';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', role: USERS.STUDENT, class: '', classes: [], subjects: [] });
  const [availableClasses, setAvailableClasses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    loadClasses();
  }, []);

  const loadClasses = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/public/classes`);
      if (response.ok) {
        const data = await response.json();
        setAvailableClasses(data.classes || []);
      } else {
        // Fallback classes if API fails
        setAvailableClasses(['Class A', 'Class B', 'Class C']);
      }
    } catch (error) {
      console.error('Failed to load classes:', error);
      // Fallback classes if API fails
      setAvailableClasses(['Class A', 'Class B', 'Class C']);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const payload = { ...form };
      if (form.role === USERS.STUDENT) {
        delete payload.classes;
        delete payload.subjects;
      } else if (form.role === USERS.TEACHER) {
        delete payload.class;
      }
      const result = await register(payload);
      if (result?.data?.isApproved) {
        navigate('/login');
      } else {
        setSuccess('Registration submitted for approval.');
      }
    } catch (e) {
      setError(e?.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Create Account</h1>
            <p className="text-gray-600 mt-1">Join HomeworkHub</p>
          </div>
          
          <form onSubmit={onSubmit} className="space-y-4">
            <input
              placeholder="Full Name"
              value={form.name}
              onChange={update('name')}
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
            <input
              placeholder="Email"
              type="email"
              value={form.email}
              onChange={update('email')}
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
            <input
              placeholder="Password"
              type="password"
              value={form.password}
              onChange={update('password')}
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
            <select
              value={form.role}
              onChange={(e) => {
                const role = e.target.value;
                setForm(f => ({ ...f, role, class: '', classes: [], subjects: [] }));
              }}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            >
              <option value={USERS.STUDENT}>Student</option>
              <option value={USERS.TEACHER}>Teacher</option>
            </select>

            {form.role === USERS.STUDENT && (
              <select
                value={form.class}
                onChange={update('class')}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                required
              >
                <option value="">Select your class</option>
                {availableClasses.map(cls => (
                  <option key={cls} value={cls}>{cls}</option>
                ))}
              </select>
            )}

            {form.role === USERS.TEACHER && (
              <>
                <select
                  multiple
                  value={form.classes}
                  onChange={(e) => {
                    const selected = Array.from(e.target.selectedOptions, option => option.value);
                    setForm(f => ({ ...f, classes: selected }));
                  }}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none h-24"
                  required
                >
                  {availableClasses.map(cls => (
                    <option key={cls} value={cls}>{cls}</option>
                  ))}
                </select>
                <input
                  placeholder="Subjects (Math, Science, English)"
                  value={form.subjects.join(', ')}
                  onChange={(e) => {
                    const subjects = e.target.value.split(',').map(s => s.trim()).filter(s => s);
                    setForm(f => ({ ...f, subjects }));
                  }}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  required
                />
              </>
            )}

            <button
              disabled={loading}
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-2.5 rounded-lg transition-colors"
            >
              {loading ? 'Creating...' : 'Create Account'}
            </button>
          </form>

          {error && <p className="mt-3 text-sm text-red-600 text-center">{error}</p>}
          {success && <p className="mt-3 text-sm text-green-600 text-center">{success}</p>}

          <p className="mt-4 text-center text-gray-600 text-sm">
            Have an account? <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

