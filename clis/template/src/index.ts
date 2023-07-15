import fs from 'fs';
import path from 'path';

import { cli } from './helpers/spawn';
import { prompts } from './helpers/prompts';
import { mkPkgJson } from './helpers/mk-pkg-json';
import { copyFolderSync } from './helpers/copy-folder';
import { MSG } from './helpers/msg';

const start = async () => {
  try {
    const { template } = await prompts.kind();
    const { dir } = await prompts.dir();
    const { packageName } = await prompts.packageName();

    const source = path.resolve(`../../templates/${template}`);
    const target = path.resolve(`../../${dir}/${packageName}`);

    if (!fs.existsSync(`../../${dir}`)) {
      fs.mkdirSync(`../../${dir}`);
    }

    if (fs.existsSync(target)) {
      throw new Error('같은 이름의 폴더가 존재합니다.');
    }

    fs.mkdirSync(target);

    copyFolderSync(source, target);
    copyFolderSync(path.resolve('./common'), target);

    mkPkgJson({ source, packageName, target, dir });

    await cli(
      `yarn workspace ${`@${dir.slice(0, -1)}/${packageName}`} add prettier -D`,
    );

    MSG.CPY_SUCCESS({ template, target });
  } catch (e) {
    MSG.CPY_FAIL(e);
  }
};

start();
