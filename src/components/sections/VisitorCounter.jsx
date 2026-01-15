import { useState, useEffect } from 'react';
import '../../styles/VisitorCounter.css';
import trishnaLogo from '../../assets/images/tk logo.png';
import config from '../../config';

const VisitorCounter = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetch(`${config.BASE_URL}/api/users/visitor-count`)
      .then(res => res.json())
      .then(data => setCount(data.count))
      .catch(error => console.error('Error fetching visitor count:', error));
  }, []);

  return (
    <div className="visitor-counter" style={{ padding: '10px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '10px', width: 'auto' }}>
      <div className="counter-icon" style={{ width: '40px', height: '40px' }}>
        <img src={trishnaLogo} alt="Trishna Logo" style={{ width: '100%', height: '100%' }} />
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
