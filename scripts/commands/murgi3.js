module.exports.config = {
  name: "murgi3",
  version: "1.0.0",
  permission: 2,
  credits: "Emon",
  prefix: false,
  description: "গালি command v3",
  category: "fun",
  usages: "murgi3 [@mention]",
  cooldowns: 5
};

module.exports.run = async function ({ api, args, Users, event }) {
  const mention = Object.keys(event.mentions)[0];
  if (!mention) return api.sendMessage("কারে গালি দিতে চাস @ম্যানশন কর আগে 😒", event.threadID);

  const name = event.mentions[mention];
  const arraytag = [{ id: mention, tag: name }];
  const a = (msg) => api.sendMessage(msg, event.threadID);

  a("শুরু হোক তোর বিচার 😈");
  setTimeout(() => a({ body: "শালার পোলা তুই কি মানুষ নাকি আবর্জনা 🗑️ " + name, mentions: arraytag }), 3000);
  setTimeout(() => a({ body: "তর জন্মের সময় ডাক্তার কাঁদছিল কারণ তুই পৃথিবীতে এসেছিস 😭 " + name, mentions: arraytag }), 5000);
  setTimeout(() => a({ body: "তর আম্মু তোরে জন্ম দিয়া ভুল করছে মাগির পোলা 🤦 " + name, mentions: arraytag }), 7000);
  setTimeout(() => a({ body: "তর মুখ দেখলে কুত্তাও ভাগে 🐕 " + name, mentions: arraytag }), 9000);
  setTimeout(() => a({ body: "বস্তির ময়লা তুই অনলাইনে আইসা কী করস 🤮 " + name, mentions: arraytag }), 12000);
  setTimeout(() => a({ body: "তর বাপের নাম জানিস তো নাকি সেটাও জানস না মাগির পোলা 😂 " + name, mentions: arraytag }), 15000);
  setTimeout(() => a({ body: "তর মারে রাস্তায় পাই তো একটা থাপ্পড় দিমু 🤛 " + name, mentions: arraytag }), 17000);
  setTimeout(() => a({ body: "তোর চেহারা দেখলে ভূতেও ভয় পায় 👻 " + name, mentions: arraytag }), 20000);
  setTimeout(() => a({ body: "গরুর বাচ্চা তুই কথা বলিস ক্যান 🐄 " + name, mentions: arraytag }), 23000);
  setTimeout(() => a({ body: "তর IQ আর জুতার সাইজ একই মাগির পোলা 👟 " + name, mentions: arraytag }), 25000);
  setTimeout(() => a({ body: "শুয়োরের বাচ্চা তর আম্মু তোরে বাজারে বিক্রি করে দিলে ভালো হইত 🐷 " + name, mentions: arraytag }), 28500);
  setTimeout(() => a({ body: "তর দাঁত দেখলে মনে হয় দাঁত ব্রাশ কী জিনিস জানিস না 🦷 " + name, mentions: arraytag }), 31000);
  setTimeout(() => a({ body: "মাদারচোদ তুই কি মানুষের বাচ্চা নাকি ডাস্টবিনের 🗑️ " + name, mentions: arraytag }), 36000);
  setTimeout(() => a("~ Emon বলছে তুই পৃথিবীর সবচেয়ে বেকার মানুষ 🤖"), 39000);
  setTimeout(() => a({ body: "তর পেট থেকে কি গন্ধ বের হয় নাকি মুখ থেকে দুটোই সমান 😷 " + name, mentions: arraytag }), 42000);
  setTimeout(() => a({ body: "হাঁদারাম মাগির পোলা ক্লাসে কখনো পাস করছিস 🎓 " + name, mentions: arraytag }), 48000);
  setTimeout(() => a({ body: "তর বন্ধু নাই কারণ তুই নিজেই সহ্য করা যায় না 😤 " + name, mentions: arraytag }), 51000);
  setTimeout(() => a({ body: "ফাটা কন্ডমের বাচ্চা তুই এখানে কেন 🤣 " + name, mentions: arraytag }), 54000);
  setTimeout(() => a({ body: "তর মারে দেখলে মনে হয় তোরে জন্ম না দিলেই ভালো হইত 💀 " + name, mentions: arraytag }), 57000);
  setTimeout(() => a({ body: "শালার পোলা আয়নায় নিজের মুখ দেখছিস কখনো 🪞 " + name, mentions: arraytag }), 59400);
  setTimeout(() => a({ body: "তর মাথায় যা আছে সেটা মগজ না তুলার মাখন 🧠 " + name, mentions: arraytag }), 63000);
  setTimeout(() => a({ body: "বাজারের সস্তা মাল তুই অনলাইনে কী দেখাস 🛒 " + name, mentions: arraytag }), 66000);
  setTimeout(() => a({ body: "মাগির পোলা তোর জন্য দুনিয়া লজ্জা পায় 🌍 " + name, mentions: arraytag }), 69000);
  setTimeout(() => a({ body: "তর আম্মু তোরে আদর করে কীভাবে এই প্রশ্ন আমার 😂 " + name, mentions: arraytag }), 72000);
  setTimeout(() => a({ body: "গাধার বাচ্চা একটু চুপ থাক 🫏 " + name, mentions: arraytag }), 75000);
  setTimeout(() => a({ body: "Emon এর কাছে তুই কিছুই না মাগির পোলা ✋ " + name, mentions: arraytag }), 81000);
  setTimeout(() => a({ body: "তর বাপ তোরে দেখলে মুখ লুকায় 😂 " + name, mentions: arraytag }), 87000);
  setTimeout(() => a("~ জা ভাগ তোর মুখ দেখতে চাই না 🤖"), 93000);
};
