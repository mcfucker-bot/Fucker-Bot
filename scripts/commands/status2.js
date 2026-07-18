module.exports.config = {
  name: "status2",
  version: "1.0.0",
  permission: 0,
  credits: "EMon-BHai",
  prefix: 'awto',
  description: "Get a random status video",
  category: "entertainment",
  usages: "status2",
  cooldowns: 5
};

module.exports.run = async function({ api, event, args }) {
  const axios = require("axios");
  const fs = require("fs-extra");
  const { threadID, messageID } = event;

  api.setMessageReaction("⏳", messageID, () => {}, true);

  try {
    const res = await axios.get(`http://fi3.bot-hosting.net:20536/EMon-BHai/status2`);
    const data = res.data.data;
    const url = res.data.url.url;
    const title = res.data.url.title;
    const author = res.data.author;

    const imgs = (await axios.get(url, { responseType: 'arraybuffer' })).data;
    fs.writeFileSync(__dirname + "/cache/img1.mp4", Buffer.from(imgs, "utf-8"));

    api.setMessageReaction("✅", messageID, () => {}, true);
    return api.sendMessage({
      body: `╔══════════════════╗\n   🎬 STATUS VIDEO   \n╚══════════════════╝\n\n📋 ${title}\n✨ ${author}\n\n══════════════════\n💎 EMon-BHai-BOT`,
      attachment: fs.createReadStream(__dirname + "/cache/img1.mp4")
    }, threadID, event.messageID);
  } catch (err) {
    api.setMessageReaction("❌", messageID, () => {}, true);
    console.error(err);
    return api.sendMessage(`❌ ভিডিও আনতে সমস্যা হয়েছে।`, threadID, messageID);
  }
};
