module.exports.config = {
  name: "poli",
  version: "1.0.0",
  permission: 0,
  credits: "Emon",
  prefix: 'awto',
  description: "Generate AI images using Pollinations.ai",
  category: "user",
  usages: "poli [prompt]",
  cooldowns: 10
};

module.exports.run = async function({ api, event, args }) {
  const axios = require("axios");
  const { threadID, messageID } = event;

  if (!args[0]) return api.sendMessage(
    `╔══════════════════╗\n   🎨 AI IMAGE HELP   \n╚══════════════════╝\n\n📌 ব্যবহার : poli [prompt]\n📝 উদাহরণ : poli anime girl with sword`,
    threadID, messageID
  );

  api.setMessageReaction("⏳", messageID, () => {}, true);

  try {
    const prompt = encodeURIComponent(args.join(" "));
    const url = `https://image.pollinations.ai/prompt/${prompt}?width=1024&height=1024&nologo=true`;
    const res = await axios.get(url, { responseType: "stream" });

    api.setMessageReaction("✅", messageID, () => {}, true);
    return api.sendMessage({
      body: `╔══════════════════╗\n   🎨 AI GENERATED   \n╚══════════════════╝\n\n🖼️ Prompt : ${args.join(" ")}\n\n══════════════════\n💎 EMon-BHai-BOT`,
      attachment: res.data
    }, threadID, messageID);
  } catch (err) {
    api.setMessageReaction("❌", messageID, () => {}, true);
    console.error(err);
    return api.sendMessage(`❌ ছবি তৈরি করতে সমস্যা হয়েছে। আবার চেষ্টা করো।`, threadID, messageID);
  }
};
