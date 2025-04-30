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

import './styles/tabs.css';
import './styles/timer.css';
import './styles/flashcards.css';


import './scripts/flashcard.js';
import './scripts/quiz.js';
import './styles/calendar.css';


console.log('👋 This message is being logged by "renderer.js", included via webpack');

import { displayFlashcards } from './scripts/display.flash-cards';
import { openDirectory } from './scripts/open.folder';
import { saveData } from './scripts/display.file';
import { displayTimer } from './scripts/display.timer';
import { displayQuiz } from './scripts/display.quiz.js';
import { displayAmbient } from './scripts/display.ambient.js';
import { displayCalendar } from './scripts/display.calendar';

const selectFolderButton = document.getElementById('open-folder');
const fileList = document.querySelector('.file-list');

selectFolderButton.addEventListener('click', () => openDirectory(fileList));

const saveButton = document.getElementById('save-button');
saveButton.addEventListener('click', saveData);

const showFlashcardsBtn = document.getElementById('flash-cards-btn');
showFlashcardsBtn.addEventListener('click', displayFlashcards);

const showQuizBtn = document.getElementById('quiz-btn');
showQuizBtn.addEventListener('click', displayQuiz);

const timerBtn = document.getElementById('timer-btn');
timerBtn.addEventListener('click', displayTimer);

const showAmbientBtn = document.getElementById('toggle-ambient');
showAmbientBtn.addEventListener('click', displayAmbient);

const showCalendarBtn = document.getElementById('calendar-btn');
showCalendarBtn.addEventListener('click', displayCalendar);
