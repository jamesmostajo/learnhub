let pomodoroTime = 25 * 60;
let shortBreakTime = 5 * 60;
let longBreakTime = 15 * 60;
let longBreakInterval = 4;
let autoStartBreaks = false;
let autoStartPomodoros = false;

const timerDisplay = document.getElementById('timerDisplay');
const startButton = document.getElementById('startTimer');
const stopButton = document.getElementById('stopTimer');
const settingsModal = document.getElementById('timer-settings');
const settingsButton = document.getElementById('open-settings');

document.getElementById('save-settings').addEventListener('click', () => {
    pomodoroTime = convertTime(document.getElementById('pomodoro-time').value);
    shortBreakTime = convertTime(document.getElementById('short-break').value);
    longBreakTime = convertTime(document.getElementById('long-break').value);
    longBreakInterval = parseInt(document.getElementById('long-break-interval').value, 10);
    autoStartBreaks = document.getElementById('auto-start-breaks').checked;
    autoStartPomodoros = document.getElementById('auto-start-pomodoros').checked;

    // Reset the timer to the new Pomodoro duration
    timeLeft = pomodoroTime;
    timerDisplay.innerText = formatTime(timeLeft);

    settingsModal.style.display = "none";
});