let timerInterval;
let timeLeft = 1500; // default 25 minutes in seconds
let mode = 'pomodoro';
let cycles = 0;
let pomodoroDuration = 1500;
let shortBreakDuration = 300;
let longBreakDuration = 900;
let autoStartBreaks = false;
let autoStartPomodoros = false;
let longBreakInterval = 4;

export function initTimeBlocking() {
  const toggleBtn = document.getElementById('toggle-timeblocking');
  const timerContainer = document.getElementById('timer-container');
  const timerDisplay = document.getElementById('timerDisplay');
  const startBtn = document.getElementById('startTimer');
  const stopBtn = document.getElementById('stopTimer');
  const settingsBtn = document.getElementById('open-settings');
  const settingsModal = document.getElementById('timer-settings');
  const closeBtn = document.querySelector('.close');
  const saveSettingsBtn = document.getElementById('save-settings');

  if (timerContainer) {
    timerContainer.style.display = 'none'; 
  }

  toggleBtn?.addEventListener('click', () => {
    if (timerContainer) {
      timerContainer.style.display = (timerContainer.style.display === 'none') ? 'block' : 'none';
    }
  });

  startBtn?.addEventListener('click', startTimer);
  stopBtn?.addEventListener('click', stopTimer);

  settingsBtn?.addEventListener('click', () => {
    if (settingsModal) settingsModal.style.display = 'block';
  });

  closeBtn?.addEventListener('click', () => {
    if (settingsModal) settingsModal.style.display = 'none';
  });

  saveSettingsBtn?.addEventListener('click', saveSettings);

  updateDisplay(timerDisplay, timeLeft); // set initial timer display
}

function startTimer() {
  if (!timerInterval) {
    timerInterval = setInterval(updateTimer, 1000);
  }
}

function stopTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
}

function updateTimer() {
  const timerDisplay = document.getElementById('timerDisplay');
  if (!timerDisplay) return;

  if (timeLeft > 0) {
    timeLeft--;
    updateDisplay(timerDisplay, timeLeft);
  } else {
    clearInterval(timerInterval);
    timerInterval = null;
    handleTimerEnd();
  }
}

function handleTimerEnd() {
  if (mode === 'pomodoro') {
    cycles++;
    if (cycles % longBreakInterval === 0) {
      switchToLongBreak();
    } else {
      switchToShortBreak();
    }
  } else {
    resetToPomodoro();
  }
}

function switchToShortBreak() {
  mode = 'shortBreak';
  timeLeft = shortBreakDuration;
  updateDisplay(document.getElementById('timerDisplay'), timeLeft);
  alert('Work session over! Starting short break! 🎉');
  if (autoStartBreaks) {
    startTimer();
  }
}

function switchToLongBreak() {
  mode = 'longBreak';
  timeLeft = longBreakDuration;
  updateDisplay(document.getElementById('timerDisplay'), timeLeft);
  alert('Work session over! Starting long break! 🌴');
  if (autoStartBreaks) {
    startTimer();
  }
}

function resetToPomodoro() {
  mode = 'pomodoro';
  timeLeft = pomodoroDuration;
  updateDisplay(document.getElementById('timerDisplay'), timeLeft);
  alert('Break over! Time to get back to work! 💪');
  if (autoStartPomodoros) {
    startTimer();
  }
}

function saveSettings() {
  const pomodoroInput = document.getElementById('pomodoro-time')?.value;
  const shortBreakInput = document.getElementById('short-break')?.value;
  const longBreakInput = document.getElementById('long-break')?.value;
  const longBreakIntervalInput = document.getElementById('long-break-interval')?.value;
  const autoBreaksInput = document.getElementById('auto-start-breaks')?.checked;
  const autoPomodorosInput = document.getElementById('auto-start-pomodoros')?.checked;

  if (pomodoroInput) pomodoroDuration = convertTime(pomodoroInput);
  if (shortBreakInput) shortBreakDuration = convertTime(shortBreakInput);
  if (longBreakInput) longBreakDuration = convertTime(longBreakInput);
  if (longBreakIntervalInput) longBreakInterval = parseInt(longBreakIntervalInput, 10);
  autoStartBreaks = !!autoBreaksInput;
  autoStartPomodoros = !!autoPomodorosInput;

  resetToPomodoro();
  
  const settingsModal = document.getElementById('timer-settings');
  if (settingsModal) settingsModal.style.display = 'none';
}

function updateDisplay(timerDisplay, time) {
  if (!timerDisplay) return;
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function convertTime(timeString) {
  const [minutes, seconds] = timeString.split(":").map(Number);
  return (minutes * 60) + (seconds || 0);
}