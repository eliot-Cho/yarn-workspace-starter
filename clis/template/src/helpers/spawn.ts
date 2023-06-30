import { spawn } from "cross-spawn";

export const cli = (cmd: string) => {
  return new Promise(function (resolve, reject) {
    let process = spawn("cmd", ["/c", "git", "branch", "-r"], { shell: true });
    try {
      process.stdin.write(cmd);

      process.stdin.end();

      process.on("close", function (code) {
        resolve(code);
      });
    } catch (err) {
      reject(err);
    }
  });
};
