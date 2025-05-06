let quizData = [
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

  document.getElementById("load-quiz-json").addEventListener("click", () => {
    document.getElementById("quiz-json-loader").click();
  });

  document.getElementById("quiz-json-loader").addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(event) {
      try {
        const json = JSON.parse(event.target.result);

        const isValid = Array.isArray(json) && json.every(q =>
          typeof q.question === 'string' &&
          Array.isArray(q.options) &&
          typeof q.correct === 'string'
        );

        if (!isValid) {
          alert("Invalid quiz format. Each question needs 'question', 'options' (array), and 'correct' fields.");
          return;
        }

        setQuizData(json);
      } catch (err) {
        console.error("Error parsing quiz JSON:", err);
        alert("Failed to parse quiz JSON file.");
      }
    };

    reader.readAsText(file);
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

export function setQuizData(newQuiz) {
  quizData = newQuiz;
  currentQuizIndex = 0;
  renderQuiz();
}
