const fs = require("fs-extra");
const path = require("path");
const { execSync } = require("child_process");

module.exports.config = {
  name: "cmd",
  version: "1.0.0",
  permission: 3,
  credits: "Emon",
  prefix: true,
  description: "Load, unload, or reload command modules",
  category: "owner",
  usages: "cmd [load/unload/reload] [command name]",
  cooldowns: 5
};

module.exports.run = async function({ api, event, args }) {
  const { threadID, messageID } = event;
  const cmdDir = path.join(process.cwd(), "scripts", "commands");

  if (!args[0]) return api.sendMessage(
    `╔══════════════════╗\n   ⚙️ CMD HELP   \n╚══════════════════╝\n\n📌 ব্যবহার :\n▸ cmd load [name] — command লোড\n▸ cmd unload [name] — command আনলোড\n▸ cmd reload [name] — command রিলোড\n▸ cmd list — সব loaded command`,
    threadID, messageID
  );

  const action = args[0].toLowerCase();
  const cmdName = args[1];

  if (action === "list") {
    const loaded = [...(global.client.commands.keys() || [])];
    return api.sendMessage(
      `╔══════════════════╗\n   ⚙️ LOADED CMDS   \n╚══════════════════╝\n\n📦 মোট : ${loaded.length}টি\n\n${loaded.join("  |  ")}\n\n══════════════════\n💎 EMon-BHai-BOT`,
      threadID, messageID
    );
  }

  if (!cmdName) return api.sendMessage(`❌ Command নাম দাও।`, threadID, messageID);

  try {
    if (action === "unload") {
      if (!global.client.commands.has(cmdName)) return api.sendMessage(`❌ "${cmdName}" command লোড নেই।`, threadID, messageID);
      global.client.commands.delete(cmdName);
      return api.sendMessage(
        `╔══════════════════╗\n   ⚙️ CMD UNLOADED   \n╚══════════════════╝\n\n✅ "${cmdName}" আনলোড হয়েছে।\n\n══════════════════\n💎 EMon-BHai-BOT`,
        threadID, messageID
      );
    }

    const cmdPath = path.join(cmdDir, `${cmdName}.js`);
    if (!fs.existsSync(cmdPath)) return api.sendMessage(`❌ "${cmdName}.js" file পাওয়া যায়নি।`, threadID, messageID);

    if (action === "reload") {
      delete require.cache[require.resolve(cmdPath)];
      global.client.commands.delete(cmdName);
    }

    const cmd = require(cmdPath);
    if (cmd.config && cmd.config.dependencies) {
      for (const dep of Object.keys(cmd.config.dependencies)) {
        try { require(dep); } catch (e) {
          execSync(`npm install ${dep} --save`, { stdio: "ignore" });
        }
      }
    }
    global.client.commands.set(cmd.config.name, cmd);

    return api.sendMessage(
      `╔══════════════════╗\n   ⚙️ CMD ${action === "reload" ? "RELOADED" : "LOADED "}   \n╚══════════════════╝\n\n✅ "${cmd.config.name}" ${action === "reload" ? "রিলোড" : "লোড"} হয়েছে!\n📁 ${cmdName}.js\n\n══════════════════\n💎 EMon-BHai-BOT`,
      threadID, messageID
    );
  } catch (err) {
    console.error(err);
    return api.sendMessage(`❌ সমস্যা হয়েছে :\n${err.message}`, threadID, messageID);
  }
};
