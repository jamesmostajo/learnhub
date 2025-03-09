import { loadFolderContents } from './display.file';

const { dialog } = require('@electron/remote');

export function openDirectory(fileList) {
  dialog.showOpenDialog({
    properties: ['openDirectory']
  }).then(result => {
    if (!result.canceled && result.filePaths.length > 0) {
      const folderPath = result.filePaths[0];
      console.log('Selected folder:', folderPath);
      fileList.innerHTML = '';
      loadFolderContents(folderPath, fileList);
    }
  }).catch(err => {
    console.error(err);
  });
}
