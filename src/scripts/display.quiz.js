import { createTab, switchToTab, tabState } from './routes.js';
import { initializeQuizControls } from './quiz.js';

export function displayQuiz() {
  const QuizPath = 'quizzes://Quiz';

  const QuizHTML = `
    <div id="quiz-container" style="display: flex; flex-direction: column; align-items: center;">
      <div id="quiz">
        <h2 id="quiz-question">Question will appear here</h2>
        <div id="quiz-options" style="margin-bottom: 10px;"></div>
        <div id="quiz-navigation" style="margin-top: 20px; text-align: center;">
          <button id="quiz-prev" style="background-color:#6c757d;color:white;padding:10px 20px;border:none;border-radius:8px;margin:5px;cursor:pointer;">Previous</button>
          <button id="quiz-next" style="background-color:#007bff;color:white;padding:10px 20px;border:none;border-radius:8px;margin:5px;cursor:pointer;">Next</button>
        </div>
        <div id="quiz-progress" style="margin-top: 10px;"></div>
      </div>
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

  initializeQuizControls(); // reapply listeners after loading the shits
}
