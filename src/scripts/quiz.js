const quizData = [
  {
    question: "What is the capital of France?",
    type: "multiple_choice",
    options: ["Paris", "London", "Berlin", "Madrid"],
    correct: "Paris"
  },
  {
    question: "Which planet is known as the Red Planet?",
    type: "multiple_choice",
    options: ["Earth", "Mars", "Venus", "Jupiter"],
    correct: "Mars"
  },
  {
    question: "What is the largest ocean on Earth?",
    type: "multiple_choice",
    options: ["Atlantic", "Indian", "Pacific", "Arctic"],
    correct: "Pacific"
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    type: "multiple_choice",
    options: ["William Wordsworth", "William Shakespeare", "Jane Austen", "Mark Twain"],
    correct: "William Shakespeare"
  },
  {
    question: "Which language is primarily spoken in Brazil?",
    type: "multiple_choice",
    options: ["Spanish", "Portuguese", "French", "English"],
    correct: "Portuguese"
  }
];

let currentQuizIndex = 0;

// Exported function instead of window event!
export function initializeQuizControls() {
  console.log("initializeQuizControls() loaded");

  const quizContainer = document.getElementById("quiz-container");
  if (!quizContainer) {
    console.error("Quizzes not found.");
    return;
  }

  document.getElementById("quiz-next").addEventListener("click", () => {
    if (currentQuizIndex < quizData.length - 1) {
      currentQuizIndex++;
      renderQuiz();
    }
  });

  document.getElementById("quiz-prev").addEventListener("click", () => {
    if (currentQuizIndex > 0) {
      currentQuizIndex--;
      renderQuiz();
    }
  });

  renderQuiz();
}

function renderQuiz() {
  const quiz = quizData[currentQuizIndex];
  const questionEl = document.getElementById("quiz-question");
  const optionsEl = document.getElementById("quiz-options");

  if (!questionEl || !optionsEl) {
    console.error("⚠️ Quiz elements missing in DOM.");
    return;
  }

  questionEl.textContent = quiz.question;
  optionsEl.innerHTML = "";

  quiz.options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.onclick = () => alert(option === quiz.correct ? "Correct!" : "Wrong!");
    optionsEl.appendChild(btn);
  });

  document.getElementById("quiz-progress").textContent =
    `${currentQuizIndex + 1} of ${quizData.length}`;
}
