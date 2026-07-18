module.exports.config = {
  name: "captions",
  version: "1.0.0",
  permission: 0,
  credits: "EMon-BHai",
  prefix: true,
  description: "Photo captions generate করো",
  category: "fun",
  usages: "captions [vibe]  |  vibe: happy/sad/love/cool/motivation",
  cooldowns: 5
};

module.exports.run = async function ({ api, event, args }) {
  const { threadID, messageID } = event;
  const vibe = args[0]?.toLowerCase() || "cool";

  const data = {
    happy: [
      "হাসো, কারণ জীবন সুন্দর! 😊✨",
      "Good vibes only! ☀️🌸",
      "Life is short, smile more! 😁💫",
      "আনন্দটুকু ধরে রাখো! 🎉",
      "Happiness is a choice! 🌈😊",
      "প্রতিটি মুহূর্তকে উপভোগ করো! 🥰"
    ],
    sad: [
      "কষ্ট পেয়েছি, কিন্তু হাল ছাড়িনি। 🌧️",
      "Sometimes rain falls before rainbows. 🌈",
      "ব্যথাগুলো শক্তি হয়ে যায়। 💙",
      "Not every day is good, but there's good in every day. 🖤",
      "একদিন সব ঠিক হয়ে যাবে। 🌙",
      "Strong people don't have easy lives. 💪🖤"
    ],
    love: [
      "তোমার প্রতিটি হাসি আমার শক্তি। ❤️",
      "Love is not what you say, it's what you do. 💕",
      "তুমি থাকলেই দিনটা সুন্দর। 🌹",
      "You are my favorite notification. 💌",
      "ভালোবাসি, এতটুকুই যথেষ্ট। 💞",
      "Home is wherever you are. 🏡❤️"
    ],
    cool: [
      "Be yourself, everyone else is taken. 😎",
      "Stay low, keep quiet, focus. 🔥",
      "I'm not perfect, but I'm limited edition. 👑",
      "আমি এমনই, পরিবর্তন নেই। 😏",
      "Silence is the best response. 🤫",
      "Level up never down. ⬆️🚀"
    ],
    motivation: [
      "আজকের কষ্টই আগামীর সাফল্য। 💪",
      "Keep going, you're closer than you think. 🎯",
      "Dream it. Believe it. Build it. ✨",
      "ছোট ছোট পদক্ষেপ বড় লক্ষ্যে পৌঁছায়। 🏆",
      "Work in silence, let success make noise. 🔥",
      "Be the reason someone believes in miracles. 🌟"
    ]
  };

  const list = data[vibe] || data["cool"];
  const caption = list[Math.floor(Math.random() * list.length)];

  if (args[0] === "list") {
    return api.sendMessage(
      `📝 CAPTION VIBES\n━━━━━━━━━━━━━━━━━━\nhappy | sad | love | cool | motivation\n━━━━━━━━━━━━━━━━━━\n💎 EMon-BHai-BOT`,
      threadID, messageID
    );
  }

  api.setMessageReaction("📝", messageID, () => {}, true);
  return api.sendMessage(
    `📝 CAPTION 📝\n━━━━━━━━━━━━━━━━━━\n\n🎯 Vibe: ${vibe.toUpperCase()}\n\n❝ ${caption} ❞\n\n━━━━━━━━━━━━━━━━━━\n💡 Vibes: happy/sad/love/cool/motivation\n💎 EMon-BHai-BOT`,
    threadID, messageID
  );
};
