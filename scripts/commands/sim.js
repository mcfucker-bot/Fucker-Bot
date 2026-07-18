module.exports.config = {
  name: "sim",
  version: "1.0.0",
  permission: 0,
  credits: "Emon",
  prefix: 'awto',
  description: "Chat with SimSimi AI",
  category: "ai",
  usages: "sim [message]",
  cooldowns: 2
};

module.exports.run = async function({ api, event, args }) {
  const axios = require("axios");
  const { threadID, messageID } = event;

  if (!args[0]) return api.sendMessage(
    `╔══════════════════╗\n   🤖 SIMSIMI HELP   \n╚══════════════════╝\n\n📌 ব্যবহার : sim [message]\n📝 উদাহরণ : sim কেমন আছো?`,
    threadID, messageID
  );

  api.setMessageReaction("⏳", messageID, () => {}, true);

  try {
    const text = encodeURIComponent(args.join(" "));
    const res = await axios.get(`${global.sim_api || `http://fi3.bot-hosting.net:20536/simsimi`}?text=${text}&lang=bn`);
    const reply = res.data.BotMessage || res.data.message || res.data.response;

    api.setMessageReaction("✅", messageID, () => {}, true);
    return api.sendMessage(
      `╔══════════════════╗\n   🤖 SIMSIMI   \n╚══════════════════╝\n\n💬 ${reply}\n\n══════════════════\n💎 EMon-BHai-BOT`,
      threadID, messageID
    );
  } catch (err) {
    api.setMessageReaction("❌", messageID, () => {}, true);
    console.error(err);
    return api.sendMessage(`❌ SimSimi থেকে উত্তর পাওয়া যায়নি।`, threadID, messageID);
  }
};
