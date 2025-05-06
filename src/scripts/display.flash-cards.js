import { createTab, switchToTab, tabState } from './routes.js';
import { initializeFlashcardControls } from './flashcard.js';

export function displayFlashcards() {
  const flashcardPath = 'flashcards://Flash Cards';

  const flashcardHTML = `
    <div id="flashcard-container">
      <div id="flashcard">
        <div id="flashcard-front" class="card-face">Question</div>
        <div id="flashcard-back" class="card-face" style="display:none;">Answer</div>
      </div>

      <div id="flashcard-controls">
        <button id="prev-card">◀</button>
        <button id="flip-card">Flip</button>
        <button id="next-card">▶</button>
      </div>

      <div id="flashcard-progress">Card 1 of X</div>
      <input type="file" id="json-loader" accept=".json" hidden>
      <button id="load-json">Load Flashcards</button>
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