module.exports.config = {
  name: "goodnight",
  version: "1.0.0",
  permission: 0,
  credits: "EMon-BHai",
  prefix: true,
  description: "শুভরাত্রি message পাঠাও",
  category: "fun",
  usages: "goodnight [@mention]",
  cooldowns: 5
};

module.exports.run = async function ({ api, event, args }) {
  const { threadID, messageID, mentions } = event;
  const msgs = [
    "🌙 শুভরাত্রি! মিষ্টি স্বপ্ন দেখো! আজকের সব ক্লান্তি ভুলে ভালো ঘুমাও। ⭐",
    "🌟 Good Night! আজকের দিনের সব ভালো স্মৃতি নিয়ে ঘুমাও! কাল নতুন ভোর আসবে। 🌙",
    "😴 শুভরাত্রি! ভালো ঘুম নাও, কাল আবার নতুন উদ্যমে শুরু হবে! 💤",
    "🌛 Good Night! তারার আলোয় ভালো ঘুমাও! মিষ্টি স্বপ্নে ডুবে যাও! 🌙",
    "💤 শুভরাত্রি! রাতের বিশ্রাম নাও, কাল আবার দেখা হবে! ঘুমের মাঝে হাসো! 🌟",
    "🌚 Good Night! আজকের সব দুশ্চিন্তা ছেড়ে দাও, শান্তিতে ঘুমাও! 💙"
  ];
  const msg = msgs[Math.floor(Math.random() * msgs.length)];
  const targetName = Object.values(mentions)[0] ? Object.values(mentions)[0].replace("@", "") + "!" : "সবাইকে!";
  api.setMessageReaction("🌙", messageID, () => {}, true);
  return api.sendMessage(
    `🌙 GOOD NIGHT 🌙\n━━━━━━━━━━━━━━━━━━\n\n👋 ${targetName}\n\n${msg}\n\n━━━━━━━━━━━━━━━━━━\n💎 EMon-BHai-BOT`,
    threadID, messageID
  );
};
