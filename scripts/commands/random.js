module.exports.config = {
  name: "random",
  version: "1.0.0",
  permission: 0,
  prefix: true,
  credits: "Nayan",
  description: "Random mix video",
  category: "entertainment",
  usages: "random",
  cooldowns: 5
};

module.exports.run = async function ({ api, event }) {
  const axios = require("axios");
  const fs    = require("fs-extra");
  const path  = require("path");
  const { threadID, messageID } = event;

  api.setMessageReaction("⏳", messageID, () => {}, true);

  try {
    const apis    = await axios.get("https://raw.githubusercontent.com/MOHAMMAD-NAYAN-OFFICIAL/Nayan/main/api.json");
    const baseUrl = apis.data.api;

    const res = await axios.get(`${baseUrl}/video/mixvideo`);
    const { url: videoData, cp, length: ln } = res.data;
    const { url: videoUrl, name } = videoData;

    const filePath = path.join(__dirname, "cache", `random_${event.senderID}_${Date.now()}.mp4`);
    fs.ensureDirSync(path.dirname(filePath));

    const response = await axios({ method: "get", url: videoUrl, responseType: "stream", timeout: 60000 });
    await new Promise((resolve, reject) => {
      const writer = fs.createWriteStream(filePath);
      response.data.pipe(writer);
      writer.on("finish", resolve);
      writer.on("error", reject);
    });

    api.setMessageReaction("✅", messageID, () => {}, true);
    return api.sendMessage({
      body: `╔══════════════════╗\n   🎬 RANDOM VIDEO   \n╚══════════════════╝\n\n${cp}\n\n🎬 মোট ভিডিও : ${ln}\n👤 Added by  : ${name}\n\n══════════════════\n💎 ${global.config.BOTNAME || "EMon-BHai-BOT"}`,
      attachment: fs.createReadStream(filePath)
    }, threadID, () => {
      try { fs.unlinkSync(filePath); } catch (_) {}
    }, messageID);

  } catch (e) {
    console.error("[random.js]", e.message);
    api.setMessageReaction("❌", messageID, () => {}, true);
    return api.sendMessage("❌ ভিডিও লোড করতে সমস্যা হয়েছে। আবার চেষ্টা করো।", threadID, messageID);
  }
};
