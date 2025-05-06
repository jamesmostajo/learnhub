import { displayFlashcards } from "./display.flash-cards";

let flashcards = [
  { question: "What is the powerhouse of the cell?", answer: "Mitochondria" }
];

let currentIndex = 0;
let showingFront = true;
let isFlashcardView = true;

export function initializeFlashcardControls() {
  console.log("initializeFlashcardControls() loaded");

  const toggleButton = document.getElementById('toggle-view');
  const flashcardContainer = document.getElementById('flashcard-container');
  const createFlashcardContainer = document.getElementById('create-flashcard-container');
  const front = document.getElementById('flashcard-front');
  const back = document.getElementById('flashcard-back');
  const progress = document.getElementById('flashcard-progress');

  if (!flashcardContainer || !front || !back || !progress) {
    console.error("Flashcards not found");
    return;
  }

  toggleButton.addEventListener('click', () => {
    if (isFlashcardView) {
      flashcardContainer.style.display = 'none';
      createFlashcardContainer.style.display = 'block';
    } else {
      displayFlashcards();
    }

    isFlashcardView = !isFlashcardView;
  });

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
    reader.onload = function (event) {
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

  const flipBtn = document.getElementById('create-flip');
  const saveBtn = document.getElementById('create-save');
  const statusEl = document.getElementById('create-status');
  const frontInput = document.getElementById('create-front');
  const backInput = document.getElementById('create-back');
  let editingFront = true;

  if (!toggleButton || !flashcardContainer || !createFlashcardContainer) {
    console.error("Required elements are missing");
    return;
  }

  flipBtn.addEventListener('click', () => {
    editingFront = !editingFront;
    frontInput.style.display = editingFront ? 'block' : 'none';
    backInput.style.display = editingFront ? 'none' : 'block';
  });

  saveBtn.addEventListener('click', () => {
    const question = frontInput.value.trim();
    const answer = backInput.value.trim();

    if (!question || !answer) {
      alert('Both question and answer are required.');
      return;
    }

    flashcards.push({ question, answer });

    frontInput.value = '';
    backInput.value = '';
    editingFront = true;
    frontInput.style.display = 'block';
    backInput.style.display = 'none';

    statusEl.textContent = `Saved! Total flashcards: ${flashcards.length}`;
  });

  document.getElementById("download-fc-json").addEventListener("click", () => {
    const blob = new Blob([JSON.stringify(flashcards, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "my-flashcards.json";
    a.click();
    URL.revokeObjectURL(url);
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