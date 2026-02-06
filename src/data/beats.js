// beats.js - Data for beat functionality

// Beat categories
export const beatCategories = {
  boombap: {
    name: 'Boom Bap',
    icon: '🥁',
    description: 'Clásicos del hip hop'
  },
  trap: {
    name: 'Trap',
    icon: '🎹',
    description: 'Beats trap modernos'
  }
};

// Sample beats data
const beats = {
  boombap: [
    {
      youtubeId: 'VwMcFjprFrA',
      title: 'Dólar',
      producer: 'AlcaZone',
      bpm: 85,
      category: 'boom bap',
      warmupTime: 21 // Segundos hasta que revienta el compás
    },
    {
      youtubeId: 'bgxzDN4bW88',
      title: 'Leyenda',
      producer: 'AlcaZone',
      bpm: 88,
      category: 'boom bap',
      warmupTime: 16 // Segundos hasta que revienta el compás
    }
  ],
  trap: [
    {
      youtubeId: 'wQX91kbBshQ',
      title: 'Gohan',
      producer: 'PacoBeats',
      bpm: 120,
      category: 'trap',
      warmupTime: 31 // Segundos hasta que revienta el compás
    },
    {
      youtubeId:'LjqQeM48pKY',
      title: 'UZZI',
      producer: 'Jbeat',
      bpm: 120,
      category: 'trap',
      warmupTime: 18 // Segundos hasta que revienta el compás
    }
  ]
};

// Get a random beat from a specific category
export const getRandomBeat = (category) => {
  const categoryBeats = beats[category];
  if (!categoryBeats || categoryBeats.length === 0) {
    // If category doesn't exist or is empty, return first available beat
    const firstCategory = Object.keys(beats)[0];
    return beats[firstCategory][0];
  }

  const randomIndex = Math.floor(Math.random() * categoryBeats.length);
  return categoryBeats[randomIndex];
};
