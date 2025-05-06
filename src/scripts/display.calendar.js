import { createTab, switchToTab, tabState } from './routes.js';
import { initializeCalendar } from './calendar.js';

export function displayCalendar() {
  const CalendarPath = 'calendar://Calendar';

  const CalendarHTML = `
    <div class="calendar-view app-container">
      <header class="app-header">
        <h1>Study Calendar</h1>
        <div class="clock" id="clock"></div>
      </header>
      <section class="calendar-section">
        <div class="calendar-header">
          <button id="prev-month">◀</button>
          <h2 id="month-year"></h2>
          <button id="next-month">▶</button>
        </div>
        <div class="calendar-weekdays">
          <div>Sun</div><div>Mon</div><div>Tue</div>
          <div>Wed</div><div>Thu</div><div>Fri</div>
          <div>Sat</div>
        </div>
        <div class="calendar-days" id="calendar-days"></div>
      </section>
      <section class="events-section">
        <h3><span id="events-date">Today</span>'s Sessions</h3>
        <ul id="events-list"></ul>
        <div class="event-form">
          <div class="form-group">
            <input type="date" id="event-date">
            <input type="time" id="event-time">
          </div>
          <div class="form-group">
            <input type="text" id="event-title" placeholder="Session name">
            <button id="add-event">Add Session</button>
          </div>
        </div>
      </section>
    </div>
  `;

    if (!tabState[CalendarPath]) {
      createTab(CalendarPath, CalendarHTML);
    }
  
    switchToTab(CalendarPath);
  
    const saveButton = document.getElementById('save-button');
    if (saveButton) {
      saveButton.setAttribute('hidden', 'hidden');
    }
}

export function renderCalendarTab(fullPath) {
  const windowEl = document.getElementById('file-content');
  if (!windowEl) return;

  const content = tabState[fullPath]?.content || '';

  windowEl.innerHTML = content;

  initializeCalendar();
}