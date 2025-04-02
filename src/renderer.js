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

import './styles/base.css';
import './styles/layout.css';
import './styles/sidebar.css';
import './styles/main-pane.css';
import './scripts/flashcard.js';


console.log('👋 This message is being logged by "renderer.js", included via webpack');

import { openDirectory } from './scripts/open.folder';
import { saveData } from './scripts/display.file';

const selectFolderButton = document.getElementById('open-folder');
const fileList = document.querySelector('.file-list');

selectFolderButton.addEventListener('click', () => openDirectory(fileList));

const saveButton = document.getElementById('save-button');
saveButton.addEventListener('click', saveData);