module.exports.config = {
  name: "🖕",
  version: "2.0.0",
  prefix: false,
  permission: 2,
  credits: "Emon",
  description: "🖕 emoji trigger with audio",
  category: "fun",
  usages: "🖕",
  cooldowns: 5
};

module.exports.handleEvent = function ({ api, event }) {
  const body = (event.body || "").trim();

  if (!body.startsWith("🖕")) return;

  const fs = require("fs");
  const path = require("path");

  // Audio location: noprefix/fuck.mp3
  const audio = path.join(__dirname, "noprefix", "fuck.mp3");

  const msg = {
    body: "চুদা ল"
  };

  if (fs.existsSync(audio)) {
    msg.attachment = fs.createReadStream(audio);
  }

  api.sendMessage(msg, event.threadID, (err) => {
    if (err) console.error("Audio send error:", err);
  }, event.messageID);

  api.setMessageReaction(
    "🖕",
    event.messageID,
    () => {},
    true
  );
};
