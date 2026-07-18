const fs = require("fs");
const path = require("path");

module.exports.config = {
  name: "help",
  aliases: ["menu"], // এই Alias গুলোর কারণে 'menu' লিখলেও কাজ করবে
  version: "8.0.0",
  permission: 0,
  credits: "EMon-BHai",
  prefix: "awto",
  description: "Simple Command List",
  category: "system",
  usages: "help | help [command]",
  cooldowns: 5
};

module.exports.run = async function ({ api, event, args }) {
  const { threadID, messageID } = event;
  const commands = Array.from(global.client.commands.values());
  const prefix = "awto";
  
  // EMon ফোল্ডার থেকে ছবি চেক করা
  const imagePath = path.join(__dirname, "Emon", "help.png");

  // ১. নির্দিষ্ট কমান্ডের বিস্তারিত
  if (args[0]) {
    const query = args[0].toLowerCase();
    const cmd = commands.find(c => c.config.name === query || (c.config.aliases || []).includes(query));
    
    if (!cmd) return api.sendMessage(`❌ "${args[0]}" কমান্ডটি খুঁজে পাওয়া যায়নি!`, threadID, messageID);
    
    const aliases = (cmd.config.aliases || []).join(", ");
    return api.sendMessage(`🌟 COMMAND: ${cmd.config.name.toUpperCase()}\n\n➤ কাজ: ${cmd.config.description || "N/A"}\n➤ Alias: ${aliases || "নেই"}\n➤ ব্যবহার: ${prefix} ${cmd.config.usages || cmd.config.name}`, threadID, messageID);
  }

  // ২. কমান্ড লিস্ট (A-Z সিরিয়াল, কোনো ক্যাটাগরি নেই)
  const sortedCmds = commands.sort((a, b) => a.config.name.localeCompare(b.config.name));
  
  let msg = `✨ 𝐄𝐌𝐨𝐧-𝐁𝐇𝐚𝐢 𝐁𝐎𝐓 𝐌𝐞𝐧𝐮 ✨\n━━━━━━━━━━━━━━━━━━\n\n`;

  for (const cmd of sortedCmds) {
    const aliasInfo = (cmd.config.aliases || []).length > 0 ? ` [${cmd.config.aliases.join(", ")}]` : "";
    msg += `→ ${cmd.config.name}${aliasInfo}\n`;
  }

  msg += `\n━━━━━━━━━━━━━━━━━━\n`;
  msg += `🚀 মোট কমান্ড: ${commands.length} টি\n`;
  msg += `💎 EMon-BHai-BOT`;

  // ছবি পাঠানো (EMon ফোল্ডার থেকে)
  if (fs.existsSync(imagePath)) {
    return api.sendMessage({ body: msg, attachment: fs.createReadStream(imagePath) }, threadID, messageID);
  } else {
    return api.sendMessage(msg, threadID, messageID);
  }
};
