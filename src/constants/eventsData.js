// Events data for TRISHNA 2K25

export const EVENTS_DATA = {
  Tech: [
    { name: 'Project Expo', category: 'Tech', isNew: false },
    { name: 'Circuitron', category: 'Tech', isNew: false },
    { name: 'Presentation', category: 'Tech', isNew: false },
    { name: 'Tech Quiz', category: 'Tech', isNew: false },
    { name: 'Poster Design', category: 'Tech', isNew: false },
    { name: 'Web Designing', category: 'Tech', isNew: false },
    { name: 'Coding / Problem Solving', category: 'Tech', isNew: false },
    { name: 'Debugging', category: 'Tech', isNew: true },
    { name: 'Hackathon', category: 'Tech', isNew: true },
    { name: 'Algorithm Building / Writing', category: 'Tech', isNew: true }
  ],
  'Non-Tech': [
    { name: 'Rube a Cube', category: 'Non-Tech', isNew: false },
    { name: 'Cook Without Fire', category: 'Non-Tech', isNew: false },
    { name: 'Crossword and Sudoku', category: 'Non-Tech', isNew: false },
    { name: 'Fun Tech (Mind Games)', category: 'Non-Tech', isNew: true }
  ],
  Robotics: [
    { name: 'Line Tracer', category: 'Robotics', isNew: false },
    { name: 'Over Drive', category: 'Robotics', isNew: false },
    { name: 'Robo Vehicle Race', category: 'Robotics', isNew: false }
  ]
};

// Get all events as a flat array
export const getAllEvents = () => {
  return [
    ...EVENTS_DATA.Tech,
    ...EVENTS_DATA['Non-Tech'],
    ...EVENTS_DATA.Robotics
  ];
};

// Get events by category
export const getEventsByCategory = (category) => {
  return EVENTS_DATA[category] || [];
};

// Get new events only
export const getNewEvents = () => {
  return getAllEvents().filter(event => event.isNew);
};

export default EVENTS_DATA;
