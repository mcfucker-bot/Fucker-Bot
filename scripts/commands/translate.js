module.exports.config = {
  name: "translate",
  version: "2.0.0",
  permission: 0,
  credits: "Emon",
  description: "Translate text to any language",
  prefix: false,
  category: "without prefix",
  usages: "translate [lang code] [text]  |  example: translate bn hello",
  cooldowns: 5
};

module.exports.run = async ({ api, event, args }) => {
  const axios = require("axios");
  const { threadID, messageID } = event;

  const targetLang = args[0];
  const content = event.type === "message_reply"
    ? event.messageReply.body
    : args.slice(1).join(" ");

  if (!targetLang || !content) return api.sendMessage(
    `╔══════════════════╗\n   🌐 TRANSLATE HELP   \n╚══════════════════╝\n\n📌 ব্যবহার :\n▸ translate [ভাষা কোড] [টেক্সট]\n\n📝 উদাহরণ :\n▸ translate bn Hello\n▸ translate en আমি ভালো আছি\n▸ translate hi good morning\n\n🌍 কিছু কোড :\nbn=বাংলা | en=English | hi=Hindi\nar=Arabic | zh=Chinese | ja=Japanese\nfr=French | de=German | ru=Russian`,
    threadID, messageID
  );

  try {
    const res = await axios.get(
      `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(content)}`,
      { timeout: 10000 }
    );
    let translated = "";
    res.data[0].forEach(item => { if (item[0]) translated += item[0]; });
    const fromLang = res.data[2] || "auto";

    return api.sendMessage(
      `╔══════════════════╗\n   🌐 TRANSLATION   \n╚══════════════════╝\n\n📝 অনুবাদ :\n❝ ${translated} ❞\n\n══════════════════\n🔤 ${fromLang.toUpperCase()} ➜ ${targetLang.toUpperCase()}`,
      threadID, messageID
    );
  } catch (err) {
    return api.sendMessage(`❌ Translation error: ${err.message}`, threadID, messageID);
  }
};
