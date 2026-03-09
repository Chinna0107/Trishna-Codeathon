import { useState, useEffect } from 'react';
import '../../styles/VisitorCounter.css';
import codeathonlogo from '../../assets/images/co6.png';
import useVisitorCount from '../../hooks/useVisitorCount';

const VisitorCounter = () => {
  const count = useVisitorCount();

  return (
    <div className="visitor-counter" style={{ padding: '10px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '10px', width: 'auto' }}>
      <div className="counter-icon" style={{ width: '40px', height: '40px' }}>
        <img src={codeathonlogo} alt="Trishna Logo" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="counter-content" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
        <div className="counter-value" style={{ fontSize: '1.5rem', color: '#3ecc94' }}>
          {count} <span className="counter-label" style={{ fontSize: '1rem', color: '#FFF8DC', fontStyle: 'italic', textTransform: 'uppercase' }}>Members Visited</span>
        </div>
      </div>
    </div>
  );
};

export default VisitorCounter;
