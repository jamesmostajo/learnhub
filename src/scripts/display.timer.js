import { initializeTimer, startTimer, stopTimer, timerSettings } from './timer.js';

export function displayTimer() {
    const startButton = document.getElementById('startTimer');
    const stopButton = document.getElementById('stopTimer');
    const settingsButton = document.getElementById('open-settings');
    const settingsDialog = document.getElementById('timer-settings');
    const closeButton = settingsDialog.querySelector('.close');

    // Attach event listeners to buttons
    startButton.addEventListener('click', startTimer);
    stopButton.addEventListener('click', stopTimer);
    settingsButton.addEventListener('click', () => settingsDialog.showModal());
    closeButton.addEventListener('click', () => settingsDialog.close());

    const saveSettingsButton = document.getElementById('save-settings');
    saveSettingsButton.addEventListener('click', () => {
        const pomodoroInput = document.getElementById('pomodoro-time').value;
        const shortBreakInput = document.getElementById('short-break').value;
        const longBreakInput = document.getElementById('long-break').value;
        const autoStartBreaks = document.getElementById('auto-start-breaks').checked;
        const autoStartPomodoros = document.getElementById('auto-start-pomodoros').checked;
        const longBreakInterval = parseInt(document.getElementById('long-break-interval').value, 10);

        // Update timer settings
        timerSettings.pomodoroTime = parseTimeInput(pomodoroInput);
        timerSettings.shortBreakTime = parseTimeInput(shortBreakInput);
        timerSettings.longBreakTime = parseTimeInput(longBreakInput);
        timerSettings.autoStartBreaks = autoStartBreaks;
        timerSettings.autoStartPomodoros = autoStartPomodoros;
        timerSettings.longBreakInterval = longBreakInterval;

        // Stop the current timer
        stopTimer();

        // Reset the timer display
        initializeTimer();

        settingsDialog.close();
    });

    function parseTimeInput(input) {
        const [minutes, seconds] = input.split(':').map(Number);
        return minutes * 60 + (seconds || 0);
    }

    // Initialize the timer
    initializeTimer();
}