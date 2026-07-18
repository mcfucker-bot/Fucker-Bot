module.exports.config = {
  name: "dice",
  version: "1.0.0",
  permission: 0,
  credits: "EMon",
  prefix: true,
  description: "Dice roll করো",
  category: "fun",
  usages: "dice [sides]  |  default 6",
  cooldowns: 3
};

module.exports.run = async function({ api, event, args }) {
  const { threadID, messageID } = event;
  const sides = parseInt(args[0]) || 6;
  if (sides < 2 || sides > 100) return api.sendMessage("❌ 2 থেকে 100 এর মধ্যে দাও!", threadID, messageID);
  const result = Math.floor(Math.random() * sides) + 1;
  const diceEmoji = ["⚀","⚁","⚂","⚃","⚄","⚅"];
  const display = sides === 6 ? diceEmoji[result - 1] : `🎲 ${result}`;
  api.setMessageReaction("🎲", messageID, () => {}, true);
  return api.sendMessage(
    `🎲 DICE ROLL 🎲\n━━━━━━━━━━━━━━━━━━\n\n🎯 ${sides} পার্শ্বের ডাইস\n\n${display}\n\n📊 ফলাফল: ${result}/${sides}\n\n━━━━━━━━━━━━━━━━━━\n💎 EMon-BHai-BOT`,
    threadID, messageID
  );
};
