import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Dashboard.css';

function Dashboard() {
  const { user, logout, loading, fetchUser } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch user data from database when component mounts
    const loadUserData = async () => {
      if (!user && !loading) {
        await fetchUser();
      }
      setIsLoading(false);
    };
    loadUserData();
  }, [user, loading, fetchUser]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (isLoading || loading) {
    return (
      <div className="dashboard-container">
        <div className="dashboard-card">
          <div className="loading-spinner" style={{ margin: '20px auto', display: 'block' }}></div>
          <p style={{ textAlign: 'center', marginTop: '20px' }}>Loading your data...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="dashboard-container">
        <div className="dashboard-card">
          <p style={{ textAlign: 'center', color: '#c53030' }}>Unable to load user data</p>
          <button onClick={() => navigate('/login')} className="logout-btn" style={{ marginTop: '20px' }}>
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <div className="welcome-badge">Welcome</div>
        <h1>Dashboard</h1>
        <p>Your account information from database</p>
        <div className="user-info">
          <h2>User Information</h2>
          <div className="info-item">
            <strong>Email:</strong>
            <span>{user?.email}</span>
          </div>
          {user?.name && (
            <div className="info-item">
              <strong>Name:</strong>
              <span>{user?.name}</span>
            </div>
          )}
          <div className="info-item">
            <strong>User ID:</strong>
            <span>{user?.id}</span>
          </div>
          {user?.createdAt && (
            <div className="info-item">
              <strong>Account Created:</strong>
              <span>{new Date(user.createdAt).toLocaleDateString()}</span>
            </div>
          )}
        </div>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>
    </div>
  );
}

export default Dashboard;

