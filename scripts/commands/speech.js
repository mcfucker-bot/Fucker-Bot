module.exports.config = {
  name: "speech",
  version: "2.0.0",
  permission: 0,
  credits: "Emon",
  prefix: 'awto',
  description: "Convert text to voice (Bangla/English)",
  category: "user",
  usages: "speech [text] | reply to a message",
  cooldowns: 5
};

module.exports.run = async function({ api, event, args }) {
  const { threadID, messageID } = event;
  const axios = require("axios");
  const fs = require("fs-extra");
  const path = require("path");

  const content = (event.type === "message_reply") ? event.messageReply.body : args.join(" ");

  if (!content) return api.sendMessage(
    `╔══════════════════╗\n   🔊 SPEECH HELP   \n╚══════════════════╝\n\n📌 ব্যবহার :\n▸ speech [text]\n▸ কোনো message এ reply দিয়ে speech`,
    threadID, messageID
  );

  api.setMessageReaction("⏳", messageID, () => {}, true);

  try {
    // Detect language — if contains Bangla chars use bn, else en
    const isBangla = /[\u0980-\u09FF]/.test(content);
    const lang = isBangla ? "bn" : "en";

    const ttsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(content)}&tl=${lang}&client=tw-ob&ttsspeed=0.9`;
    const audioPath = path.join(__dirname, "cache", `speech_${event.senderID}.mp3`);

    const res = await axios.get(ttsUrl, {
      responseType: "arraybuffer",
      timeout: 15000,
      headers: { "User-Agent": "Mozilla/5.0" }
    });

    fs.writeFileSync(audioPath, Buffer.from(res.data));

    api.setMessageReaction("✅", messageID, () => {}, true);
    return api.sendMessage({
      body: `╔══════════════════╗\n   🔊 TEXT TO VOICE   \n╚══════════════════╝\n\n✅ Voice তৈরি হয়েছে!\n🌐 ভাষা : ${isBangla ? "বাংলা 🇧🇩" : "English 🇬🇧"}\n📝 "${content.length > 60 ? content.substring(0, 60) + "..." : content}"\n\n══════════════════\n💎 EMon-BHai-BOT`,
      attachment: fs.createReadStream(audioPath)
    }, threadID, () => {
      try { fs.unlinkSync(audioPath); } catch (e) {}
    });
  } catch (err) {
    api.setMessageReaction("❌", messageID, () => {}, true);
    console.error("[speech.js]", err.message);
    return api.sendMessage(`❌ Voice তৈরি করতে সমস্যা হয়েছে।\n▸ ${err.message}`, threadID, messageID);
  }
};
