import React, { useState, useEffect, useRef } from 'react';
import surekaVideo from "../components/sureka.mp4"
import shobyBackground from "../components/shoby.jpg"

const BirthdayWishApp = () => {
  const [showVideo, setShowVideo] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);
  const [heartRain, setHeartRain] = useState([]);
  const containerRef = useRef(null);

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Floating particles effect
  useEffect(() => {
    const createParticles = () => {
      const newParticles = [];
      for (let i = 0; i < 30; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 4 + 2,
          speedX: (Math.random() - 0.5) * 2,
          speedY: (Math.random() - 0.5) * 2,
          opacity: Math.random() * 0.7 + 0.3,
        });
      }
      setParticles(newParticles);
    };

    createParticles();
    const interval = setInterval(() => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        x: particle.x + particle.speedX,
        y: particle.y + particle.speedY,
        x: particle.x > window.innerWidth ? 0 : particle.x < 0 ? window.innerWidth : particle.x,
        y: particle.y > window.innerHeight ? 0 : particle.y < 0 ? window.innerHeight : particle.y,
      })));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const playVideo = () => {
    setShowVideo(true);
    
    // Heart rain effect
    createHeartRain();
    
    // Show message after video appears
    setTimeout(() => {
      setShowMessage(true);
    }, 300);
    
    // Create multiple sparkle bursts
    createSparkles();
    setTimeout(() => createSparkles(), 500);
    setTimeout(() => createSparkles(), 1000);
  };

  const createHeartRain = () => {
    const hearts = [];
    for (let i = 0; i < 15; i++) {
      hearts.push({
        id: Date.now() + i,
        x: Math.random() * window.innerWidth,
        delay: Math.random() * 2000,
        duration: 3000 + Math.random() * 2000,
      });
    }
    setHeartRain(hearts);
    
    setTimeout(() => setHeartRain([]), 5000);
  };

  const createSparkles = () => {
    const sparklesContainer = document.getElementById('sparkles');
    if (!sparklesContainer) return;
    
    for (let i = 0; i < 25; i++) {
      setTimeout(() => {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = Math.random() * window.innerWidth + 'px';
        sparkle.style.top = Math.random() * window.innerHeight + 'px';
        sparkle.style.setProperty('--random-color', `hsl(${Math.random() * 360}, 70%, 60%)`);
        sparklesContainer.appendChild(sparkle);
        
        setTimeout(() => {
          sparkle.remove();
        }, 2000);
      }, i * 50);
    }
  };

  return (
    <>
      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        html, body {
          height: 100%;
          overflow-x: hidden;
          overflow-y: auto;
        }

        .app-container {
          min-height: 100vh;
          position: relative;
          padding: 20px 10px;
          box-sizing: border-box;
          animation: backgroundShift 10s ease-in-out infinite;
        }

        .background-image {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: url('./vicky.jpg.jpg');
          background-size: cover;
          background-position: center;
          filter: blur(1px) brightness(0.6) saturate(1.2);
          z-index: -3;
          animation: zoomPulse 20s ease-in-out infinite;
        }

        @keyframes zoomPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        .background-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -2;
          animation: overlayPulse 8s ease-in-out infinite;
        }

        @keyframes overlayPulse {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 0.9; }
        }

        .mouse-follower {
          position: fixed;
          width: 20px;
          height: 20px;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          transform: translate(-50%, -50%);
          transition: all 0.1s ease;
          left: ${mousePosition.x}px;
          top: ${mousePosition.y}px;
        }

        .floating-particle {
          position: fixed;
          border-radius: 50%;
          pointer-events: none;
          z-index: 1;
          animation: twinkle 3s ease-in-out infinite;
        }

        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }

        .heart-rain {
          position: fixed;
          font-size: 20px;
          color: #ff6b9d;
          pointer-events: none;
          z-index: 100;
          animation: heartFall var(--duration) linear;
          animation-delay: var(--delay);
          text-shadow: 0 0 10px rgba(255, 107, 157, 0.8);
        }

        @keyframes heartFall {
          0% {
            transform: translateY(-100px) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }

        .page-wrapper {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          min-height: calc(100vh - 40px);
          padding: 20px 0;
        }

        .container {
        margin-top: 60px;
          text-align: center;
          padding: 40px 30px;
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(2px) saturate(180%);
          border-radius: 30px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          box-shadow: 
            0 20px 60px rgba(0, 0, 0, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.4);
          max-width: 650px;
          width: 100%;
          max-width: calc(100% - 20px);
          position: relative;
          animation: containerFloat 8s ease-in-out infinite;
          transform-style: preserve-3d;
        }

        @keyframes containerFloat {
          0%, 100% { 
            transform: translateY(0px) rotateX(0deg) rotateY(0deg); 
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          }
          25% { 
            transform: translateY(-10px) rotateX(2deg) rotateY(1deg); 
            box-shadow: 0 30px 80px rgba(0, 0, 0, 0.4);
          }
          50% { 
            transform: translateY(-5px) rotateX(0deg) rotateY(-1deg); 
            box-shadow: 0 25px 70px rgba(0, 0, 0, 0.35);
          }
          75% { 
            transform: translateY(-15px) rotateX(-1deg) rotateY(0deg); 
            box-shadow: 0 35px 90px rgba(0, 0, 0, 0.45);
          }
        }

        .hearts {
          position: absolute;
          top: -25px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 2.5rem;
          animation: heartPulse 2s ease-in-out infinite;
        }

        @keyframes heartPulse {
          0%, 100% { 
            transform: translateX(-50%) scale(1);
            filter: hue-rotate(0deg);
          }
          25% { 
            transform: translateX(-50%) scale(1.1);
            filter: hue-rotate(90deg);
          }
          50% { 
            transform: translateX(-50%) scale(1.2);
            filter: hue-rotate(180deg);
          }
          75% { 
            transform: translateX(-50%) scale(1.1);
            filter: hue-rotate(270deg);
          }
        }

        h2 {
          color: white;
          font-size: clamp(2rem, 5vw, 4rem);
          margin-bottom: 15px;
          text-shadow: 
            3px 3px 6px rgba(0, 0, 0, 0.5),
            0 0 30px rgba(255, 255, 255, 0.5);
          animation: titleGlow 3s ease-in-out infinite;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
  Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;

          background: linear-gradient(45deg, #ffffff, #ff6b9d, #ffffff);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        @keyframes titleGlow {
          0%, 100% { 
            text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.5), 0 0 30px rgba(255, 255, 255, 0.5);
            background-position: 0% 50%;
          }
          50% { 
            text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.5), 0 0 50px rgba(255, 107, 157, 0.8);
            background-position: 100% 50%;
          }
        }

        .subtitle {
          color: rgba(255, 255, 255, 0.95);
          font-size: clamp(1.1rem, 3vw, 1.4rem);
          margin-bottom: 35px;
          font-style: italic;
          padding: 0 10px;
          text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
          animation: subtitleWave 4s ease-in-out infinite;
        }

        @keyframes subtitleWave {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }

        .play-button {
          background: linear-gradient(45deg, #ff6b9d, #ff8e8e, #ffa07a, #ff6b9d);
          background-size: 300% 300%;
          border: none;
          padding: 20px 40px;
          font-size: clamp(1.1rem, 3.5vw, 1.4rem);
          color: white;
          border-radius: 50px;
          cursor: pointer;
          box-shadow: 
            0 15px 40px rgba(255, 107, 157, 0.6),
            inset 0 1px 0 rgba(255, 255, 255, 0.3);
          transition: all 0.4s ease;
          font-weight: bold;
          letter-spacing: 1px;
          position: relative;
          overflow: hidden;
          min-height: 60px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
          animation: buttonPulse 2s ease-in-out infinite;
        }

        @keyframes buttonPulse {
          0%, 100% { 
            background-position: 0% 50%;
            transform: scale(1);
          }
          50% { 
            background-position: 100% 50%;
            transform: scale(1.05);
          }
        }

        .play-button:hover {
          transform: translateY(-6px) scale(1.1);
          box-shadow: 
            0 25px 60px rgba(255, 107, 157, 0.8),
            inset 0 1px 0 rgba(255, 255, 255, 0.4);
          animation: buttonHover 0.6s ease-in-out infinite;
        }

        @keyframes buttonHover {
          0%, 100% { filter: brightness(1) hue-rotate(0deg); }
          50% { filter: brightness(1.2) hue-rotate(10deg); }
        }

        .play-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
          transition: left 0.6s;
        }

        .play-button:hover::before {
          left: 100%;
        }

        .play-button::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.3), transparent);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          transition: all 0.6s;
        }

        .play-button:active::after {
          width: 300px;
          height: 300px;
        }

        .video-container {
          margin-top: 30px;
          opacity: ${showVideo ? 1 : 0};
          transform: translateY(${showVideo ? 0 : 50}px) scale(${showVideo ? 1 : 0.8});
          transition: all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          border-radius: 25px;
          overflow: hidden;
          box-shadow: 
            0 20px 60px rgba(0, 0, 0, 0.5),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
          padding: 8px;
          backdrop-filter: blur(10px);
          animation: ${showVideo ? 'videoGlow 3s ease-in-out infinite' : 'none'};
        }

        @keyframes videoGlow {
          0%, 100% { box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5), 0 0 30px rgba(255, 107, 157, 0.3); }
          50% { box-shadow: 0 25px 80px rgba(0, 0, 0, 0.6), 0 0 50px rgba(255, 107, 157, 0.6); }
        }

        video {
          width: 100%;
          height: auto;
          max-width: 550px;
          border-radius: 20px;
          display: block;
          margin: 0 auto;
        }

        .message {
          color: white;
          font-size: clamp(1rem, 2.5vw, 1.2rem);
          margin-top: 30px;
          line-height: 1.8;
          opacity: ${showMessage ? 1 : 0};
          transform: translateY(${showMessage ? 0 : 50}px) scale(${showMessage ? 1 : 0.9});
          transition: all 1s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          padding: 25px;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.05));
          border-radius: 20px;
          backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
          box-shadow: 
            0 15px 40px rgba(0, 0, 0, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.3);
          animation: ${showMessage ? 'messageGlow 4s ease-in-out infinite' : 'none'};
        }

        @keyframes messageGlow {
          0%, 100% { 
            box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3);
          }
          50% { 
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.4);
          }
        }

        .sparkles {
          position: fixed;
          pointer-events: none;
          z-index: 1000;
          top: 0;
          left: 0;
        }

        .sparkle {
          position: absolute;
          width: 15px;
          height: 15px;
          background: var(--random-color, #ffd700);
          border-radius: 50%;
          animation: sparkleExpanded 2s ease-out forwards;
          box-shadow: 0 0 20px var(--random-color, #ffd700);
        }

        @keyframes sparkleExpanded {
          0% {
            opacity: 1;
            transform: scale(0) rotate(0deg);
            filter: blur(0px);
          }
          50% {
            opacity: 1;
            transform: scale(1.5) rotate(180deg);
            filter: blur(1px);
          }
          100% {
            opacity: 0;
            transform: scale(0.5) rotate(360deg);
            filter: blur(3px);
          }
        }

        /* Mobile responsive styles */
        @media (max-width: 768px) {
          .app-container {
            padding: 10px 5px;
          }
          
          .page-wrapper {
            padding: 10px 0;
            min-height: calc(100vh - 20px);
          }
          
          .container {
            padding: 30px 20px;
            border-radius: 25px;
            max-width: calc(100% - 10px);
          }
          
          .hearts {
            font-size: 2rem;
            top: -20px;
          }
          
          .play-button {
            padding: 16px 32px;
            min-height: 55px;
          }
          
          .video-container, .message {
            margin-top: 25px;
          }
          
          .message {
            padding: 20px;
          }
        }

        @media (max-width: 480px) {
          .container {
            padding: 25px 15px;
            max-width: calc(100% - 6px);
          }
          
          .play-button {
            padding: 14px 28px;
            min-height: 50px;
          }
          
          .hearts {
            font-size: 1.8rem;
          }
          
          .message {
            padding: 15px;
          }
        }

        @media (max-height: 500px) and (orientation: landscape) {
          .container {
            padding: 20px;
          }
          
          .hearts {
            font-size: 1.6rem;
            top: -15px;
          }
          
          .play-button {
            padding: 12px 24px;
            min-height: 45px;
          }
          
          .video-container, .message {
            margin-top: 20px;
          }
        }
      `}</style>

      <div className="app-container" ref={containerRef}>
        <div
  className="background-image"
  style={{
    backgroundImage: `url(${shobyBackground})`
  }}
></div>
        <div className="background-overlay"></div>
        
        {/* Mouse follower effect */}
        <div className="mouse-follower"></div>
        
        {/* Floating particles */}
        {particles.map(particle => (
          <div
            key={particle.id}
            className="floating-particle"
            style={{
              left: particle.x + 'px',
              top: particle.y + 'px',
              width: particle.size + 'px',
              height: particle.size + 'px',
              opacity: particle.opacity,
            }}
          />
        ))}
        
        {/* Heart rain effect */}
        {heartRain.map(heart => (
          <div
            key={heart.id}
            className="heart-rain"
            style={{
              left: heart.x + 'px',
              '--delay': heart.delay + 'ms',
              '--duration': heart.duration + 'ms',
            }}
          >
            💖
          </div>
        ))}
        
        <div className="page-wrapper">
          <div className="container">
            <div className="hearts">💕 💖 💕</div>
            <h2>Happy Birthday!</h2>
            <p className="subtitle">my life</p>
            
            <button className="play-button" onClick={playVideo}>
              🎥 Click this shoby
            </button>
            
            <div className="video-container">
              <video controls autoPlay={showVideo}>
                <source src={surekaVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            
            <div className="message">
              <p>Today the world became more beautiful, because it's the day you were born. I honestly can't put into words how much you mean to me. You're not just my girlfriend — you're my best friend, my biggest inspiration, and the most incredible part of my life.</p>
              <br />
              <p>Your smile lights up my darkest days, your laugh is my favorite sound, and your heart is the most precious thing I've ever known. Thank you for being so wonderfully you — kind, strong, beautiful, and full of love.</p>
              <br />
              <p>On your special day, I just want you to know how deeply grateful I am to share this life with you. Here's to celebrating you today and always — and to many more birthdays, memories, and dreams coming true side by side. 🎉</p>
              <br />
              <p>I love you more than words could ever express. Happy birthday, my queen. 👑❤️</p>
            </div>
          </div>

          <div className="sparkles" id="sparkles"></div>
        </div>
      </div>
    </>
  );
};

export default BirthdayWishApp;