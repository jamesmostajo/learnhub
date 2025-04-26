import { loadFolderContents } from "./open.file";

export function createDirectorySidebarContainer(li, file, fullPath) {
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

    return clickableContainer;
}