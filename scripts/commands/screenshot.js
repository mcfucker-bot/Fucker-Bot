module.exports.config = {
  name: "screenshot",
  version: "1.0.0",
  permission: 0,
  credits: "EMon",
  prefix: true,
  description: "যেকোনো website এর screenshot নাও",
  category: "utility",
  usages: "screenshot [url]",
  cooldowns: 10
};

module.exports.run = async function({ api, event, args }) {
  const { threadID, messageID } = event;
  const axios = require("axios");
  const fs = require("fs");
  const path = require("path");

  let url = args[0];
  if (!url) return api.sendMessage("📌 ব্যবহার: screenshot https://example.com", threadID, messageID);
  if (!url.startsWith("http")) url = "https://" + url;

  api.setMessageReaction("⏳", messageID, () => {}, true);
  try {
    const apiUrl = `https://api.screenshotmachine.com/?key=d7e0c0&url=${encodeURIComponent(url)}&dimension=1366x768&format=jpg&cacheLimit=0`;
    const tmpFile = path.join(__dirname, `../../cache/ss_${Date.now()}.jpg`);
    const res = await axios.get(apiUrl, { responseType: "stream", timeout: 20000 });
    const writer = fs.createWriteStream(tmpFile);
    res.data.pipe(writer);
    await new Promise((resolve, reject) => { writer.on("finish", resolve); writer.on("error", reject); });

    api.setMessageReaction("📸", messageID, () => {}, true);
    return api.sendMessage(
      { body: `📸 SCREENSHOT\n━━━━━━━━━━━━━━━━━━\n🌐 ${url}\n━━━━━━━━━━━━━━━━━━\n💎 EMon-BHai-BOT`, attachment: fs.createReadStream(tmpFile) },
      threadID, () => { try { fs.unlinkSync(tmpFile); } catch {} }, messageID
    );
  } catch {
    api.setMessageReaction("❌", messageID, () => {}, true);
    return api.sendMessage("❌ Screenshot নিতে পারিনি! URL check করো।", threadID, messageID);
  }
};
