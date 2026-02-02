import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/home.css';

const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              <span className="hero-title-main">ENTRENA TU</span>
              <span className="hero-title-highlight">FREESTYLE</span>
            </h1>
            <p className="hero-subtitle">
              La plataforma definitiva para mejorar tus habilidades de improvisación.
              <br />
              Múltiples modos de entrenamiento. 100% Gratis.
            </p>
            <div className="hero-cta">
              <Link to="/modes" className="btn btn-primary btn-hero">
                🎤 Empezar Ahora
              </Link>
              <Link to="/modes" className="btn btn-secondary btn-hero">
                Ver Modos
              </Link>
            </div>
          </div>
          
          {/* Animated Background */}
          <div className="hero-decoration">
            <div className="floating-icon">🎵</div>
            <div className="floating-icon">🎤</div>
            <div className="floating-icon">🔥</div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <div className="container">
          <h2 className="section-title">¿Cómo Funciona?</h2>
          
          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <h3 className="step-title">Elige un Modo</h3>
              <p className="step-description">
                Selecciona el tipo de entrenamiento que quieres hacer
              </p>
            </div>

            <div className="step-arrow">→</div>

            <div className="step">
              <div className="step-number">2</div>
              <h3 className="step-title">Configura</h3>
              <p className="step-description">
                Ajusta el beat, dificultad y tiempo a tu gusto
              </p>
            </div>

            <div className="step-arrow">→</div>

            <div className="step">
              <div className="step-number">3</div>
              <h3 className="step-title">¡Rapea!</h3>
              <p className="step-description">
                Entrena tu freestyle y mejora tus habilidades
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">¿Listo para mejorar tu flow?</h2>
            <p className="cta-text">
              Únete a miles de freestylers que entrenan diariamente
            </p>
            <Link to="/modes" className="btn btn-primary btn-large">
              Comenzar a Entrenar
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;