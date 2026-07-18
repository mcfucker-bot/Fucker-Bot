module.exports.config = {
  name: "murgi6",
  version: "1.0.0",
  permission: 2,
  credits: "Emon",
  prefix: false,
  description: "গালি command v6",
  category: "fun",
  usages: "murgi6 [@mention]",
  cooldowns: 5
};

module.exports.run = async function ({ api, args, Users, event }) {
  const mention = Object.keys(event.mentions)[0];
  if (!mention) return api.sendMessage("ভাই কাকে ধোলাই দিবা @ট্যাগ করো 😏", event.threadID);

  const name = event.mentions[mention];
  const arraytag = [{ id: mention, tag: name }];
  const a = (msg) => api.sendMessage(msg, event.threadID);

  a("আজকে তোর খবর আছে 😈");
  setTimeout(() => a({ body: "মাগির পোলা তোর জন্মই হইছিল ভুলে 🤦 " + name, mentions: arraytag }), 3000);
  setTimeout(() => a({ body: "তোর মুখ খুললে মনে হয় বাজে গান চালু হয়েছে 🎵 " + name, mentions: arraytag }), 5000);
  setTimeout(() => a({ body: "কুকুরও তোর চেয়ে বেশি বুদ্ধিমান মাগির পোলা 🐕 " + name, mentions: arraytag }), 7000);
  setTimeout(() => a({ body: "তর শরীরে কি হাড় আছে নাকি শুধু চর্বি মাগির পোলা 💀 " + name, mentions: arraytag }), 9000);
  setTimeout(() => a({ body: "তোর মতো মানুষ দেখলে ডাক্তারও ভয় পায় 🏥 " + name, mentions: arraytag }), 12000);
  setTimeout(() => a({ body: "শালার পোলা তুই কি ঘুমের মধ্যেও বোকামি করিস 😴 " + name, mentions: arraytag }), 15000);
  setTimeout(() => a({ body: "তোর বাপ মা তোর জন্য রোজ দোয়া করে যাতে তুই মানুষ হস 🤲 " + name, mentions: arraytag }), 17000);
  setTimeout(() => a({ body: "হাঁদারাম তোর চেহারা দেখলে ভূতেও ভয় পায় 👻 " + name, mentions: arraytag }), 20000);
  setTimeout(() => a({ body: "মাদারচোদ তুই কি কখনো ঠিকমতো গোসল করিস 🚿 " + name, mentions: arraytag }), 23000);
  setTimeout(() => a({ body: "তোর কথা শুনলে কানে তালা লেগে যায় মাগির পোলা 👂 " + name, mentions: arraytag }), 25000);
  setTimeout(() => a({ body: "Emon এর সামনে তুই একটা মশার চেয়েও ছোট 🦟 " + name, mentions: arraytag }), 28500);
  setTimeout(() => a({ body: "তর বাপের নামও লজ্জা পায় তোর কারণে 😳 " + name, mentions: arraytag }), 31000);
  setTimeout(() => a({ body: "গরুর বাচ্চা তুই কি কখনো পড়াশোনা করছিস 📚 " + name, mentions: arraytag }), 36000);
  setTimeout(() => a("~ Emon বলে তোর অ্যাকাউন্ট ব্যান হওয়া দরকার 🤖"), 39000);
  setTimeout(() => a({ body: "তর মারে জিজ্ঞেস করছিস তুই কবে মানুষ হবি 👩 " + name, mentions: arraytag }), 42000);
  setTimeout(() => a({ body: "মাগির পোলা তোর ব্রেইনের সাইজ একটা বাদামের চেয়েও ছোট 🥜 " + name, mentions: arraytag }), 48000);
  setTimeout(() => a({ body: "তোর অনলাইন অ্যাক্টিভিটি দেখলে পুলিশও হাসে 😂 " + name, mentions: arraytag }), 51000);
  setTimeout(() => a({ body: "শুয়োরের বাচ্চা তুই মানুষের মধ্যে গণনা হস না 🚫 " + name, mentions: arraytag }), 54000);
  setTimeout(() => a({ body: "তোর জীবনে কোনো লক্ষ্য আছে নাকি শুধু বেকার ঘুরিস 🌀 " + name, mentions: arraytag }), 57000);
  setTimeout(() => a({ body: "মাদারচোদ তুই কি ঘুম থেকে উঠলে আয়না দেখিস নাকি সাহস নেই 🪞 " + name, mentions: arraytag }), 59400);
  setTimeout(() => a({ body: "কুত্তার পোলা তোর নামটাও একটা জোকস 😂 " + name, mentions: arraytag }), 63000);
  setTimeout(() => a({ body: "তর আম্মু তোরে কোলে নিছিল নাকি দূরে ছুড়ে দিছিল 🤣 " + name, mentions: arraytag }), 66000);
  setTimeout(() => a({ body: "মাগির পোলা তোর অস্তিত্ব পৃথিবীর সবচেয়ে বড় রহস্য 🌍 " + name, mentions: arraytag }), 69000);
  setTimeout(() => a({ body: "তোর বুদ্ধি দেখলে মনে হয় বিবর্তন তোরে বাদ দিয়ে গেছে 🦧 " + name, mentions: arraytag }), 72000);
  setTimeout(() => a({ body: "শালার পোলা তুই কি মানুষ নাকি AI এর ভুল output 🤖 " + name, mentions: arraytag }), 75000);
  setTimeout(() => a({ body: "Emon এর কাছে তুই সারাজীবন হারবি মাগির পোলা 🏆 " + name, mentions: arraytag }), 81000);
  setTimeout(() => a({ body: "তর বংশে কি আর কেউ তোর মতো আবাল আছে নাকি তুই একাই বিশেষ 🎗️ " + name, mentions: arraytag }), 87000);
  setTimeout(() => a("~ জা ভাগ আর কখনো সামনে আসিস না মাগির পোলা 🤖"), 93000);
};
