module.exports.config = {
  name: "numberinfo",
  version: "1.0.0",
  permission: 0,
  credits: "EMon",
  prefix: true,
  description: "যেকোনো সংখ্যার মজার তথ্য দেখো",
  category: "info",
  usages: "numberinfo [number]",
  cooldowns: 5
};

module.exports.run = async function({ api, event, args }) {
  const { threadID, messageID } = event;
  const axios = require("axios");
  const num = args[0] || Math.floor(Math.random() * 1000);
  if (isNaN(num)) return api.sendMessage("❌ সঠিক সংখ্যা দাও!", threadID, messageID);

  api.setMessageReaction("⏳", messageID, () => {}, true);
  try {
    const [trivia, math, year] = await Promise.all([
      axios.get(`http://numbersapi.com/${num}/trivia`, { timeout: 8000 }).then(r => r.data).catch(() => null),
      axios.get(`http://numbersapi.com/${num}/math`, { timeout: 8000 }).then(r => r.data).catch(() => null),
      axios.get(`http://numbersapi.com/${num}/year`, { timeout: 8000 }).then(r => r.data).catch(() => null),
    ]);

    api.setMessageReaction("🔢", messageID, () => {}, true);
    return api.sendMessage(
      `🔢 NUMBER FACTS: ${num}\n━━━━━━━━━━━━━━━━━━\n\n📌 Trivia:\n${trivia || "N/A"}\n\n🧮 Math:\n${math || "N/A"}\n\n📅 Year Fact:\n${year || "N/A"}\n\n━━━━━━━━━━━━━━━━━━\n💎 EMon-BHai-BOT`,
      threadID, messageID
    );
  } catch {
    api.setMessageReaction("❌", messageID, () => {}, true);
    return api.sendMessage("❌ Number info আনতে পারিনি!", threadID, messageID);
  }
};
