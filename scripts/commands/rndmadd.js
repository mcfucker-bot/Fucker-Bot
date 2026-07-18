module.exports.config = {
  name: "rndmadd",
  version: "1.0.0",
  permission: 0,
  prefix: true,
  credits: "Nayan",
  description: "Reply to a video to add it to the random mix API",
  category: "entertainment",
  usages: "rndmadd [your name]",
  cooldowns: 5
};

module.exports.run = async function ({ api, event, args }) {
  const axios = require("axios");
  const { threadID, messageID } = event;

  if (!args.length) return api.sendMessage(
    `╔══════════════════╗\n   🎬 RNDMADD HELP   \n╚══════════════════╝\n\n📌 ব্যবহার : একটি ভিডিওতে reply করে\n   rndmadd [তোমার নাম]\n\n📝 উদাহরণ : rndmadd Emon\n\n══════════════════\n💎 ${global.config.BOTNAME || "EMon-BHai-BOT"}`,
    threadID, messageID
  );

  if (!event.messageReply?.attachments?.length)
    return api.sendMessage("❌ একটি ভিডিওতে reply করে command দাও।", threadID, messageID);

  const videoAttachments = event.messageReply.attachments.filter(a => a.type === "video");
  if (!videoAttachments.length)
    return api.sendMessage("❌ Reply এ কোনো video পাওয়া যায়নি।", threadID, messageID);

  api.setMessageReaction("⏳", messageID, () => {}, true);

  try {
    const apis    = await axios.get("https://raw.githubusercontent.com/MOHAMMAD-NAYAN-OFFICIAL/Nayan/main/api.json");
    const baseUrl = apis.data.api;

    const uploadedUrls = await Promise.all(videoAttachments.map(async (video) => {
      const encoded    = encodeURIComponent(video.url.replace(/\s/g, ""));
      const imgurResult = await axios.get(`${baseUrl}/imgur?url=${encoded}`);
      return imgurResult.data.link;
    }));

    const name = args.join(" ");
    const res  = await axios.get(`${baseUrl}/mixadd?name=${encodeURIComponent(name)}&url=${encodeURIComponent(uploadedUrls.join("\n"))}`);

    const { msg }  = res.data;
    const { name: nam, url } = res.data.data;

    api.setMessageReaction("✅", messageID, () => {}, true);
    return api.sendMessage(
      `╔══════════════════╗\n   🎬 VIDEO ADDED   \n╚══════════════════╝\n\n📩 ${msg}\n\n📛 নাম : ${nam}\n🔗 URL : ${url}\n\n══════════════════\n💎 ${global.config.BOTNAME || "EMon-BHai-BOT"}`,
      threadID, messageID
    );

  } catch (e) {
    console.error("[rndmadd.js]", e.message);
    api.setMessageReaction("❌", messageID, () => {}, true);
    return api.sendMessage("❌ ভিডিও যোগ করতে সমস্যা হয়েছে। আবার চেষ্টা করো।", threadID, messageID);
  }
};
