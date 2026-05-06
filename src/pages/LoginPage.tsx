import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    login();
    navigate('/');
  };

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '60vh',
      textAlign: 'center'
    }}>
      <div style={{ 
        background: 'var(--card-bg)', 
        padding: '3rem', 
        borderRadius: '12px', 
        border: '1px solid var(--border-color)',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        maxWidth: '400px',
        width: '100%'
      }}>
        <LogIn size={48} color="#3d5afe" style={{ marginBottom: '1.5rem' }} />
        <h1 style={{ marginBottom: '1rem' }}>Welcome Back</h1>
        <p style={{ color: 'var(--text-color)', opacity: 0.8, marginBottom: '2rem' }}>
          Sign in to access your decks and start building.
        </p>
        <button 
          onClick={handleLogin}
          style={{ 
            width: '100%', 
            padding: '12px', 
            fontSize: '1rem',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px'
          }}
        >
          Login with Auth0 (Mock)
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
