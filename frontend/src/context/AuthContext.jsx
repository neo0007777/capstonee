import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user on startup
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  // Fetch currently logged-in user
  const fetchUser = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      const response = await axios.get('/api/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const userData = response.data.user;
      setUser(userData);

      console.log("✅ User data fetched:", userData);

    } catch (error) {
      console.error("❌ Error fetching user:", error);

      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
      setUser(null);

    } finally {
      setLoading(false);
    }
  };

  // Login function
  const login = async (email, password) => {
    try {
      const response = await axios.post('/api/auth/login', {
        email,
        password
      });

      const { token, user } = response.data;

      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(user);

      console.log("✅ Login successful:", user);

      return { success: true, user };

    } catch (error) {
      console.error("❌ Login error:", error);

      return {
        success: false,
        error: error.response?.data?.error || "Login failed"
      };
    }
  };

  // Signup function
  const signup = async (email, password, name) => {
    try {
      const response = await axios.post('/api/auth/signup', {
        email,
        password,
        name
      });

      const { token, user } = response.data;

      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(user);

      console.log("✅ Signup successful:", user);

      return { success: true, user };

    } catch (error) {
      console.error("❌ Signup error:", error);

      return {
        success: false,
        error: error.response?.data?.error || "Signup failed"
      };
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    fetchUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
