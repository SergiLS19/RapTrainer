import React, { useState, useEffect, useRef } from 'react';
import BeatPlayer from '../components/beatplayer.jsx';
import { getRandomWords, getCategories, getCategoryInfo } from '../data/palabras';
import { getRandomBeat, beatCategories } from '../data/beats';
import '../styles/wordsmode.css';

const WordsMode = () => {
  // Estados
  const [isStarted, setIsStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showWarmup, setShowWarmup] = useState(false);
  const [warmupTime, setWarmupTime] = useState(25);
  const [showCountdown, setShowCountdown] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [showTimeUp, setShowTimeUp] = useState(false);
  const [currentBeat, setCurrentBeat] = useState(null);
  const [beatReady, setBeatReady] = useState(false);
  const [words, setWords] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [sessionTime, setSessionTime] = useState(0);
  const [beatPlayerRef, setBeatPlayerRef] = useState(null);
  const [warmupTotal, setWarmupTotal] = useState(25);

  // Configuración
  const [config, setConfig] = useState({
    displayMode: 'one-by-one', // 'one-by-one' o 'all-at-once'
    interval: 10, // segundos entre palabras
    wordCount: 10, // cantidad total de palabras
    beatCategory: 'boombap', // categoría por defecto
    duration: 120 // duración total en segundos (2 minutos default)
  });

  const intervalRef = useRef(null);
  const timerRef = useRef(null);
  const warmupRef = useRef(null);
  const warmupStartedRef = useRef(false);
  const wordsRef = useRef([]);
  const configRef = useRef(config);
  const sessionActiveRef = useRef(false);
  const resetTimeoutRef = useRef(null);

  // ========== CONTROL DE SESIÓN ==========

  const startSession = () => {
    // Limpiar cualquier estado previo
    if (resetTimeoutRef.current) {
      clearTimeout(resetTimeoutRef.current);
      resetTimeoutRef.current = null;
    }
    
    // Resetear flags importantes
    sessionActiveRef.current = false;
    warmupStartedRef.current = false;
    
    // Obtener beat aleatorio e iniciarlo
    const beat = getRandomBeat(config.beatCategory);
    setCurrentBeat(beat);
  };

  const startWarmup = (beat) => {
    const beatWarmupTime = beat.warmupTime || 25;
    setShowWarmup(true);
    setWarmupTime(beatWarmupTime);
    setWarmupTotal(beatWarmupTime);

    warmupRef.current = setInterval(() => {
      setWarmupTime(prev => {
        if (prev <= 1) {
          clearInterval(warmupRef.current);
          warmupRef.current = null;
          setShowWarmup(false);
          // Iniciar sesión inmediatamente sin delay
          initializeSession();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const initializeSession = () => {
    // Limpiar cualquier timer anterior por seguridad
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    // Generar palabras
    const generatedWords = getRandomWords(config.wordCount);
    setWords(generatedWords);
    wordsRef.current = generatedWords;
    configRef.current = config;
    setCurrentWordIndex(0);

    // Iniciar
    setIsStarted(true);
    sessionActiveRef.current = true;
    setSessionTime(0);
    setTimeRemaining(config.interval);

    // Capturar la longitud de las palabras generadas en una variable local
    const totalWords = generatedWords.length;
    
    // Timer unificado que maneja todo cada segundo
    let wordTimeLeft = config.interval;
    let currentIndex = 0;
    
    timerRef.current = setInterval(() => {
      // Verificar que la sesión sigue activa
      if (!sessionActiveRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
        return;
      }
      
      setSessionTime(prev => prev + 1);
      wordTimeLeft -= 1;
      setTimeRemaining(wordTimeLeft);
      
      // Cuando el tiempo de la palabra llega a 0
      if (wordTimeLeft <= 0) {
        const nextIndex = currentIndex + 1;
        
        // Si era la última palabra, terminar sesión
        if (nextIndex >= totalWords) {
          clearInterval(timerRef.current);
          timerRef.current = null;
          endSession();
          return;
        }
        
        // Cambiar a la siguiente palabra
        currentIndex = nextIndex;
        setCurrentWordIndex(nextIndex);
        wordTimeLeft = configRef.current.interval;
        setTimeRemaining(wordTimeLeft);
      }
    }, 1000);
  };

  const endSession = () => {
    // Evitar múltiples llamadas
    if (!sessionActiveRef.current) return;
    sessionActiveRef.current = false;
    
    // Detener timers (pero NO el beat)
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (warmupRef.current) {
      clearInterval(warmupRef.current);
      warmupRef.current = null;
    }
    
    setIsStarted(false);
    // NO limpiar currentBeat aquí para que el beat siga sonando
    
    // Mostrar modal de "tiempo"
    setShowTimeUp(true);
    
    // Después de 3 segundos, limpiar beat y resetear completamente
    resetTimeoutRef.current = setTimeout(() => {
      setShowTimeUp(false);
      setCurrentBeat(null);
      setBeatReady(false);
      warmupStartedRef.current = false; // Resetear flag para permitir nuevo warmup
      // Limpiar palabras para forzar nuevo estado
      setWords([]);
      wordsRef.current = [];
      setCurrentWordIndex(0);
      setSessionTime(0);
      setTimeRemaining(0);
    }, 3000);
  };

  const stopSession = () => {
    setIsStarted(false);
    setIsPaused(false);
    sessionActiveRef.current = false;
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timerRef.current) clearInterval(timerRef.current);
    if (warmupRef.current) clearInterval(warmupRef.current);
    intervalRef.current = null;
    timerRef.current = null;
    warmupRef.current = null;
  };

  const pauseSession = () => {
    setIsPaused(true);
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timerRef.current) clearInterval(timerRef.current);
    if (warmupRef.current) clearInterval(warmupRef.current);
  };

  const resumeSession = () => {
    setIsPaused(false);
    
    // Si estamos en warmup, reanudar warmup
    if (showWarmup) {
      warmupRef.current = setInterval(() => {
        setWarmupTime(prev => {
          if (prev <= 0) {
            clearInterval(warmupRef.current);
            setShowWarmup(false);
            setTimeout(() => {
              initializeSession();
            }, 500);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return;
    }
    
    // Si no estamos en sesión activa, no hacer nada
    if (!isStarted) return;
    
    // Reanudar con timer unificado usando los valores actuales
    let wordTimeLeft = timeRemaining;
    let currentIndex = currentWordIndex;
    
    timerRef.current = setInterval(() => {
      setSessionTime(prev => prev + 1);
      wordTimeLeft -= 1;
      setTimeRemaining(wordTimeLeft);
      
      if (wordTimeLeft <= 0) {
        const nextIndex = currentIndex + 1;
        
        if (nextIndex >= wordsRef.current.length) {
          clearInterval(timerRef.current);
          timerRef.current = null;
          endSession();
          return;
        }
        
        currentIndex = nextIndex;
        setCurrentWordIndex(nextIndex);
        wordTimeLeft = configRef.current.interval;
        setTimeRemaining(wordTimeLeft);
      }
    }, 1000);
  };

  const resetSession = () => {
    stopSession();
    if (resetTimeoutRef.current) {
      clearTimeout(resetTimeoutRef.current);
      resetTimeoutRef.current = null;
    }
    setWords([]);
    wordsRef.current = [];
    setCurrentWordIndex(0);
    setSessionTime(0);
    setTimeRemaining(0);
    setCurrentBeat(null);
    setBeatReady(false);
    setShowWarmup(false);
    setShowCountdown(false);
    setShowTimeUp(false);
    setWarmupTime(25);
    setWarmupTotal(25);
    setCountdown(5);
    warmupStartedRef.current = false;
    sessionActiveRef.current = false;
  };

  // Cleanup
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timerRef.current) clearInterval(timerRef.current);
      if (warmupRef.current) clearInterval(warmupRef.current);
      if (resetTimeoutRef.current) clearTimeout(resetTimeoutRef.current);
    };
  }, []);

  // ========== FORMATEO ==========

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getWarmupPhrase = (time) => {
    if (time > 20) return "¿Estás listo?";
    if (time > 15) return "Preparate...";
    if (time > 10) return "La primera se baila...";
    if (time > 5) return "¡Dicelo!";
    if (time > 3) return "Y se la damos";
    if (time > 0) return null;
    return "Aquí vamos...";
  };

  // ========== RENDER ==========

  // Determinar si el beat debe estar visible
  const showBeatPlayer = currentBeat;

  // Calcular progreso del warmup (0 a 1)
  const warmupProgress = warmupTotal > 0 ? 1 - (warmupTime / warmupTotal) : 0;
  const circumference = 2 * Math.PI * 90; // radio = 90
  const strokeDashoffset = circumference * (1 - warmupProgress);

  return (
    <div className="words-mode">
      <div className="container">
        {/* Header del Modo */}
        <div className="mode-header">
          <h1>Palabras Aleatorias</h1>
          <p className="mode-description">
            Entrena tu improvisación con palabras aleatorias.
            Cada {config.interval} segundos recibirás una nueva palabra para rimar.
          </p>
        </div>

        {/* Modal de Calentamiento */}
        {showWarmup && (
          <div className="countdown-modal warmup-modal-animated">
            {/* Fondo con partículas animadas */}
            <div className="warmup-bg-particles">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="warmup-particle" style={{ '--i': i }} />
              ))}
            </div>

            <div className="countdown-content warmup-content-animated">
              {warmupTime > 3 ? (
                <>
                  {/* Frase animada */}
                  <h2 className="warmup-phrase" key={getWarmupPhrase(warmupTime)}>
                    {getWarmupPhrase(warmupTime)}
                  </h2>

                  {/* Anillo de progreso circular */}
                  <div className="warmup-ring-container">
                    <svg className="warmup-ring" viewBox="0 0 200 200">
                      <circle
                        className="warmup-ring-bg"
                        cx="100"
                        cy="100"
                        r="90"
                        fill="none"
                        strokeWidth="4"
                      />
                      <circle
                        className="warmup-ring-progress"
                        cx="100"
                        cy="100"
                        r="90"
                        fill="none"
                        strokeWidth="6"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="warmup-ring-timer" key={warmupTime}>
                      {warmupTime}
                    </div>
                  </div>

                  {/* Barras de ecualizador */}
                  <div className="warmup-equalizer">
                    {[...Array(9)].map((_, i) => (
                      <div
                        key={i}
                        className="warmup-eq-bar"
                        style={{ '--bar-i': i, '--bar-speed': `${0.4 + Math.random() * 0.5}s` }}
                      />
                    ))}
                  </div>
                </>
              ) : warmupTime > 0 ? (
                <div className="warmup-final-countdown">
                  <div className="countdown-number" key={warmupTime}>{warmupTime}</div>
                  <div className="countdown-ring-burst" key={`burst-${warmupTime}`} />
                </div>
              ) : null}
            </div>
          </div>
        )}

        {/* Modal de Tiempo - Solo cuando showTimeUp está activo */}
        {showTimeUp && (
          <div className="countdown-modal timeup-modal">
            <div className="countdown-content">
              <h2 className="timeup-text">¡TIEEEEEMPOOOOOO!</h2>
            </div>
          </div>
        )}

        {!isStarted && !showWarmup && !showTimeUp && (
          /* ========== CONFIGURACIÓN ========== */
          <div className="config-panel">
            <div className="config-section">
              <h3>⚙️ Configuración</h3>

              {/* Modo de visualización */}
              <div className="config-group">
                <label>Modo de Visualización</label>
                <div className="radio-group">
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="displayMode"
                      value="one-by-one"
                      checked={config.displayMode === 'one-by-one'}
                      onChange={(e) => setConfig({...config, displayMode: e.target.value})}
                    />
                    <span>Una por una</span>
                  </label>
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="displayMode"
                      value="all-at-once"
                      checked={config.displayMode === 'all-at-once'}
                      onChange={(e) => setConfig({...config, displayMode: e.target.value})}
                    />
                    <span>Todas a la vez</span>
                  </label>
                </div>
              </div>

              {/* Intervalo */}
              {config.displayMode === 'one-by-one' && (
                <div className="config-group">
                  <label>Intervalo (segundos): {config.interval}s</label>
                  <input
                    type="range"
                    min="5"
                    max="30"
                    step="5"
                    value={config.interval}
                    onChange={(e) => setConfig({...config, interval: parseInt(e.target.value)})}
                    className="slider"
                  />
                </div>
              )}

              {/* Cantidad de palabras */}
              <div className="config-group">
                <label>Cantidad de palabras: {config.wordCount}</label>
                <input
                  type="range"
                  min="5"
                  max="50"
                  step="5"
                  value={config.wordCount}
                  onChange={(e) => setConfig({...config, wordCount: parseInt(e.target.value)})}
                  className="slider"
                />
              </div>

              {/* Categoría de beat */}
              <div className="config-group">
                <label>Tipo de Beat</label>
                <select
                  value={config.beatCategory || Object.keys(beatCategories)[0]}
                  onChange={(e) => setConfig({...config, beatCategory: e.target.value})}
                  className="select"
                >
                  {Object.keys(beatCategories).map(cat => (
                    <option key={cat} value={cat}>
                      {beatCategories[cat].icon} {beatCategories[cat].name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Botón Start */}
              <button onClick={startSession} className="btn btn-primary btn-large">
                🎤 Comenzar Sesión
              </button>
            </div>
          </div>
        )}

        {/* ========== SESIÓN ACTIVA ========== */}
        {isStarted && (
          <div className="session-container-compact">
            {/* Display de Palabras - ARRIBA */}
            <div className="words-display-compact">
              {config.displayMode === 'one-by-one' ? (
                <div className="word-single-compact">
                  <div className="word-card-large animate" key={currentWordIndex}>
                    {words[currentWordIndex]}
                  </div>
                  <div className="word-counter-centered">{currentWordIndex + 1} / {words.length}</div>
                  <div className="word-progress-bar">
                    <div 
                      className="word-progress-fill"
                      style={{ 
                        width: `${Math.max(0, (timeRemaining / config.interval) * 100)}%`
                      }}
                    ></div>
                  </div>
                </div>
              ) : (
                <div className="words-grid-compact">
                  {words.map((word, index) => (
                    <div 
                      key={index} 
                      className="word-chip-compact"
                      style={{animationDelay: `${index * 0.05}s`}}
                    >
                      {word}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Beat Player - ÚNICO durante toda la sesión (warmup, palabras, timeUp) - SIEMPRE ABAJO */}
        {showBeatPlayer && (
          <div 
            className={`beat-player-container-unified ${showWarmup ? 'beat-during-warmup' : ''} ${isStarted ? 'beat-during-session' : ''} ${showTimeUp ? 'beat-during-timeup' : ''}`}
          >
            <BeatPlayer 
              beat={currentBeat} 
              autoplay={true}
              onEnd={stopSession}
              onPlayerReady={(ref) => {
                setBeatPlayerRef(ref);
                setBeatReady(true);
                // Iniciar warmup SOLO cuando el beat esté listo, no se haya iniciado antes, y no haya showTimeUp
                if (currentBeat && !warmupStartedRef.current && !isStarted && !showTimeUp) {
                  warmupStartedRef.current = true;
                  startWarmup(currentBeat);
                }
              }}
              onPause={pauseSession}
              onResume={resumeSession}
            />
          </div>
        )}

        {/* Botón Reiniciar - Solo durante sesión activa */}
        {isStarted && (
          <div className="reset-button-container">
            <button onClick={resetSession} className="btn-reset-centered">
              🔄 Reiniciar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WordsMode;