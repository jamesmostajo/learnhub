import { text } from 'stream/consumers';

const fs = require('fs');
const path = require('path');

// List of allowed text-based file extensions
const allowedExtensions = ['.txt', '.md', '.js', '.py', '.java', '.json', '.html', '.css', '.gd'];

// This function handles a file click event. It expects the event object and the full file path.
export function handleFileClick(e, fullPath) {
  e.stopPropagation(); // Prevent the event from bubbling up

  const ext = path.extname(fullPath).toLowerCase();
  const fileContentEl = document.getElementById('file-content');
  const fileNameEl = document.getElementById('file-name');

  if (!allowedExtensions.includes(ext)) {
    fileContentEl.textContent = 'Error: Unsupported file type.';
    fileNameEl.textContent = path.basename(fullPath);
    const saveButton = document.getElementById('save-button');
    saveButton.setAttribute('hidden', 'hidden');
    return;
  }

  fs.readFile(fullPath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      fileContentEl.textContent = 'Error reading file.';
      return;
    }
    displayEditableFileContent(fullPath, data);
  });
}

// Function to display an editable text file
function displayEditableFileContent(fullPath, data) {
  const fileNameEl = document.getElementById('file-name');
  fileNameEl.textContent = path.basename(fullPath);


  // Get the file content container
  const fileContentContainer = document.getElementById('file-content');
  fileContentContainer.dataset.path = fullPath;

  // Clear previous content
  fileContentContainer.innerHTML = '';

  // Create a textarea for editing
  const textarea = document.createElement('textarea');
  textarea.id = 'text-edit-area';
  textarea.setAttribute('spellcheck', 'false');
  textarea.value = data;
  fileContentContainer.appendChild(textarea);

  // show save button
  const saveButton = document.getElementById('save-button');
  saveButton.removeAttribute('hidden');
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