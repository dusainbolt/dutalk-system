require("dotenv").config();
const { NodeSSH } = require("node-ssh");
path = require("path");

const ssh = new NodeSSH();

const _ = {
    remotePath: process.env.REMOTE_PATH,
    host: process.env.HOST,
    username: process.env.USER_NAME,
    branchName: process.env.BRANCH_NAME,
    divideCommand: "------------------------------------",
};

const execCommand = async (cwd, command, stop = false) => {
    console.log(_.divideCommand);
    const result = await ssh.execCommand(command, { cwd });
    if (result.stderr) {
        console.error("====> ERROR ': ", result.stderr);
        stop && process.exit();
    }
    if (result.stdout) console.log(`{${command}} | `, result.stdout);
};

const putFile = async (filePath, remotePath) => {
    try {
        console.log(_.divideCommand);
        await ssh.putFile(filePath, remotePath);
        console.log(`✔ Successfully copied file ${filePath} to remote ${remotePath}.`);
    } catch (error) {
        console.error(`⚠️ An error happened:(.`, error.message, error.stack);
    }
};

ssh.connect({
    host: _.host,
    username: _.username,
    privateKeyPath: path.join(__dirname, "../config/dutalk_ec2.pem"),
}).then(async function () {
    console.log("====== CONNECT SSH SUCCESS ===");

    await execCommand(_.remotePath, "pwd");
    await execCommand(_.remotePath, "npm -v", true);

    // get latest code
    await execCommand(_.remotePath, `git checkout .`);
    await execCommand(_.remotePath, `git checkout main`);
    await execCommand(_.remotePath, `git branch -D ${_.branchName}`);
    await execCommand(_.remotePath, `git fetch`);
    await execCommand(_.remotePath, `git checkout ${_.branchName}`);

    // install package
    await execCommand(`${_.remotePath}/api`, "pwd");
    await execCommand(`${_.remotePath}/api`, "npm install --legacy-peer-deps", true);

    // // put env file config to server
    await putFile(`${__dirname}/.env.deploy`, `${_.remotePath}/api/.env`);

    // // restart service dutalk-api
    await execCommand(`${_.remotePath}/api`, "pm2 restart dutalk-api", true);

    process.exit();
});
