module.exports.config = {
  name: "xv",
  version: "1.0.0",
  permission: 2,
  credits: "EMon-BHai",
  prefix: true,
  description: "Admin-only special video command",
  category: "admin",
  usages: "xv [keyword]",
  cooldowns: 10
};

module.exports.run = async function({ api, event, args }) {
  const axios = require("axios");
  const request = require("request");
  const fs = require("fs-extra");
  const { threadID, messageID, senderID } = event;

  if (!args[0]) return api.sendMessage(
    `╔══════════════════╗\n   🎬 XV HELP   \n╚══════════════════╝\n\n📌 ব্যবহার : xv [keyword]`,
    threadID, messageID
  );

  api.setMessageReaction("⏳", messageID, () => {}, true);

  try {
    const res = await axios.get(`https://xvideos-api-smoky.vercel.app/search?search=${encodeURIComponent(args.join(" "))}`);
    const videos = res.data.videos || res.data;
    if (!videos || videos.length === 0) return api.sendMessage(`❌ কোনো video পাওয়া যায়নি।`, threadID, messageID);

    const video = videos[Math.floor(Math.random() * Math.min(videos.length, 10))];
    const url = video.url || video.videoUrl || video.mp4;

    const path = `${__dirname}/cache/xv_${senderID}.mp4`;
    request(encodeURI(url)).pipe(fs.createWriteStream(path)).on("close", () => {
      api.setMessageReaction("✅", messageID, () => {}, true);
      api.sendMessage({
        body: `╔══════════════════╗\n   🎬 VIDEO   \n╚══════════════════╝\n\n📋 ${video.title || 'Video'}\n\n══════════════════\n⚠️ 18+ Content | Admin Only`,
        attachment: fs.createReadStream(path)
      }, threadID, () => { if (fs.existsSync(path)) fs.unlinkSync(path); }, messageID);
    });
  } catch (err) {
    api.setMessageReaction("❌", messageID, () => {}, true);
    console.error(err);
    return api.sendMessage(`❌ Video আনতে সমস্যা হয়েছে।`, threadID, messageID);
  }
};
