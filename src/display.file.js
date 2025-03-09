const fs = require('fs');
const path = require('path');

export function loadFolderContents(directoryPath, parentElement) {
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

          // Create a full-width clickable container for the folder header
          const clickableContainer = document.createElement('div');
          clickableContainer.classList.add('clickable-container');
          clickableContainer.style.display = 'block';
          clickableContainer.style.width = '100%';
          clickableContainer.style.boxSizing = 'border-box';
          clickableContainer.style.cursor = 'pointer';

          // Create the indicator span
          const indicator = document.createElement('span');
          indicator.classList.add('folder-indicator');
          indicator.textContent = '>'; // initial collapsed state
          indicator.style.marginRight = '5px';

          // Create the folder name span
          const folderNameSpan = document.createElement('span');
          folderNameSpan.textContent = file;

          // Append both to the clickable container
          clickableContainer.appendChild(indicator);
          clickableContainer.appendChild(folderNameSpan);

          // Attach click event to the clickable container
          clickableContainer.addEventListener('click', function (e) {
            e.stopPropagation();
            const nestedUl = li.querySelector('ul');
            if (nestedUl) {
              li.removeChild(nestedUl);
              indicator.textContent = '>';
            } else {
              const newUl = document.createElement('ul');
              li.appendChild(newUl);
              loadFolderContents(fullPath, newUl);
              indicator.textContent = 'v';
            }
          });

          // Append the clickable container to the li
          li.appendChild(clickableContainer);
        }
        else {
          li.classList.add('file-item');
          li.style.cursor = 'pointer';
          li.textContent = file;
          li.addEventListener('click', function (e) {
            e.stopPropagation();
            fs.readFile(fullPath, 'utf8', (err, data) => {
              if (err) {
                console.error('Error reading file:', err);
                return;
              }
              document.getElementById('file-content').textContent = data;
              document.getElementById('file-name').textContent = path.basename(fullPath);
            });
          });
        }
        parentElement.appendChild(li);
      });
    });
  });
}
