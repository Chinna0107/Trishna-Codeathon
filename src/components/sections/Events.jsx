// src/components/sections/Events.jsx
import { useInView } from 'react-intersection-observer';
// import { motion } from 'framer-motion'; // Removed as it's unused
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Removed useNavigate as it's unused
import { FaCode, FaGamepad, FaRobot, FaChalkboardTeacher, FaMicrophone, FaLaptopCode, FaPalette, FaLightbulb, FaCube, FaUtensils, FaCar, FaRocket, FaReact, FaBrain, FaGithub, FaNetworkWired } from 'react-icons/fa';
import tkLogo from '../../assets/images/tk logo.png';
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
    { key: 'technical', label: 'Technical', icon: <FaCode size={20} />, desc: 'Code, Create, Innovate' },
    { key: 'nontechnical', label: 'Non Technical', icon: <FaGamepad size={20} />, desc: 'Fun, Creative, Engaging' },
    { key: 'robotics', label: 'Robotics', icon: <FaRobot size={20} />, desc: 'Build, Race, Compete' },
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
    color: '#00eaff',
    background: 'rgba(0,0,0,0.18)',
    border: '2px solid #00eaff55',
    borderRadius: 8,
    padding: '0.7em 0',
    textAlign: 'center',
    letterSpacing: 2,
    boxShadow: '0 0 4px #00eaff22',
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
      background: 'radial-gradient(ellipse at center, #0a1a2f 80%, #000 100%)',
      position: 'relative',
      overflow: 'hidden',
      padding: 0,
      margin: 0,
      width: '100vw',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
    }}>
      {/* Blue grid overlay */}
      <div style={{
        pointerEvents: 'none',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        backgroundImage: `repeating-linear-gradient(90deg, rgba(0,234,255,0.08) 0 1px, transparent 1px 80px), repeating-linear-gradient(0deg, rgba(0,234,255,0.08) 0 1px, transparent 1px 80px)`,
        backgroundSize: '80px 80px',
        backgroundPosition: 'center',
      }} />
      <div className="container mx-auto px-4" style={{ position: 'relative', zIndex: 1, minHeight: '100vh' }}>
        {/* TK Logo top left */}
        <img src={tkLogo} alt="TK Logo" style={{ position: 'absolute', top: 18, left: 18, width: 54, height: 54, zIndex: 101 }} />
        {/* Theme pic bottom left */}
        { !category && (
          <img src={eventpic} alt="Theme Pic" style={{ position: 'absolute', left: 18, bottom: 18, width: 320, height: 'auto', zIndex: 101, opacity: 0.95 }} />
        )}
        {/* Category selection cards */}
        {!category && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '2.5rem', marginTop: '5rem', padding: '0 2rem' }}>
            {categories.map((cat) => (
              <div
                key={cat.key}
                onClick={() => setCategory(cat.key)}
                style={{
                  background: 'rgba(0,234,255,0.08)',
                  border: '2px solid #00eaff55',
                  borderRadius: '16px',
                  padding: '2rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '1rem',
                  minHeight: '200px',
                  boxShadow: '0 4px 20px rgba(0,234,255,0.1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(0,234,255,0.18)';
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,234,255,0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(0,234,255,0.08)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,234,255,0.1)';
                }}
              >
                <div style={{ fontSize: '3rem', color: '#00eaff' }}>{cat.icon}</div>
                <h3 style={{ color: '#00eaff', fontFamily: 'Orbitron, monospace', fontSize: '1.3rem', fontWeight: 700, margin: 0 }}>{cat.label}</h3>
                <p style={{ color: '#00eaff', fontFamily: 'Orbitron, monospace', fontSize: '0.95rem', margin: 0, minHeight: '24px', opacity: 0.8 }}>
                  {typedTexts[cat.key] || ''}<span style={{ animation: 'blink 1s infinite' }}>|</span>
                </p>
              </div>
            ))}
          </div>
        )}
        {/* Show project cards only after category is selected */}
        {category && (
          <>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem', marginTop: '5rem' }}>
              <button
                onClick={() => setCategory('')}
                style={{ ...sciFiBtnStyle, minWidth: 100, minHeight: 36, fontSize: '1rem', background: 'rgba(0,0,0,0.18)', color: '#00eaff', border: '2px solid #00eaff55', marginBottom: 0, marginRight: 8, cursor: 'pointer' }}
              >
                Back
              </button>
              <span style={{ color: '#00eaff', fontFamily: 'Orbitron, monospace', fontWeight: 700, fontSize: '1.1rem', marginLeft: 8, alignSelf: 'center' }}>{categories.find(c => c.key === category)?.label}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents(category).map((event, index) => (
                <div // Changed from motion.div as motion import was removed
                  key={event.id}
                  // initial={{ opacity: 0, y: 20 }} // Animation props removed
                  // animate={inView ? { opacity: 1, y: 0 } : {}} // Animation props removed
                  // transition={{ duration: 0.5, delay: index * 0.1 }} // Animation props removed
                  className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                  style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)', transition: 'opacity 0.5s ease-out, transform 0.5s ease-out', transitionDelay: `${index * 0.1}s` }} // Basic fade-in-up with inView
                >
                  <div className="h-48 bg-gray-200 flex items-center justify-center">
                    {event.image ? (
                      <img 
                        src={event.image} 
                        alt={event.title} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-gray-500">Event Image</span>
                    )}
                  </div>
                  <div className="p-6">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                      {event.icon && <span style={{ color: '#667eea', fontSize: '1.2rem' }}>{event.icon}</span>}
                      <h3 className="text-xl font-semibold text-gray-800">{event.title}</h3>
                    </div>
                    <p className="text-gray-600 mb-4">{event.description}</p>
                    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                      {event.tags && event.tags.filter(tag => tag === 'Team' || tag === 'Individual').map((tag) => (
                        <Link
                          key={tag}
                          to={tag === 'Team' ? `/team-registration?event=${event.eventId}&name=${encodeURIComponent(event.title)}` : `/individual-registration?event=${event.eventId}&name=${encodeURIComponent(event.title)}`}
                          className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded-full transition-colors cursor-pointer"
                          style={{ textDecoration: 'none' }}
                        >
                          Register as {tag}
                        </Link>
                      ))}
                    </div>
                    <a href={event.pdf} target="_blank" rel="noopener noreferrer" style={{
                      ...sciFiBtnStyle,
                      minWidth: 90,
                      minHeight: 32,
                      fontSize: '0.95rem',
                      background: 'linear-gradient(90deg, #00eaff 0%, #0057ff 100%)',
                      color: '#fff',
                      border: 'none',
                      boxShadow: 'none',
                      textDecoration: 'none',
                      padding: '0.25em 0',
                      display: 'inline-flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>Details</a>
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
    technical: [
      { id: '1', eventId: 'project-expo', title: 'Project Expo', description: 'Showcase your innovative projects and compete with the best minds.', tags: ['Team', 'Engineering'], image: imgProjectExpo, pdf: samplePdf, icon: <FaLightbulb /> },
      { id: '2', eventId: 'circuitron', title: 'Circuitron', description: 'Design and build electronic circuits to solve challenges.', tags: ['Team', 'Electronics'], image: imgWebDesign, pdf: samplePdf, icon: <FaNetworkWired /> },
      { id: '3', eventId: 'presentation', title: 'Presentation', description: 'Present your ideas and innovations to a panel of judges.', tags: ['Team', 'Communication'], image: imgProjectExpo, pdf: samplePdf, icon: <FaChalkboardTeacher /> },
      { id: '4', eventId: 'tech-quiz', title: 'Tech Quiz', description: 'Test your technical knowledge in this exciting quiz competition.', tags: ['Individual', 'Quiz'], image: imgNextCode, pdf: samplePdf, icon: <FaBrain /> },
      { id: '5', eventId: 'poster-design', title: 'Poster Design', description: 'Show your creativity by designing eye-catching posters.', tags: ['Individual', 'Design'], image: imgPosterDesign, pdf: samplePdf, icon: <FaPalette /> },
      { id: '6', eventId: 'web-design', title: 'Web Designing', description: 'Design and build creative websites in a time-bound challenge.', tags: ['Individual', 'UI/UX'], image: imgWebDesign, pdf: samplePdf, icon: <FaPalette /> },
      { id: '7', eventId: 'coding', title: 'Coding / Problem Solving', description: 'Solve challenging coding problems and algorithms.', tags: ['Individual', 'Coding'], image: imgNextCode, pdf: samplePdf, icon: <FaCode /> },
      { id: '8', eventId: 'debugging', title: 'Debugging', description: 'Find and fix bugs in code under time pressure. (NEW)', tags: ['Individual', 'Coding'], image: imgNextCode, pdf: samplePdf, icon: <FaLaptopCode /> },
      { id: '9', eventId: 'hackathon', title: 'Hackathon', description: 'Solve real-world problems in a 24-hour coding marathon. (NEW)', tags: ['Team', 'Coding'], image: imgHackathon, pdf: samplePdf, icon: <FaLaptopCode /> },
      { id: '10', eventId: 'algorithm-building', title: 'Algorithm Building / Writing', description: 'Design and write efficient algorithms for complex problems. (NEW)', tags: ['Individual', 'Coding'], image: imgNextCode, pdf: samplePdf, icon: <FaCode /> },
    ],
    nontechnical: [
      { id: '11', eventId: 'rube-cube', title: 'Rube A Cube', description: 'Solve fun and tricky puzzles in a race against time.', tags: ['Individual', 'Puzzle'], image: imgRubeCube, pdf: samplePdf, icon: <FaCube /> },
      { id: '12', eventId: 'cook-without-fire', title: 'Cook Without Fire', description: 'A unique event to test your creativity in the kitchen—without fire!', tags: ['Team', 'Creativity'], image: imgCookWithoutFood, pdf: samplePdf, icon: <FaUtensils /> },
      { id: '13', eventId: 'crossword-sudoku', title: 'Crossword And Sudoku', description: 'Challenge your mind with crossword puzzles and sudoku.', tags: ['Individual', 'Puzzle'], image: imgRubeCube, pdf: samplePdf, icon: <FaBrain /> },
      { id: '14', eventId: 'fun-tech', title: 'Fun Tech (Mind Games)', description: 'Engage in fun tech-based mind games and challenges. (NEW)', tags: ['Individual', 'Games'], image: imgRubeCube, pdf: samplePdf, icon: <FaGamepad /> },
    ],
    robotics: [
      { id: '15', eventId: 'line-tracer', title: 'Line Tracer', description: 'Build robots that can follow a line autonomously.', tags: ['Team', 'Robotics'], image: imgRoboRace, pdf: samplePdf, icon: <FaRobot /> },
      { id: '16', eventId: 'over-drive', title: 'Over Drive', description: 'Push your robots to the limit in this high-speed event.', tags: ['Team', 'Speed'], image: imgOverDrive, pdf: samplePdf, icon: <FaRocket /> },
      { id: '17', eventId: 'robo-vehicle-race', title: 'Robo Vehicle Race', description: 'Build and race your robots on challenging tracks.', tags: ['Team', 'Race'], image: imgRoboRace, pdf: samplePdf, icon: <FaCar /> },
    ],
  };
  return allEvents[category] || [];
}

export default Events;