module.exports.config = {
  name: "imgurmp4",
  version: "1.0.0",
  permission: 0,
  credits: "Emon",
  prefix: 'awto',
  description: "Upload video/audio to Imgur",
  category: "utility",
  usages: "imgurmp4 [reply to a video/audio]",
  cooldowns: 10
};

module.exports.run = async function({ api, event }) {
  const axios = require("axios");
  const fs = require("fs-extra");
  const { threadID, messageID } = event;

  if (event.type !== "message_reply" || !event.messageReply.attachments || event.messageReply.attachments.length === 0)
    return api.sendMessage(
      `╔══════════════════╗\n   📤 IMGURMP4 HELP   \n╚══════════════════╝\n\n📌 Video বা audio message এ reply দিয়ে imgurmp4 command দাও।`,
      threadID, messageID
    );

  api.setMessageReaction("⏳", messageID, () => {}, true);

  try {
    const att = event.messageReply.attachments[0];
    const mediaRes = await axios.get(att.url, { responseType: "arraybuffer" });
    const base64 = Buffer.from(mediaRes.data).toString("base64");
    const type = att.type === "video" ? "video" : "image";

    const res = await axios.post(`https://api.imgur.com/3/${type}`, { image: base64, type: "base64" }, {
      headers: { Authorization: "Client-ID 546c25a59c58ad7" }
    });

    api.setMessageReaction("✅", messageID, () => {}, true);
    return api.sendMessage(
      `╔══════════════════╗\n   📤 IMGUR UPLOAD   \n╚══════════════════╝\n\n✅ Upload সফল!\n🔗 Link : ${res.data.data.link}\n📁 Type : ${type}\n\n══════════════════\n💎 EMon-BHai-BOT`,
      threadID, messageID
    );
  } catch (err) {
    api.setMessageReaction("❌", messageID, () => {}, true);
    console.error(err);
    return api.sendMessage(`❌ Upload করতে সমস্যা হয়েছে।`, threadID, messageID);
  }
};
