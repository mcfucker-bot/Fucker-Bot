module.exports.config = {
  name: "birthday",
  version: "1.0.0",
  permission: 0,
  credits: "EMon-BHai",
  prefix: true,
  description: "Birthday wish পাঠাও",
  category: "fun",
  usages: "birthday [@mention / name]",
  cooldowns: 5
};

module.exports.run = async function ({ api, event, args }) {
  const { threadID, messageID, mentions } = event;
  const wishes = [
    "জন্মদিনের অনেক শুভেচ্ছা! 🎂 তোমার প্রতিটি স্বপ্ন পূরণ হোক। আনন্দে ভরপুর থাকো সারাটা বছর!",
    "Happy Birthday! 🎉 তোমার জন্মদিনে মহান আল্লাহ তোমার সকল মনোবাসনা পূর্ণ করুন।",
    "শুভ জন্মদিন! 🌟 জীবনে আরও সাফল্য আসুক, হাসি লেগে থাকুক সবসময়!",
    "জন্মদিনে অনেক ভালোবাসা! 💕 তুমি আরও অনেক বছর সুখে থাকো।",
    "Happy Birthday! 🎂 তোমার এই বিশেষ দিনটি অসাধারণ হোক!",
    "জন্মদিনের শুভেচ্ছা! 🎊 তোমার জীবন আনন্দ আর সুখে ভরপুর থাকুক।"
  ];

  const wish = wishes[Math.floor(Math.random() * wishes.length)];
  const targetName = Object.values(mentions)[0]
    ? Object.values(mentions)[0].replace("@", "")
    : args.join(" ") || "বন্ধু";

  const cake = "🎂🎂🎂\n🕯️🕯️🕯️🕯️🕯️\n🎂🎂🎂";

  api.setMessageReaction("🎂", messageID, () => {}, true);
  return api.sendMessage(
    `🎉 HAPPY BIRTHDAY! 🎉\n━━━━━━━━━━━━━━━━━━\n\n${cake}\n\n🎊 ${targetName} কে\n\n${wish}\n\n━━━━━━━━━━━━━━━━━━\n🎁 From: EMon-BHai-BOT 💎`,
    threadID, messageID
  );
};
