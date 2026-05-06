import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import DeckEditor from './pages/DeckEditor';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="app">
          <Header />
          <main className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/decks/new" element={<DeckEditor />} />
              <Route path="/decks/:id" element={<DeckEditor />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
