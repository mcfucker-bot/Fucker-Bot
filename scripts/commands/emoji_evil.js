module.exports.config = {
  name: "😈",
  version: "1.0.0",
  prefix: false,
  permission: 0,
  credits: "Emon",
  description: "😈 emoji trigger",
  category: "fun",
  usages: "😈",
  cooldowns: 5
};

module.exports.handleEvent = function ({ api, event }) {
  const body = (event.body || "").trim();
  if (!body.startsWith("😈")) return;

  const fs   = require("fs");
  const path = require("path");
  const mp3  = path.join(__dirname, "Emon", "evil.mp3");

  const msg = {
    body: "শয়তান মোড অন 😈🔥\nআমি যখন হাসি, তখন সবার ভয় পাওয়া উচিত 😏"
  };
  if (fs.existsSync(mp3)) msg.attachment = fs.createReadStream(mp3);

  api.sendMessage(msg, event.threadID, event.messageID);
  api.setMessageReaction("😈", event.messageID, () => {}, true);
};
