/**
 * This file will automatically be loaded by webpack and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/process-model
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

import './index.css';

const fs = require('fs');
const path = require('path');

console.log('👋 This message is being logged by "renderer.js", included via webpack');

const fileList = document.querySelector('.file-list');

function loadFolderContents(directoryPath, parentElement) {
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
          li.addEventListener('click', function(e) {
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
  
const { dialog } = require('@electron/remote');

const selectFolderButton = document.getElementById('open-folder');

selectFolderButton.addEventListener('click', () => {
  dialog.showOpenDialog({
    properties: ['openDirectory']
  }).then(result => {
    if (!result.canceled && result.filePaths.length > 0) {
      const folderPath = result.filePaths[0];
      console.log('Selected folder:', folderPath);
      fileList.innerHTML='';  
      loadFolderContents(folderPath, fileList);
    }
  }).catch(err => {
    console.error(err);
  });
});

