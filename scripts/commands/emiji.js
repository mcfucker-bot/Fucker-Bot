const fs = require("fs");
const path = require("path");

module.exports.config = {
  name: "noprefix",
  aliases: [],
  version: "1.0.0",
  permission: 0,
  credits: "EMon-BHai",
  description: "Emoji Reply With Video",
  category: "noprefix",
  usages: "Any Emoji",
  cooldowns: 5
};

module.exports.handleEvent = async function ({ api, event }) {
  const { threadID, messageID, body } = event;

  if (!body || !body.trim()) return;

  // Emoji detect
  const emojiRegex = /[\p{Extended_Pictographic}]/u;

  if (!emojiRegex.test(body)) return;

  // Video path
  const videoPath = path.join(__dirname, "noprefix", "1.mp4");

  const msg = `🥰 তোমার পাঠানো ইমোজিটা অনেক সুন্দর! ❤️
সবসময় এভাবেই হাসিখুশি থেকো। 🌸
💖 ভালোবাসা রইলো তোমার জন্য!`;

  if (fs.existsSync(videoPath)) {
    return api.sendMessage(
      {
        body: msg,
        attachment: fs.createReadStream(videoPath)
      },
      threadID,
      messageID
    );
  } else {
    return api.sendMessage(
      msg + "\n\n❌ Video not found!",
      threadID,
      messageID
    );
  }
};

module.exports.run = async function () {};
