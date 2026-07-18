module.exports.config = {
  name: "hadis",
  version: "1.0.0",
  permission: 0,
  credits: "Emon",
  prefix: 'awto',
  description: "Get a random Islamic Hadith",
  category: "user",
  usages: "hadis",
  cooldowns: 5
};

module.exports.run = async function({ api, event }) {
  const axios = require("axios");
  const { threadID, messageID } = event;

  try {
    api.setMessageReaction("⏳", messageID, () => {}, true);
    const res = await axios.get(`https://hadithbd.com/api/v1/random`);
    const data = res.data;

    return api.sendMessage(
      `╔══════════════════╗\n   📿 RANDOM HADITH   \n╚══════════════════╝\n\n${data.hadith_bangla || data.hadith || 'হাদিস পাওয়া যায়নি'}\n\n══════════════════\n📚 ${data.source || ''}\n💎 EMon-BHai-BOT`,
      threadID, messageID
    );
  } catch (err) {
    console.error(err);
    return api.sendMessage(`❌ হাদিস আনতে সমস্যা হয়েছে। আবার চেষ্টা করো।`, threadID, messageID);
  }
};
