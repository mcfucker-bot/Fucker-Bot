module.exports.config = {
  name: "emojimix",
  version: "1.0.0",
  permission: 0,
  credits: "EMon",
  prefix: true,
  description: "দুটো emoji mix করো (Google Emoji Kitchen)",
  category: "fun",
  usages: "emojimix [emoji1] [emoji2]",
  cooldowns: 5
};

module.exports.run = async function({ api, event, args }) {
  const { threadID, messageID } = event;
  const axios = require("axios");
  const fs = require("fs");
  const path = require("path");

  const e1 = args[0], e2 = args[1];
  if (!e1 || !e2) return api.sendMessage(
    `🎨 EMOJIMIX\n━━━━━━━━━━━━━━━━━━\n📌 ব্যবহার: emojimix 😀 😍\n━━━━━━━━━━━━━━━━━━\n💎 EMon-BHai-BOT`,
    threadID, messageID
  );

  const toCodepoint = str => [...str].map(c => c.codePointAt(0).toString(16)).join("-");
  const cp1 = toCodepoint(e1);
  const cp2 = toCodepoint(e2);

  const urls = [
    `https://www.gstatic.com/android/keyboard/emojikitchen/20201001/${cp1}/${cp1}_${cp2}.png`,
    `https://www.gstatic.com/android/keyboard/emojikitchen/20201001/${cp2}/${cp2}_${cp1}.png`,
    `https://www.gstatic.com/android/keyboard/emojikitchen/20210831/${cp1}/${cp1}_${cp2}.png`,
    `https://www.gstatic.com/android/keyboard/emojikitchen/20210831/${cp2}/${cp2}_${cp1}.png`,
  ];

  api.setMessageReaction("⏳", messageID, () => {}, true);
  for (const url of urls) {
    try {
      const res = await axios.get(url, { responseType: "stream", timeout: 10000 });
      const tmpFile = path.join(__dirname, `../../cache/emojimix_${Date.now()}.png`);
      const writer = fs.createWriteStream(tmpFile);
      res.data.pipe(writer);
      await new Promise((resolve, reject) => { writer.on("finish", resolve); writer.on("error", reject); });
      api.setMessageReaction("🎨", messageID, () => {}, true);
      return api.sendMessage(
        { body: `🎨 ${e1} + ${e2} = ?\n💎 EMon-BHai-BOT`, attachment: fs.createReadStream(tmpFile) },
        threadID, () => fs.unlinkSync(tmpFile), messageID
      );
    } catch { continue; }
  }
  api.setMessageReaction("❌", messageID, () => {}, true);
  return api.sendMessage(`❌ ${e1} + ${e2} mix করা যায়নি! অন্য emoji দিয়ে try করো।`, threadID, messageID);
};
