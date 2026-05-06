import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

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
          <Link to="/decks/new">New Deck</Link>
        </nav>
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
    </header>
  );
};

export default Header;
