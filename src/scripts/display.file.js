import { createTab, switchToTab, tabState, closeTab} from './routes.js';
import { loadFolderContents } from './open.file';

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
  const fullPath = document.getElementById('file-content').dataset.path;
  const newData = document.getElementById('text-edit-area').value;

  const { dialog } = require('@electron/remote');
  const fs = require('fs');
  const path = require('path');

  if (!fullPath || fullPath.startsWith('unsaved-')) {
    // If the file is unsaved, prompt the user to save it
    dialog.showSaveDialog({
      title: 'Save File',
      defaultPath: 'new-file.txt',
    }).then((result) => {
      if (!result.canceled && result.filePath) {
        fs.writeFile(result.filePath, newData, 'utf8', (err) => {
          if (err) {
            console.error('Error saving file:', err);
            alert('Error saving file.');
          } else {
            // Refresh the sidebar
            const fileList = document.querySelector('.file-list');
            loadFolderContents(path.dirname(result.filePath), fileList);

            // Close the old tab and create a new one
            const oldPath = fullPath;
            const newPath = result.filePath;

            const tabElement = document.querySelector(`#file-tabs .tab[data-path="${oldPath}"]`);
            if (tabElement) {
              closeTab(oldPath, tabElement); // Close the old tab
            }

            createTab(newPath, newData); // Create a new tab with the correct path
            switchToTab(newPath); // Switch to the new tab

            alert('File saved successfully.');
          }
        });
      }
    }).catch((err) => {
      console.error('Error showing save dialog:', err);
    });
  } else {
    // If the file already has a path, save it directly
    fs.writeFile(fullPath, newData, 'utf8', (err) => {
      if (err) {
        console.error('Error saving file:', err);
        alert('Error saving file.');
      } else {
        tabState[fullPath].content = newData; // Ensure tabState is updated
        console.log('Updated tabState:', tabState); // Debugging log
        alert('File saved successfully.');
      }
    });
  }
}