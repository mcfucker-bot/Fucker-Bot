module.exports.config = {
  name: "murgi4",
  version: "1.0.0",
  permission: 2,
  credits: "Emon",
  prefix: false,
  description: "গালি command v4",
  category: "fun",
  usages: "murgi4 [@mention]",
  cooldowns: 5
};

module.exports.run = async function ({ api, args, Users, event }) {
  const mention = Object.keys(event.mentions)[0];
  if (!mention) return api.sendMessage("ভাই কারে গালি দিবা @ট্যাগ করো 🙄", event.threadID);

  const name = event.mentions[mention];
  const arraytag = [{ id: mention, tag: name }];
  const a = (msg) => api.sendMessage(msg, event.threadID);

  a("তোর বিচার শুরু হইল 🔥");
  setTimeout(() => a({ body: "ওই হাঁদারাম তোর মা জানে তুই কী করস অনলাইনে 😂 " + name, mentions: arraytag }), 3000);
  setTimeout(() => a({ body: "তুই মানুষ হইতে পারবি না জন্মেছিস বেকার হইয়া 🤦 " + name, mentions: arraytag }), 5000);
  setTimeout(() => a({ body: "কুকুরের বাচ্চা তোর চেহারা দেখলে আমার খাওয়া বন্ধ হয়ে যায় 🤮 " + name, mentions: arraytag }), 7000);
  setTimeout(() => a({ body: "তর বাবা মা তোরে কোন ডাস্টবিন থেকে তুলে এনেছে 🗑️ " + name, mentions: arraytag }), 9000);
  setTimeout(() => a({ body: "তোর জীবনটা একটা বড় ভুল মাগির পোলা 💀 " + name, mentions: arraytag }), 12000);
  setTimeout(() => a({ body: "তর পোশাক দেখলে মনে হয় ভিখারি অনলাইনে এসেছে 👕 " + name, mentions: arraytag }), 15000);
  setTimeout(() => a({ body: "শালার পোলা তুই কি ঘুমের মধ্যে বোকামি করিস 😴 " + name, mentions: arraytag }), 17000);
  setTimeout(() => a({ body: "তর মাথা আর ঢিলা বাঁধাই দুটোই সমান মাগির পোলা 🧠 " + name, mentions: arraytag }), 20000);
  setTimeout(() => a({ body: "তোর মতো মানুষ দেখলে আমার হাত চুলকায় 👊 " + name, mentions: arraytag }), 23000);
  setTimeout(() => a({ body: "গরুর বংশে গরু জন্মায় তুই কোন বংশে জন্মাইছিস 🐄 " + name, mentions: arraytag }), 25000);
  setTimeout(() => a({ body: "Emon এর সামনে তুই একটা পোকা মাত্র 🐛 " + name, mentions: arraytag }), 28500);
  setTimeout(() => a({ body: "তোর কথা শুনলে কান চুলকায় মাগির পোলা 👂 " + name, mentions: arraytag }), 31000);
  setTimeout(() => a({ body: "মাদারচোদ তুই কখনো কিছু শিখবি না 📚 " + name, mentions: arraytag }), 36000);
  setTimeout(() => a("~ Emon বলে তুই পৃথিবীতে স্পেস নষ্ট করছিস 🤖"), 39000);
  setTimeout(() => a({ body: "তর বন্ধুরাও তোরে এড়িয়ে চলে কারণ তুই সহ্য করা যায় না 😤 " + name, mentions: arraytag }), 42000);
  setTimeout(() => a({ body: "হাঁদারাম তুই বড় হলে কী হবি ভিখারি না আরো বড় বেকার 🤣 " + name, mentions: arraytag }), 48000);
  setTimeout(() => a({ body: "তর আম্মু তোরে গর্ভে রাখার সময় নিশ্চয়ই কাঁদছিল 😭 " + name, mentions: arraytag }), 51000);
  setTimeout(() => a({ body: "শুয়োরের বাচ্চা তোর নামটাও মিথ্যা 😂 " + name, mentions: arraytag }), 54000);
  setTimeout(() => a({ body: "তোর চোখে চোখ রাখলে মনে হয় একটা শূন্য দেখছি 👁️ " + name, mentions: arraytag }), 57000);
  setTimeout(() => a({ body: "মাগির পোলা পৃথিবীতে থাকার লাইসেন্স তোর নেই 🚫 " + name, mentions: arraytag }), 59400);
  setTimeout(() => a({ body: "তর হাসি দেখলে ভয় লাগে এটা মানুষের হাসি নাকি হায়েনার 🦁 " + name, mentions: arraytag }), 63000);
  setTimeout(() => a({ body: "বাজারের আবর্জনা তুই অনলাইনে এসে কী করিস 🛒 " + name, mentions: arraytag }), 66000);
  setTimeout(() => a({ body: "তোর অস্তিত্ব একটা বড় ভুল ভাই 💀 " + name, mentions: arraytag }), 69000);
  setTimeout(() => a({ body: "মাগির পোলা আয়নায় একবার নিজেকে দেখ তারপর কথা বল 🪞 " + name, mentions: arraytag }), 72000);
  setTimeout(() => a({ body: "তর মতো আবাল আমি আগে কখনো দেখিনি 😂 " + name, mentions: arraytag }), 75000);
  setTimeout(() => a({ body: "Emon তোরে পাত্তাই দেয় না শালার পোলা ✋ " + name, mentions: arraytag }), 81000);
  setTimeout(() => a({ body: "তর জন্মই ছিল একটা দুর্ঘটনা মাগির পোলা 😂 " + name, mentions: arraytag }), 87000);
  setTimeout(() => a("~ জা ভাগ আর দেখাস না মুখ 🤖"), 93000);
};
