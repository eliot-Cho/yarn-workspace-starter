import { spawn } from 'child_process';

export const cli = (cmd: string): Promise<void> => {
  // return new Promise(function (resolve, reject) {
  //     console.log(cmd);
  //     let child = spawn('yarn', cmd, { stdio: 'inherit' });

  //     child.on('close', (code) => {
  //         if (code !== 0) {
  //             reject({ command: `yarn ${cmd.join(' ')}` });
  //             return;
  //         }
  //         console.log(1);
  //         resolve();
  //     });
  // });
  return new Promise(function (resolve, reject) {
    // 2. spawn을 이용하여 새 프로세스를 만듭니다.
    let process = spawn('bash');
    // 3. 실행할 명령을 작성합니다.

    const command = `${cmd} \n`;
    try {
      // 4. 부모 프로세서에서 자식프로세서로 명령을 보냅니다.
      process.stdin.write(command);

      // stdin을 이용할때는 end()로 반드시 입력을 끝내야합니다.
      process.stdin.end();
      // 5. 명령이 모두 실행됐다면 'close' 이벤트가 발생합니다.
      process.on('close', function (code: any) {
        resolve(code);
      });
    } catch (err) {
      reject(err);
    }
  });
};
