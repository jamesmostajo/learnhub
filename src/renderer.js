import './styles/base.css';
import './styles/layout.css';
import './styles/sidebar.css';
import './styles/main-pane.css';

console.log('👋 This message is being logged by "renderer.js"');

import { openDirectory } from './scripts/open.folder';
import { saveData } from './scripts/display.file';
import { initAmbientSound } from './scripts/ambient';

const selectFolderButton = document.getElementById('open-folder');
const fileList = document.querySelector('.file-list');

selectFolderButton.addEventListener('click', () => openDirectory(fileList));

const saveButton = document.getElementById('save-button');
saveButton.addEventListener('click', saveData);

initAmbientSound();