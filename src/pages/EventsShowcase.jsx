import React from 'react';

const EventsShowcase = () => {
  const events = [
    // {
    //   id: 1,
    //   name: 'Circuitron',
    //   image: 'https://res.cloudinary.com/dgyykbmt6/image/upload/v1772647765/1_vcbzgr.png',
    //   description: 'Test your circuit design and electronics knowledge',
    //   link: 'https://quiz-app-orcin-kappa.vercel.app/'
    // },
    // {
    //   id: 2,
    //   name: 'Tech Quiz',
    //   image: 'https://res.cloudinary.com/dgyykbmt6/image/upload/v1772647779/3_ci7xts.png',
    //   description: 'Challenge yourself with technology trivia',
    //   link: 'https://quiz-app-orcin-kappa.vercel.app/'
    // },
    // {
    //   id: 3,
    //   name: 'Crack The Code',
    //   image: 'https://res.cloudinary.com/dgyykbmt6/image/upload/v1772647786/4_p9eplw.png',
    //   description: 'Solve puzzles and crack the code',
    //   link: 'https://codeathon-three.vercel.app/'
    // },
    //  {
    //   id: 4,
    //   name: 'Crack The Code  first years',
    //   image: 'https://res.cloudinary.com/dgyykbmt6/image/upload/v1772647786/4_p9eplw.png',
    //   description: 'Solve puzzles and crack the code',
    //   link: 'https://quiz-app-orcin-kappa.vercel.app/'
    // }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%)',
      padding: '40px 20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{
          textAlign: 'center',
          color: '#00eaff',
          fontSize: '3rem',
          marginBottom: '50px',
          textShadow: '0 0 20px rgba(0, 234, 255, 0.5)',
          letterSpacing: '2px'
        }}>
          Featured Events
        </h1>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '30px',
          marginBottom: '40px'
        }}>
          {events.map(event => (
            <div
              key={event.id}
              style={{
                background: 'rgba(0, 234, 255, 0.05)',
                border: '2px solid #00eaff',
                borderRadius: '12px',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                boxShadow: '0 0 20px rgba(0, 234, 255, 0.2)'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.boxShadow = '0 0 30px rgba(0, 234, 255, 0.5)';
                e.currentTarget.style.borderColor = '#00ff88';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 234, 255, 0.2)';
                e.currentTarget.style.borderColor = '#00eaff';
              }}
            >
              <div style={{
                width: '100%',
                height: '250px',
                overflow: 'hidden',
                background: '#000'
              }}>
                <img
                  src={event.image}
                  alt={event.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.transform = 'scale(1.1)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = 'scale(1)';
                  }}
                />
              </div>

              <div style={{ padding: '25px' }}>
                <h2 style={{
                  color: '#00eaff',
                  fontSize: '1.8rem',
                  marginBottom: '10px',
                  textShadow: '0 0 10px rgba(0, 234, 255, 0.3)'
                }}>
                  {event.name}
                </h2>

                <p style={{
                  color: '#ccc',
                  fontSize: '1rem',
                  marginBottom: '20px',
                  lineHeight: '1.5'
                }}>
                  {event.description}
                </p>

                <button
                  onClick={() => window.open(event.link, '_blank')}
                  style={{
                    width: '100%',
                    padding: '12px',
                    background: 'linear-gradient(135deg, #00eaff 0%, #00ff88 100%)',
                    border: 'none',
                    borderRadius: '6px',
                    color: '#000',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 0 15px rgba(0, 234, 255, 0.4)'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.boxShadow = '0 0 25px rgba(0, 234, 255, 0.8)';
                    e.target.style.transform = 'scale(1.05)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.boxShadow = '0 0 15px rgba(0, 234, 255, 0.4)';
                    e.target.style.transform = 'scale(1)';
                  }}
                >
                  Learn More →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventsShowcase;
