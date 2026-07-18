module.exports.config = {
  name: "song",
  version: "4.0.0",
  permission: 0,
  credits: "EMon-BHai",
  prefix: true,
  description: "YouTube থেকে গান ডাউনলোড করো",
  category: "media",
  usages: "song [keyword]",
  cooldowns: 15,
  dependencies: {
    "play-dl": ""
  }
};

module.exports.run = async function ({ api, event, args }) {
  const play = require("play-dl");
  const { threadID, messageID, senderID } = event;

  if (!args.length) return api.sendMessage(
    `🎵 SONG\n━━━━━━━━━━━━━━━━━━\n📌 ব্যবহার: song [keyword]\n📝 উদাহরণ: song তুমিহীন\n💎 EMon-BHai-BOT`,
    threadID, messageID
  );

  api.setMessageReaction("⏳", messageID, () => {}, true);

  try {
    const results = await play.search(args.join(" "), {
      limit: 6,
      source: { youtube: "video" }
    });

    if (!results || results.length === 0) {
      api.setMessageReaction("❌", messageID, () => {}, true);
      return api.sendMessage(`❌ কোনো result পাওয়া যায়নি।`, threadID, messageID);
    }

    const videos = results.slice(0, 6);
    let msg = `🎵 SONG SEARCH\n━━━━━━━━━━━━━━━━━━\n\n🔍 "${args.join(" ")}" এর result:\n\n`;
    videos.forEach((v, i) => {
      msg += `${i + 1}. ${v.title}\n   ⏱️ ${v.durationRaw || "N/A"} | 👁️ ${v.views ? (v.views / 1000).toFixed(0) + "K" : "?"} views\n\n`;
    });
    msg += `📌 নম্বর দিয়ে reply করো (1-${videos.length})\n💎 EMon-BHai-BOT`;

    api.setMessageReaction("🎵", messageID, () => {}, true);
    return api.sendMessage({ body: msg }, threadID, (err, info) => {
      if (err) return;
      global.client.handleReply.push({
        type: "reply",
        name: "song",
        messageID: info.messageID,
        author: senderID,
        videos: videos.map(v => ({ id: v.id, title: v.title, url: v.url }))
      });
    }, messageID);

  } catch (err) {
    console.error("[song] search error:", err.message);
    api.setMessageReaction("❌", messageID, () => {}, true);
    return api.sendMessage(`❌ Search error: ${err.message}`, threadID, messageID);
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
  const filePath = path.join(cacheDir, `song_${senderID}_${Date.now()}.mp3`);
  fs.ensureDirSync(cacheDir);

  try {
    const stream = await play.stream(video.url, { quality: 1 });
    const writer = fs.createWriteStream(filePath);
    await pipeline(stream.stream, writer);

    const stat = fs.statSync(filePath);
    if (stat.size < 5000) throw new Error("File too small — stream failed");

    api.setMessageReaction("✅", messageID, () => {}, true);
    return api.sendMessage(
      {
        body: `🎵 ${video.title}\n━━━━━━━━━━━━━━━━━━\n💎 EMon-BHai-BOT`,
        attachment: fs.createReadStream(filePath)
      },
      threadID,
      () => { try { fs.unlinkSync(filePath); } catch (_) {} },
      messageID
    );
  } catch (err) {
    console.error("[song] download error:", err.message);
    try { if (fs.existsSync(filePath)) fs.unlinkSync(filePath); } catch (_) {}
    api.setMessageReaction("❌", messageID, () => {}, true);
    return api.sendMessage(
      `❌ গান ডাউনলোড করতে সমস্যা!\n🔧 ${err.message.slice(0, 80)}\n\n💡 অন্য গান try করো।`,
      threadID, messageID
    );
  }
};
