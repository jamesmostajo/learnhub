import { createTab, switchToTab, tabState } from './routes.js';
import { initializeFlashcardControls } from './flashcard.js';

export function displayFlashcards() {
  const flashcardPath = 'flashcards://Flash Cards';

  const flashcardHTML = `
  <div id="flashcard-feature">
    <div id="flashcard-container">
      <div id="flashcard">
        <div id="flashcard-front" class="card-face">Question</div>
        <div id="flashcard-back" class="card-face" style="display:none;">Answer</div>
      </div>

      <div class="flashcard-nav">
        <div id="flashcard-progress">1 of X</div>
        <div id="flashcard-controls">
          <button id="prev-card">◀</button>
          <button id="flip-card">Flip</button>
          <button id="next-card">▶</button>
        </div>
      </div>

      <div class="to-center other-controls">
        <input type="file" id="json-loader" accept=".json" hidden>
        <button id="load-json">Load Flashcards</button>
        <button id="download-fc-json">Download Flashcards</button>
      </div>
    </div>

    <div id="create-flashcard-container">
      <div id="create-flashcard">
        <textarea id="create-front" class="card-face" placeholder="Enter question here..."></textarea>
        <textarea id="create-back" class="card-face" placeholder="Enter answer here..." style="display:none;"></textarea>
      </div>

      <div id="create-controls" class="to-center">
        <button id="create-flip">Flip</button>
        <button id="create-save">Save Flashcard</button>
      </div>

      <div id="create-status"></div>
    </div>

    <div class="to-center">
      <button id="toggle-view">Toggle Flashcard Maker/View</button>
    </div>
  </div>
  `;

  if (!tabState[flashcardPath]) {
    createTab(flashcardPath, flashcardHTML);
  }

  switchToTab(flashcardPath);

  const saveButton = document.getElementById('save-button');
  if (saveButton) {
    saveButton.setAttribute('hidden', 'hidden');
  }
}

export function renderFlashcardsTab(fullPath) {
  const windowEl = document.getElementById('file-content');
  if (!windowEl) return;

  const content = tabState[fullPath]?.content || '';

  windowEl.innerHTML = content;

  initializeFlashcardControls();
}