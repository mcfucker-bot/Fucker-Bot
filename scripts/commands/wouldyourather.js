module.exports.config = {
  name: "wouldyourather",
  version: "1.0.0",
  permission: 0,
  credits: "EMon",
  prefix: true,
  description: "Would you rather game",
  category: "fun",
  usages: "wouldyourather | wyr",
  cooldowns: 5
};

module.exports.run = async function({ api, event }) {
  const { threadID, messageID } = event;
  const questions = [
    ["সারাজীবন ধনী কিন্তু একা থাকবে", "সারাজীবন গরিব কিন্তু সত্যিকারের বন্ধু থাকবে"],
    ["সুপার স্পিডে দৌড়াতে পারবে", "উড়তে পারবে"],
    ["ভবিষ্যৎ দেখতে পারবে", "অতীত পরিবর্তন করতে পারবে"],
    ["সব প্রাণীর সাথে কথা বলতে পারবে", "যেকোনো ভাষায় কথা বলতে পারবে"],
    ["একবার ৫ বছরের ঘুম ঘুমাবে", "প্রতিরাতে মাত্র ২ ঘণ্টা ঘুমাবে সারাজীবন"],
    ["Fame কিন্তু কোনো টাকা নেই", "অনেক টাকা কিন্তু কেউ চেনে না"],
    ["মাকড়সা খাবে", "তেলাপোকা খাবে"],
    ["সারাজীবন internet ছাড়া", "সারাজীবন AC ছাড়া"],
    ["৩ দিন বাঁচবে কিন্তু immortal হবে", "১০০ বছর বাঁচবে normal মানুষ হিসেবে"],
    ["মনের কথা পড়তে পারবে", "অদৃশ্য হতে পারবে"],
    ["Google-এর CEO", "Apple-এর CEO"],
    ["পৃথিবীর সবচেয়ে বুদ্ধিমান মানুষ", "পৃথিবীর সবচেয়ে সুন্দর মানুষ"],
    ["সকালে ঘুম থেকে উঠতে পারবে না", "রাতে ঘুমাতে পারবে না"],
    ["Movie-তে hero হবে", "Villain হবে"],
    ["যা চাইবে তাই খেতে পারবে কিন্তু taste পাবে না", "সব taste পাবে কিন্তু পছন্দের খাবার নেই"]
  ];
  const q = questions[Math.floor(Math.random() * questions.length)];
  api.setMessageReaction("🤔", messageID, () => {}, true);
  return api.sendMessage(
    `🤔 WOULD YOU RATHER? 🤔\n━━━━━━━━━━━━━━━━━━\n\n🔴 Option A:\n${q[0]}\n\n            অথবা\n\n🔵 Option B:\n${q[1]}\n\n━━━━━━━━━━━━━━━━━━\n🗳️ Comment করো: A নাকি B?\n💎 EMon-BHai-BOT`,
    threadID, messageID
  );
};
