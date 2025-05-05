const flashcards = [
  {question: "What is the capital of France?", answer: "Paris" },
  {question: "What is the largest planet in the solar system?", answer: "Jupiter" },
  {question: "What is the formula for water?", answer: "H₂O" }
];

let currentIndex = 0;
let showingFront = true;

export function initializeFlashcardControls() {
  console.log("initializeFlashcardControls() loaded");

  const flashcardContainer = document.getElementById('flashcard-container');
  const front = document.getElementById('flashcard-front');
  const back = document.getElementById('flashcard-back');
  const progress = document.getElementById('flashcard-progress');

  if (!flashcardContainer || !front || !back || !progress) {
    console.error("Flashcards not found");
    return;
  }

  document.getElementById('flip-card').addEventListener('click', () => {
    showingFront = !showingFront;
    updateCardView();
  });

  document.getElementById('next-card').addEventListener('click', () => {
    if (currentIndex < flashcards.length - 1) {
      currentIndex++;
      showingFront = true;
      updateCardView();
    }
  });

  document.getElementById('prev-card').addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      showingFront = true;
      updateCardView();
    }
  });

  updateCardView();
}

function updateCardView() {
  const front = document.getElementById('flashcard-front');
  const back = document.getElementById('flashcard-back');
  const progress = document.getElementById('flashcard-progress');

  if (!front || !back || !progress) return;

  const card = flashcards[currentIndex];
  front.textContent = card.question;
  back.textContent = card.answer;

  front.style.display = showingFront ? 'block' : 'none';
  back.style.display = showingFront ? 'none' : 'block';

  progress.textContent = `${currentIndex + 1} of ${flashcards.length}`;
}
