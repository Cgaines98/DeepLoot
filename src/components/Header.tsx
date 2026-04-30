import React from 'react';
import { Link } from 'react-router-dom';
import { Layout } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Layout color="#3d5afe" />
        <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white', textDecoration: 'none' }}>
          DeepLoot
        </Link>
      </div>
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/decks/new">New Deck</Link>
      </nav>
    </header>
  );
};

export default Header;
