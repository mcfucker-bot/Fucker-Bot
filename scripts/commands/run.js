const util = require("util");

module.exports.config = {
  name: "run",
  version: "1.0.0",
  permission: 3,
  credits: "Emon",
  prefix: true,
  description: "Execute JavaScript code or shell commands",
  category: "owner",
  usages: "run [js code]  |  run $ [shell command]",
  cooldowns: 1
};

module.exports.run = async function({ api, event, args, Users, Threads, Currencies }) {
  const { threadID, messageID, senderID } = event;

  if (!args[0]) return api.sendMessage(
    `╔══════════════════╗\n   ⚡ RUN HELP   \n╚══════════════════╝\n\n📌 ব্যবহার :\n▸ run [JS code]\n▸ run $ [shell command]\n\n📝 উদাহরণ :\n▸ run 1+1\n▸ run $ ls -la`,
    threadID, messageID
  );

  const isShell = args[0] === "$";
  const code = isShell ? args.slice(1).join(" ") : args.join(" ");

  const startTime = Date.now();
  try {
    let result;
    if (isShell) {
      const exec = util.promisify(require("child_process").exec);
      const { stdout, stderr } = await exec(code);
      result = stdout || stderr || "(no output)";
    } else {
      result = await eval(`(async () => { ${code} })()`);
      if (typeof result !== "string") result = util.inspect(result, { depth: 4 });
    }

    const elapsed = Date.now() - startTime;
    const output = String(result).substring(0, 1500);
    return api.sendMessage(
      `╔══════════════════╗\n   ⚡ ${isShell ? "SHELL" : "EVAL"} OUTPUT   \n╚══════════════════╝\n\n${output}\n\n══════════════════\n⏱️ ${elapsed}ms | 💎 EMon-BHai-BOT`,
      threadID, messageID
    );
  } catch (err) {
    const elapsed = Date.now() - startTime;
    return api.sendMessage(
      `╔══════════════════╗\n   ⚡ ERROR   \n╚══════════════════╝\n\n❌ ${err.message}\n\n══════════════════\n⏱️ ${elapsed}ms | 💎 EMon-BHai-BOT`,
      threadID, messageID
    );
  }
};
