import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/modespage.css';

const ModesPage = () => {
  const modes = [
    {
      id: 'words',
      title: 'Palabras Aleatorias',
      icon: '🎯',
      description: 'Recibe palabras aleatorias cada pocos segundos para incorporar en tu freestyle',
      difficulty: 'Principiante',
      color: '#FF0000',
      features: [
        'Palabras cada 10 segundos',
        'Categorías personalizables',
        'Modo una por una o todas juntas'
      ],
      path: '/modes/words',
      available: true
    },
    {
      id: 'themes',
      title: 'Temáticas',
      icon: '📚',
      description: 'Desarrolla temas completos con palabras relacionadas entre sí',
      difficulty: 'Intermedio',
      color: '#FFA500',
      features: [
        '20+ temáticas diferentes',
        'Palabras relacionadas',
        'Dificultad ajustable'
      ],
      path: '/modes/themes',
      available: false
    },
    {
      id: 'situations',
      title: 'Situaciones',
      icon: '💭',
      description: 'Responde a preguntas y escenarios hipotéticos rimando',
      difficulty: 'Intermedio',
      color: '#9370DB',
      features: [
        '30+ situaciones únicas',
        'Desde absurdas a filosóficas',
        'Estimula la creatividad'
      ],
      path: '/modes/situations',
      available: false
    },
    {
      id: 'images',
      title: 'Imágenes',
      icon: '🖼️',
      description: 'Usa imágenes como estímulo visual para tu freestyle',
      difficulty: 'Avanzado',
      color: '#00CED1',
      features: [
        'Imágenes urbanas',
        'Diferentes categorías',
        'Interpretación visual'
      ],
      path: '/modes/images',
      available: false
    },
    {
      id: 'multibeats',
      title: 'Multibeats',
      icon: '🔀',
      description: 'Cambia de beat cada minuto para mejorar tu adaptabilidad',
      difficulty: 'Avanzado',
      color: '#FF6B35',
      features: [
        'Cambio automático de beats',
        'Diferentes estilos',
        'Mejora adaptabilidad'
      ],
      path: '/modes/multibeats',
      available: false
    },
    {
      id: 'free',
      title: 'Modo Libre',
      icon: '🎵',
      description: 'Elige tu beat favorito y entrena sin restricciones',
      difficulty: 'Todos',
      color: '#00FF00',
      features: [
        'Beats por categoría',
        'Tiempo personalizable',
        'Sin restricciones'
      ],
      path: '/modes/free',
      available: false
    },
    {
      id: 'battle',
      title: '1 vs 1',
      icon: '⚔️',
      description: 'Batalla con tus amigos en un 4x4 clasico',
      difficulty: 'Avanzado',
      color: '#DC143C',
      features: [
        'Modo 4x4',
        'Personajes contrapuestos',
        '20+ batallas únicas'
      ],
      path: '/modes/battle',
      available: false
    }
  ];

  return (
    <div className="modes-page">
      <div className="container">
        {/* Header */}
        <div className="modes-header">
          <h1>Modos de Entrenamiento</h1>
          <p className="modes-description">
            Elige el modo que mejor se adapte a tu nivel y objetivos de entrenamiento
          </p>
        </div>

        {/* Modes Grid */}
        <div className="modes-grid">
          {modes.map((mode, index) => (
            <div 
              key={mode.id} 
              className={`mode-card ${!mode.available ? 'coming-soon' : ''}`}
              style={{ 
                animationDelay: `${index * 0.1}s`,
                '--mode-color': mode.color 
              }}
            >
              {!mode.available && (
                <div className="coming-soon-overlay">
                  <span className="coming-soon-text">Próximamente...</span>
                </div>
              )}

              <div className="mode-icon">{mode.icon}</div>
              
              <h2 className="mode-title">{mode.title}</h2>

              <p className="mode-description">{mode.description}</p>

              <ul className="mode-features">
                {mode.features.map((feature, i) => (
                  <li key={i}>
                    <span className="feature-bullet">→</span>
                    {feature}
                  </li>
                ))}
              </ul>

              {mode.available ? (
                <Link to={mode.path} className="mode-btn">
                  Empezar Modo
                  <span className="btn-arrow">→</span>
                </Link>
              ) : (
                <button className="mode-btn disabled" disabled>
                  En Desarrollo
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Info Section */}
        <div className="info-section">
          <h2>💡 Consejos de Entrenamiento</h2>
          <div className="tips-grid">
            <div className="tip-card">
              <h3>🎯 Consistencia</h3>
              <p>Practica al menos 15-20 minutos diarios para ver mejoras rápidas</p>
            </div>
            <div className="tip-card">
              <h3>📈 Progresión</h3>
              <p>Empieza con modos fáciles y ve aumentando la dificultad gradualmente</p>
            </div>
            <div className="tip-card">
              <h3>🎵 Variedad</h3>
              <p>Alterna entre diferentes modos para desarrollar habilidades completas</p>
            </div>
            <div className="tip-card">
              <h3>🔥 Diversión</h3>
              <p>Lo más importante: diviértete y no te frustres con los errores</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModesPage;