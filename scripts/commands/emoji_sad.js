module.exports.config = {
  name: "😔",
  version: "2.0.0",
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

  if (!body.startsWith("😔")) return;

  const fs = require("fs");
  const path = require("path");

  // Video location: noprefix/love.mp4
  const video = path.join(__dirname, "noprefix", "sad.mp4");

  const msg = {
    body: "মন থেকে ভালোবাসি বলে_আজ_এত কষ্ট পাইতেছি যদি
অন্যদের মত\nটাইম পাস করতাম_তাহলে আমিও\nতাদের মতো হাসি খুশি_থাকতাম💔😔
"
  };

  if (fs.existsSync(video)) {
    msg.attachment = fs.createReadStream(video);
  }

  api.sendMessage(msg, event.threadID, (err) => {
    if (err) console.error("Cry video send error:", err);
  }, event.messageID);

  api.setMessageReaction(
    "😔",
    event.messageID,
    () => {},
    true
  );
};
