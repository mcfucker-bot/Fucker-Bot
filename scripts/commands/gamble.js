module.exports.config = {
  name: "gamble",
  version: "1.0.0",
  permission: 0,
  credits: "EMon",
  prefix: true,
  description: "Coins নিয়ে gamble খেলো",
  category: "economy",
  usages: "gamble [amount / all]",
  cooldowns: 10
};

module.exports.run = async function({ api, event, args }) {
  const { threadID, messageID, senderID } = event;
  if (!global.wallets) global.wallets = {};

  const balance = global.wallets[senderID] || 0;
  if (balance <= 0) return api.sendMessage(
    `❌ তোমার কোনো coin নেই!\n💡 daily দিয়ে free coins নাও।`,
    threadID, messageID
  );

  let amount;
  if (args[0]?.toLowerCase() === "all") {
    amount = balance;
  } else {
    amount = parseInt(args[0]);
  }

  if (!amount || amount <= 0) return api.sendMessage("📌 ব্যবহার: gamble [amount]\nউদাহরণ: gamble 100 | gamble all", threadID, messageID);
  if (amount > balance) return api.sendMessage(`❌ তোমার কাছে মাত্র ${balance} coin আছে!`, threadID, messageID);

  const win = Math.random() < 0.45; // 45% win chance
  const multiplier = win ? (Math.random() < 0.1 ? 3 : 2) : 0; // 10% chance for 3x

  let newBalance;
  let resultText;
  if (win) {
    const winAmount = amount * multiplier;
    global.wallets[senderID] = balance - amount + winAmount;
    newBalance = global.wallets[senderID];
    resultText = `🎉 তুমি জিতেছো! +${winAmount} coins (${multiplier}x)\n${multiplier === 3 ? "🌟 JACKPOT! 3x পেয়েছো!\n" : ""}`;
  } else {
    global.wallets[senderID] = balance - amount;
    newBalance = global.wallets[senderID];
    resultText = `😢 তুমি হেরেছো! -${amount} coins`;
  }

  api.setMessageReaction(win ? "🎉" : "😢", messageID, () => {}, true);
  return api.sendMessage(
    `🎰 GAMBLE RESULT 🎰\n━━━━━━━━━━━━━━━━━━\n\n💸 Bet: ${amount} coins\n\n${resultText}\n📊 নতুন Balance: ${newBalance} 🪙\n\n━━━━━━━━━━━━━━━━━━\n💎 EMon-BHai-BOT`,
    threadID, messageID
  );
};
