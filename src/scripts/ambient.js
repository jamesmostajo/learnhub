let currentAudio = null;

const soundMap = {
  rain: require('../assets/sounds/rain.mp3').default, // Extract the default export
  cafe: require('../assets/sounds/cafe.mp3').default,
  nature: require('../assets/sounds/nature.mp3').default,
};

const path = require('path');

// Print the resolved paths
console.log('Rain Sound:', soundMap.rain);
console.log('Cafe Sound:', soundMap.cafe);
console.log('Nature Sound:', soundMap.nature);

export function initAmbientSound() {
  const playBtn = document.getElementById('play-sound');
  const stopBtn = document.getElementById('stop-sound');
  const select = document.getElementById('sound-select');
  const container = document.getElementById('ambient-container');
  const toggleBtn = document.getElementById('toggle-ambient');

  playBtn.addEventListener('click', () => {
    const selected = select.value;
    if (selected === 'none') {
      if (currentAudio) {
        currentAudio.pause();
        currentAudio = null;
      }
      return;
    }
    if (currentAudio && !currentAudio.paused) {
      currentAudio.pause();
    }

    // Ensure the correct path is being passed to the Audio constructor
    const audioSource = soundMap[selected];
    console.log('Selected Audio Source:', audioSource); // Log for debugging

    currentAudio = new Audio(audioSource);
    currentAudio.loop = true;
    currentAudio.volume = 0.5;
    currentAudio.play();
  });

  stopBtn.addEventListener('click', () => {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }
  });
}