import path from "path";
import prompt from "prompts";

import { validateNpmName } from "./pkg-name-validate";

const kind = async () => {
  const template = await prompt({
    type: "select",
    name: "value",
    message: "무슨 템플릿을 복사하시겠어요?",
    choices: [
      { title: "next", value: "next" },
      { title: "express", value: "express" },
      { title: "empty", value: "empty" },
      { title: "react-sb", value: "react-sb" },
    ],
  });

  return { template: template.value };
};

const dir = async () => {
  const dir = await prompt({
    type: "select",
    name: "value",
    message: "무슨 경로에 만드실껀가요?",
    choices: [
      { title: "package", value: "packages" },
      { title: "service", value: "services" },
    ],
  });

  return { dir: dir.value };
};

const packageName = async () => {
  const packageName = await prompt({
    type: "text",
    name: "value",
    message: "패키지 이름은 무엇인가요?",
    validate: (name) => {
      const validation = validateNpmName(path.basename(path.resolve(name)));
      if (validation.valid) {
        return true;
      }

      return "Invalid project name: " + validation.problems![0];
    },
  });

  return { packageName: packageName.value.trim() };
};

type Prompts = Record<string, () => Promise<Record<string, string>>>;

export const prompts: Prompts = { kind, dir, packageName };
