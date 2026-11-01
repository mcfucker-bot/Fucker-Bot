module.exports.config = {
  name: "😔",
  version: "2.0.1",
  prefix: false,
  permission: 0,
  credits: "Emon",
  description: "😔 emoji trigger with video",
  category: "fun",
  usages: "😔",
  cooldowns: 5
};
module.exports.handleEvent = function ({ api, event }) {
  const body = (event.body || "").trim();
  // শুধু ঠিক "😔" দিয়ে শুরু হলেই ট্রিগার হবে
  if (!body.startsWith("😔")) return;
  const fs = require("fs");
  const path = require("path");
  // ভিডিও লোকেশন: noprefix/sad.mp4
  const video = path.join(__dirname, "noprefix", "sad.mp4");
  // এক লাইনে সঠিক স্ট্রিং (কোনো লাইন-ব্রেক নেই)
  const msg = {
    body: "মন থেকে ভালোবাসি বলে আজ এত কষ্ট পাইতেছি, যদি অন্যদের মত টাইম পাস করতাম তাহলে আমিও তাদের মতো হাসি খুশি থাকতাম 💔😔"
  };
  // ভিডিও ফাইল থাকলে অ্যাটাচ করবে
  if (fs.existsSync(video)) {
    msg.attachment = fs.createReadStream(video);
  }
  api.sendMessage(msg, event.threadID, (err) => {
    if (err) console.error("Cry video send error:", err);
  }, event.messageID);
  // রিঅ্যাকশন আলাদা ট্রাই-ক্যাচে, যাতে এখানে এরর হলেও মেসেজ আটকে না যায়
  try {
    api.setMessageReaction("😔", event.messageID, () => {}, true);
  } catch (e) {
    console.error("Reaction error:", e);
  }
};
