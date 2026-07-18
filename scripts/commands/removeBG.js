module.exports.config = {
  name: "removeBG",
  version: "1.0.0",
  permission: 0,
  credits: "Emon",
  prefix: 'awto',
  description: "Remove background from a photo",
  category: "user",
  usages: "removeBG [reply to a photo]",
  cooldowns: 10
};

module.exports.run = async function({ api, event, args }) {
  const axios = require("axios");
  const FormData = require("form-data");
  const { threadID, messageID } = event;

  if (event.type !== "message_reply" || !event.messageReply.attachments || event.messageReply.attachments.length === 0)
    return api.sendMessage(
      `╔══════════════════╗\n   🖼️ REMOVE BG HELP   \n╚══════════════════╝\n\n📌 কোনো ছবিতে reply দিয়ে এই command দাও।`,
      threadID, messageID
    );
  if (event.messageReply.attachments[0].type !== "photo")
    return api.sendMessage(`❌ ছবিতে reply দাও!`, threadID, messageID);

  api.setMessageReaction("⏳", messageID, () => {}, true);

  try {
    const imgUrl = event.messageReply.attachments[0].url;
    const form = new FormData();
    form.append("image_url", imgUrl);
    form.append("size", "auto");

    const res = await axios({
      method: "post",
      url: "https://api.remove.bg/v1.0/removebg",
      data: form,
      responseType: "stream",
      headers: { ...form.getHeaders(), "X-Api-Key": "YOUR_REMOVE_BG_KEY" }
    });

    api.setMessageReaction("✅", messageID, () => {}, true);
    return api.sendMessage({
      body: `╔══════════════════╗\n   🖼️ BACKGROUND REMOVED   \n╚══════════════════╝\n\n✅ Background সফলভাবে সরানো হয়েছে!\n\n══════════════════\n💎 EMon-BHai-BOT`,
      attachment: res.data
    }, threadID, messageID);
  } catch (err) {
    api.setMessageReaction("❌", messageID, () => {}, true);
    console.error(err);
    return api.sendMessage(`❌ Background সরাতে সমস্যা হয়েছে। আবার চেষ্টা করো।`, threadID, messageID);
  }
};
