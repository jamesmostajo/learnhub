let currentAudio = null;

const soundMap = {
  rain: require('../assets/sounds/rain.mp3'),
  cafe: require('../assets/sounds/cafe.mp3'),
  nature: require('../assets/sounds/nature.mp3')
};

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
    currentAudio = new Audio(soundMap[selected]);
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

  toggleBtn.addEventListener('click', () => {
    container.style.display = container.style.display === 'none' ? 'block' : 'none';
  });
}