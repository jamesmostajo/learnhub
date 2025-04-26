import { createTab, switchToTab, tabState } from './routes.js';
import { initializeTimer, timerSettings, formatTime } from './timer.js';

export function displayTimer() {
  const timerPath = 'timer://Timer';
  const timerHTML = `
    <div id="timer-container">
      <h3>Study Timer</h3>
      <div id="timerDisplay">25:00</div>
      <div id="start-stop">
        <button id="startTimer">Start</button>
        <button id="stopTimer">Stop</button>
      </div>
    </div>

    <div id="timer-settings">
        <h3>Timer Settings (minutes : seconds)</h3>

        <div id="pomodoro-labels">
          <div class="pomodoro-inputs">
            <label for="pomodoro-time">Pomodoro</label>        
            <input type="text" id="pomodoro-time" value="25:00">
          </div>
          
          <div class="pomodoro-inputs">
            <label for="short-break">Short Break</label>
            <input type="text" id="short-break" value="5:00">
          </div>
          
          <div class="pomodoro-inputs">
            <label for="long-break">Long Break</label>
            <input type="text" id="long-break" value="15:00">
          </div>
        </div>
          
        <div id="other-options">
          <div class="pomodoro-other-inputs">
            <label for="auto-start-breaks">Auto Start Breaks</label>
            <input type="checkbox" id="auto-start-breaks">
          </div>

          <div class="pomodoro-other-inputs">
            <label for="auto-start-pomodoros">Auto Start Pomodoros</label>
            <input type="checkbox" id="auto-start-pomodoros">
          </div>

          <div class="pomodoro-other-inputs">
            <label for="long-break-interval">Long Break Interval</label>
            <input type="number" id="long-break-interval" value="4">
          </div>
        <button id="save-settings">Save Settings</button>
        </div>
      </div>
    </div>
  `;

  if (!tabState[timerPath]) {
    createTab(timerPath, timerHTML);
  }

  switchToTab(timerPath);

  const saveButton = document.getElementById('save-button');
  if (saveButton) {
    saveButton.setAttribute('hidden', 'hidden');
  }
}

export function renderTimerTab(fullPath) {
  const windowEl = document.getElementById('file-content');
  if (!windowEl) return;

  const content = tabState[fullPath]?.content || '';
  windowEl.innerHTML = content;

  const savedSettings = tabState[fullPath]?.settings;
  if (savedSettings) {
    console.log('Loading settings from tabState:', savedSettings);
    timerSettings.pomodoroTime = savedSettings.pomodoroTime;
    timerSettings.shortBreakTime = savedSettings.shortBreakTime;
    timerSettings.longBreakTime = savedSettings.longBreakTime;
    timerSettings.longBreakInterval = savedSettings.longBreakInterval;
    timerSettings.autoStartBreaks = savedSettings.autoStartBreaks;
    timerSettings.autoStartPomodoros = savedSettings.autoStartPomodoros;

    const timerDisplay = document.getElementById('timerDisplay');
    if (timerDisplay) {
      timerDisplay.innerHTML = formatTime(timerSettings.pomodoroTime);
    }

    document.getElementById('pomodoro-time').value = formatTime(timerSettings.pomodoroTime);
    document.getElementById('short-break').value = formatTime(timerSettings.shortBreakTime);
    document.getElementById('long-break').value = formatTime(timerSettings.longBreakTime);
    document.getElementById('long-break-interval').value = timerSettings.longBreakInterval;
    document.getElementById('auto-start-breaks').checked = timerSettings.autoStartBreaks;
    document.getElementById('auto-start-pomodoros').checked = timerSettings.autoStartPomodoros;
  }

  initializeTimer();
}