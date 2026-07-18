module.exports.config = {
  name: "insult",
  version: "1.0.0",
  permission: 0,
  credits: "EMon",
  prefix: true,
  description: "Fun insult generator (মজার জন্য শুধু!)",
  category: "fun",
  usages: "insult [@mention]",
  cooldowns: 5
};

module.exports.run = async function({ api, event }) {
  const { threadID, messageID, mentions, senderID } = event;
  const insults = [
    "তুমি এত পুরনো যে তোমার জন্মদিনের কেকের মোমবাতি দিয়ে ঘর গরম করা যায়!",
    "তোমার face দেখলে মানুষের মন ভালো হয়ে যায় — কারণ হাসি আসে!",
    "তুমি এত নিখুঁত না যে নিজেকে mirror দেখো।",
    "Google-ও তোমাকে search করতে পারে না, কারণ তুমি irrelevant!",
    "তোমার IQ এত কম যে তুমি গণনা করতে আঙুল দরকার হয়।",
    "তুমি এমন একটা WiFi পাসওয়ার্ড যা কেউ মনে রাখতে চায় না।",
    "তোমার ভবিষ্যৎ এত অন্ধকার যে সূর্যও ভয় পেয়ে ডুবে যায়।",
    "তুমি এত boring যে তোমার shadow-ও অন্যদিকে মুখ ঘুরিয়ে নেয়।",
    "Dictionary-তে 'useless' শব্দের পাশে তোমার ছবি দেওয়া আছে।",
    "তুমি এত ধীর যে turtle দেখলে তোমাকে নিয়ে হাসে।"
  ];

  const targetID = Object.keys(mentions)[0] || null;
  const name = targetID ? (mentions[targetID]?.replace("@", "") || "Member") : null;
  const insult = insults[Math.floor(Math.random() * insults.length)];

  api.setMessageReaction("💀", messageID, () => {}, true);
  return api.sendMessage(
    `💀 INSULT GENERATOR 💀\n━━━━━━━━━━━━━━━━━━\n\n${name ? `🎯 ${name}:\n\n` : ""}${insult}\n\n━━━━━━━━━━━━━━━━━━\n⚠️ এটা শুধু মজার! কেউ মনে করো না। 😂\n💎 EMon-BHai-BOT`,
    threadID, messageID
  );
};
