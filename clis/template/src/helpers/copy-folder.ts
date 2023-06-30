import fs from 'fs';
import path from 'path';

const ignoreFile = ['package.json'];

export const copyFolderSync = (source: string, target: string) => {
    if (fs.existsSync(target)) {
        throw new Error('같은 이름의 폴더가 존재합니다.');
    }

    fs.mkdirSync(target);

    const files = fs.readdirSync(source);
    files.forEach((file) => {
        const sourcePath = path.join(source, file);
        const targetPath = path.join(target, file);

        if (fs.statSync(sourcePath).isDirectory()) {
            copyFolderSync(sourcePath, targetPath);
        } else {
            const isNotIgnoredFile = !ignoreFile.includes(path.basename(sourcePath));

            if (isNotIgnoredFile) {
                fs.copyFileSync(sourcePath, targetPath);
            }
        }
    });
};
