import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
import Home from './pages/home';
import ModesPage from './pages/modespage';
import WordsMode from './pages/wordsmode';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/modes" element={<ModesPage />} />
            <Route path="/modes/words" element={<WordsMode />} />
            <Route path="/modes/themes" element={<div>Temáticas - En desarrollo</div>} />
            <Route path="/modes/situations" element={<div>Situaciones - En desarrollo</div>} />
            <Route path="/modes/free" element={<div>Modo Libre - En desarrollo</div>} />
            <Route path="/modes/battle" element={<div>1 vs 1 - En desarrollo</div>} />
            {/* Puedes agregar más rutas para otros modos */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;