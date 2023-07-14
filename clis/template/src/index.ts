import path from "path";
import fs from "fs";

import { cli } from "./helpers/spawn";
import { prompts } from "./helpers/prompts";
import { mkPkgJson } from "./helpers/mk-pkg-json";
import { copyFolderSync } from "./helpers/copy-folder";

const command = async () => {
  const { template } = await prompts.kind();
  const { dir } = await prompts.dir();
  const { packageName } = await prompts.packageName();

  const source = path.resolve(`../../templates/${template}`);
  const target = path.resolve(`../../${dir}/${packageName}`);

  if (!fs.existsSync(`../../${dir}`)) {
    fs.mkdirSync(`../../${dir}`);
  }

  copyFolderSync(source, target);

  mkPkgJson({ source, packageName, target, dir });

  await cli("yarn");

  console.log(`\n✅ is Success copied ${template} to ${target}\n`);
};

const start = () => {
  try {
    command();
  } catch (e) {
    console.log(`\n❌ is Failed ==> ${e}\n`);
  }
};

start();
