module.exports.config = {
  name: "adc",
  version: "1.0.0",
  permission: 2,
  credits: "Emon",
  prefix: true,
  description: "Import a command script from Pastebin or URL",
  category: "admin",
  usages: "adc [pastebin key or URL]",
  cooldowns: 5
};

module.exports.run = async function({ api, event, args }) {
  const axios = require("axios");
  const fs = require("fs-extra");
  const { threadID, messageID } = event;

  if (!args[0]) return api.sendMessage(
    `╔══════════════════╗\n   📥 ADC IMPORT HELP   \n╚══════════════════╝\n\n📌 ব্যবহার : adc [Pastebin key / URL]\n📝 উদাহরণ : adc aBcD1234`,
    threadID, messageID
  );

  api.setMessageReaction("⏳", messageID, () => {}, true);

  try {
    const input = args[0];
    const url = input.startsWith("http") ? input : `https://pastebin.com/raw/${input}`;
    const res = await axios.get(url);
    const code = res.data;

    // Try to parse to extract name
    let commandName = "unknown";
    const nameMatch = code.match(/name:\s*["']([^"']+)["']/);
    if (nameMatch) commandName = nameMatch[1];

    const savePath = `${__dirname}/${commandName}.js`;
    fs.writeFileSync(savePath, code);

    return api.sendMessage(
      `╔══════════════════╗\n   📥 COMMAND IMPORTED   \n╚══════════════════╝\n\n✅ Command import সফল!\n📦 Name : ${commandName}\n📁 Path : scripts/commands/${commandName}.js\n\n⚠️ Bot restart করলে command সক্রিয় হবে।\n══════════════════\n💎 EMon-BHai-BOT`,
      threadID, messageID
    );
  } catch (err) {
    console.error(err);
    return api.sendMessage(`❌ Script import করতে সমস্যা হয়েছে।`, threadID, messageID);
  }
};
