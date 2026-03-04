// src/components/sections/Events.jsx
import { useInView } from 'react-intersection-observer';
// import { motion } from 'framer-motion'; // Removed as it's unused
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Removed useNavigate as it's unused
import { FaCode, FaGamepad, FaRobot, FaChalkboardTeacher, FaMicrophone, FaLaptopCode, FaPalette, FaLightbulb, FaCube, FaUtensils, FaCar, FaRocket, FaReact, FaBrain, FaGithub, FaNetworkWired } from 'react-icons/fa';
import tkLogo from '../../assets/images/tk26.png';
import eventpic from '../../assets/images/elephant-removebg-preview (1).png';
import samplePdf from '../../assets/images/21AK1A0427 APSCHE.pdf';
import imgProjectExpo from '../../assets/images/12979916_5079835.jpg';
import imgWebDesign from '../../assets/images/7a43990d-d691-4aa5-a7d6-5f9c9c5d530f.jpg';
import imgHackathon from '../../assets/images/Codeathon 2k25 Invitation.jpg';
import imgNextCode from '../../assets/images/a346fb78-710f-4faa-b5b1-a87812e13510.jpg';
import imgRubeCube from '../../assets/images/b2197fe3-2e15-4972-bf28-535707b75093.jpeg';
import imgPosterDesign from '../../assets/images/Codeathon 2k25 Invitation.jpg';
import imgCookWithoutFood from '../../assets/images/Download Grunge party crowd background for free.jpeg';
import imgRoboRace from '../../assets/images/GUNJACK VR UI, Haoliang Yang.jpg';
import imgOverDrive from '../../assets/images/7a43990d-d691-4aa5-a7d6-5f9c9c5d530f.jpg';
import imgFullStack from '../../assets/images/_Achievement Certificate.png';
import imgGenAI from '../../assets/images/a346fb78-710f-4faa-b5b1-a87812e13510.jpg';
import imgGittGithub from '../../assets/images/b2197fe3-2e15-4972-bf28-535707b75093.jpeg';
import imgIOT from '../../assets/images/7a43990d-d691-4aa5-a7d6-5f9c9c5d530f.jpg';
import '../../styles/Home.css';
import BottomNavBar from './BottomNavBar'; // Import the new BottomNavBar component

const Events = () => {
  // const navigate = useNavigate(); // Removed as it's unused
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  const [category, setCategory] = useState('');
  const [typedTexts, setTypedTexts] = useState({});
  const categories = [
    { key: 'development', label: 'Development Events', icon: <FaCode size={20} /> },
    { key: 'competetive', label: 'Competitive Events', icon: <FaGamepad size={20} /> },
    // { key: 'robotics', label: 'Robotics', icon: <FaRobot size={20} />, desc: 'Build, Race, Compete' },
    // { key: 'workshops', label: 'Workshops', icon: <FaChalkboardTeacher size={20} />, desc: 'Learn, Practice, Master' },
    // { key: 'guest', label: 'Guest Lectures', icon: <FaMicrophone size={20} />, desc: 'Inspire, Educate, Connect' },
  ];

  useEffect(() => {
    if (!category) {
      categories.forEach((cat) => {
        let index = 0;
        const interval = setInterval(() => {
          if (index <= cat.desc.length) {
            setTypedTexts(prev => ({ ...prev, [cat.key]: cat.desc.slice(0, index) }));
            index++;
          } else {
            clearInterval(interval);
          }
        }, 50);
      });
    }
  }, [category]);

  const sciFiBtnStyle = {
    fontFamily: 'Orbitron, monospace',
    fontWeight: 700,
    fontSize: '1.25rem',
    color: '#00ff88',
    background: 'rgba(0,0,0,0.18)',
    border: '2px solid #00ff8855',
    borderRadius: 8,
    padding: '0.7em 0',
    textAlign: 'center',
    letterSpacing: 2,
    boxShadow: '0 0 4px #00ff8822',
    textDecoration: 'none',
    transition: 'background 0.2s, color 0.2s, border 0.2s',
    position: 'relative',
    overflow: 'hidden',
    outline: 'none',
    margin: 0,
    minWidth: 160,
    minHeight: 48,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <section id="events" ref={ref} style={{
      minHeight: '100vh',
      background: '#000',
      position: 'relative',
      overflow: 'hidden',
      padding: 0,
      margin: 0,
      width: '100vw',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
    }}>

      {/* Enhanced TK Logo top left */}
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        zIndex: 10
      }}>
        <img 
          src={tkLogo} 
          alt="TK26 Logo" 
          style={{ 
            height: '35px', 
            width: 'auto', 
            objectFit: 'contain',
            filter: 'drop-shadow(0 0 8px rgba(255,255,0,0.8)) brightness(1.2)',
            animation: 'glow 2s ease-in-out infinite alternate'
          }} 
        />
      </div>
      <div className="container mx-auto px-4" style={{ position: 'relative', zIndex: 1, minHeight: '100vh' }}>
        
        <style>
          {`
            @keyframes glow {
              0%, 100% { filter: drop-shadow(0 0 8px rgba(255,255,0,0.8)) brightness(1.2); }
              50% { filter: drop-shadow(0 0 12px rgba(255,255,0,1)) brightness(1.4); }
            }
            @keyframes blink {
              0%, 50% { opacity: 1; }
              51%, 100% { opacity: 0; }
            }
            @media (max-width: 768px) {
              .mascot-image {
                display: none !important;
              }
            }
          `}
        </style>
        {/* Theme pic bottom right */}
        { !category && (
          <img src={eventpic} alt="Theme Pic" className="mascot-image" style={{ position: 'absolute', right: 18, bottom: 18, width: 320, height: 'auto', zIndex: 101, opacity: 0.95 }} />
        )}
        {/* Category selection cards */}
        {!category && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '2rem', marginBottom: '2.5rem', marginTop: '5rem', padding: '0 2rem', paddingBottom: '120px', minHeight: '60vh' }}>
            {categories.map((cat) => {
              const categoryImages = {
                development: imgProjectExpo,
                competetive: imgRubeCube
              };
              
              return (
                <div
                  key={cat.key}
                  onClick={() => setCategory(cat.key)}
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 8px 32px rgba(0,255,136,0.2)',
                    border: '1px solid rgba(0,255,136,0.3)',
                    position: 'relative'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,255,136,0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,255,136,0.2)';
                  }}
                >
                  {/* Category Image */}
                  <div style={{ height: '200px', overflow: 'hidden' }}>
                    <img 
                      src={categoryImages[cat.key]} 
                      alt={cat.label} 
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.05)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                    />
                  </div>
                  
                  {/* Category Details */}
                  <div style={{ padding: '1.5rem', textAlign: 'center' }}>
                    <div style={{ fontSize: '2.5rem', color: '#00ff88', marginBottom: '1rem' }}>{cat.icon}</div>
                    <h3 style={{ color: '#00ff88', fontFamily: 'Orbitron, monospace', fontSize: '1.3rem', fontWeight: 700, margin: '0 0 1rem 0' }}>{cat.label}</h3>
                    <p style={{ color: 'rgba(255,255,255,0.8)', fontFamily: 'Orbitron, monospace', fontSize: '0.95rem', margin: 0, minHeight: '24px' }}>
                      {typedTexts[cat.key] || ''}<span style={{ animation: 'blink 1s infinite' }}>|</span>
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {/* Show project cards only after category is selected */}
        {category && (
          <>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem', marginTop: '5rem' }}>
              <button
                onClick={() => setCategory('')}
                style={{ ...sciFiBtnStyle, minWidth: 100, minHeight: 36, fontSize: '1rem', background: 'rgba(0,0,0,0.18)', color: '#00ff88', border: '2px solid #00ff8855', marginBottom: 0, marginRight: 8, cursor: 'pointer' }}
              >
                Back
              </button>
              <span style={{ color: '#00ff88', fontFamily: 'Orbitron, monospace', fontWeight: 700, fontSize: '1.1rem', marginLeft: 8, alignSelf: 'center' }}>{categories.find(c => c.key === category)?.label}</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', padding: '0 2rem', paddingBottom: '120px' }}>
              {filteredEvents(category).map((event, index) => (
                <div
                  key={event.id}
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    boxShadow: '0 8px 32px rgba(0,255,136,0.2)',
                    border: '1px solid rgba(0,255,136,0.3)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    opacity: inView ? 1 : 0,
                    transform: inView ? 'translateY(0)' : 'translateY(20px)',
                    transitionDelay: `${index * 0.1}s`
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,255,136,0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,255,136,0.2)';
                  }}
                >
                  {/* Event Image */}
                  <div style={{ height: '200px', overflow: 'hidden' }}>
                    <img 
                      src={event.image} 
                      alt={event.title} 
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.05)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                    />
                  </div>
                  
                  {/* Event Details */}
                  <div style={{ padding: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                      {event.icon && <span style={{ color: '#00ff88', fontSize: '1.2rem' }}>{event.icon}</span>}
                      <h3 style={{ color: '#00ff88', fontFamily: 'Orbitron, monospace', fontSize: '1.2rem', fontWeight: 700, margin: 0 }}>{event.title}</h3>
                    </div>
                    <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem', lineHeight: '1.4', marginBottom: '1rem' }}>{event.description}</p>
                    
                    {/* Registration Buttons */}
                    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                      {event.tags && event.tags.filter(tag => tag === 'Team' || tag === 'Individual').map((tag) => (
                        <Link
                          key={tag}
                          to={tag === 'Team' ? `/team-registration?event=${event.eventId}&name=${encodeURIComponent(event.title)}` : `/individual-registration?event=${event.eventId}&name=${encodeURIComponent(event.title)}`}
                          style={{
                            background: 'linear-gradient(90deg, #00ff88 0%, #00cc66 100%)',
                            color: '#fff',
                            padding: '0.5rem 1rem',
                            borderRadius: '8px',
                            fontSize: '0.85rem',
                            fontWeight: 600,
                            textDecoration: 'none',
                            transition: 'all 0.3s ease',
                            border: 'none'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'scale(1.05)';
                            e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,255,136,0.4)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                            e.currentTarget.style.boxShadow = 'none';
                          }}
                        >
                          Register as {tag}
                        </Link>
                      ))}
                    </div>
                    
                    {/* Details Button */}
                    <a 
                      href={event.pdf} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      style={{
                        ...sciFiBtnStyle,
                        minWidth: 90,
                        minHeight: 32,
                        fontSize: '0.9rem',
                        background: 'rgba(0,255,136,0.1)',
                        color: '#00ff88',
                        border: '1px solid #00ff88',
                        textDecoration: 'none',
                        padding: '0.5rem 1rem',
                        display: 'inline-flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: '8px'
                      }}
                    >
                      View Details
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

      </div>
      <BottomNavBar />
    </section>
  );
};

// Helper for filtered events
function filteredEvents(category) {
  const allEvents = {
    development: [
      // { id: '1', eventId: 'project-expo', title: 'Project Expo', description: 'Showcase your innovative projects and compete with the best minds.', tags: ['Team', 'Engineering'], image: imgProjectExpo, pdf: samplePdf, icon: <FaLightbulb /> },

      // { id: '5', eventId: 'poster-design', title: 'Poster Design', description: 'Show your creativity by designing eye-catching posters.', tags: ['Individual', 'Design'], image: imgPosterDesign, pdf: samplePdf, icon: <FaPalette /> },
      { id: '6', eventId: 'web-design', title: 'Web Development', description: 'Design and build creative websites in a time-bound challenge.', tags: ['Individual', 'UI/UX'], image: 'https://img.freepik.com/free-vector/website-development-banner_33099-1687.jpg?semt=ais_rp_progressive&w=740&q=80', pdf: samplePdf, icon: <FaPalette /> },
      { id: '7', eventId: 'codeathon-2k25', title: 'Crack the Code', description: 'Solve challenging coding problems and algorithms.', tags: ['Individual', 'Coding'], image: imgNextCode, pdf: samplePdf, icon: <FaCode /> },
      // { id: '8', eventId: 'debugging', title: 'Debugging', description: 'Find and fix bugs in code under time pressure. (NEW)', tags: ['Individual', 'Coding'], image: imgNextCode, pdf: samplePdf, icon: <FaLaptopCode /> },
      { id: '9', eventId: 'hackathon', title: 'Hackathon', description: 'Solve real-world problems in a 24-hour coding marathon. (NEW)', tags: ['Team', 'Coding'], image: 'data:image/jpeg;base64,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', pdf: samplePdf, icon: <FaLaptopCode /> },
      // { id: '10', eventId: 'algorithm-building', title: 'Algorithm Building', description: 'Design and write efficient algorithms for complex problems. (NEW)', tags: ['Individual', 'Coding'], image: imgNextCode, pdf: samplePdf, icon: <FaCode /> },
    ],
    competetive: [
            { id: '2', eventId: 'circuitron', title: 'Circuitron', description: 'Design and build electronic circuits to solve challenges.', tags: ['Team', 'Electronics'], image: 'https://www.digipen.edu/sites/default/files/public/img/animation/03-image-still/digipen-student-animation-circuitron-still-1.jpg', pdf: samplePdf, icon: <FaNetworkWired /> },
      { id: '3', eventId: 'presentation', title: 'Presentation', description: 'Present your ideas and innovations to a panel of judges.', tags: ['Team', 'Communication'], image: imgProjectExpo, pdf: samplePdf, icon: <FaChalkboardTeacher /> },
      { id: '4', eventId: 'tech-quiz', title: 'Tech Quiz', description: 'Test your technical knowledge in this exciting quiz competition.', tags: ['Individual', 'Quiz'], image: 'https://img.freepik.com/premium-vector/quiz-logo-with-speech-bubble-symbols-concept-questionnaire-show-sing-quiz-button_100456-6779.jpg', pdf: samplePdf, icon: <FaBrain /> },
      // { id: '11', eventId: 'rube-cube', title: 'Rube A Cube', description: 'Solve fun and tricky puzzles in a race against time.', tags: ['Individual', 'Puzzle'], image: imgRubeCube, pdf: samplePdf, icon: <FaCube /> },
      // { id: '12', eventId: 'cook-without-fire', title: 'Cook Without Fire', description: 'A unique event to test your creativity in the kitchen—without fire!', tags: ['Team', 'Creativity'], image: imgCookWithoutFood, pdf: samplePdf, icon: <FaUtensils /> },
      // { id: '13', eventId: 'crossword-sudoku', title: 'Crossword And Sudoku', description: 'Challenge your mind with crossword puzzles and sudoku.', tags: ['Individual', 'Puzzle'], image: imgRubeCube, pdf: samplePdf, icon: <FaBrain /> },
      // { id: '14', eventId: 'fun-tech', title: 'Fun Tech (Mind Games)', description: 'Engage in fun tech-based mind games and challenges. (NEW)', tags: ['Individual', 'Games'], image: imgRubeCube, pdf: samplePdf, icon: <FaGamepad /> },
    ],
  };
  return allEvents[category] || [];
}

export default Events;