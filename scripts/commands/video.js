module.exports.config = {
  name: "video",
  version: "4.0.0",
  permission: 0,
  credits: "EMon-BHai",
  prefix: true,
  description: "YouTube থেকে video ডাউনলোড করো (max ~50MB)",
  category: "media",
  usages: "video [keyword / youtube url]",
  cooldowns: 20,
  dependencies: {
    "play-dl": ""
  }
};

module.exports.run = async function ({ api, event, args }) {
  const play = require("play-dl");
  const { threadID, messageID, senderID } = event;

  if (!args.length) return api.sendMessage(
    `🎬 VIDEO\n━━━━━━━━━━━━━━━━━━\n📌 ব্যবহার: video [keyword]\n📝 উদাহরণ: video funny cats\n⚠️ Note: Max ~50MB video দেওয়া যাবে\n━━━━━━━━━━━━━━━━━━\n💎 EMon-BHai-BOT`,
    threadID, messageID
  );

  api.setMessageReaction("⏳", messageID, () => {}, true);

  try {
    const query = args.join(" ");
    let videoUrl;

    // Check if it's a YouTube URL
    if (query.includes("youtube.com") || query.includes("youtu.be")) {
      videoUrl = query;
    } else {
      const results = await play.search(query, { limit: 5, source: { youtube: "video" } });
      // Filter by duration < 10 min to keep file size manageable
      const filtered = results.filter(v => (v.durationInSec || 0) < 600);
      if (!filtered.length) throw new Error("No short videos found. Try a more specific keyword.");

      const videos = filtered.slice(0, 5);
      let msg = `🎬 VIDEO SEARCH\n━━━━━━━━━━━━━━━━━━\n\n🔍 "${query}" এর result:\n\n`;
      videos.forEach((v, i) => {
        msg += `${i + 1}. ${v.title}\n   ⏱️ ${v.durationRaw || "N/A"}\n\n`;
      });
      msg += `📌 নম্বর দিয়ে reply করো (1-${videos.length})\n💎 EMon-BHai-BOT`;

      api.setMessageReaction("🎬", messageID, () => {}, true);
      return api.sendMessage({ body: msg }, threadID, (err, info) => {
        if (err) return;
        global.client.handleReply.push({
          type: "reply",
          name: "video",
          messageID: info.messageID,
          author: senderID,
          videos: videos.map(v => ({ title: v.title, url: v.url }))
        });
      }, messageID);
    }

  } catch (err) {
    api.setMessageReaction("❌", messageID, () => {}, true);
    return api.sendMessage(`❌ Error: ${err.message}`, threadID, messageID);
  }
};

module.exports.handleReply = async function ({ api, event, handleReply }) {
  const play = require("play-dl");
  const fs = require("fs-extra");
  const path = require("path");
  const { pipeline } = require("stream/promises");
  const { threadID, messageID, senderID } = event;
  const { videos } = handleReply;

  if (senderID !== handleReply.author) return;
  const index = parseInt(event.body, 10) - 1;
  if (isNaN(index) || index < 0 || index >= videos.length)
    return api.sendMessage(`❌ সঠিক নম্বর দাও (1-${videos.length})।`, threadID, messageID);

  api.setMessageReaction("⏳", messageID, () => {}, true);
  try { api.unsendMessage(handleReply.messageID); } catch (_) {}

  const video = videos[index];
  const cacheDir = path.join(__dirname, "../../cache");
  const filePath = path.join(cacheDir, `video_${senderID}_${Date.now()}.mp4`);
  fs.ensureDirSync(cacheDir);

  try {
    const stream = await play.stream(video.url, { quality: 1 });
    const writer = fs.createWriteStream(filePath);
    await pipeline(stream.stream, writer);

    const stat = fs.statSync(filePath);
    if (stat.size < 10000) throw new Error("File too small");
    if (stat.size > 50 * 1024 * 1024) throw new Error("File too large (>50MB). Shorter video try করো।");

    api.setMessageReaction("✅", messageID, () => {}, true);
    return api.sendMessage(
      { body: `🎬 ${video.title}\n━━━━━━━━━━━━━━━━━━\n💎 EMon-BHai-BOT`, attachment: fs.createReadStream(filePath) },
      threadID,
      () => { try { fs.unlinkSync(filePath); } catch (_) {} },
      messageID
    );
  } catch (err) {
    try { if (fs.existsSync(filePath)) fs.unlinkSync(filePath); } catch (_) {}
    api.setMessageReaction("❌", messageID, () => {}, true);
    return api.sendMessage(`❌ Video ডাউনলোড error!\n🔧 ${err.message}`, threadID, messageID);
  }
};
