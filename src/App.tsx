import React from 'react';
import Header from './containers/Header';
import Board from './containers/Board';

function App() {
  return (
    <div className="container-fluid py-4">
      <div className="mb-3">
        <Header />
      </div>
      <Board />
    </div>
  );
}

export default App;
