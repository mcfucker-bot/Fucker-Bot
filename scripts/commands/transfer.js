module.exports.config = {
  name: "transfer",
  version: "1.0.0",
  permission: 0,
  credits: "EMon",
  prefix: true,
  description: "কাউকে coins দাও",
  category: "economy",
  usages: "transfer [@mention] [amount]",
  cooldowns: 10
};

module.exports.run = async function({ api, event, args, Users }) {
  const { threadID, messageID, mentions, senderID } = event;
  if (!global.wallets) global.wallets = {};

  const targetID = Object.keys(mentions)[0];
  const amount = parseInt(args[args.length - 1]);

  if (!targetID || !amount || amount <= 0) return api.sendMessage(
    `💸 TRANSFER HELP\n━━━━━━━━━━━━━━━━━━\n📌 ব্যবহার: transfer @নাম 100\n━━━━━━━━━━━━━━━━━━\n💎 EMon-BHai-BOT`,
    threadID, messageID
  );

  if (targetID === senderID) return api.sendMessage("❌ নিজেকে transfer করতে পারবে না!", threadID, messageID);
  const senderBal = global.wallets[senderID] || 0;
  if (amount > senderBal) return api.sendMessage(`❌ তোমার কাছে মাত্র ${senderBal} coin আছে!`, threadID, messageID);

  global.wallets[senderID] = senderBal - amount;
  global.wallets[targetID] = (global.wallets[targetID] || 0) + amount;

  let targetName = Object.values(mentions)[0] || "Member";
  if (targetName.startsWith("@")) targetName = targetName.slice(1);

  return api.sendMessage(
    `💸 TRANSFER DONE! 💸\n━━━━━━━━━━━━━━━━━━\n\n✅ ${amount} 🪙 coins transfer হয়েছে!\n\n👤 To: ${targetName}\n📊 তোমার নতুন balance: ${global.wallets[senderID]} 🪙\n\n━━━━━━━━━━━━━━━━━━\n💎 EMon-BHai-BOT`,
    threadID, messageID
  );
};
