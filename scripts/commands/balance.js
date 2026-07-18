module.exports.config = {
  name: "balance",
  version: "1.0.0",
  permission: 0,
  credits: "EMon",
  prefix: true,
  description: "Coin balance দেখো",
  category: "economy",
  usages: "balance [@mention]",
  cooldowns: 5
};

module.exports.run = async function({ api, event, args, Users }) {
  const { threadID, messageID, mentions, senderID } = event;
  if (!global.wallets) global.wallets = {};

  const targetID = Object.keys(mentions)[0] || senderID;
  const isOther = targetID !== senderID;
  const balance = global.wallets[targetID] || 0;

  let name = "তুমি";
  if (isOther) {
    try {
      const ud = await Users.getData(targetID);
      name = ud?.name || "Member";
    } catch { name = "Member"; }
  }

  const streak = (global.dailyStreak || {})[targetID] || 0;

  return api.sendMessage(
    `💰 WALLET 💰\n━━━━━━━━━━━━━━━━━━\n\n👤 ${isOther ? name : "তোমার"} Balance:\n\n🪙 ${balance} Coins\n🔥 Daily Streak: ${streak} দিন\n\n━━━━━━━━━━━━━━━━━━\n💡 daily দিয়ে coins নাও!\n💎 EMon-BHai-BOT`,
    threadID, messageID
  );
};
