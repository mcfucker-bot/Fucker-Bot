module.exports.config = {
  name: "urban",
  version: "1.0.0",
  permission: 0,
  credits: "EMon",
  prefix: true,
  description: "Urban Dictionary তে word খোঁজো",
  category: "info",
  usages: "urban [word]",
  cooldowns: 5
};

module.exports.run = async function({ api, event, args }) {
  const { threadID, messageID } = event;
  const axios = require("axios");

  if (!args[0]) return api.sendMessage("📌 ব্যবহার: urban [word]\nউদাহরণ: urban slay", threadID, messageID);
  const word = args.join(" ");

  api.setMessageReaction("⏳", messageID, () => {}, true);
  try {
    const res = await axios.get(`https://api.urbandictionary.com/v0/define?term=${encodeURIComponent(word)}`, { timeout: 10000 });
    const list = res.data?.list;
    if (!list || !list.length) {
      api.setMessageReaction("❌", messageID, () => {}, true);
      return api.sendMessage(`❌ "${word}" এর কোনো definition পাওয়া যায়নি!`, threadID, messageID);
    }
    const top = list[0];
    const def = top.definition.replace(/\[|\]/g, "").slice(0, 300);
    const example = top.example ? top.example.replace(/\[|\]/g, "").slice(0, 150) : "N/A";

    api.setMessageReaction("📖", messageID, () => {}, true);
    return api.sendMessage(
      `📖 URBAN DICTIONARY\n━━━━━━━━━━━━━━━━━━\n\n🔤 Word: ${top.word}\n\n📝 Definition:\n${def}\n\n💬 Example:\n${example}\n\n👍 ${top.thumbs_up} | 👎 ${top.thumbs_down}\n\n━━━━━━━━━━━━━━━━━━\n💎 EMon-BHai-BOT`,
      threadID, messageID
    );
  } catch {
    api.setMessageReaction("❌", messageID, () => {}, true);
    return api.sendMessage("❌ Urban Dictionary থেকে data আনতে পারিনি!", threadID, messageID);
  }
};
