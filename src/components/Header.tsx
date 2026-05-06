import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Layout, Sun, Moon, LogOut, LogIn, User } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="header">
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Layout color="#3d5afe" />
        <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: theme === 'dark' ? 'white' : '#333', textDecoration: 'none' }}>
          MockField
        </Link>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <nav className="nav-links">
          <Link to="/">Home</Link>
          {isAuthenticated && <Link to="/decks/new">New Deck</Link>}
        </nav>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {isAuthenticated ? (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.9rem', color: 'var(--text-color)' }}>
                <User size={16} />
                <span>{user?.name}</span>
              </div>
              <button 
                onClick={handleLogout}
                style={{ background: 'none', border: 'none', padding: '5px', cursor: 'pointer', color: 'var(--text-color)', display: 'flex', alignItems: 'center' }}
                title="Logout"
              >
                <LogOut size={20} />
              </button>
            </>
          ) : (
            <Link to="/login" style={{ color: 'var(--text-color)', display: 'flex', alignItems: 'center' }} title="Login">
              <LogIn size={20} />
            </Link>
          )}
          
          <button 
            onClick={toggleTheme} 
            style={{ 
              background: 'none', 
              border: 'none', 
              padding: '5px', 
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              color: 'var(--text-color)'
            }}
            aria-label="Toggle Theme"
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
