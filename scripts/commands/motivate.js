module.exports.config = {
  name: "motivate",
  version: "1.0.0",
  permission: 0,
  credits: "EMon-BHai",
  prefix: true,
  description: "Motivational quotes পাও (বাংলা/English)",
  category: "fun",
  usages: "motivate",
  cooldowns: 5
};

module.exports.run = async function ({ api, event }) {
  const { threadID, messageID } = event;
  const quotes = [
    { q: "স্বপ্ন সেটা নয় যেটা তুমি ঘুমিয়ে দেখো, স্বপ্ন সেটাই যেটা তোমাকে ঘুমাতে দেয় না।", a: "এ.পি.জে আব্দুল কালাম" },
    { q: "সাফল্য হলো প্রতিদিন ছোট ছোট প্রচেষ্টার সমষ্টি।", a: "Robert Collier" },
    { q: "হাজার মাইলের যাত্রাও শুরু হয় একটি পদক্ষেপ দিয়ে।", a: "Lao Tzu" },
    { q: "যখন সব দরজা বন্ধ মনে হয়, তখন জানালাগুলো খোলা থাকে।", a: "অজানা" },
    { q: "তোমার সময় সীমিত, তাই অন্যের জীবন যাপন করে নষ্ট করো না।", a: "Steve Jobs" },
    { q: "ব্যর্থতা মানে শেষ নয়, এটা একটি নতুন শুরু।", a: "অজানা" },
    { q: "কঠিন পরিস্থিতি কঠিন মানুষ তৈরি করে।", a: "অজানা" },
    { q: "আজকের কষ্টই আগামীকালের শক্তি।", a: "অজানা" },
    { q: "Don't stop when you're tired. Stop when you're done.", a: "Unknown" },
    { q: "The harder you work for something, the greater you'll feel when you achieve it.", a: "Unknown" },
    { q: "Dream big, work hard, stay focused.", a: "Unknown" },
    { q: "সফল মানুষ সুযোগ খোঁজে, অসফল মানুষ অজুহাত খোঁজে।", a: "অজানা" },
    { q: "প্রতিটি সমস্যা একটি সুযোগ ছদ্মবেশে।", a: "অজানা" },
    { q: "তোমার মনোভাব তোমার উচ্চতা নির্ধারণ করে।", a: "অজানা" },
    { q: "কখনো হাল ছেড়ো না, কারণ এটাই সেই মুহূর্ত যখন জোয়ার ঘুরে যায়।", a: "Harriet Beecher Stowe" },
    { q: "বিশ্বাস রাখো নিজের উপর, তুমি পারবে।", a: "অজানা" },
    { q: "প্রতিটি দিন একটি নতুন সুযোগ।", a: "অজানা" },
    { q: "ভয়কে জয় করো, সাফল্য আসবেই।", a: "অজানা" }
  ];
  const q = quotes[Math.floor(Math.random() * quotes.length)];
  api.setMessageReaction("💪", messageID, () => {}, true);
  return api.sendMessage(
    `💪 MOTIVATION 💪\n━━━━━━━━━━━━━━━━━━\n\n❝ ${q.q} ❞\n\n— ${q.a}\n\n━━━━━━━━━━━━━━━━━━\n💎 EMon-BHai-BOT`,
    threadID, messageID
  );
};
