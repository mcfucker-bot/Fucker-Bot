module.exports.config = {
  name: "english",
  version: "2.0.0",
  permission: 0,
  credits: "Emon",
  prefix: false,
  description: "Translate any text to English",
  category: "user",
  usages: "english [text] | reply to a message",
  cooldowns: 5
};

module.exports.run = async ({ api, event, args }) => {
  const axios = require("axios");
  const { threadID, messageID } = event;
  const text = event.type === "message_reply" ? event.messageReply.body : args.join(" ");

  if (!text) return api.sendMessage(
    `╔══════════════════╗\n   🇬🇧 ENGLISH TRANSLATE   \n╚══════════════════╝\n\n📌 ব্যবহার :\n▸ english [text]\n▸ কোনো message এ reply করে english`,
    threadID, messageID
  );

  try {
    const res = await axios.get(
      `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=en&dt=t&q=${encodeURIComponent(text)}`,
      { timeout: 10000 }
    );
    let translated = "";
    res.data[0].forEach(item => { if (item[0]) translated += item[0]; });
    const fromLang = res.data[2] || "auto";

    return api.sendMessage(
      `╔══════════════════╗\n   🇬🇧 ENGLISH TRANSLATE   \n╚══════════════════╝\n\n📝 Translation :\n❝ ${translated} ❞\n\n══════════════════\n🔤 ${fromLang.toUpperCase()} ➜ EN`,
      threadID, messageID
    );
  } catch (err) {
    return api.sendMessage(`❌ Translation error: ${err.message}`, threadID, messageID);
  }
};
