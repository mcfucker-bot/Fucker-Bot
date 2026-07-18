module.exports.config = {
  name: "imgur",
  version: "1.0.0",
  permission: 0,
  credits: "Emon",
  prefix: 'awto',
  description: "Upload an image to Imgur and get a link",
  category: "utility",
  usages: "imgur [reply to a photo]",
  cooldowns: 10
};

module.exports.run = async function({ api, event }) {
  const axios = require("axios");
  const { threadID, messageID } = event;

  if (event.type !== "message_reply" || !event.messageReply.attachments || event.messageReply.attachments.length === 0)
    return api.sendMessage(
      `╔══════════════════╗\n   📤 IMGUR HELP   \n╚══════════════════╝\n\n📌 কোনো ছবিতে reply দিয়ে imgur command দাও।`,
      threadID, messageID
    );
  if (event.messageReply.attachments[0].type !== "photo")
    return api.sendMessage(`❌ ছবিতে reply দাও!`, threadID, messageID);

  api.setMessageReaction("⏳", messageID, () => {}, true);

  try {
    const imgUrl = event.messageReply.attachments[0].url;
    const res = await axios.post("https://api.imgur.com/3/image", { image: imgUrl, type: "url" }, {
      headers: { Authorization: "Client-ID 546c25a59c58ad7" }
    });

    api.setMessageReaction("✅", messageID, () => {}, true);
    return api.sendMessage(
      `╔══════════════════╗\n   📤 IMGUR UPLOAD   \n╚══════════════════╝\n\n✅ Upload সফল!\n🔗 Link : ${res.data.data.link}\n🗑️ Delete : ${res.data.data.deletehash}\n\n══════════════════\n💎 EMon-BHai-BOT`,
      threadID, messageID
    );
  } catch (err) {
    api.setMessageReaction("❌", messageID, () => {}, true);
    console.error(err);
    return api.sendMessage(`❌ Upload করতে সমস্যা হয়েছে।`, threadID, messageID);
  }
};
