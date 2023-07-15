import fs from 'fs';
import path from 'path';

const ignoreFile = ['package.json'];

export const copyFolderSync = (source: string, target: string) => {
  const files = fs.readdirSync(source);

  files.forEach((file) => {
    const sourcePath = path.join(source, file);
    const targetPath = path.join(target, file);

    if (fs.statSync(sourcePath).isDirectory()) {
      fs.mkdirSync(targetPath);

      copyFolderSync(sourcePath, targetPath);
    } else {
      const isNotIgnoredFile = !ignoreFile.includes(path.basename(sourcePath));

      if (isNotIgnoredFile) {
        fs.copyFileSync(sourcePath, targetPath);
      }
    }
  });
};
