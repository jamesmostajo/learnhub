const tabState = {};
let activeTabPath = null;

const path = require('path');

export function createTab(fullPath, initialContent) {
  if (!tabState[fullPath]) {

    const fileTabSection = document.getElementById('file-tabs');
    const fileTab = document.createElement('button');
    fileTab.textContent = path.basename(fullPath);
    fileTabSection.appendChild(fileTab);

    fileTab.addEventListener('click', () => {
      switchToTab(fullPath);
      markTabAsActive(fileTab);
    });


    tabState[fullPath] = {
      content: initialContent
    };
  }
}

export function switchToTab(fullPath) {
  saveActiveTabState();
  activeTabPath = fullPath;
  renderTab(fullPath);
}

export function updateTabContent(fullPath, newContent) {
  if (tabState[fullPath]) {
    tabState[fullPath].content = newContent;
  }
}

export function getTabContent(fullPath) {
  return tabState[fullPath]?.content || '';
}

function saveActiveTabState() {
  if (!activeTabPath) return;

  const textarea = document.getElementById('text-edit-area');
  if (textarea) {
    tabState[activeTabPath].content = textarea.value;
  }
}

function renderTab(fullPath) {
  const windowEl = document.getElementById('file-content');
  const saveButton = document.getElementById('save-button');
  if (!tabState[fullPath] || !windowEl) return;

  const { content } = tabState[fullPath];

  // Reset and render
  windowEl.innerHTML = '';
  windowEl.dataset.path = fullPath;

  const textarea = document.createElement('textarea');
  textarea.id = 'text-edit-area';
  textarea.setAttribute('spellcheck', 'false');
  textarea.value = content;

  windowEl.appendChild(textarea);

  // Show save button
  if (saveButton) {
    saveButton.removeAttribute('hidden');
  }
}

function markTabAsActive(tabButton) {
  // Remove 'active' class from all buttons
  document.querySelectorAll('#file-tabs button').forEach(btn => {
    btn.classList.remove('active');
  });

  // Add 'active' to the clicked one
  tabButton.classList.add('active');
}

