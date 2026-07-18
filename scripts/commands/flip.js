module.exports.config = {
  name: "flip",
  version: "1.0.0",
  permission: 0,
  credits: "Emon",
  prefix: 'awto',
  description: "Flip a coin — heads or tails",
  category: "fun",
  usages: "flip",
  cooldowns: 3
};

module.exports.run = async function({ api, event }) {
  const { threadID, messageID } = event;
  const result = Math.random() < 0.5 ? "heads" : "tails";

  return api.sendMessage(
    `╔══════════════════╗\n   🪙 COIN FLIP   \n╚══════════════════╝\n\n🪙 মুদ্রা ছোড়া হলো...\n\n${result === "heads" ? "👑 HEADS! (মাথা)" : "🔵 TAILS! (পিছন)"}\n\n══════════════════\n💎 EMon-BHai-BOT`,
    threadID, messageID
  );
};
