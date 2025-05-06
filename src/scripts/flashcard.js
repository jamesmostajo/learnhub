let flashcards = [
  {question: "What is the powerhouse of the cell?", answer: "Mitochondria" }
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

  document.getElementById('load-json').addEventListener('click', () => {
    document.getElementById('json-loader').click();
  });
  
  document.getElementById('json-loader').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    const reader = new FileReader();
    reader.onload = function(event) {
      try {
        const json = JSON.parse(event.target.result);
  
        if (Array.isArray(json) && json.every(card => 'question' in card && 'answer' in card)) {
          setFlashcards(json);
        } else {
          alert("Invalid flashcard format. Each item should have 'question' and 'answer' fields.");
        }
      } catch (err) {
        console.error("Error parsing JSON:", err);
        alert("Failed to parse JSON file.");
      }
    };
    reader.readAsText(file);
  });
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

export function setFlashcards(newCards) {
  flashcards = newCards;
  currentIndex = 0;
  showingFront = true;
  updateCardView();
}
