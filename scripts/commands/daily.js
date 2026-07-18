module.exports.config = {
  name: "daily",
  version: "1.0.0",
  permission: 0,
  credits: "EMon",
  prefix: true,
  description: "প্রতিদিন free coins নাও",
  category: "economy",
  usages: "daily",
  cooldowns: 5
};

if (!global.dailyCoins) global.dailyCoins = {};
if (!global.wallets) global.wallets = {};

module.exports.run = async function({ api, event }) {
  const { threadID, messageID, senderID } = event;
  const now = Date.now();
  const cooldown = 24 * 60 * 60 * 1000; // 24h

  const lastClaim = global.dailyCoins[senderID] || 0;
  const diff = now - lastClaim;

  if (diff < cooldown) {
    const remaining = cooldown - diff;
    const h = Math.floor(remaining / 3600000);
    const m = Math.floor((remaining % 3600000) / 60000);
    return api.sendMessage(
      `⏰ DAILY COOLDOWN\n━━━━━━━━━━━━━━━━━━\n\n❌ তুমি ইতিমধ্যে আজকের coins নিয়েছো!\n\n🕐 আবার নিতে পারবে: ${h}h ${m}m পরে\n\n━━━━━━━━━━━━━━━━━━\n💎 EMon-BHai-BOT`,
      threadID, messageID
    );
  }

  const reward = Math.floor(Math.random() * 500) + 100; // 100-600 coins
  global.dailyCoins[senderID] = now;
  global.wallets[senderID] = (global.wallets[senderID] || 0) + reward;

  const streak = global.dailyStreak || {};
  streak[senderID] = (streak[senderID] || 0) + 1;
  global.dailyStreak = streak;

  let bonus = "";
  if (streak[senderID] >= 7) {
    const bonusCoins = 500;
    global.wallets[senderID] += bonusCoins;
    bonus = `\n🔥 7-Day Streak Bonus: +${bonusCoins} coins!`;
  }

  return api.sendMessage(
    `🎁 DAILY REWARD 🎁\n━━━━━━━━━━━━━━━━━━\n\n✅ তুমি পেয়েছো: ${reward} 🪙 coins${bonus}\n\n📊 মোট Balance: ${global.wallets[senderID]} 🪙\n🔥 Streak: ${streak[senderID]} দিন\n\n━━━━━━━━━━━━━━━━━━\n💡 balance দিয়ে balance দেখো!\n💎 EMon-BHai-BOT`,
    threadID, messageID
  );
};
