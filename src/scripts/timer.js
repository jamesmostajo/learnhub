import { tabState } from "./routes";

export const timerSettings = {
    pomodoroTime: 25 * 60,
    shortBreakTime: 5 * 60,
    longBreakTime: 15 * 60,
    longBreakInterval: 4,
    autoStartBreaks: false,
    autoStartPomodoros: false,
};

let timer;
let cycles = 0;
let timeLeft = timerSettings.pomodoroTime;
let currentMode = "pomodoro";

export function initializeTimer() {
    const startButton = document.getElementById('startTimer');
    const stopButton = document.getElementById('stopTimer');

    document.getElementById('save-settings').addEventListener('click', saveData);
    startButton.addEventListener('click', () => {
        timer = setInterval(updateTimer, 1000);
    });

    stopButton.addEventListener('click', () => {
        clearInterval(timer);
    });
}

function saveData() {
    console.log('Saving data...');
    timerSettings.pomodoroTime = convertTime(document.getElementById('pomodoro-time').value);
    timerSettings.shortBreakTime = convertTime(document.getElementById('short-break').value);
    timerSettings.longBreakTime = convertTime(document.getElementById('long-break').value);
    timerSettings.longBreakInterval = parseInt(document.getElementById('long-break-interval').value, 10);
    timerSettings.autoStartBreaks = document.getElementById('auto-start-breaks').checked;
    timerSettings.autoStartPomodoros = document.getElementById('auto-start-pomodoros').checked;

    // Save the settings to the tabState object
    const timerPath = 'timer://Timer';
    if (!tabState[timerPath]) {
        tabState[timerPath] = {};
    }
    tabState[timerPath].settings = timerSettings;

    const timerDisplay = document.getElementById('timerDisplay');
    if (timerDisplay) {
        timerDisplay.innerHTML = formatTime(timerSettings.pomodoroTime);
    }
}

export function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

function convertTime(timeString) {
    const [minutes, seconds] = timeString.split(":").map(Number);
    return (minutes * 60) + (seconds || 0);
}


function updateTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        timerDisplay.innerText = formatTime(timeLeft);
    } else {
        clearInterval(timer);
        ipcRenderer.send('study-session-end');
        cycles++;

        if (currentMode === "pomodoro") {
            if (cycles % longBreakInterval === 0) {
                startBreak(longBreakTime, "long");
            } else {
                startBreak(shortBreakTime, "short");
            }
        } else if (autoStartPomodoros) {
            startPomodoro();
        }
    }
}

function startBreak(duration, type) {
    currentMode = type;
    timeLeft = duration;
    if (autoStartBreaks) {
        timer = setInterval(updateTimer, 1000);
    }
}

function startPomodoro() {
    currentMode = "pomodoro";
    timeLeft = pomodoroTime;
    timer = setInterval(updateTimer, 1000);
}