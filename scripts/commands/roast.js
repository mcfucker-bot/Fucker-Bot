module.exports.config = {
  name: "roast",
  version: "1.0.0",
  permission: 0,
  credits: "EMon",
  prefix: true,
  description: "মজার roast/insult দাও (fun only!)",
  category: "fun",
  usages: "roast [@mention]",
  cooldowns: 5
};

module.exports.run = async function({ api, event }) {
  const { threadID, messageID, mentions } = event;
  const roasts = [
    "তুমি এত slow যে তোমার shadow-ও তোমার আগে চলে যায়! 🐢",
    "তোমার IQ এর চেয়ে তোমার shoe size বেশি! 👟",
    "তুমি এত boring যে তোমার স্বপ্নও তোমার কথা শুনতে চায় না! 😴",
    "Google Maps তোমাকে search করলে 'dead end' দেখায়! 🗺️",
    "তুমি এত ভুলোমনা যে mirror দেখে নিজেকেই চিনতে পারো না! 🪞",
    "তোমার future এত dark যে সূর্যও ভয় পায়! 🌑",
    "তুমি WiFi-এর মতো — কাছে থেকেও connection পাওয়া যায় না! 📶",
    "তুমি এত simple যে calculator-ও তোমাকে calculate করতে পারে না! 🖩",
    "তোমার face দেখলে Google Photo-ও blur করে দেয়! 📸",
    "তুমি এত weak যে বাতাসও তোমাকে push করতে ভয় পায়! 💨",
    "তোমার idea-গুলো এত old যে dinosaur-ও এগুলো ব্যবহার করত! 🦕",
    "তুমি এত late যে তোমার জন্মদিনও delay হয়েছিল! 🎂",
    "তোমার brain এর চেয়ে তোমার hair বেশি useful! 💇",
    "তুমি এত confusing যে AI-ও তোমাকে understand করতে পারে না! 🤖",
    "তুমি এমন একটা book যার কোনো plot নেই! 📚"
  ];
  const r = roasts[Math.floor(Math.random() * roasts.length)];
  const targetID = Object.keys(mentions)[0];
  const targetName = targetID ? Object.values(mentions)[0] : null;

  api.setMessageReaction("🔥", messageID, () => {}, true);
  const note = "\n\n⚠️ এটা শুধু মজার জন্য! কেউ কিছু মনে করো না 😂";
  if (targetName) {
    return api.sendMessage(
      `🔥 ROASTED! 🔥\n━━━━━━━━━━━━━━━━━━\n\n🎯 ${targetName}:\n\n${r}${note}\n━━━━━━━━━━━━━━━━━━\n💎 EMon-BHai-BOT`,
      threadID, messageID
    );
  }
  return api.sendMessage(
    `🔥 ROAST 🔥\n━━━━━━━━━━━━━━━━━━\n\n${r}${note}\n━━━━━━━━━━━━━━━━━━\n💎 EMon-BHai-BOT`,
    threadID, messageID
  );
};
