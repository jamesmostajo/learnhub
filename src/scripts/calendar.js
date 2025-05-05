export function initializeCalendar() {
  const calendarDays = document.getElementById('calendar-days');
  const monthYear = document.getElementById('month-year');
  const prevBtn = document.getElementById('prev-month');
  const nextBtn = document.getElementById('next-month');
  const eventDateInput = document.getElementById('event-date');
  const eventTimeInput = document.getElementById('event-time');
  const eventTitleInput = document.getElementById('event-title');
  const eventsList = document.getElementById('events-list');
  const addEventBtn = document.getElementById('add-event');
  const eventsDateLabel = document.getElementById('events-date');
  const clockEl = document.getElementById('clock');

  let currentDate = new Date();
  let selectedDate = new Date();
  let events = JSON.parse(localStorage.getItem('events') || '{}');

  function updateClock() {
    if (clockEl) clockEl.textContent = new Date().toLocaleTimeString();
  }
  setInterval(updateClock, 1000);
  updateClock();

  function formatDateKey(date) {
    return date.toLocaleDateString('en-CA'); // Use toLocaleDateString for consistent formatting
  }

  function renderCalendar(date) {
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
      const d = day;
      const dayCell = document.createElement('div');
      const thisDate = new Date(Date.UTC(year, month, d));
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
        eventDateInput.value = dateKey;
        renderCalendar(currentDate);
        renderEvents();
      });

      calendarDays.appendChild(dayCell);
    }
  }

  function renderEvents() {
    const key = formatDateKey(selectedDate);
    eventsDateLabel.textContent = selectedDate.toLocaleDateString('en-CA', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const dateEvents = events[key] || [];
    eventsList.innerHTML = dateEvents.length === 0
        ? '<li>No sessions scheduled</li>'
        : dateEvents.map(event => `
      <li>
        <input type="checkbox" ${event.done ? 'checked' : ''}>
        <span class="event-label ${event.done ? 'done' : ''}">
          ${event.time} - ${event.title}
        </span>
      </li>
    `).join('');

    document.querySelectorAll('#events-list input').forEach((cb, index) => {
      cb.addEventListener('change', () => {
        events[key][index].done = cb.checked;
        saveEvents();
        renderEvents();
      });
    });
  }

  function saveEvents() {
    localStorage.setItem('events', JSON.stringify(events));
  }

  addEventBtn.addEventListener('click', () => {
    const date = eventDateInput.value;
    const time = eventTimeInput.value;
    const title = eventTitleInput.value.trim();

    if (date && time && title) {
      const formattedDate = new Date(date).toLocaleDateString('en-CA');
      if (!events[formattedDate]) events[formattedDate] = [];
      events[formattedDate].push({ time, title, done: false });
      saveEvents();
      renderEvents();
      renderCalendar(currentDate);
      eventTitleInput.value = '';
      eventTimeInput.value = '';
    }
  });

  prevBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar(currentDate);
  });

  nextBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar(currentDate);
  });

  eventDateInput.value = formatDateKey(new Date());
  renderCalendar(currentDate);
  renderEvents();
}

export function getTodaysEvents() {
  const events = JSON.parse(localStorage.getItem('events') || '{}');
  const todayKey = new Date().toLocaleDateString('en-CA');
  console.log(todayKey);
  return events[todayKey] || [];
}