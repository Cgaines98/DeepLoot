import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Search, Zap, Shield } from 'lucide-react';

const LandingPage: React.FC = () => {
  return (
    <div style={{ textAlign: 'center', padding: '40px 20px' }}>
      <header style={{ marginBottom: '60px' }}>
        <Layout size={80} color="#3d5afe" style={{ marginBottom: '20px' }} />
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>MockField</h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-color)', opacity: 0.8, maxWidth: '600px', margin: '0 auto 2rem' }}>
          The ultimate tool for Magic: The Gathering deck building. 
          Manage your collection, search for cards, and refine your strategies.
        </p>
        <Link to="/login">
          <button style={{ padding: '12px 32px', fontSize: '1.1rem', fontWeight: 'bold' }}>
            Get Started
          </button>
        </Link>
      </header>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '30px',
        marginTop: '60px'
      }}>
        <div style={{ padding: '20px', background: 'var(--card-bg)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
          <Search size={32} color="#3d5afe" style={{ marginBottom: '15px' }} />
          <h3>Powerful Search</h3>
          <p>Find any card instantly using Scryfall's industry-leading database.</p>
        </div>
        <div style={{ padding: '20px', background: 'var(--card-bg)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
          <Zap size={32} color="#3d5afe" style={{ marginBottom: '15px' }} />
          <h3>Fast Building</h3>
          <p>Intuitive interface designed for speed. Add cards and adjust quantities with ease.</p>
        </div>
        <div style={{ padding: '20px', background: 'var(--card-bg)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
          <Shield size={32} color="#3d5afe" style={{ marginBottom: '15px' }} />
          <h3>Secure Storage</h3>
          <p>Your decks are saved securely, so you can access them from any device.</p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
