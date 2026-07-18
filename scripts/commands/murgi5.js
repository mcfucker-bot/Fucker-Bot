module.exports.config = {
  name: "murgi5",
  version: "1.0.0",
  permission: 2,
  credits: "Emon",
  prefix: false,
  description: "গালি command v5",
  category: "fun",
  usages: "murgi5 [@mention]",
  cooldowns: 5
};

module.exports.run = async function ({ api, args, Users, event }) {
  const mention = Object.keys(event.mentions)[0];
  if (!mention) return api.sendMessage("আরে ভাই কারে গালি দিবা আগে @ট্যাগ করো 🙃", event.threadID);

  const name = event.mentions[mention];
  const arraytag = [{ id: mention, tag: name }];
  const a = (msg) => api.sendMessage(msg, event.threadID);

  a("তোর পালা শুরু হইল 😤");
  setTimeout(() => a({ body: "তোর মাথায় কি মগজ আছে নাকি শুধু বাতাস 💨 " + name, mentions: arraytag }), 3000);
  setTimeout(() => a({ body: "মাগির পোলা তোর বাবা কি জানে তুই কোথায় জন্মাইছিস 😂 " + name, mentions: arraytag }), 5000);
  setTimeout(() => a({ body: "তোর চেহারা দেখলে ছোট বাচ্চাও কাঁদে 👶 " + name, mentions: arraytag }), 7000);
  setTimeout(() => a({ body: "শালার পোলা তুই কি ঘুমের মধ্যে আবালের স্বপ্ন দেখিস 😴 " + name, mentions: arraytag }), 9000);
  setTimeout(() => a({ body: "তর শরীর থেকে কি গন্ধ বের হয় নাকি ডেটল দিয়া গোসল করিস না 🧼 " + name, mentions: arraytag }), 12000);
  setTimeout(() => a({ body: "কুকুরের চেয়েও কম বুদ্ধি তোর মাগির পোলা 🐕 " + name, mentions: arraytag }), 15000);
  setTimeout(() => a({ body: "তোর বাপ মা তোরে দেখলে নিশ্চয়ই লজ্জা পায় 😞 " + name, mentions: arraytag }), 17000);
  setTimeout(() => a({ body: "মাদারচোদ তোর ব্রেইন কি কেউ চুরি করে নিয়ে গেছে 🧠 " + name, mentions: arraytag }), 20000);
  setTimeout(() => a({ body: "তর জীবন একটা বাজে সিনেমা যেখানে কোনো হিরো নেই 🎬 " + name, mentions: arraytag }), 23000);
  setTimeout(() => a({ body: "হাঁদারাম তুই কি বড় হয়ে ভিখারি হবি 🤲 " + name, mentions: arraytag }), 25000);
  setTimeout(() => a({ body: "Emon তোর নাম শুনলে হাসে কারণ তুই একটা জোকস 😂 " + name, mentions: arraytag }), 28500);
  setTimeout(() => a({ body: "তর কথা শুনলে মনে হয় একটা রোবট নষ্ট হয়ে গেছে 🤖 " + name, mentions: arraytag }), 31000);
  setTimeout(() => a({ body: "শুয়োরের বাচ্চা তুই কি কখনো আয়নায় নিজেকে দেখিস 🪞 " + name, mentions: arraytag }), 36000);
  setTimeout(() => a("~ Emon বলে তুই একটা বায়োহ্যাজার্ড 🤖"), 39000);
  setTimeout(() => a({ body: "তর মারে দেখলে মনে হয় ওনার একমাত্র ভুল তুই 😭 " + name, mentions: arraytag }), 42000);
  setTimeout(() => a({ body: "তোর অনলাইন অ্যাকাউন্ট থাকা উচিত না মাগির পোলা 🚫 " + name, mentions: arraytag }), 48000);
  setTimeout(() => a({ body: "গাধার বাচ্চা তুই কি কখনো পড়াশোনা করছিস 📖 " + name, mentions: arraytag }), 51000);
  setTimeout(() => a({ body: "তর মুখ দেখলে মনে হয় প্লাস্টিক সার্জারির দরকার আছে 🏥 " + name, mentions: arraytag }), 54000);
  setTimeout(() => a({ body: "মাগির পোলা তুই কথা বলা বন্ধ কর সবাই কষ্ট পায় 😩 " + name, mentions: arraytag }), 57000);
  setTimeout(() => a({ body: "তোর বুদ্ধি আর একটা ঢিলের মধ্যে পার্থক্য নেই 🪨 " + name, mentions: arraytag }), 59400);
  setTimeout(() => a({ body: "মাদারচোদ তুই কি কখনো লজ্জা পাস 😳 " + name, mentions: arraytag }), 63000);
  setTimeout(() => a({ body: "তর অস্তিত্ব পৃথিবীর বোঝা মাগির পোলা 🌍 " + name, mentions: arraytag }), 66000);
  setTimeout(() => a({ body: "কুত্তার বাচ্চা তোরে দেখলে ঘেন্না লাগে 🤢 " + name, mentions: arraytag }), 69000);
  setTimeout(() => a({ body: "তোর বাপের নাম কি তুই নিজে জানিস তো শালার পোলা 😂 " + name, mentions: arraytag }), 72000);
  setTimeout(() => a({ body: "তুই পৃথিবীতে না আসলে পৃথিবী আরো সুন্দর হইত মাগির পোলা 🌸 " + name, mentions: arraytag }), 75000);
  setTimeout(() => a({ body: "Emon এর কাছে তুই শূন্য মাগির পোলা 0️⃣ " + name, mentions: arraytag }), 81000);
  setTimeout(() => a({ body: "তর বংশে কি এরকম আবাল বেশি নাকি তুই একা 😂 " + name, mentions: arraytag }), 87000);
  setTimeout(() => a("~ চলে যা মাগির পোলা আর দেখাস না 🤖"), 93000);
};
