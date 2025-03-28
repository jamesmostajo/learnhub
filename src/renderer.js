/**
 * This file will automatically be loaded by webpack and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/process-model
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

import './styles/base.css';
import './styles/layout.css';
import './styles/sidebar.css';
import './styles/main-pane.css';

console.log('👋 This message is being logged by "renderer.js", included via webpack');

import { openDirectory } from './scripts/open.folder';
import { saveData } from './scripts/display.file';

const selectFolderButton = document.getElementById('open-folder');
const fileList = document.querySelector('.file-list');

selectFolderButton.addEventListener('click', () => openDirectory(fileList));

const saveButton = document.getElementById('save-button');
saveButton.addEventListener('click', saveData);

// 🕒 Study Timer Logic
const { ipcRenderer } = require('electron');

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

// 🕒 Open Timer Settings
settingsButton.addEventListener('click', () => {
    settingsModal.style.display = "block";
});

// ❌ Close Timer Settings
document.querySelector('.close').addEventListener('click', () => {
    settingsModal.style.display = "none";
});

// 🎯 Save Settings
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

// 🕒 Timer Functionality
let timer;
let cycles = 0;
let timeLeft = pomodoroTime;
let currentMode = "pomodoro";

startButton.addEventListener('click', () => {
    ipcRenderer.send('study-session-start');
    timer = setInterval(updateTimer, 1000);
});

stopButton.addEventListener('click', () => {
    clearInterval(timer);
    ipcRenderer.send('study-session-end');
});

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

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

function convertTime(timeString) {
    const [minutes, seconds] = timeString.split(":").map(Number);
    return (minutes * 60) + (seconds || 0);
}