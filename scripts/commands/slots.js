module.exports.config = {
  name: "slots",
  version: "1.0.0",
  permission: 0,
  credits: "EMon",
  prefix: true,
  description: "Slot machine খেলো",
  category: "games",
  usages: "slots",
  cooldowns: 5
};

module.exports.run = async function({ api, event }) {
  const { threadID, messageID } = event;
  const symbols = ["🍒", "🍋", "🍊", "🍇", "⭐", "💎", "7️⃣", "🎰"];
  const spin = () => symbols[Math.floor(Math.random() * symbols.length)];
  const s1 = spin(), s2 = spin(), s3 = spin();

  let result, prize;
  if (s1 === s2 && s2 === s3) {
    if (s1 === "💎") { result = "🏆 JACKPOT!!!"; prize = "তুমি সর্বোচ্চ পুরস্কার জিতেছো!"; }
    else if (s1 === "7️⃣") { result = "🎯 TRIPLE 7!"; prize = "বিশাল জয়!"; }
    else { result = "🎉 TRIPLE!"; prize = "Triple match! দারুণ!"; }
  } else if (s1 === s2 || s2 === s3 || s1 === s3) {
    result = "✅ MATCH!"; prize = "দুটো match! ছোট পুরস্কার!";
  } else {
    result = "❌ NO MATCH"; prize = "এবার হয়নি। আবার চেষ্টা করো!";
  }

  api.setMessageReaction("🎰", messageID, () => {}, true);
  return api.sendMessage(
    `🎰 SLOT MACHINE 🎰\n━━━━━━━━━━━━━━━━━━\n\n╔═══════════════╗\n║  ${s1}  ${s2}  ${s3}  ║\n╚═══════════════╝\n\n${result}\n${prize}\n\n━━━━━━━━━━━━━━━━━━\n💎 EMon-BHai-BOT`,
    threadID, messageID
  );
};
