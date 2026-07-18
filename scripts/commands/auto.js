module.exports = {
  config: {
    name: "auto",
    version: "0.0.3",
    permission: 0,
    prefix: false, // যেহেতু অটো ডাউনলোড, তাই prefix false রাখা ভালো
    credits: "Nayan | Emon",
    description: "Auto video download with custom API",
    category: "user",
    usages: "[link]",
    cooldowns: 5,
  },
  
  start: async function({ api, event, args }) {},
  
  handleEvent: async function ({ api, event }) {
    const axios = require("axios");
    const fs = require("fs-extra");
    const path = require("path");

    const content = event.body ? event.body : '';
    if (!content.startsWith("https://")) return;

    // ভিডিও লিঙ্ক চেক করা
    const videoHosts = ["tiktok.com", "youtube.com", "youtu.be", "facebook.com", "fb.watch", "instagram.com", "twitter.com", "x.com"];
    if (!videoHosts.some(h => content.includes(h))) return;

    api.setMessageReaction("⏳", event.messageID, () => {}, true);

    try {
      // আপনার এপিআই কল করা
      const res = await axios.get(`https://video-downloader-glz0.onrender.com/alldown?url=${encodeURIComponent(content)}`);
      
      // এপিআই থেকে পাওয়া লিঙ্ক (আপনার এপিআই এর রেসপন্স অনুযায়ী 'result' এর ভেতর থাকতে পারে)
      const data = res.data;
      const videoUrl = data.result?.url || data.url; 
      const title = data.result?.title || "Video";

      if (!videoUrl) throw new Error("ভিডিও লিঙ্ক পাওয়া যায়নি।");

      const cachePath = path.join(__dirname, "cache", `auto_${event.senderID}.mp4`);
      
      // ভিডিও ডাউনলোড
      const video = await axios.get(videoUrl, { responseType: "arraybuffer" });
      fs.writeFileSync(cachePath, Buffer.from(video.data, "utf-8"));

      api.setMessageReaction("✅", event.messageID, () => {}, true);

      return api.sendMessage({
        body: `✅ ডাউনলোড সম্পন্ন!\n📝 শিরোনাম: ${title}`,
        attachment: fs.createReadStream(cachePath)
      }, event.threadID, () => {
        if (fs.existsSync(cachePath)) fs.unlinkSync(cachePath);
      }, event.messageID);

    } catch (err) {
      console.error(err);
      api.setMessageReaction("❌", event.messageID, () => {}, true);
      api.sendMessage("❌ ভিডিও ডাউনলোড করতে ব্যর্থ হয়েছে।", event.threadID, event.messageID);
    }
  }
};
