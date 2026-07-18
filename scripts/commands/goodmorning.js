module.exports.config = {
  name: "goodmorning",
  version: "1.0.0",
  permission: 0,
  credits: "EMon-BHai",
  prefix: true,
  description: "সুপ্রভাত message পাঠাও",
  category: "fun",
  usages: "goodmorning [@mention]",
  cooldowns: 5
};

module.exports.run = async function ({ api, event, args }) {
  const { threadID, messageID, mentions } = event;
  const msgs = [
    "🌅 সুপ্রভাত! আজকের দিনটি সুন্দর হোক! প্রতিটি নতুন সূর্যোদয় একটি নতুন সুযোগ নিয়ে আসে। 🌸",
    "☀️ শুভ সকাল! আজকের দিনটি তোমার জন্য অসাধারণ হোক! হাসিমাখা দিন কাটাও! 😊",
    "🌄 সুপ্রভাত! প্রতিটি সকাল নতুন স্বপ্ন নিয়ে আসে, সেই স্বপ্নকে বাস্তবে রূপ দাও! 💪",
    "🌻 Good Morning! আজকের দিনটি তোমার জীবনের সেরা দিন হোক! হাসতে থাকো! 🌟",
    "🌞 শুভ সকাল! নতুন দিন, নতুন সম্ভাবনা! আল্লাহর কাছে কৃতজ্ঞ থাকো! 🤲",
    "🦋 সুপ্রভাত! প্রতিটি সকালে একটু ইতিবাচক চিন্তা করো, দিনটা সুন্দর হবে! ✨"
  ];
  const msg = msgs[Math.floor(Math.random() * msgs.length)];
  const targetName = Object.values(mentions)[0] ? Object.values(mentions)[0].replace("@", "") + "!" : "সবাইকে!";
  api.setMessageReaction("🌅", messageID, () => {}, true);
  return api.sendMessage(
    `🌅 GOOD MORNING 🌅\n━━━━━━━━━━━━━━━━━━\n\n👋 ${targetName}\n\n${msg}\n\n━━━━━━━━━━━━━━━━━━\n💎 EMon-BHai-BOT`,
    threadID, messageID
  );
};
