const containerDiv = document.querySelector(".container")

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const preloadPath = path.join(__dirname, "../preload.js");

import { openDirectory } from './open.folder';

export function splitScreen(splitButton) {
    if (splitButton) {
        splitButton.addEventListener('click', () => {
            const secondPage = document.createElement('webview');
            secondPage.src = "file://C:/Users/Ram/Documents/Reqs/ComSci/csci42/Final Project/learnhub/src/pagetwo.html";
            secondPage.style.display = "inline-flex";
            secondPage.style.width = "35%";
            secondPage.style.height = "100%";
            secondPage.setAttribute("webpreferences", `contextIsolation=true, preload=${preloadPath}`);

            secondPage.addEventListener('did-finish-load', () => {
                console.log("Second page loaded!");
                secondPage.openDevTools();
                // Inject JavaScript to access elements inside `pagetwo.html`
                secondPage.executeJavaScript(`
                    console.log("Executing JavaScript in second page...");
                    const button = document.getElementById("open-folder");
                    if (button) {
                        button.addEventListener("click", () => {
                            console.log("Open Folder button clicked from second page!");
                            window.electron.openFolder(); // Make sure preload.js exposes this
                        });
                        console.log("Event listener attached to Open Folder button.");
                    } else {
                        console.log("Button not found in second page.");
                    }
                `);
            });

            containerDiv.appendChild(secondPage);
        });
    } else {
        console.error("Split-screen button not found");
    }
};

