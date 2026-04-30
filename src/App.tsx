import React from 'react';
import { DeckList } from './components/DeckList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>MTG Deck Builder</h1>
      </header>
      <main>
        <DeckList />
      </main>
    </div>
  );
}

export default App;
