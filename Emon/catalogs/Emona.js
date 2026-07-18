console.clear();
const { spawn } = require("child_process");
const express = require("express");
const app = express();
const chalk = require('chalk');
const logger = require("./Emonc.js");
const path = require('path');
const _cfg = (() => { try { return require("../configs/Emon.json"); } catch(e) { return {}; } })();
const PORT = process.env.PORT || _cfg.PORT || 8080;
app.use(express.static(path.join(__dirname, 'website')));
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/website/Emon.html'));
});
const server = app.listen(PORT, () => logger.loader(`app deployed on port ${chalk.blueBright(PORT)}`));
server.on('error', (err) => { if (err.code !== 'EADDRINUSE') throw err; });
console.clear();
function startBot(message) {
    (message) ? logger(message, "starting") : "";
  console.log(chalk.blue('DEPLOYING MAIN SYSTEM'));
  logger.loader(`deploying app on port ${chalk.blueBright(PORT)}`);
  const child = spawn("node", ["--trace-warnings", "--async-stack-traces", "Emonb.js"], {
        cwd: __dirname,
        stdio: "inherit",
        shell: true
    });
  child.on("close", (codeExit) => {
        if (codeExit != 0 || global.countRestart && global.countRestart < 5) {
            startBot();
            global.countRestart += 1;
            return;
        } else return;
    });

  child.on("error", function(error) {
    logger("an error occurred : " + JSON.stringify(error), "error");
  });
};
startBot();