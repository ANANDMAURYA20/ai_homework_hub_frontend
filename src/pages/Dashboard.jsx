import { useAuth } from '../context/AuthContext';
import { USERS } from '../api/client';
import TeacherDashboard from './TeacherDashboard';
import StudentDashboard from './StudentDashboard';
import AdminDashboard from './AdminDashboard';
import Layout from '../components/Layout';

export default function Dashboard() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  // Render appropriate dashboard based on user role
  if (user.role === USERS.ADMIN) {
    return (
      <Layout>
        <AdminDashboard />
      </Layout>
    );
  }

  if (user.role === USERS.TEACHER) {
    return (
      <Layout>
        <TeacherDashboard />
      </Layout>
    );
  }

  if (user.role === USERS.STUDENT) {
    return (
      <Layout>
        <StudentDashboard />
      </Layout>
    );
  }

  // Fallback for unknown roles
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-xl">Unknown user role</div>
    </div>
  );
}



