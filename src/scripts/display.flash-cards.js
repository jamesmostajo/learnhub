import { createTab, switchToTab, tabState } from './routes.js';
import { initializeFlashcardControls } from './flashcard.js';

export function displayFlashcards() {
  const flashcardPath = 'flashcards://Flash Cards';

  const flashcardHTML = `
    <div id="flashcard-container" style="display: flex; flex-direction: column; align-items: center;">
      <div id="flashcard" style="border: 1px solid #ccc; padding: 20px; margin: 10px;">
        <div id="flashcard-front" class="card-face">Question</div>
        <div id="flashcard-back" class="card-face" style="display:none;">Answer</div>
      </div>

      <div id="flashcard-controls" style="margin-top: 10px;">
        <button id="prev-card">Previous</button>
        <button id="flip-card">Flip</button>
        <button id="next-card">Next</button>
      </div>

      <div id="flashcard-progress" style="margin-top: 10px;">Card 1 of X</div>
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

  initializeFlashcardControls(); // re-apply listeners after reloading all the shits
}