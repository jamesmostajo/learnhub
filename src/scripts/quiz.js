
const quizData = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    answer: "Paris"
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Venus", "Mars", "Jupiter"],
    answer: "Mars"
  },
  {
    question: "What is 5 + 3?",
    options: ["5", "8", "10", "15"],
    answer: "8"
  }
];

let currentQuestion = 0;

function loadQuiz() {
  const q = quizData[currentQuestion];
  document.getElementById("quiz-question").textContent = q.question;
  const options = document.getElementById("quiz-options");
  options.innerHTML = "";
  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.onclick = () => alert(option === q.answer ? "Correct!" : "Wrong!");
    options.appendChild(btn);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("show-quiz").addEventListener("click", () => {
    document.getElementById("quiz-container").style.display = "block";
    loadQuiz();
  });
});
