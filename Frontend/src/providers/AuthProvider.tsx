import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface User {
  iniciales: string;
  nombre: string;
  avatar?: string;
  nivel_acceso: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthWrapper: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Now safe inside router context

  useEffect(() => {
    const fetchUser = async () => {

      const token = localStorage.getItem('token');


      if (!token) {
        setLoading(false);
        navigate('/pages/authentication/simple/sign-in');
        return;
      }

      try {
        const response = await axios.get('/auth/me', {
          headers: { Authorization: `Bearer ${token}` }
          
        });
        setUser({
          iniciales: response.data.Iniciales,
          nombre: response.data.nombre,
          nivel_acceso: response.data.nivel_acceso,
         avatar: response.data.avatar || null
        });
      } catch (error) {
        console.error('Error fetching user:', error);
        localStorage.removeItem('token');
        navigate('');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  return <AuthWrapper>{children}</AuthWrapper>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};