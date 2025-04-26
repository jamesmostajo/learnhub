import './styles/base.css';
import './styles/layout.css';
import './styles/sidebar.css';
import './styles/main-pane.css';

console.log('👋 This message is being logged by "renderer.js", included via webpack');

// File handling
import { openDirectory } from './scripts/open.folder';
import { saveData } from './scripts/display.file';

// Time Blocking
import { initTimeBlocking } from './scripts/time.blocking';

window.addEventListener('DOMContentLoaded', () => {
  const selectFolderButton = document.getElementById('open-folder');
  const fileList = document.querySelector('.file-list');
  const saveButton = document.getElementById('save-button');
  const timerContainer = document.getElementById('timer-container');

  
  if (timerContainer) {
    timerContainer.style.display = 'none';
  }

  selectFolderButton.addEventListener('click', () => {
    openDirectory(fileList);

    
    if (timerContainer) {
      timerContainer.style.display = 'none';
    }
  });

  saveButton.addEventListener('click', saveData);

  // Initialize Time Blocking feature
  initTimeBlocking();
});