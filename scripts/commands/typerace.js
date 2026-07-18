module.exports.config = {
  name: "typerace",
  version: "1.0.0",
  permission: 0,
  credits: "EMon",
  prefix: true,
  description: "Typing speed race খেলো",
  category: "games",
  usages: "typerace",
  cooldowns: 30
};

if (!global.typeRaceActive) global.typeRaceActive = {};

module.exports.run = async function({ api, event }) {
  const { threadID, messageID } = event;

  if (global.typeRaceActive[threadID]) {
    return api.sendMessage("⚠️ এই গ্রুপে ইতিমধ্যে একটি typerace চলছে!", threadID, messageID);
  }

  const sentences = [
    "আমি বাংলাদেশ ভালোবাসি এবং সবসময় এই দেশের জন্য কাজ করতে চাই",
    "প্রযুক্তি মানুষের জীবন সহজ করে তুলছে প্রতিদিন নতুন আবিষ্কার হচ্ছে",
    "বন্ধুত্ব হলো জীবনের সবচেয়ে মূল্যবান সম্পদ যা কোনো টাকায় কেনা যায় না",
    "শিক্ষা মানুষকে আলোকিত করে এবং সমাজকে এগিয়ে নিয়ে যায়",
    "স্বপ্ন দেখো এবং সেই স্বপ্নকে বাস্তবে রূপ দিতে কঠোর পরিশ্রম করো"
  ];

  const sentence = sentences[Math.floor(Math.random() * sentences.length)];
  global.typeRaceActive[threadID] = { sentence, start: Date.now(), winner: null };

  api.setMessageReaction("🏁", messageID, () => {}, true);
  await api.sendMessage(
    `⌨️ TYPERACE START! ⌨️\n━━━━━━━━━━━━━━━━━━\n\n✍️ নিচের লেখাটি হুবহু type করো:\n\n"${sentence}"\n\n━━━━━━━━━━━━━━━━━━\n⏱️ যে প্রথম সঠিক লিখবে সে জিতবে!\n⏰ সময়: ৬০ সেকেন্ড\n💎 EMon-BHai-BOT`,
    threadID
  );

  // Listen for correct answer
  const checkInterval = setInterval(async () => {
    if (!global.typeRaceActive[threadID]) {
      clearInterval(checkInterval);
      return;
    }
    if (Date.now() - global.typeRaceActive[threadID].start > 60000) {
      clearInterval(checkInterval);
      delete global.typeRaceActive[threadID];
      await api.sendMessage("⏰ সময় শেষ! কেউ জিততে পারেনি।", threadID);
    }
  }, 5000);

  // Auto cleanup
  setTimeout(() => {
    clearInterval(checkInterval);
    delete global.typeRaceActive[threadID];
  }, 65000);
};

module.exports.handleEvent = async function({ api, event }) {
  const { threadID, messageID, body, senderID } = event;
  if (!global.typeRaceActive?.[threadID]) return;
  const race = global.typeRaceActive[threadID];
  if (race.winner) return;

  if (body?.trim() === race.sentence?.trim()) {
    race.winner = senderID;
    const elapsed = ((Date.now() - race.start) / 1000).toFixed(1);
    delete global.typeRaceActive[threadID];

    return api.sendMessage(
      `🏆 TYPERACE WINNER! 🏆\n━━━━━━━━━━━━━━━━━━\n\n🎉 জয়ী হয়েছো তুমি!\n⏱️ সময় নিয়েছো: ${elapsed} সেকেন্ড\n\n━━━━━━━━━━━━━━━━━━\n💎 EMon-BHai-BOT`,
      threadID, messageID
    );
  }
};
