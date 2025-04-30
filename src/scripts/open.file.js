const fs = require('fs');
const path = require('path');

import { handleFileClick } from './display.file';
import { createDirectorySidebarContainer } from './style.directory';

export function loadFolderContents(directoryPath, parentElement) {
  parentElement.innerHTML = '';

  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return console.error('Unable to scan directory: ' + err);
    }

    files.forEach((file) => {
      const fullPath = path.join(directoryPath, file);
      fs.stat(fullPath, (err, stats) => {
        if (err) {
          return console.error('Error stating file:', err);
        }

        const li = document.createElement('li');

        if (stats.isDirectory()) {
          li.style.cursor = 'default'; // the li itself won't have the hover

          const clickableContainer = createDirectorySidebarContainer(li, file, fullPath);
          li.appendChild(clickableContainer);
        }
        else {
          li.classList.add('file-item');
          li.style.cursor = 'pointer';
          li.textContent = file;
          li.addEventListener('click', function (e) {
            handleFileClick(e, fullPath);
          });
        }
        parentElement.appendChild(li);
      });
    });
  });
}
