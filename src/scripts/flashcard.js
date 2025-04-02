const flashcards = require('../data/flashcards.json'); // Adjust path as needed

let currentIndex = 0;
let showingFront = true;

const container = document.getElementById('flashcard-container');
const front = document.getElementById('flashcard-front');
const back = document.getElementById('flashcard-back');
const progress = document.getElementById('flashcard-progress');

document.getElementById('flip-card').addEventListener('click', () => {
  showingFront = !showingFront;
  updateCardView();
});

document.getElementById('next-card').addEventListener('click', () => {
  if (currentIndex < flashcards.flashcards.length - 1) {
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
  const card = flashcards.flashcards[currentIndex];
  front.textContent = card.question;
  back.textContent = card.answer;

  front.style.display = showingFront ? 'block' : 'none';
  back.style.display = showingFront ? 'none' : 'block';

  progress.textContent = `Card ${currentIndex + 1} of ${flashcards.flashcards.length}`;
}

// Initialize on load
window.addEventListener('DOMContentLoaded', () => {
  if (flashcards.flashcards.length > 0) {
    updateCardView();
    container.style.display = 'block';
  } else {
    container.innerHTML = '<p>No flashcards found.</p>';
  }
});
