module.exports.config = {
  name: "sketch",
  version: "1.0.0",
  permission: 0,
  credits: "Emon",
  prefix: 'awto',
  description: "Convert a photo to sketch/drawing",
  category: "user",
  usages: "sketch [reply to a photo]",
  cooldowns: 10
};

module.exports.run = async function({ api, event, args }) {
  const axios = require("axios");
  const { threadID, messageID } = event;

  if (event.type !== "message_reply" || !event.messageReply.attachments || event.messageReply.attachments.length === 0)
    return api.sendMessage(
      `╔══════════════════╗\n   ✏️ SKETCH HELP   \n╚══════════════════╝\n\n📌 কোনো ছবিতে reply দিয়ে এই command দাও।`,
      threadID, messageID
    );
  if (event.messageReply.attachments[0].type !== "photo")
    return api.sendMessage(`❌ ছবিতে reply দাও!`, threadID, messageID);

  api.setMessageReaction("⏳", messageID, () => {}, true);

  try {
    const imgUrl = event.messageReply.attachments[0].url;
    const res = await axios.get(`https://api.onfacebook.tech/v1/sketch?url=${encodeURIComponent(imgUrl)}`, { responseType: "stream" });

    api.setMessageReaction("✅", messageID, () => {}, true);
    return api.sendMessage({
      body: `╔══════════════════╗\n   ✏️ SKETCH DONE!   \n╚══════════════════╝\n\n✅ তোমার ছবির sketch তৈরি হয়েছে!\n\n══════════════════\n💎 EMon-BHai-BOT`,
      attachment: res.data
    }, threadID, messageID);
  } catch (err) {
    api.setMessageReaction("❌", messageID, () => {}, true);
    console.error(err);
    return api.sendMessage(`❌ Sketch তৈরি করতে সমস্যা হয়েছে।`, threadID, messageID);
  }
};
