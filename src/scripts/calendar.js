let currentDate = new Date();
let selectedDate = new Date();
let events = JSON.parse(localStorage.getItem('events') || '{}');

export function initializeCalendar() {
  setupEventListeners();
  updateClock();
  setInterval(updateClock, 1000);

  const eventDateInput = document.getElementById('event-date');
  eventDateInput.value = formatDateKey(new Date());

  renderCalendar(currentDate);
  renderEvents();
}

function setupEventListeners() {
  const prevBtn = document.getElementById('prev-month');
  const nextBtn = document.getElementById('next-month');
  const addEventBtn = document.getElementById('add-event');

  prevBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar(currentDate);
  });

  nextBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar(currentDate);
  });

  addEventBtn.addEventListener('click', addEvent);
}

function updateClock() {
  const clockEl = document.getElementById('clock');
  if (clockEl) clockEl.textContent = new Date().toLocaleTimeString();
}

function formatDateKey(date) {
  return date.toLocaleDateString('en-CA');
}

function renderCalendar(date) {
  const calendarDays = document.getElementById('calendar-days');
  const monthYear = document.getElementById('month-year');

  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  monthYear.textContent = `${date.toLocaleString('default', { month: 'long' })} ${year}`;
  calendarDays.innerHTML = '';

  for (let i = 0; i < firstDay; i++) {
    calendarDays.appendChild(document.createElement('div'));
  }

  for (let day = 1; day <= lastDate; day++) {
    const dayCell = createDayCell(year, month, day);
    calendarDays.appendChild(dayCell);
  }
}

function createDayCell(year, month, day) {
  const dayCell = document.createElement('div');
  const thisDate = new Date(Date.UTC(year, month, day));
  const dateKey = formatDateKey(thisDate);

  dayCell.textContent = day;
  dayCell.classList.add('day');

  if (thisDate.toLocaleDateString('en-CA') === new Date().toLocaleDateString('en-CA')) {
    dayCell.classList.add('today');
  }
  if (thisDate.toLocaleDateString('en-CA') === selectedDate.toLocaleDateString('en-CA')) {
    dayCell.classList.add('selected');
  }
  if (events[dateKey]?.length > 0) dayCell.classList.add('has-event');

  dayCell.addEventListener('click', () => {
    selectedDate = thisDate;
    const eventDateInput = document.getElementById('event-date');
    eventDateInput.value = dateKey;
    renderCalendar(currentDate);
    renderEvents();
  });

  return dayCell;
}

function renderEvents() {
  const eventsDateLabel = document.getElementById('events-date');
  const eventsList = document.getElementById('events-list');

  const key = formatDateKey(selectedDate);
  eventsDateLabel.textContent = selectedDate.toLocaleDateString('en-CA', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const dateEvents = events[key] || [];
  const sortedEvents = dateEvents.sort((a, b) => {
    const timeA = new Date(`1970-01-01T${a.time}:00`);
    const timeB = new Date(`1970-01-01T${b.time}:00`);
    return timeA - timeB;
  });

  eventsList.innerHTML = sortedEvents.length === 0
    ? '<li>No sessions scheduled</li>'
    : sortedEvents.map((event, index) => `
      <li>
        <select data-index="${index}" class="status-dropdown">
          <option value="Not started" ${event.status === 'Not started' ? 'selected' : ''}>Not started</option>
          <option value="In progress" ${event.status === 'In progress' ? 'selected' : ''}>In progress</option>
          <option value="Completed" ${event.status === 'Completed' ? 'selected' : ''}>Completed</option>
        </select>
        <span class="event-label ${event.status === 'Completed' ? 'done' : ''}">
          ${event.time} - ${event.title}
        </span>
      </li>
    `).join('');

  document.querySelectorAll('.status-dropdown').forEach(dropdown => {
    dropdown.addEventListener('change', toggleEventStatus);
  });
}

function toggleEventStatus(event) {
  const key = formatDateKey(selectedDate);
  const index = event.target.dataset.index;
  const newStatus = event.target.value;
  events[key][index].status = newStatus;

  if (newStatus === 'Completed') {
    events[key].splice(index, 1);
    if (events[key].length === 0) {
      delete events[key];
    }
  }

  saveEvents();
  renderEvents();
}

function addEvent() {
  const eventDateInput = document.getElementById('event-date');
  const eventTimeInput = document.getElementById('event-time');
  const eventTitleInput = document.getElementById('event-title');

  const date = eventDateInput.value;
  const time = eventTimeInput.value;
  const title = eventTitleInput.value.trim();

  if (date && time && title) {
    const formattedDate = new Date(date).toLocaleDateString('en-CA');
    if (!events[formattedDate]) events[formattedDate] = [];
    events[formattedDate].push({ time, title, status: 'Not started' }); // Default status
    saveEvents();
    renderEvents();
    renderCalendar(currentDate);
    eventTitleInput.value = '';
    eventTimeInput.value = '';
  }
}

function saveEvents() {
  localStorage.setItem('events', JSON.stringify(events));
}

export function getTodaysEvents() {
  const todayKey = new Date().toLocaleDateString('en-CA');
  const nonSortedEvents = events[todayKey] || [];
  const sortedEvents = nonSortedEvents.sort((a, b) => {
    const timeA = new Date(`1970-01-01T${a.time}:00`);
    const timeB = new Date(`1970-01-01T${b.time}:00`);
    return timeA - timeB;
  });
  return sortedEvents;
}