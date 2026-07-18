module.exports.config = {
  name: "fact",
  version: "1.0.0",
  permission: 0,
  credits: "EMon",
  prefix: true,
  description: "Random interesting fact",
  category: "info",
  usages: "fact",
  cooldowns: 5
};

module.exports.run = async function({ api, event }) {
  const { threadID, messageID } = event;
  const axios = require("axios");
  api.setMessageReaction("⏳", messageID, () => {}, true);
  const fallback = [
    "অক্টোপাসের ৩টি হৃদয় আছে এবং নীল রঙের রক্ত!",
    "মানুষের চোখ ১০ মিলিয়নেরও বেশি রঙ চিনতে পারে!",
    "মৌমাছি ৫ টি চোখ দিয়ে দেখতে পায়!",
    "পানির কোনো রঙ নেই, স্বাদ নেই, গন্ধ নেই।",
    "বজ্রপাত সূর্যের চেয়ে ৫ গুণ বেশি গরম!",
    "একটি snail ৩ বছর পর্যন্ত ঘুমাতে পারে!",
    "হাতি একমাত্র প্রাণী যে লাফাতে পারে না!",
    "মানুষের শরীরে ৩৭ ট্রিলিয়নেরও বেশি কোষ আছে!",
    "শামুক তার পায়ের সাহায্যে রঙ চিনতে পারে!",
    "মানুষের শরীরের হাড়গুলো ইস্পাতের চেয়ে শক্তিশালী!",
    "চাঁদে পানি আছে — মেরু অঞ্চলে বরফ আকারে।",
    "তিমি মাছ পৃথিবীর সবচেয়ে বড় প্রাণী এবং এর হৃদয় একটি গাড়ির সমান!",
    "মানুষের ডিএনএ কলার (Banana) সাথে ৫০% মিলে!",
    "প্রজাপতি তার পায়ে স্বাদ নেয়!",
    "মানুষ একমাত্র প্রাণী যে কান্নার সময় চোখের পানি ফেলে।",
  ];
  try {
    const res = await axios.get("https://uselessfacts.jsph.pl/random.json?language=en", { timeout: 8000 });
    const factText = res.data?.text || fallback[Math.floor(Math.random() * fallback.length)];
    api.setMessageReaction("💡", messageID, () => {}, true);
    return api.sendMessage(
      `💡 RANDOM FACT 💡\n━━━━━━━━━━━━━━━━━━\n\n📌 ${factText}\n\n━━━━━━━━━━━━━━━━━━\n💎 EMon-BHai-BOT`,
      threadID, messageID
    );
  } catch {
    const f = fallback[Math.floor(Math.random() * fallback.length)];
    api.setMessageReaction("💡", messageID, () => {}, true);
    return api.sendMessage(
      `💡 RANDOM FACT 💡\n━━━━━━━━━━━━━━━━━━\n\n📌 ${f}\n\n━━━━━━━━━━━━━━━━━━\n💎 EMon-BHai-BOT`,
      threadID, messageID
    );
  }
};
