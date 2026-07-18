module.exports.config = {
  name: "shortlink",
  version: "1.0.0",
  permission: 0,
  credits: "EMon",
  prefix: true,
  description: "URL ছোট করো",
  category: "utility",
  usages: "shortlink [url]",
  cooldowns: 5
};

module.exports.run = async function({ api, event, args }) {
  const { threadID, messageID } = event;
  const axios = require("axios");

  const url = args[0];
  if (!url || !url.startsWith("http")) return api.sendMessage(
    `🔗 SHORTLINK\n━━━━━━━━━━━━━━━━━━\n📌 ব্যবহার: shortlink https://example.com\n━━━━━━━━━━━━━━━━━━\n💎 EMon-BHai-BOT`,
    threadID, messageID
  );

  api.setMessageReaction("⏳", messageID, () => {}, true);
  try {
    const res = await axios.get(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`, { timeout: 10000 });
    api.setMessageReaction("🔗", messageID, () => {}, true);
    return api.sendMessage(
      `🔗 SHORT LINK 🔗\n━━━━━━━━━━━━━━━━━━\n\n📎 Original:\n${url}\n\n✅ Shortened:\n${res.data}\n\n━━━━━━━━━━━━━━━━━━\n💎 EMon-BHai-BOT`,
      threadID, messageID
    );
  } catch {
    api.setMessageReaction("❌", messageID, () => {}, true);
    return api.sendMessage("❌ URL শোর্ট করতে পারিনি! আবার try করো।", threadID, messageID);
  }
};
