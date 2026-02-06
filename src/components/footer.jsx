import React, { useState } from 'react';
import '../styles/footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [donateModalOpen, setDonateModalOpen] = useState(false);

  const toggleDonateModal = () => {
    setDonateModalOpen(!donateModalOpen);
  };

  const closeDonateModal = () => {
    setDonateModalOpen(false);
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* Columna 1: Info */}
          <div className="footer-section">
            <h3 className="footer-title">RapTrainer</h3>
            <p className="footer-description">
              La app definitiva para entrenar tu freestyle. 
              Mejora tus skills con diferentes modos de práctica.
            </p>
            <div className="footer-social">
              {/* Puedes agregar redes sociales aquí */}
            </div>
          </div>

          {/* Columna 2: Apoyo */}
          <div className="footer-section">
            <h4 className="footer-subtitle">Apoya el Proyecto</h4>
            <p className="footer-text">
              Esta app es gratuita y siempre lo será. 
              Si te ayuda, considera apoyar su desarrollo.
            </p>
            <div className="footer-donate-section">
              <button 
                onClick={toggleDonateModal}
                className="footer-donate-btn"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
                Donar
              </button>
            </div>
          </div>
        </div>

        {/* Línea divisoria */}
        <div className="footer-divider"></div>

        {/* Bottom */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            © {currentYear} RapTrainer. Hecho por SLS con{' '}
            <span className="heart">❤️</span> por la movida del free
          </p>
          
        </div>
      </div>

      {/* Decorative element */}
      <div className="footer-decoration">
        <div className="decoration-line"></div>
        <span className="decoration-icon">🎤</span>
        <div className="decoration-line"></div>
      </div>

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
    </footer>
  );
};

export default Footer;