import React, { useState, useRef, useEffect } from 'react';
import YouTube from 'react-youtube';
import '../styles/beatplayer.css';

/**
 * BeatPlayer - Reproductor de YouTube con controles customizados
 * Diseño: Rojo/Negro streetwear
 * 
 * Props:
 * - beat: objeto con {youtubeId, title, producer, bpm, category}
 * - autoplay: boolean
 * - onEnd: callback cuando termina el beat
 * - onPlayerReady: callback para pasar la referencia del player
 * - onPause: callback cuando se pausa
 * - onResume: callback cuando se reanuda
 */

const BeatPlayer = ({ beat, autoplay = false, onEnd, onPlayerReady, onPause, onResume }) => {
  const [player, setPlayer] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(70);
  const [isMuted, setIsMuted] = useState(false);
  const [showVolume, setShowVolume] = useState(false);
  
  const intervalRef = useRef(null);

  // Opciones del reproductor de YouTube
  const opts = {
    height: '0',
    width: '0',
    playerVars: {
      autoplay: autoplay ? 1 : 0,
      controls: 0, // Desactivamos controles nativos
      modestbranding: 1,
      rel: 0,
      showinfo: 0,
      fs: 0,
      playsinline: 1
    },
  };

  // Cuando el player está listo
  const onReady = (event) => {
    setPlayer(event.target);
    setDuration(event.target.getDuration());
    if (autoplay) {
      setIsPlaying(true);
      startProgressTracking(event.target);
    }
    // Pasar la referencia del player al componente padre
    if (onPlayerReady) {
      onPlayerReady(event.target);
    }
  };

  // Tracking del progreso
  const startProgressTracking = (playerInstance) => {
    intervalRef.current = setInterval(() => {
      if (playerInstance && playerInstance.getCurrentTime) {
        setCurrentTime(playerInstance.getCurrentTime());
      }
    }, 100);
  };

  const stopProgressTracking = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  // Cuando cambia el estado del player
  const onStateChange = (event) => {
    // 1 = playing, 2 = paused, 0 = ended
    if (event.data === 1) {
      setIsPlaying(true);
      startProgressTracking(event.target);
    } else if (event.data === 2) {
      setIsPlaying(false);
      stopProgressTracking();
    } else if (event.data === 0) {
      setIsPlaying(false);
      stopProgressTracking();
      if (onEnd) onEnd();
    }
  };

  // Cleanup
  useEffect(() => {
    return () => stopProgressTracking();
  }, []);

  // ========== CONTROLES ==========

  const togglePlay = () => {
    if (!player) return;
    
    if (isPlaying) {
      player.pauseVideo();
      if (onPause) onPause();
    } else {
      player.playVideo();
      if (onResume) onResume();
    }
  };

  const handleSeek = (e) => {
    if (!player || duration <= 0) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    const newTime = percentage * duration;
    player.seekTo(newTime, true);
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e) => {
    if (!player) return;
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
    player.setVolume(newVolume);
    if (newVolume === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    if (!player) return;
    
    if (isMuted) {
      player.unMute();
      player.setVolume(volume);
      setIsMuted(false);
    } else {
      player.mute();
      setIsMuted(true);
    }
  };

  const skipForward = () => {
    if (!player) return;
    const newTime = Math.min(currentTime + 10, duration);
    player.seekTo(newTime, true);
  };

  const skipBackward = () => {
    if (!player) return;
    const newTime = Math.max(currentTime - 10, 0);
    player.seekTo(newTime, true);
  };

  // ========== FORMATEO DE TIEMPO ==========

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // ========== RENDER ==========

  if (!beat) {
    return (
      <div className="beat-player no-beat">
        <p>No hay beat seleccionado</p>
      </div>
    );
  }

  return (
    <div className="beat-player">
      {/* YouTube Player (oculto) */}
      <YouTube
        videoId={beat.youtubeId}
        opts={opts}
        onReady={onReady}
        onStateChange={onStateChange}
      />

      {/* Info del Beat */}
      <div className="beat-info">
        <div className="beat-title">{beat.title}</div>
      </div>
      
      {/* Barra de Progreso */}
      <div className="progress-container">
        <span className="time-label">{formatTime(currentTime)}</span>
        <div className="progress-bar" onClick={handleSeek}>
          <div
            className="progress-fill"
            style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
          >
            <div className="progress-thumb"></div>
          </div>
        </div>
        <span className="time-label">{formatTime(duration)}</span>
      </div>
      
      {/* Meta info debajo de la barra */}
      <div className="beat-meta-row">
        <div className="beat-producer">
          {beat.producer && <span>por {beat.producer}</span>}
        </div>
        <div className="beat-stats">
          {beat.bpm && <span className="bpm">{beat.bpm} BPM</span>}
          {beat.category && <span className="category">{beat.category}</span>}
        </div>
      </div>

      {/* Controles */}
      <div className="player-controls">
        {/* Skip Backward */}
        <button 
          className="control-btn control-skip" 
          onClick={skipBackward}
          title="Retroceder 10s"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M11 17l-5-5 5-5M18 17l-5-5 5-5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="skip-label">10</span>
        </button>

        {/* Play/Pause Principal */}
        <button 
          className="control-btn control-play" 
          onClick={togglePlay}
          title={isPlaying ? "Pausar" : "Reproducir"}
        >
          {isPlaying ? (
            // Pause Icon
            <svg viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="4" width="4" height="16" rx="1"/>
              <rect x="14" y="4" width="4" height="16" rx="1"/>
            </svg>
          ) : (
            // Play Icon
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z"/>
            </svg>
          )}
        </button>

        {/* Skip Forward */}
        <button 
          className="control-btn control-skip" 
          onClick={skipForward}
          title="Adelantar 10s"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M13 17l5-5-5-5M6 17l5-5-5-5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="skip-label">10</span>
        </button>

        {/* Volume */}
        <div 
          className="volume-container"
          onMouseEnter={() => setShowVolume(true)}
          onMouseLeave={() => setShowVolume(false)}
        >
          <button 
            className="control-btn control-volume" 
            onClick={toggleMute}
            title={isMuted ? "Activar sonido" : "Silenciar"}
          >
            {isMuted || volume === 0 ? (
              // Muted Icon
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M11 5L6 9H2v6h4l5 4V5zM23 9l-6 6M17 9l6 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ) : volume < 50 ? (
              // Low Volume
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M11 5L6 9H2v6h4l5 4V5zM15.54 8.46a5 5 0 010 7.07" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ) : (
              // High Volume
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M11 5L6 9H2v6h4l5 4V5zM19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </button>

          {/* Volume Slider */}
          {showVolume && (
            <div className="volume-slider-container">
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={handleVolumeChange}
                className="volume-slider"
              />
              <span className="volume-value">{volume}%</span>
            </div>
          )}
        </div>
      </div>

      {/* Visualizador de Estado */}
      <div className={`player-status ${isPlaying ? 'playing' : 'paused'}`}>
        <div className="status-indicator"></div>
        <span>{isPlaying ? 'Reproduciendo' : 'Pausado'}</span>
      </div>
    </div>
  );
};

export default BeatPlayer;