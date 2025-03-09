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

        // If it's a directory, add an indicator span before the file name
        if (stats.isDirectory()) {
          li.style.cursor = 'pointer';

          const indicator = document.createElement('span');
          indicator.classList.add('folder-indicator');
          indicator.textContent = '>'; // Collapsed state indicator
          li.appendChild(indicator);

          // Append the folder name after the indicator
          const textNode = document.createTextNode(' ' + file);
          li.appendChild(textNode);

          // Add click event for toggling expansion/collapse
          li.addEventListener('click', function (e) {
            // Prevent clicks from propagating to parent items
            e.stopPropagation();

            const nestedUl = this.querySelector('ul');
            if (nestedUl) {
              // Collapse folder: remove nested <ul> and update indicator
              this.removeChild(nestedUl);
              indicator.textContent = '>';
            } else {
              // Expand folder: create nested <ul> and update indicator
              const newUl = document.createElement('ul');
              this.appendChild(newUl);
              loadFolderContents(fullPath, newUl);
              indicator.textContent = 'v';
            }
          });

        } else {
          // For files, simply set the text content
          li.textContent = file;
        }

        parentElement.appendChild(li);
      });
    });
  });
}