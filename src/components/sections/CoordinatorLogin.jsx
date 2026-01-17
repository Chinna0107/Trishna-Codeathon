import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import config from '../../config';

const CoordinatorLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [lampGlow, setLampGlow] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [starField, setStarField] = useState([]);
  const [magicIntensity, setMagicIntensity] = useState(1);
  const [vortexActive, setVortexActive] = useState(false);
  const [cosmicRift, setCosmicRift] = useState(false);
  const [hyperSpace, setHyperSpace] = useState(false);
  const [timeWarp, setTimeWarp] = useState(false);
  const [blackHole, setBlackHole] = useState(false);
  const [multiverse, setMultiverse] = useState(false);

  // Generate random star field
  useEffect(() => {
    const stars = Array.from({ length: 100 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      twinkleDelay: Math.random() * 5
    }));
    setStarField(stars);
  }, []);

  // Mouse tracking for magical effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const coordinatorToken = localStorage.getItem('coordinatortoken');
    if (coordinatorToken) {
      navigate('/coordinator/dashboard');
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${config.BASE_URL}/api/coordinators/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.ok) {
        await Swal.fire({
          icon: 'success',
          title: 'Login Successful',
          text: 'Welcome Coordinator!',
          timer: 2000,
          showConfirmButton: false
        });

        localStorage.setItem('coordinatortoken', data.token);
        localStorage.setItem('coordinator', JSON.stringify(data.coordinator));
        navigate('/coordinator/dashboard');
        window.location.reload();
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: data.error || 'Invalid credentials'
        });
      }
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: 'Something went wrong. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  const sciFiInputClass = "mt-1 block w-full px-4 py-3 bg-transparent border-2 border-purple-400/50 rounded-md shadow-sm placeholder-purple-300/70 text-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-300 sm:text-sm tracking-wider font-sci-fi";
  const sciFiButtonClass = "w-full text-black font-bold py-3 px-4 rounded-md transition duration-300 transform hover:scale-105 bg-purple-400 hover:bg-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.5)] hover:shadow-[0_0_25px_rgba(168,85,247,0.8)] font-sci-fi tracking-wider text-lg";
  const sciFiLabelClass = "block text-sm font-medium text-purple-300 uppercase tracking-wider font-sci-fi";

  return (
    <div style={{
      minHeight: '100vh',
      background: '#000',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }
        @keyframes galaxyRotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes energyWave {
          0% { transform: scale(0) rotate(0deg); opacity: 1; }
          100% { transform: scale(3) rotate(180deg); opacity: 0; }
        }
        @keyframes portalSpin {
          0% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(180deg) scale(1.1); }
          100% { transform: rotate(360deg) scale(1); }
        }
        @keyframes vortexSpin {
          0% { transform: rotate(0deg) scale(1); filter: hue-rotate(0deg); }
          50% { transform: rotate(180deg) scale(1.2); filter: hue-rotate(180deg); }
          100% { transform: rotate(360deg) scale(1); filter: hue-rotate(360deg); }
        }
        @keyframes cosmicExplosion {
          0% { transform: scale(0) rotate(0deg); opacity: 1; }
          50% { transform: scale(2) rotate(180deg); opacity: 0.8; }
          100% { transform: scale(4) rotate(360deg); opacity: 0; }
        }
        @keyframes quantumFlicker {
          0%, 100% { opacity: 1; transform: translateX(0); }
          25% { opacity: 0.3; transform: translateX(-2px); }
          50% { opacity: 0.7; transform: translateX(2px); }
          75% { opacity: 0.5; transform: translateX(-1px); }
        }
        @keyframes hyperJump {
          0% { transform: scale(1) rotateZ(0deg); filter: blur(0px); }
          25% { transform: scale(0.8) rotateZ(90deg); filter: blur(2px); }
          50% { transform: scale(1.5) rotateZ(180deg); filter: blur(5px); }
          75% { transform: scale(0.9) rotateZ(270deg); filter: blur(2px); }
          100% { transform: scale(1) rotateZ(360deg); filter: blur(0px); }
        }
        @keyframes timeDistortion {
          0% { clip-path: circle(0% at 50% 50%); }
          50% { clip-path: circle(100% at 50% 50%); }
          100% { clip-path: circle(0% at 50% 50%); }
        }
        @keyframes wormhole {
          0% { transform: perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1); }
          25% { transform: perspective(1000px) rotateX(90deg) rotateY(90deg) scale(0.5); }
          50% { transform: perspective(1000px) rotateX(180deg) rotateY(180deg) scale(2); }
          75% { transform: perspective(1000px) rotateX(270deg) rotateY(270deg) scale(0.8); }
          100% { transform: perspective(1000px) rotateX(360deg) rotateY(360deg) scale(1); }
        }
        @keyframes blackHoleCollapse {
          0% { transform: scale(2) rotate(0deg); opacity: 0.8; }
          50% { transform: scale(0.1) rotate(180deg); opacity: 1; }
          100% { transform: scale(2) rotate(360deg); opacity: 0.8; }
        }
        @keyframes multiverseShift {
          0% { transform: translateZ(0) rotateY(0deg); filter: hue-rotate(0deg); }
          25% { transform: translateZ(100px) rotateY(90deg); filter: hue-rotate(90deg); }
          50% { transform: translateZ(0) rotateY(180deg); filter: hue-rotate(180deg); }
          75% { transform: translateZ(-100px) rotateY(270deg); filter: hue-rotate(270deg); }
          100% { transform: translateZ(0) rotateY(360deg); filter: hue-rotate(360deg); }
        }
        @keyframes cosmicStorm {
          0% { transform: scale(0.5) rotate(0deg) skew(0deg); opacity: 0; }
          20% { transform: scale(1.2) rotate(72deg) skew(10deg); opacity: 0.8; }
          40% { transform: scale(0.8) rotate(144deg) skew(-10deg); opacity: 1; }
          60% { transform: scale(1.5) rotate(216deg) skew(15deg); opacity: 0.6; }
          80% { transform: scale(0.9) rotate(288deg) skew(-5deg); opacity: 0.9; }
          100% { transform: scale(0.5) rotate(360deg) skew(0deg); opacity: 0; }
        }
        @keyframes dimensionalFold {
          0% { transform: perspective(1000px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale3d(1,1,1); }
          16% { transform: perspective(1000px) rotateX(60deg) rotateY(60deg) rotateZ(60deg) scale3d(0.8,1.2,0.9); }
          33% { transform: perspective(1000px) rotateX(120deg) rotateY(120deg) rotateZ(120deg) scale3d(1.2,0.8,1.1); }
          50% { transform: perspective(1000px) rotateX(180deg) rotateY(180deg) rotateZ(180deg) scale3d(0.9,1.1,0.8); }
          66% { transform: perspective(1000px) rotateX(240deg) rotateY(240deg) rotateZ(240deg) scale3d(1.1,0.9,1.2); }
          83% { transform: perspective(1000px) rotateX(300deg) rotateY(300deg) rotateZ(300deg) scale3d(0.7,1.3,0.9); }
          100% { transform: perspective(1000px) rotateX(360deg) rotateY(360deg) rotateZ(360deg) scale3d(1,1,1); }
        }
        .vortex-ring {
          position: absolute;
          border: 2px solid transparent;
          border-image: linear-gradient(45deg, #a855f7, #7c3aed, #a855f7, #7c3aed) 1;
          border-radius: 50%;
          animation: vortexSpin 3s linear infinite;
        }
        .cosmic-explosion {
          position: absolute;
          background: radial-gradient(circle, rgba(168,85,247,0.8), rgba(124,58,237,0.4), transparent);
          border-radius: 50%;
          animation: cosmicExplosion 2s ease-out infinite;
        }
        .quantum-particle {
          position: absolute;
          background: #a855f7;
          border-radius: 50%;
          animation: quantumFlicker 1.5s ease-in-out infinite;
        }
        .hyper-ring {
          position: absolute;
          border: 3px solid transparent;
          border-image: conic-gradient(#a855f7, #7c3aed, #a855f7, #7c3aed, #a855f7) 1;
          border-radius: 50%;
          animation: hyperJump 2s ease-in-out infinite;
        }
        .time-warp {
          position: absolute;
          background: radial-gradient(circle, rgba(168,85,247,0.3), transparent);
          animation: timeDistortion 4s ease-in-out infinite;
        }
        .wormhole-portal {
          position: absolute;
          background: conic-gradient(from 0deg, transparent, #a855f7, transparent, #7c3aed, transparent);
          border-radius: 50%;
          animation: wormhole 6s linear infinite;
        }
        .black-hole {
          position: absolute;
          background: radial-gradient(circle, transparent 30%, rgba(168,85,247,0.8) 40%, transparent 70%);
          border-radius: 50%;
          animation: blackHoleCollapse 4s ease-in-out infinite;
        }
        .multiverse-layer {
          position: absolute;
          background: conic-gradient(from 0deg, rgba(168,85,247,0.1), rgba(124,58,237,0.2), rgba(168,85,247,0.1));
          animation: multiverseShift 8s linear infinite;
        }
        .cosmic-storm {
          position: absolute;
          background: radial-gradient(ellipse, rgba(168,85,247,0.6), rgba(124,58,237,0.3), transparent);
          animation: cosmicStorm 3s ease-in-out infinite;
        }
        .dimensional-fold {
          animation: dimensionalFold 10s ease-in-out infinite;
        }
        .reality-glitch {
          animation: realityGlitch 0.5s ease-in-out infinite;
        }
        .twinkling-star {
          position: absolute;
          background: radial-gradient(circle, #a855f7, transparent);
          border-radius: 50%;
          animation: twinkle 3s ease-in-out infinite;
        }
        .galaxy-ring {
          position: absolute;
          border: 1px solid rgba(168,85,247,0.3);
          border-radius: 50%;
          animation: galaxyRotate 20s linear infinite;
        }
        .energy-wave {
          position: absolute;
          border: 2px solid rgba(168,85,247,0.6);
          border-radius: 50%;
          animation: energyWave 3s ease-out infinite;
        }
        .portal-ring {
          position: absolute;
          border: 3px solid transparent;
          border-top: 3px solid #a855f7;
          border-right: 3px solid #7c3aed;
          border-radius: 50%;
          animation: portalSpin 4s linear infinite;
        }
        .lightning-bolt {
          position: absolute;
          width: 2px;
          background: linear-gradient(45deg, #a855f7, #ffffff, #a855f7);
          animation: lightningFlash 4s infinite;
        }
        @keyframes magicParticles {
          0% { transform: translateY(100vh) rotate(0deg) scale(0); opacity: 0; }
          10% { opacity: 1; transform: translateY(90vh) rotate(36deg) scale(1); }
          90% { opacity: 1; transform: translateY(-10vh) rotate(324deg) scale(1); }
          100% { transform: translateY(-100vh) rotate(360deg) scale(0); opacity: 0; }
        }
        @keyframes shimmer {
          0% { background-position: -200px 0; }
          100% { background-position: calc(200px + 100%) 0; }
        }
        @keyframes orbitalFloat {
          0% { transform: rotate(0deg) translateX(50px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(50px) rotate(-360deg); }
        }
        @keyframes pulseRing {
          0% { transform: scale(0.8); opacity: 1; }
          100% { transform: scale(2.5); opacity: 0; }
        }
        @keyframes textGlow {
          0%, 100% { text-shadow: 0 0 20px rgba(168,85,247,0.6), 0 0 40px rgba(168,85,247,0.4); }
          50% { text-shadow: 0 0 30px rgba(168,85,247,0.8), 0 0 60px rgba(168,85,247,0.6), 0 0 80px rgba(168,85,247,0.4); }
        }
        @keyframes borderFlow {
          0% { border-image-source: linear-gradient(0deg, #a855f7, #7c3aed, #a855f7); }
          25% { border-image-source: linear-gradient(90deg, #a855f7, #7c3aed, #a855f7); }
          50% { border-image-source: linear-gradient(180deg, #a855f7, #7c3aed, #a855f7); }
          75% { border-image-source: linear-gradient(270deg, #a855f7, #7c3aed, #a855f7); }
          100% { border-image-source: linear-gradient(360deg, #a855f7, #7c3aed, #a855f7); }
        }
        .magic-lamp {
          animation: lampGlow 4s ease-in-out infinite;
        }
        .magic-particle {
          position: absolute;
          border-radius: 50%;
          animation: magicParticles 10s linear infinite;
        }
        .orbital-particle {
          position: absolute;
          width: 8px;
          height: 8px;
          background: radial-gradient(circle, #a855f7, transparent);
          border-radius: 50%;
          animation: orbitalFloat 8s linear infinite;
        }
        .pulse-ring {
          position: absolute;
          border: 2px solid rgba(168,85,247,0.6);
          border-radius: 50%;
          animation: pulseRing 2s ease-out infinite;
        }
        .shimmer-input {
          background: linear-gradient(90deg, transparent, rgba(168,85,247,0.2), transparent);
          background-size: 200px 100%;
          animation: shimmer 2s infinite;
        }
        .text-glow {
          animation: textGlow 3s ease-in-out infinite;
        }
        .lamp-light {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(168,85,247,0.4) 0%, rgba(168,85,247,0.2) 30%, rgba(168,85,247,0.1) 60%, transparent 80%);
          border-radius: 50%;
          pointer-events: none;
          transition: all 0.3s ease;
        }
        .floating-orb {
          position: absolute;
          width: 20px;
          height: 20px;
          background: radial-gradient(circle, rgba(168,85,247,0.8), rgba(168,85,247,0.2));
          border-radius: 50%;
          filter: blur(1px);
          animation: orbitalFloat 12s linear infinite;
        }
      `}</style>

      {/* Twinkling Star Field */}
      {starField.map(star => (
        <div
          key={star.id}
          className="twinkling-star"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDelay: `${star.twinkleDelay}s`
          }}
        />
      ))}

      {/* Galaxy Rings */}
      {[...Array(5)].map((_, i) => (
        <div
          key={`galaxy-${i}`}
          className="galaxy-ring"
          style={{
            top: '50%',
            left: '50%',
            width: `${200 + i * 100}px`,
            height: `${200 + i * 100}px`,
            marginTop: `${-100 - i * 50}px`,
            marginLeft: `${-100 - i * 50}px`,
            animationDuration: `${15 + i * 5}s`,
            animationDirection: i % 2 === 0 ? 'normal' : 'reverse'
          }}
        />
      ))}

      {/* Vortex Rings */}
      {[...Array(12)].map((_, i) => (
        <div
          key={`vortex-${i}`}
          className="vortex-ring"
          style={{
            top: '50%',
            left: '50%',
            width: `${100 + i * 30}px`,
            height: `${100 + i * 30}px`,
            marginTop: `${-50 - i * 15}px`,
            marginLeft: `${-50 - i * 15}px`,
            animationDelay: `${i * 0.2}s`,
            animationDuration: `${2 + i * 0.3}s`
          }}
        />
      ))}

      {/* Cosmic Explosions */}
      {[...Array(6)].map((_, i) => (
        <div
          key={`explosion-${i}`}
          className="cosmic-explosion"
          style={{
            top: `${20 + Math.random() * 60}%`,
            left: `${20 + Math.random() * 60}%`,
            width: `${30 + Math.random() * 40}px`,
            height: `${30 + Math.random() * 40}px`,
            animationDelay: `${Math.random() * 2}s`
          }}
        />
      ))}

      {/* Quantum Particles */}
      {[...Array(25)].map((_, i) => (
        <div
          key={`quantum-${i}`}
          className="quantum-particle"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${2 + Math.random() * 4}px`,
            height: `${2 + Math.random() * 4}px`,
            animationDelay: `${Math.random() * 1.5}s`
          }}
        />
      ))}

      {/* Hyper Rings */}
      {[...Array(15)].map((_, i) => (
        <div
          key={`hyper-${i}`}
          className="hyper-ring"
          style={{
            top: '50%',
            left: '50%',
            width: `${60 + i * 25}px`,
            height: `${60 + i * 25}px`,
            marginTop: `${-30 - i * 12.5}px`,
            marginLeft: `${-30 - i * 12.5}px`,
            animationDelay: `${i * 0.15}s`,
            opacity: 1 - i * 0.06
          }}
        />
      ))}

      {/* Time Warp Fields */}
      {[...Array(6)].map((_, i) => (
        <div
          key={`timewarp-${i}`}
          className="time-warp"
          style={{
            top: `${15 + i * 15}%`,
            left: `${10 + i * 15}%`,
            width: `${80 + i * 20}px`,
            height: `${80 + i * 20}px`,
            animationDelay: `${i * 0.7}s`
          }}
        />
      ))}

      {/* Black Holes */}
      {[...Array(8)].map((_, i) => (
        <div
          key={`blackhole-${i}`}
          className="black-hole"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${60 + Math.random() * 80}px`,
            height: `${60 + Math.random() * 80}px`,
            animationDelay: `${Math.random() * 4}s`
          }}
        />
      ))}

      {/* Multiverse Layers */}
      {[...Array(12)].map((_, i) => (
        <div
          key={`multiverse-${i}`}
          className="multiverse-layer"
          style={{
            top: `${i * 8}%`,
            left: `${i * 7}%`,
            width: `${100 + i * 20}px`,
            height: `${100 + i * 20}px`,
            animationDelay: `${i * 0.7}s`,
            opacity: 0.8 - i * 0.05
          }}
        />
      ))}

      {/* Cosmic Storms */}
      {[...Array(10)].map((_, i) => (
        <div
          key={`storm-${i}`}
          className="cosmic-storm"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${40 + Math.random() * 60}px`,
            height: `${20 + Math.random() * 40}px`,
            animationDelay: `${Math.random() * 3}s`
          }}
        />
      ))}
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className="magic-particle"
          style={{
            left: `${Math.random() * 100}%`,
            width: `${4 + Math.random() * 6}px`,
            height: `${4 + Math.random() * 6}px`,
            background: `radial-gradient(circle, ${Math.random() > 0.5 ? '#a855f7' : '#7c3aed'}, transparent)`,
            animationDelay: `${Math.random() * 10}s`,
            animationDuration: `${8 + Math.random() * 6}s`,
            filter: 'blur(0.5px)'
          }}
        />
      ))}

      {/* Floating Orbs */}
      {[...Array(5)].map((_, i) => (
        <div
          key={`orb-${i}`}
          className="floating-orb"
          style={{
            top: `${20 + Math.random() * 60}%`,
            left: `${10 + Math.random() * 80}%`,
            animationDelay: `${i * 2}s`,
            animationDuration: `${10 + i * 2}s`
          }}
        />
      ))}

      {/* Orbital Particles around container */}
      {[...Array(8)].map((_, i) => (
        <div
          key={`orbital-${i}`}
          className="orbital-particle"
          style={{
            top: '50%',
            left: '50%',
            animationDelay: `${i * 0.5}s`,
            animationDuration: `${6 + i}s`
          }}
        />
      ))}

      {/* Enhanced Mouse Follow Light */}
      <div
        style={{
          position: 'absolute',
          left: mousePos.x - 150,
          top: mousePos.y - 150,
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(168,85,247,0.15) 0%, rgba(168,85,247,0.05) 50%, transparent 80%)',
          borderRadius: '50%',
          pointerEvents: 'none',
          transition: 'all 0.1s ease',
          filter: 'blur(2px)'
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: mousePos.x - 50,
          top: mousePos.y - 50,
          width: '100px',
          height: '100px',
          background: 'radial-gradient(circle, rgba(168,85,247,0.3) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
          transition: 'all 0.05s ease'
        }}
      />

      {/* Magic Lamp Container */}
      <div
        className="magic-lamp"
        style={{
          position: 'relative',
          background: '#000',
          backdropFilter: 'blur(20px)',
          borderRadius: '30px',
          padding: '40px',
          border: '2px solid rgba(168,85,247,0.3)',
          boxShadow: `
            0 0 50px rgba(168,85,247,0.4),
            inset 0 0 50px rgba(168,85,247,0.1),
            0 0 100px rgba(168,85,247,0.2)
          `,
          width: '100%',
          maxWidth: '450px',
          overflow: 'hidden'
        }}
        onMouseEnter={() => {
          setLampGlow(true);
          setMagicIntensity(5);
          setVortexActive(true);
          setHyperSpace(true);
          setBlackHole(true);
          setTimeout(() => {
            setCosmicRift(true);
            setTimeWarp(true);
            setMultiverse(true);
          }, 200);
        }}
        onMouseLeave={() => {
          setLampGlow(false);
          setMagicIntensity(1);
          setVortexActive(false);
          setHyperSpace(false);
          setCosmicRift(false);
          setTimeWarp(false);
          setBlackHole(false);
          setMultiverse(false);
        }}
      >
        {/* Ultimate Cosmic Nexus */}
        {multiverse && (
          <div className="dimensional-fold" style={{
            position: 'absolute',
            top: '20%',
            left: '20%',
            right: '20%',
            bottom: '20%',
            background: `
              conic-gradient(from 0deg at 50% 50%, 
                rgba(168,85,247,0.3) 0deg, 
                rgba(124,58,237,0.2) 60deg, 
                rgba(168,85,247,0.3) 120deg, 
                rgba(124,58,237,0.2) 180deg, 
                rgba(168,85,247,0.3) 240deg, 
                rgba(124,58,237,0.2) 300deg, 
                rgba(168,85,247,0.3) 360deg
              )
            `,
            borderRadius: '30px',
            filter: 'blur(15px)'
          }} />
        )}

        {/* Singularity Core */}
        {blackHole && (
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '200px',
            height: '200px',
            marginTop: '-100px',
            marginLeft: '-100px',
            background: `
              radial-gradient(circle, 
                transparent 20%, 
                rgba(168,85,247,0.9) 30%, 
                rgba(124,58,237,0.7) 50%, 
                transparent 80%
              )
            `,
            borderRadius: '50%',
            animation: 'blackHoleCollapse 3s ease-in-out infinite',
            filter: 'blur(8px)'
          }} />
        )}
        {hyperSpace && (
          <div style={{
            position: 'absolute',
            top: '-100px',
            left: '-100px',
            right: '-100px',
            bottom: '-100px',
            background: `
              conic-gradient(from 0deg at 50% 50%, 
                transparent 0deg, 
                rgba(168,85,247,0.1) 60deg, 
                transparent 120deg, 
                rgba(124,58,237,0.1) 180deg, 
                transparent 240deg, 
                rgba(168,85,247,0.1) 300deg, 
                transparent 360deg
              )
            `,
            borderRadius: '50px',
            animation: 'hyperJump 3s ease-in-out infinite',
            filter: 'blur(10px)'
          }} />
        )}

        {/* Temporal Anomaly */}
        {timeWarp && (
          <div style={{
            position: 'absolute',
            top: '10%',
            left: '10%',
            right: '10%',
            bottom: '10%',
            background: `
              radial-gradient(ellipse at center, 
                rgba(168,85,247,0.2) 0%, 
                rgba(124,58,237,0.1) 30%, 
                transparent 60%
              )
            `,
            animation: 'timeDistortion 5s ease-in-out infinite',
            borderRadius: '30px'
          }} />
        )}
        {[...Array(4)].map((_, i) => (
          <div
            key={`energy-${i}`}
            className="energy-wave"
            style={{
              top: '50%',
              left: '50%',
              width: '50px',
              height: '50px',
              marginTop: '-25px',
              marginLeft: '-25px',
              animationDelay: `${i * 0.8}s`
            }}
          />
        ))}

        {/* Portal Rings */}
        {[...Array(6)].map((_, i) => (
          <div
            key={`portal-${i}`}
            className="portal-ring"
            style={{
              top: '50%',
              left: '50%',
              width: `${80 + i * 20}px`,
              height: `${80 + i * 20}px`,
              marginTop: `${-40 - i * 10}px`,
              marginLeft: `${-40 - i * 10}px`,
              animationDelay: `${i * 0.3}s`,
              opacity: 0.7 - i * 0.1
            }}
          />
        ))}
        {[...Array(3)].map((_, i) => (
          <div
            key={`ring-${i}`}
            className="pulse-ring"
            style={{
              top: '50%',
              left: '50%',
              width: '100px',
              height: '100px',
              marginTop: '-50px',
              marginLeft: '-50px',
              animationDelay: `${i * 0.7}s`
            }}
          />
        ))}

        {/* Corner Pins */}
        <div style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          width: '20px',
          height: '20px',
          background: 'radial-gradient(circle, #a855f7, #7c3aed)',
          borderRadius: '50%',
          boxShadow: '0 0 15px rgba(168,85,247,0.8)',
          zIndex: 20
        }} />
        <div style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          width: '20px',
          height: '20px',
          background: 'radial-gradient(circle, #a855f7, #7c3aed)',
          borderRadius: '50%',
          boxShadow: '0 0 15px rgba(168,85,247,0.8)',
          zIndex: 20
        }} />
        <div style={{
          position: 'absolute',
          bottom: '10px',
          left: '10px',
          width: '20px',
          height: '20px',
          background: 'radial-gradient(circle, #a855f7, #7c3aed)',
          borderRadius: '50%',
          boxShadow: '0 0 15px rgba(168,85,247,0.8)',
          zIndex: 20
        }} />
        <div style={{
          position: 'absolute',
          bottom: '10px',
          right: '10px',
          width: '20px',
          height: '20px',
          background: 'radial-gradient(circle, #a855f7, #7c3aed)',
          borderRadius: '50%',
          boxShadow: '0 0 15px rgba(168,85,247,0.8)',
          zIndex: 20
        }} />

        {/* Enhanced Lamp Light Effect */}
        <div
          className="lamp-light"
          style={{
            opacity: lampGlow ? 1 : 0.4,
            transform: lampGlow ? 'translate(-50%, -50%) scale(1.3)' : 'translate(-50%, -50%) scale(1)',
            filter: lampGlow ? 'blur(1px)' : 'blur(2px)'
          }}
        />

        {/* Cosmic Portal Center */}
        <div className={multiverse ? 'dimensional-fold' : hyperSpace ? 'reality-glitch' : ''} style={{
          textAlign: 'center',
          marginBottom: '30px',
          position: 'relative',
          height: '120px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {/* Central Cosmic Orb */}
          <div style={{
            width: '100px',
            height: '100px',
            background: `
              radial-gradient(circle at 30% 30%, 
                rgba(255,255,255,0.8) 0%, 
                rgba(168,85,247,0.9) 20%, 
                rgba(124,58,237,0.7) 60%, 
                rgba(168,85,247,0.4) 100%
              )
            `,
            borderRadius: '50%',
            boxShadow: `
              0 0 60px rgba(168,85,247,${lampGlow ? 1 : 0.8}),
              inset 0 0 30px rgba(255,255,255,0.3),
              0 0 120px rgba(168,85,247,${lampGlow ? 0.8 : 0.5})
            `,
            animation: blackHole ? 'blackHoleCollapse 2s ease-in-out infinite' : 'pulse 3s ease-in-out infinite',
            position: 'relative',
            zIndex: 3
          }}>
            {/* Inner Energy Core */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '40px',
              height: '40px',
              marginTop: '-20px',
              marginLeft: '-20px',
              background: 'radial-gradient(circle, rgba(255,255,255,0.9), rgba(168,85,247,0.6))',
              borderRadius: '50%',
              animation: 'pulse 1.5s ease-in-out infinite'
            }} />
          </div>
          
          {/* Orbital Energy Rings */}
          {[...Array(6)].map((_, i) => (
            <div
              key={`orbital-${i}`}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: `${120 + i * 25}px`,
                height: `${120 + i * 25}px`,
                marginTop: `${-60 - i * 12.5}px`,
                marginLeft: `${-60 - i * 12.5}px`,
                border: `2px solid rgba(168,85,247,${0.8 - i * 0.1})`,
                borderRadius: '50%',
                animation: `spin ${3 + i}s linear infinite`,
                opacity: lampGlow ? 1 : 0.6
              }}
            />
          ))}
        </div>

        {/* Close Button */}
        <button 
          onClick={() => navigate('/login')} 
          style={{
            position: 'absolute',
            top: '15px',
            right: '20px',
            background: 'none',
            border: 'none',
            color: '#a855f7',
            fontSize: '2rem',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            zIndex: 10
          }}
          onMouseOver={(e) => {
            e.target.style.transform = 'scale(1.2)';
            e.target.style.textShadow = '0 0 15px rgba(168,85,247,0.8)';
          }}
          onMouseOut={(e) => {
            e.target.style.transform = 'scale(1)';
            e.target.style.textShadow = 'none';
          }}
        >
          ✕
        </button>

        <h2 className="text-glow" style={{
          fontSize: '2.8rem',
          fontWeight: 'bold',
          marginBottom: '30px',
          textAlign: 'center',
          color: '#a855f7',
          fontFamily: 'Georgia, serif',
          letterSpacing: '3px',
          position: 'relative'
        }}>
          <span style={{ position: 'relative', zIndex: 2 }}>✨ Coordinator Portal ✨</span>
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(45deg, transparent, rgba(168,85,247,0.1), transparent)',
            filter: 'blur(10px)',
            zIndex: 1
          }} />
        </h2>

        <form onSubmit={handleLogin} style={{ display: 'grid', gap: '25px' }}>
          <div>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              color: '#a855f7',
              fontSize: '1rem',
              fontWeight: 'bold',
              textShadow: '0 0 10px rgba(168,85,247,0.5)'
            }}>
              📧 Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '15px',
                borderRadius: '15px',
                border: '2px solid rgba(168,85,247,0.3)',
                background: 'rgba(0,0,0,0.3)',
                color: '#fff',
                fontSize: '1.1rem',
                outline: 'none',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(10px)'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#a855f7';
                e.target.style.boxShadow = '0 0 20px rgba(168,85,247,0.4)';
                e.target.classList.add('shimmer-input');
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(168,85,247,0.3)';
                e.target.style.boxShadow = 'none';
                e.target.classList.remove('shimmer-input');
              }}
              placeholder="Enter coordinator email..."
            />
          </div>

          <div>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              color: '#a855f7',
              fontSize: '1rem',
              fontWeight: 'bold',
              textShadow: '0 0 10px rgba(168,85,247,0.5)'
            }}>
              🔐 Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '15px',
                borderRadius: '15px',
                border: '2px solid rgba(168,85,247,0.3)',
                background: 'rgba(0,0,0,0.3)',
                color: '#fff',
                fontSize: '1.1rem',
                outline: 'none',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(10px)'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#a855f7';
                e.target.style.boxShadow = '0 0 20px rgba(168,85,247,0.4)';
                e.target.classList.add('shimmer-input');
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(168,85,247,0.3)';
                e.target.style.boxShadow = 'none';
                e.target.classList.remove('shimmer-input');
              }}
              placeholder="Enter your password..."
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '20px',
              borderRadius: '18px',
              border: 'none',
              background: loading 
                ? 'linear-gradient(45deg, #666, #999)' 
                : 'linear-gradient(45deg, #a855f7, #7c3aed, #a855f7)',
              backgroundSize: '200% 100%',
              color: loading ? '#ccc' : '#fff',
              fontSize: '1.4rem',
              fontWeight: 'bold',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.4s ease',
              boxShadow: loading 
                ? 'none' 
                : '0 0 40px rgba(168,85,247,0.6), inset 0 0 20px rgba(168,85,247,0.2)',
              textShadow: loading ? 'none' : '0 0 15px rgba(255,255,255,0.8)',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseOver={(e) => {
              if (!loading) {
                e.target.style.transform = 'scale(1.15) translateY(-5px)';
                e.target.style.boxShadow = '0 0 80px rgba(168,85,247,1), inset 0 0 40px rgba(168,85,247,0.4)';
                e.target.style.filter = 'hue-rotate(30deg) brightness(1.2)';
              }
            }}
            onMouseOut={(e) => {
              if (!loading) {
                e.target.style.transform = 'scale(1) translateY(0)';
                e.target.style.boxShadow = '0 0 40px rgba(168,85,247,0.6), inset 0 0 20px rgba(168,85,247,0.2)';
                e.target.style.filter = 'none';
              }
            }}
          >
            {loading ? (
              <span className={timeWarp ? 'reality-glitch' : ''} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px' }}>
                <div style={{
                  width: '28px',
                  height: '28px',
                  border: '4px solid rgba(255,255,255,0.2)',
                  borderTop: '4px solid #fff',
                  borderRadius: '50%',
                  animation: 'spin 0.8s linear infinite'
                }} />
                <div style={{
                  display: 'flex',
                  gap: '4px'
                }}>
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      style={{
                        width: '8px',
                        height: '8px',
                        background: '#fff',
                        borderRadius: '50%',
                        animation: `pulse 2s ease-in-out infinite`,
                        animationDelay: `${i * 0.15}s`
                      }}
                    />
                  ))}
                </div>
                🌌 Breaching Reality...
              </span>
            ) : (
              <span className={hyperSpace ? 'reality-glitch' : ''}>
                ⚡ Enter Cosmic Dimension ⚡
              </span>
            )}
          </button>

          <div style={{ textAlign: 'center', marginTop: '15px' }}>
            <button
              type="button"
              onClick={() => navigate('/login')}
              style={{
                background: 'none',
                border: 'none',
                color: '#a855f7',
                fontSize: '0.9rem',
                cursor: 'pointer',
                textDecoration: 'underline',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.target.style.textShadow = '0 0 10px rgba(168,85,247,0.8)';
              }}
              onMouseOut={(e) => {
                e.target.style.textShadow = 'none';
              }}
            >
              ← Back to User Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CoordinatorLogin;
