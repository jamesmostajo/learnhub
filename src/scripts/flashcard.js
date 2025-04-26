const flashcards = [
  { id: "fc1", question: "What is the capital of France?", answer: "Paris" },
  { id: "fc2", question: "What is the largest planet in the solar system?", answer: "Jupiter" },
  { id: "fc3", question: "What is the formula for water?", answer: "H₂O" }
];

let currentIndex = 0;
let showingFront = true;

window.addEventListener('DOMContentLoaded', () => {
  console.log("✅ flashcard.js is running");

  const flashcardContainer = document.getElementById('flashcard-container');
  const front = document.getElementById('flashcard-front');
  const back = document.getElementById('flashcard-back');
  const progress = document.getElementById('flashcard-progress');
  const fileView = document.querySelector('.file-view');
  const showFlashcardsBtn = document.getElementById('show-flashcards');

  console.log("🔎 Button found?", !!showFlashcardsBtn);

  if (showFlashcardsBtn) {
    showFlashcardsBtn.addEventListener('click', () => {
      console.log("🎯 Flashcards button clicked!");

      fileView.style.display = 'none';
      flashcardContainer.style.display = 'block';
      updateCardView();
    });
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

  function updateCardView() {
    const card = flashcards[currentIndex];
    front.textContent = card.question;
    back.textContent = card.answer;

    front.style.display = showingFront ? 'block' : 'none';
    back.style.display = showingFront ? 'none' : 'block';

    progress.textContent = `Card ${currentIndex + 1} of ${flashcards.length}`;
  }
});