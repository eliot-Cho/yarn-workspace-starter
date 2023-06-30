import fs from 'fs';
import os from 'os';

import { copyObj } from './copyObj';

interface Params {
    source: string;
    packageName: string;
    target: string;
    dir: string;
}

export const mkPkgJson = async ({ source, packageName, target, dir }: Params) => {
    const sourcePackageJson = await import(`${source}/package.json`);
    const packageJson = copyObj(sourcePackageJson.default);
    packageJson.name = `@${dir.slice(0, -1)}/${packageName}`;

    fs.writeFile(`${target}/package.json`, JSON.stringify(packageJson, null, 2) + os.EOL, () => {});
};
