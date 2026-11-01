module.exports.config = {
  name: "😢",
  version: "2.1.0",
  prefix: false,
  permission: 0,
  credits: "Emon",
  description: "😢 sad emoji trigger with sad video",
  category: "fun",
  usages: "😢",
  cooldowns: 5
};

module.exports.handleEvent = function ({ api, event }) {
  const body = (event.body || "").trim();

  if (!body.startsWith("😢")) return;

  const fs = require("fs");
  const path = require("path");

  // Sad video location: noprefix/sad.mp4
  const video = path.join(__dirname, "noprefix", "sad.mp4");

  const msg = {
    body: "কেউ পাশে নেই, কেউ বুঝে না আমাকে 😢💔\nসবাই চলে যায়, শুধু কষ্টটা থেকে যায়...\n\nআমি ভালো আছি বলে সবাই ভাবে,\nকিন্তু ভেতরে ভেতরে আমি ভেঙে পড়ছি 💔😢"
  };

  if (fs.existsSync(video)) {
    msg.attachment = fs.createReadStream(video);
  }

  api.sendMessage(msg, event.threadID, (err) => {
    if (err) console.error("Sad video send error:", err);
  }, event.messageID);

  try {
    api.setMessageReaction("😢", event.messageID, () => {}, true);
  } catch (e) {
    console.error("Reaction error:", e);
  }
};
