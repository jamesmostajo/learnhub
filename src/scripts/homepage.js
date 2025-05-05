import { getTodaysEvents } from './calendar.js';

export function renderHomePage() {
  const windowEl = document.getElementById('file-content');
  const todaysEvents = getTodaysEvents();

  const eventsHTML = todaysEvents.length === 0
    ? '<p>No tasks scheduled for today.</p>'
    : `<ul>${todaysEvents.map(event => `
        <li>${event.time} - ${event.title}</li>
      `).join('')}</ul>`;

  windowEl.innerHTML = `
  <div class="to-center">
    <div class="to-center home">
      <div id="home-title">
        <h1 id="main-title">LearnHub</h1>
        <h3 id="sub-title">Your All-in-One Study Tool</h3>
      </div>
      <div id="todays-tasks">
        <h3>Today's Tasks</h3>
        ${eventsHTML}
      </div>
    </div>
  </div>
  `;

  document.getElementById('save-button')?.setAttribute('hidden', 'hidden');
}