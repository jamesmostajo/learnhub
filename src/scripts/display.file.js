import { createTab, switchToTab, tabState, markTabAsActive } from './routes.js';

const fs = require('fs');
const path = require('path');

const allowedExtensions = ['.txt', '.md', '.js', '.py', '.java', '.json', '.html', '.css', '.gd', '.c', '.cpp'];


export function handleFileClick(e, fullPath) {
  e.stopPropagation();

  const ext = path.extname(fullPath).toLowerCase();
  const fileContentEl = document.getElementById('file-content');

  if (!allowedExtensions.includes(ext)) {
    fileContentEl.textContent = 'Error: Unsupported file type.';
    document.getElementById('save-button')?.setAttribute('hidden', 'hidden');
    return;
  }

  fs.readFile(fullPath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      fileContentEl.textContent = 'Error reading file.';
      return;
    }

    createTab(fullPath, data);
    switchToTab(fullPath);
    const saveButton = document.getElementById('save-button');
    saveButton.removeAttribute('hidden');
  });
}

export function renderFile(fullPath) {
  const windowEl = document.getElementById('file-content');
  const saveButton = document.getElementById('save-button');
  if (!tabState[fullPath] || !windowEl) return;

  const { content } = tabState[fullPath];

  windowEl.innerHTML = '';
  windowEl.dataset.path = fullPath;

  const textarea = document.createElement('textarea');
  textarea.id = 'text-edit-area';
  textarea.setAttribute('spellcheck', 'false');
  textarea.value = content;

  windowEl.appendChild(textarea);

  if (saveButton) {
    saveButton.removeAttribute('hidden');
  }
}

export function saveData() {
  const fullPath = (document.getElementById('file-content')).dataset.path;
  const newData = (document.getElementById('text-edit-area')).value;

  fs.writeFile(fullPath, newData, 'utf8', (err) => {
    if (err) {
      console.error('Error saving file:', err);
      alert('Error saving file.');
    } else {
      alert('File saved successfully.');
    }
  });
}