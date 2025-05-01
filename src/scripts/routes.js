export const tabState = {};
let activeTabPath = null;

import { renderFile } from './display.file.js';
import { renderFlashcardsTab } from './display.flash-cards.js';  //function for displaying flashcards tab
import { renderQuizTab } from './display.quiz.js'; //function for displaying quiz tab
import { renderAmbientTab } from './display.ambient.js'; //function for displaying ambient tab
import { renderCalendarTab } from './display.calendar.js'; //function for displaying ambient tab


const path = require('path');
export function createTab(fullPath, initialContent) {
  console.log(initialContent);

  if (!tabState[fullPath]) {
    const fileTabSection = document.getElementById('file-tabs');

    const fileTab = document.createElement('div');
    fileTab.classList.add('tab');
    fileTab.dataset.path = fullPath;

    const nameSpan = document.createElement('span');
    nameSpan.textContent = path.basename(fullPath);
    nameSpan.classList.add('tab-name');

    const closeBtn = document.createElement('button');
    closeBtn.textContent = '✕';
    closeBtn.classList.add('close-btn');

    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeTab(fullPath, fileTab);
    });

    fileTab.addEventListener('click', () => {
      switchToTab(fullPath);
      markTabAsActive(fileTab);
    });

    fileTab.appendChild(nameSpan);
    fileTab.appendChild(closeBtn);
    fileTabSection.appendChild(fileTab);

    markTabAsActive(fileTab);

    tabState[fullPath] = {
      content: initialContent
    };
  }
}

export function switchToTab(fullPath) {
  saveActiveTabState();
  activeTabPath = fullPath;
  
  const fileTab = document.querySelector(`#file-tabs .tab[data-path="${fullPath}"]`);
  if (fileTab) {
    markTabAsActive(fileTab);
  }

  if (fullPath.startsWith('flashcards://')) { //added detection for type of tab to be rendered
    renderFlashcardsTab(fullPath);
  } else if (fullPath.startsWith('quizzes://')) { //added detection for type of tab to be rendered
    renderQuizTab(fullPath);
  } else if (fullPath.startsWith('ambient://')) { //added detection for type of tab to be rendered
    renderAmbientTab(fullPath);
  } else if (fullPath.startsWith('calendar://')) { //added detection for type of tab to be rendered
    renderCalendarTab(fullPath);
  } else {
    renderFile(fullPath);
  }
}

function saveActiveTabState() {
  if (!activeTabPath || !tabState[activeTabPath]) return;

  const textarea = document.getElementById('text-edit-area');
  if (textarea) {
    tabState[activeTabPath].content = textarea.value;
  }
}

function markTabAsActive(tabButton) {
  const allTabs = document.querySelectorAll('#file-tabs .tab');
  allTabs.forEach(tab => tab.classList.remove('active'));

  tabButton.classList.add('active');
}

export function closeTab(fullPath, tabButton) {
  delete tabState[fullPath];
  tabButton.remove();

  const remainingTabs = document.querySelectorAll('#file-tabs .tab');

  if (remainingTabs.length > 0) {
    const firstTab = remainingTabs[0];
    const firstPath = firstTab.dataset.path;
    switchToTab(firstPath);
    markTabAsActive(firstTab);
  } else {
    showDefaultDisplay();
  }
}

function showDefaultDisplay() {
  const windowEl = document.getElementById('window');
  windowEl.innerHTML = '<pre id="file-content">No file open.</pre>';
  document.getElementById('save-button')?.setAttribute('hidden', 'hidden');
}

export function createNewFile() {
  const fileContentEl = document.getElementById('file-content');
  const saveButton = document.getElementById('save-button');

  // Create a new tab for the unsaved file
  const tempPath = `unsaved-${Date.now()}`;
  createTab(tempPath, '');
  switchToTab(tempPath);

  // Allow editing in the file content area
  fileContentEl.innerHTML = '';
  const textarea = document.createElement('textarea');
  textarea.id = 'text-edit-area';
  textarea.setAttribute('spellcheck', 'false');
  fileContentEl.appendChild(textarea);
}
