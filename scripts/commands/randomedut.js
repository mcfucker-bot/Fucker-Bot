module.exports.config = {
  name: "haruedit",
  version: "1.0.0",
  permission: 0,
  credits: "EMon-BHai",
  prefix: 'awto',
  description: "Get random TikTok edit videos",
  category: "entertainment",
  usages: "haruedit",
  cooldowns: 5
};

module.exports.run = async function({ api, event }) {
  const axios = require("axios");
  const request = require("request");
  const fs = require("fs-extra");
  const { threadID, messageID } = event;

  api.setMessageReaction("⏳", messageID, () => {}, true);

  try {
    const res = await axios.get(`http://fi3.bot-hosting.net:20536/EMon-BHai/haruedit`);
    const url = res.data.url || res.data.data;
    const path = `${__dirname}/cache/haruedit_${event.senderID}.mp4`;

    request(encodeURI(url)).pipe(fs.createWriteStream(path)).on("close", () => {
      api.setMessageReaction("✅", messageID, () => {}, true);
      api.sendMessage({
        body: `╔══════════════════╗\n   🎬 TIKTOK EDIT   \n╚══════════════════╝\n\n✨ Random TikTok Edit!\n\n══════════════════\n💎 EMon-BHai-BOT`,
        attachment: fs.createReadStream(path)
      }, threadID, () => { if (fs.existsSync(path)) fs.unlinkSync(path); }, messageID);
    });
  } catch (err) {
    api.setMessageReaction("❌", messageID, () => {}, true);
    console.error(err);
    return api.sendMessage(`❌ Video আনতে সমস্যা হয়েছে।`, threadID, messageID);
  }
};
