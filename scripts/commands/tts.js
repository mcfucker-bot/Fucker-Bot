module.exports.config = {
  name: "tts",
  version: "1.0.0",
  permission: 0,
  credits: "EMon",
  prefix: true,
  description: "Text to Speech — লেখাকে কথায় রূপান্তর করো",
  category: "utility",
  usages: "tts [text]  |  tts [lang] [text]",
  cooldowns: 8
};

module.exports.run = async function({ api, event, args }) {
  const { threadID, messageID } = event;
  const axios = require("axios");
  const fs = require("fs");
  const path = require("path");

  let lang = "bn";
  let text = args.join(" ");

  // Check if first arg is a lang code (2 letters)
  if (args[0] && /^[a-z]{2}(-[A-Z]{2})?$/.test(args[0]) && args.length > 1) {
    lang = args[0];
    text = args.slice(1).join(" ");
  }

  if (!text) return api.sendMessage(
    `🔊 TTS HELP\n━━━━━━━━━━━━━━━━━━\n📌 ব্যবহার:\n▸ tts আমি ভালো আছি\n▸ tts en Hello World\n▸ tts hi Namaste\n\n🌍 কিছু lang code:\nbn=বাংলা | en=English | hi=Hindi\nar=Arabic | ja=Japanese\n━━━━━━━━━━━━━━━━━━\n💎 EMon-BHai-BOT`,
    threadID, messageID
  );

  if (text.length > 200) return api.sendMessage("❌ সর্বোচ্চ ২০০ অক্ষর দেওয়া যাবে!", threadID, messageID);

  api.setMessageReaction("⏳", messageID, () => {}, true);
  try {
    const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(text)}&tl=${lang}&client=tw-ob`;
    const tmpFile = path.join(__dirname, `../../cache/tts_${Date.now()}.mp3`);
    const res = await axios.get(url, {
      responseType: "stream",
      timeout: 15000,
      headers: { "User-Agent": "Mozilla/5.0" }
    });
    const writer = fs.createWriteStream(tmpFile);
    res.data.pipe(writer);
    await new Promise((resolve, reject) => { writer.on("finish", resolve); writer.on("error", reject); });
    api.setMessageReaction("🔊", messageID, () => {}, true);
    return api.sendMessage(
      { body: `🔊 TTS: "${text}"\n🌍 Language: ${lang}\n💎 EMon-BHai-BOT`, attachment: fs.createReadStream(tmpFile) },
      threadID, () => { try { fs.unlinkSync(tmpFile); } catch {} }, messageID
    );
  } catch (e) {
    api.setMessageReaction("❌", messageID, () => {}, true);
    return api.sendMessage(`❌ TTS error: ${e.message}`, threadID, messageID);
  }
};
