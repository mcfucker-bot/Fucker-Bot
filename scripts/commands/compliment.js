module.exports.config = {
  name: "compliment",
  version: "1.0.0",
  permission: 0,
  credits: "EMon",
  prefix: true,
  description: "কাউকে compliment দাও",
  category: "fun",
  usages: "compliment [@mention]",
  cooldowns: 5
};

module.exports.run = async function({ api, event, args }) {
  const { threadID, messageID, mentions, senderID } = event;
  const compliments = [
    "তুমি সত্যিই অসাধারণ একজন মানুষ! 🌟",
    "তোমার হাসি পুরো দিনটা সুন্দর করে দেয়! 😊",
    "তুমি যা করো সব কিছুতেই তোমার প্রতিভা ঝরে পড়ে! 💫",
    "তোমার মতো বন্ধু পাওয়া সত্যিই ভাগ্যের বিষয়! 🍀",
    "তুমি এই গ্রুপের সবচেয়ে special মানুষদের একজন! 👑",
    "তোমার সাথে কথা বলতে সবসময় ভালো লাগে! 💬",
    "তুমি যেভাবে মানুষকে help করো সেটা সত্যিই inspiring! 🌈",
    "তোমার মধ্যে এমন একটা energy আছে যা সবাইকে motivate করে! ⚡",
    "তুমি সত্যিই একজন gem! 💎",
    "তোমার উপস্থিতিতে পরিবেশটা আরও সুন্দর হয়ে যায়! 🌸",
    "তুমি যা ভাবো তা সঠিক পথেই থাকে, তোমার judgment দারুণ! 🎯",
    "তোমার মতো creative মানুষ খুব কম দেখেছি! 🎨",
    "তুমি এমনই অসাধারণ যে কথায় বলা যায় না! ✨",
    "তোমার সাহস এবং আত্মবিশ্বাস সত্যিই প্রশংসনীয়! 💪",
    "তুমি যা স্পর্শ করো তাই সোনা হয়ে যায়! 🌙"
  ];
  const c = compliments[Math.floor(Math.random() * compliments.length)];
  const targetID = Object.keys(mentions)[0];
  const targetName = targetID ? Object.values(mentions)[0] : null;

  if (targetName) {
    return api.sendMessage(
      `💝 COMPLIMENT 💝\n━━━━━━━━━━━━━━━━━━\n\n🌟 ${targetName},\n\n${c}\n\n━━━━━━━━━━━━━━━━━━\n💎 EMon-BHai-BOT`,
      threadID, messageID
    );
  }
  return api.sendMessage(
    `💝 COMPLIMENT 💝\n━━━━━━━━━━━━━━━━━━\n\n${c}\n\n━━━━━━━━━━━━━━━━━━\n📌 টিপ: compliment @নাম দিয়ে কাউকে directly বলো!\n💎 EMon-BHai-BOT`,
    threadID, messageID
  );
};
