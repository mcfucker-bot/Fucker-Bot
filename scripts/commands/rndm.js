module.exports.config = {
  name: "rndm",
  version: "1.0.0",
  permission: 0,
  prefix: true,
  credits: "Nayan",
  description: "Search videos by name from the random mix API",
  category: "entertainment",
  usages: "rndm [name]",
  cooldowns: 5
};

module.exports.run = async function ({ api, event, args }) {
  const axios = require("axios");
  const fs    = require("fs-extra");
  const path  = require("path");
  const { threadID, messageID } = event;

  if (!args[0]) return api.sendMessage(
    `╔══════════════════╗\n   🎬 RNDM HELP   \n╚══════════════════╝\n\n📌 ব্যবহার : rndm [name]\n📝 উদাহরণ : rndm nayan\n\n══════════════════\n💎 ${global.config.BOTNAME || "EMon-BHai-BOT"}`,
    threadID, messageID
  );

  api.setMessageReaction("⏳", messageID, () => {}, true);

  try {
    const apis    = await axios.get("https://raw.githubusercontent.com/MOHAMMAD-NAYAN-OFFICIAL/Nayan/main/api.json");
    const baseUrl = apis.data.api;

    const res      = await axios.get(`${baseUrl}/random?name=${encodeURIComponent(args.join(" "))}`);
    const { url: videoUrl, name, cp, length: ln } = res.data.data;

    const filePath = path.join(__dirname, "cache", `rndm_${event.senderID}_${Date.now()}.mp4`);
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
      body: `╔══════════════════╗\n   🎬 RNDM VIDEO   \n╚══════════════════╝\n\n${cp}\n\n🎬 মোট ভিডিও : ${ln}\n👤 Added by  : ${name}\n\n══════════════════\n💎 ${global.config.BOTNAME || "EMon-BHai-BOT"}`,
      attachment: fs.createReadStream(filePath)
    }, threadID, () => {
      try { fs.unlinkSync(filePath); } catch (_) {}
    }, messageID);

  } catch (e) {
    console.error("[rndm.js]", e.message);
    api.setMessageReaction("❌", messageID, () => {}, true);
    return api.sendMessage("❌ ভিডিও লোড করতে সমস্যা হয়েছে। আবার চেষ্টা করো।", threadID, messageID);
  }
};
