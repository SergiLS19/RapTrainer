import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/header.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [donateModalOpen, setDonateModalOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleDonateModal = () => {
    setDonateModalOpen(!donateModalOpen);
  };

  const closeDonateModal = () => {
    setDonateModalOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          {/* Logo */}
          <Link to="/" className="logo">
            <div className="logo-icon">🎤</div>
            <div className="logo-text">
              <span className="logo-main">RAP</span>
              <span className="logo-sub">TRAINER</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="nav-desktop">
            <Link to="/" className={`nav-link ${isActive('/')}`}>
              Inicio
            </Link>
            <Link to="/modes" className={`nav-link ${isActive('/modes')}`}>
              Modos
            </Link>
            <button 
              onClick={toggleDonateModal}
              className="btn-donate"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
              Donar
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className={`menu-toggle ${menuOpen ? 'open' : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        {/* Mobile Navigation */}
        <nav className={`nav-mobile ${menuOpen ? 'open' : ''}`}>
          <Link 
            to="/" 
            className={`nav-link ${isActive('/')}`}
            onClick={() => setMenuOpen(false)}
          >
            Inicio
          </Link>
          <Link 
            to="/modes" 
            className={`nav-link ${isActive('/modes')}`}
            onClick={() => setMenuOpen(false)}
          >
            Modos
          </Link>
          <button 
            onClick={() => {
              toggleDonateModal();
              setMenuOpen(false);
            }}
            className="btn-donate mobile"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            Donar al Creador
          </button>
        </nav>
      </div>

      {/* Decorative Line */}
      <div className="header-line"></div>

      {/* Donate Modal */}
      {donateModalOpen && (
        <div className="donate-modal-overlay" onClick={closeDonateModal}>
          <div className="donate-modal" onClick={(e) => e.stopPropagation()}>
            <div className="donate-modal-header">
              <h3>¡Apoya al Creador! 🎤</h3>
              <button className="donate-modal-close" onClick={closeDonateModal}>
                ×
              </button>
            </div>
            <div className="donate-modal-content">
              <div className="donate-option">
                <div className="donate-option-header">
                  <span className="donate-icon">🇵🇪</span>
                  <h4>Yape</h4>
                </div>
                <div className="donate-qr-container">
                  <img
                    src="/images/qr-yape.jpeg"
                    alt="QR de Yape"
                    className="donate-qr-image"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'block';
                    }}
                  />
                  <div className="donate-qr-placeholder" style={{ display: 'none' }}>
                    
                  </div>
                </div>
              </div>
              
              <div className="donate-divider">
                <span>o</span>
              </div>
              
              <div className="donate-option">
                <div className="donate-option-header">
                  <span className="donate-icon">💳</span>
                  <h4>PayPal</h4>
                </div>
                <a 
                  href="https://paypal.me/slsantti1995" 
                  className="paypal-button"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeDonateModal}
                >
                  Donar con PayPal
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;