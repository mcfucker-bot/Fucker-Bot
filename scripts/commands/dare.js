module.exports.config = {
  name: "dare",
  version: "1.0.0",
  permission: 0,
  credits: "EMon",
  prefix: true,
  description: "Random dare challenge দাও",
  category: "fun",
  usages: "dare",
  cooldowns: 5
};

module.exports.run = async function({ api, event }) {
  const { threadID, messageID } = event;
  const dares = [
    "গ্রুপে ৫ জনকে সুন্দর কমপ্লিমেন্ট দাও!",
    "তোমার সবচেয়ে বিব্রতকর মুহূর্তের গল্প বলো!",
    "গ্রুপে একটা funny voice message পাঠাও!",
    "তোমার প্রোফাইল পিক পরিবর্তন করে ৩০ মিনিট রাখো!",
    "গ্রুপের যে কাউকে 'আমি তোমার ভক্ত' বলো!",
    "গ্রুপে একটা কবিতা লিখে পাঠাও!",
    "তোমার নাম উল্টো করে ৫ বার বলো!",
    "গ্রুপে সবচেয়ে ছোট ম্যাসেজ পাঠাও এবং ২ মিনিট চুপ থাকো!",
    "তোমার ফোনের last 3 emoji পাঠাও!",
    "একটা দেশের নাম বলো যা Z দিয়ে শুরু!",
    "গ্রুপে একটা riddle পোস্ট করো!",
    "তোমার ফোনের সবচেয়ে বেশি ব্যবহার করা app-এর নাম বলো!",
    "১ মিনিটে ১০টা animal-এর নাম বলো!",
    "তোমার পাশের মানুষকে একটা funny nicknames দাও!",
    "চোখ বন্ধ করে একটা emoji পাঠাও!",
    "তোমার crush-এর নামের প্রথম অক্ষর বলো!",
    "গ্রুপের admin-কে একটা মজার কমপ্লিমেন্ট দাও!",
    "তোমার favorite food-এর নাম বাংলায় বলো!",
    "গান গেয়ে voice note পাঠাও (যেকোনো গান)!",
    "তোমার সবচেয়ে পুরানো ফোন নম্বর মনে আছে? বলো!",
    "১০ সেকেন্ডে তোমার নাম ইংরেজিতে উল্টো লিখো!",
    "গ্রুপের যে কাউকে 'সুপারস্টার' বলো!",
    "তোমার কোনো পুরানো embarrassing story বলো!",
    "এখন তুমি কোথায় আছো সেটা hint দিয়ে বলো (exact location ছাড়া)!",
    "তোমার life-এর best memory শেয়ার করো!"
  ];
  const dare = dares[Math.floor(Math.random() * dares.length)];
  api.setMessageReaction("🔥", messageID, () => {}, true);
  return api.sendMessage(
    `🔥 DARE CHALLENGE 🔥\n━━━━━━━━━━━━━━━━━━\n\n🎯 তোমার চ্যালেঞ্জ:\n${dare}\n\n━━━━━━━━━━━━━━━━━━\n💀 না করলে তুমি CHICKEN! 🐔\n💎 EMon-BHai-BOT`,
    threadID, messageID
  );
};
