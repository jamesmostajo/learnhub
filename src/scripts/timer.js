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
let isTimerRunning = false; // Track if the timer is running

export function initializeTimer() {
    timeLeft = timerSettings.pomodoroTime; // Reset timeLeft based on updated settings
    updateTimerDisplay(timeLeft);
}

function updateTimerDisplay(seconds) {
    const timerDisplay = document.getElementById('timerDisplay');
    if (timerDisplay) {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        timerDisplay.innerText = `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }
}

function switchMode(mode) {
    currentMode = mode;
    const timerDisplay = document.getElementById('timerDisplay');
    const header = document.querySelector('h3');
    let type = "";
    if (mode === "pomodoro") {
        timeLeft = timerSettings.pomodoroTime;
        timerDisplay.style.backgroundColor = "rgb(150, 0, 0)";
        type = "Study Mode";
    } else if (mode === "shortBreak") {
        timeLeft = timerSettings.shortBreakTime;
        timerDisplay.style.backgroundColor = "rgb(0, 86, 43)";
        type = "Short Break"
    } else if (mode === "longBreak") {
        timeLeft = timerSettings.longBreakTime;
        timerDisplay.style.backgroundColor = "rgb(0, 54, 86)";
        type = "Long Break";
    }
    header.innerHTML = "Study Timer: " + type;

    updateTimerDisplay(timeLeft);
}

function startTimer() {
    if (isTimerRunning) return; // Prevent multiple timers from starting

    isTimerRunning = true;
    timer = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateTimerDisplay(timeLeft);
        } else {
            clearInterval(timer);
            isTimerRunning = false; // Reset the timer running state

            if (currentMode === "pomodoro") {
                cycles++;
                if (cycles % timerSettings.longBreakInterval === 0) {
                    switchMode("longBreak");
                } else {
                    switchMode("shortBreak");
                }
            } else {
                switchMode("pomodoro");
            }

            if (timerSettings.autoStartBreaks || timerSettings.autoStartPomodoros) {
                startTimer();
            }
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timer);
    isTimerRunning = false; // Reset the timer running state
}

export { startTimer, stopTimer };