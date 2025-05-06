import { createTab, switchToTab, tabState } from './routes.js';
import { initializeQuizControls } from './quiz.js';

export function displayQuiz() {
  const QuizPath = 'quizzes://Quiz';

  const QuizHTML = `
    <div id="quiz-container">
        <h2 id="quiz-question">Question will appear here</h2>
        <div id="quiz-options"></div>
        <div id="quiz-navigation" style="margin-top: 20px; text-align: center;">
          <button id="quiz-prev">◀</button>
          <button id="quiz-next">▶</button>
        </div>
        <div id="quiz-progress" style="margin-top: 10px;"></div>
        <input type="file" id="quiz-json-loader" accept=".json" hidden />
        <button id="load-quiz-json">Load Quiz</button>
    </div>
  `;

  if (!tabState[QuizPath]) {
    createTab(QuizPath, QuizHTML);
  }

  switchToTab(QuizPath);

  const saveButton = document.getElementById('save-button');
  if (saveButton) {
    saveButton.setAttribute('hidden', 'hidden');
  }
}

export function renderQuizTab(fullPath) {
  const windowEl = document.getElementById('file-content');
  if (!windowEl) return;

  const content = tabState[fullPath]?.content || '';

  windowEl.innerHTML = content;

  initializeQuizControls();
}
