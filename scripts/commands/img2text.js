module.exports.config = {
  name: "img2text",
  version: "1.0.0",
  permission: 0,
  credits: "Emon",
  prefix: 'awto',
  description: "Extract text from an image (OCR)",
  category: "utility",
  usages: "img2text [reply to a photo]",
  cooldowns: 10
};

module.exports.run = async function({ api, event, args }) {
  const axios = require("axios");
  const { threadID, messageID } = event;

  if (event.type !== "message_reply" || !event.messageReply.attachments || event.messageReply.attachments.length === 0)
    return api.sendMessage(
      `╔══════════════════╗\n   📝 IMG2TEXT HELP   \n╚══════════════════╝\n\n📌 কোনো ছবিতে reply দিয়ে এই command দাও।`,
      threadID, messageID
    );
  if (event.messageReply.attachments[0].type !== "photo")
    return api.sendMessage(`❌ ছবিতে reply দাও!`, threadID, messageID);

  api.setMessageReaction("⏳", messageID, () => {}, true);

  try {
    const imgUrl = event.messageReply.attachments[0].url;
    const res = await axios.get(
      `https://image.pollinations.ai/prompt/Extract all text from this image, return only the text: ${encodeURIComponent(imgUrl)}`
    );
    const text = res.data || "কোনো text পাওয়া যায়নি।";

    api.setMessageReaction("✅", messageID, () => {}, true);
    return api.sendMessage(
      `╔══════════════════╗\n   📝 IMAGE TO TEXT   \n╚══════════════════╝\n\n${text}\n\n══════════════════\n💎 EMon-BHai-BOT`,
      threadID, messageID
    );
  } catch (err) {
    api.setMessageReaction("❌", messageID, () => {}, true);
    console.error(err);
    return api.sendMessage(`❌ Text পড়তে সমস্যা হয়েছে।`, threadID, messageID);
  }
};
