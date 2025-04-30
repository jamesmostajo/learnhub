import { createTab, switchToTab, tabState } from './routes.js';
import { initAmbientSound } from './ambient.js';

export function displayAmbient() {
  const AmbientPath = 'ambient://Ambient';

  const AmbientHTML = `
    <div class="to-center">
    <div id="ambient-container">
        <h2>Ambient Sound</h2>
        <label for="sound-select">Choose a sound:</label>
        <div class="custom-select">
        <select id="sound-select">
          <option value="none">None</option>
          <option value="rain">Rain</option>
          <option value="cafe">Café</option>
          <option value="nature">Nature</option>
        </select>
        </div>
        <br><br>
        <button id="play-sound">Play</button>
        <button id="stop-sound">Stop</button>
    </div>
    </div>
  `;

  if (!tabState[AmbientPath]) {
    createTab(AmbientPath, AmbientHTML);
  }

  switchToTab(AmbientPath);

  const saveButton = document.getElementById('save-button');
  if (saveButton) {
    saveButton.setAttribute('hidden', 'hidden');
  }
}

export function renderAmbientTab(fullPath) {
  const windowEl = document.getElementById('file-content');
  if (!windowEl) return;

  const content = tabState[fullPath]?.content || '';

  windowEl.innerHTML = content;

  initAmbientSound(); // reapply listeners after loading the shits
}
