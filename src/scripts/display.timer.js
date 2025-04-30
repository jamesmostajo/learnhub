import { initializeTimer, startTimer, stopTimer, timerSettings, saveTimerSettings } from './timer.js';

export function displayTimer() {
    const startButton = document.getElementById('startTimer');
    const stopButton = document.getElementById('stopTimer');
    const settingsButton = document.getElementById('open-settings');
    const settingsDialog = document.getElementById('timer-settings');
    const closeButton = settingsDialog.querySelector('.close');

    // Attach event listeners to buttons
    startButton.addEventListener('click', startTimer);
    stopButton.addEventListener('click', stopTimer);
    settingsButton.addEventListener('click', () => {
        // Populate settings dialog with current timer settings
        document.getElementById('pomodoro-time').value = formatTime(timerSettings.pomodoroTime);
        document.getElementById('short-break').value = formatTime(timerSettings.shortBreakTime);
        document.getElementById('long-break').value = formatTime(timerSettings.longBreakTime);
        document.getElementById('auto-start-breaks').checked = timerSettings.autoStartBreaks;
        document.getElementById('auto-start-pomodoros').checked = timerSettings.autoStartPomodoros;
        document.getElementById('long-break-interval').value = timerSettings.longBreakInterval;

        settingsDialog.showModal();
    });
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

        // Save updated settings to localStorage
        saveTimerSettings();

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

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }

    // Initialize the timer
    initializeTimer();
}