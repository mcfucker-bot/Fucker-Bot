module.exports.config = {
  name: "vb",
  version: "1.0.0",
  permission: 0,
  credits: "Emon",
  prefix: 'awto',
  description: "Voice bot — text to speech reply",
  category: "user",
  usages: "vb [text] | reply to a message",
  cooldowns: 5
};

module.exports.run = async function({ api, event, args }) {
  const axios = require("axios");
  const fs = require("fs");
  const { threadID, messageID } = event;

  const text = (event.type === "message_reply") ? event.messageReply.body : args.join(" ");

  if (!text) return api.sendMessage(
    `╔══════════════════╗\n   🎙️ VOICE BOT HELP   \n╚══════════════════╝\n\n📌 ব্যবহার :\n▸ vb [text]\n▸ কোনো message এ reply দিয়ে vb`,
    threadID, messageID
  );

  api.setMessageReaction("⏳", messageID, () => {}, true);

  try {
    const res = await axios.get(
      `https://translate.google.com/translate_tts?ie=UTF-8&tl=bn&client=tw-ob&q=${encodeURIComponent(text)}`,
      { responseType: "arraybuffer" }
    );

    const audioPath = `${__dirname}/cache/vb_${event.senderID}.mp3`;
    fs.writeFileSync(audioPath, Buffer.from(res.data));

    api.setMessageReaction("✅", messageID, () => {}, true);
    return api.sendMessage({
      body: `╔══════════════════╗\n   🎙️ VOICE BOT   \n╚══════════════════╝\n\n✅ Voice তৈরি হয়েছে!\n📝 "${text.length > 60 ? text.substring(0, 60) + '...' : text}"\n\n══════════════════\n💎 EMon-BHai-BOT`,
      attachment: fs.createReadStream(audioPath)
    }, threadID, () => fs.unlinkSync(audioPath), messageID);
  } catch (err) {
    api.setMessageReaction("❌", messageID, () => {}, true);
    console.error(err);
    return api.sendMessage(`❌ Voice তৈরি করতে সমস্যা হয়েছে।`, threadID, messageID);
  }
};
