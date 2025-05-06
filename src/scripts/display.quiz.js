import { createTab, switchToTab, tabState } from './routes.js';
import { initializeQuizControls } from './quiz.js';

export function displayQuiz() {
  const QuizPath = 'quizzes://Quiz';

  const QuizHTML = `
    <div id="quiz-container">
      <div id="quiz">
        <h2 id="quiz-question">Question will appear here</h2>
        <div id="quiz-options"></div>
        <div id="quiz-progress"></div>
        <div id="quiz-navigation">
          <button id="quiz-prev">◀</button>
          <button id="quiz-next">▶</button>
        </div>
      </div>

      <div id="quiz-create" style="display: none;">
      <div id="quiz-create-question" class="to-center">
        <input id="create-question" placeholder="Enter question" style="display: block; margin-bottom: 10px;" />
      </div>
      <div class="create-quiz-options">
        <div class="create-quiz-opt">
          <input id="create-option1" placeholder="Option 1" />
          <input type="radio" name="correct-answer" value="1" /> Correct
        </div>
        <div class="create-quiz-opt">
          <input id="create-option2" placeholder="Option 2" />
          <input type="radio" name="correct-answer" value="2" /> Correct
        </div>
        <div class="create-quiz-opt">
          <input id="create-option3" placeholder="Option 3" />
          <input type="radio" name="correct-answer" value="3" /> Correct
        </div>
        <div class="create-quiz-opt">
          <input id="create-option4" placeholder="Option 4" />
          <input type="radio" name="correct-answer" value="4" /> Correct
        </div>
      </div>
      <div class="to-center">
        <button id="save-quiz-question">Save Question</button>
      </div>
      <div id="quiz-create-status"></div>
    </div>
      <input type="file" id="quiz-json-loader" accept=".json" hidden />
    <div class="buttons-quizzes">
      <button id="load-quiz-json">Load Quiz</button>
      <button id="download-quiz-json">Download Quiz</button>
      <button id="toggle-quiz-mode">Switch Mode</button>
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

  initializeQuizControls();
}
