module.exports.config = {
  name: "anagram",
  version: "1.0.0",
  permission: 0,
  credits: "EMon",
  prefix: true,
  description: "Anagram word game খেলো",
  category: "games",
  usages: "anagram",
  cooldowns: 15
};

if (!global.anagramGame) global.anagramGame = {};

module.exports.run = async function({ api, event }) {
  const { threadID, messageID } = event;

  if (global.anagramGame[threadID]) {
    return api.sendMessage("⚠️ ইতিমধ্যে একটি anagram game চলছে! উত্তর দাও।", threadID, messageID);
  }

  const words = [
    "apple", "mango", "banana", "grape", "lemon", "tiger", "snake", "horse",
    "phone", "music", "dance", "earth", "water", "light", "night", "heart",
    "smart", "brave", "clean", "fresh", "happy", "peace", "start", "dream"
  ];

  const word = words[Math.floor(Math.random() * words.length)];
  const shuffled = word.split("").sort(() => Math.random() - 0.5).join("");

  global.anagramGame[threadID] = { word, start: Date.now() };

  api.setMessageReaction("🔤", messageID, () => {}, true);
  await api.sendMessage(
    `🔤 ANAGRAM GAME 🔤\n━━━━━━━━━━━━━━━━━━\n\n🔀 Scrambled letters:\n\n「 ${shuffled.toUpperCase()} 」\n\n━━━━━━━━━━━━━━━━━━\n❓ এই অক্ষরগুলো দিয়ে কোন word হয়?\n⏰ ৩০ সেকেন্ডে উত্তর দাও!\n💎 EMon-BHai-BOT`,
    threadID
  );

  setTimeout(async () => {
    if (global.anagramGame[threadID]) {
      delete global.anagramGame[threadID];
      await api.sendMessage(`⏰ সময় শেষ! সঠিক উত্তর ছিল: ${word.toUpperCase()}`, threadID);
    }
  }, 30000);
};

module.exports.handleEvent = async function({ api, event }) {
  const { threadID, messageID, body } = event;
  if (!global.anagramGame?.[threadID] || !body) return;
  const game = global.anagramGame[threadID];
  if (body.trim().toLowerCase() === game.word) {
    const elapsed = ((Date.now() - game.start) / 1000).toFixed(1);
    delete global.anagramGame[threadID];
    return api.sendMessage(
      `✅ CORRECT! 🎉\n━━━━━━━━━━━━━━━━━━\n\n🎯 সঠিক উত্তর: ${game.word.toUpperCase()}\n⏱️ সময়: ${elapsed}s\n\n🏆 তুমি জিতেছো!\n💎 EMon-BHai-BOT`,
      threadID, messageID
    );
  }
};
