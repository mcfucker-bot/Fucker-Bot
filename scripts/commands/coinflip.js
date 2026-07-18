module.exports.config = {
  name: "coinflip",
  version: "1.0.0",
  permission: 0,
  credits: "EMon",
  prefix: true,
  description: "Coin flip করো",
  category: "fun",
  usages: "coinflip [heads/tails]",
  cooldowns: 3
};

module.exports.run = async function({ api, event, args }) {
  const { threadID, messageID } = event;
  const result = Math.random() < 0.5 ? "heads" : "tails";
  const resultBn = result === "heads" ? "মাথা (Heads)" : "লেজ (Tails)";
  const emoji = result === "heads" ? "👑" : "🌟";
  const guess = args[0]?.toLowerCase();
  let verdict = "";
  if (guess === "heads" || guess === "tails") {
    verdict = guess === result
      ? "\n\n🎉 তুমি সঠিক অনুমান করেছো! তুমি জিতেছো!"
      : "\n\n😢 ভুল অনুমান! তুমি হেরেছো!";
  }
  api.setMessageReaction("🪙", messageID, () => {}, true);
  return api.sendMessage(
    `🪙 COIN FLIP 🪙\n━━━━━━━━━━━━━━━━━━\n\n🔄 Coin ঘুরছে...\n\n${emoji} ফলাফল: ${resultBn}${verdict}\n\n━━━━━━━━━━━━━━━━━━\n💎 EMon-BHai-BOT`,
    threadID, messageID
  );
};
