module.exports.config = {
  name: "lyrics",
  version: "2.0.0",
  permission: 0,
  credits: "EMon-BHai",
  prefix: true,
  description: "Find song lyrics by name",
  category: "Media",
  usages: "lyrics [song name]",
  cooldowns: 10
};

module.exports.run = async function({ api, event, args }) {
  const { threadID, messageID } = event;
  const axios = require("axios");

  const song = args.join(" ").trim();
  if (!song) return api.sendMessage(
    `🎵 LYRICS\n\n📌 ব্যবহার: lyrics [song name]\n📝 উদাহরণ: lyrics Shape of You`,
    threadID, messageID
  );

  api.setMessageReaction("⏳", messageID, () => {}, true);

  let title = song, artist = "Unknown", lyricsText = null;

  // API 1: lyrist.vercel.app
  try {
    const res = await axios.get(
      `https://lyrist.vercel.app/api/${encodeURIComponent(song)}`,
      { timeout: 10000 }
    );
    if (res.data && res.data.lyrics) {
      title      = res.data.title  || song;
      artist     = res.data.artist || "Unknown";
      lyricsText = res.data.lyrics;
    }
  } catch (_) {}

  // API 2: lyrics.ovh (fallback)
  if (!lyricsText) {
    try {
      const words  = song.trim().split(" ");
      const artist2 = words[0];
      const title2  = words.slice(1).join(" ") || words[0];
      const res2 = await axios.get(
        `https://api.lyrics.ovh/v1/${encodeURIComponent(artist2)}/${encodeURIComponent(title2)}`,
        { timeout: 10000 }
      );
      if (res2.data && res2.data.lyrics) {
        lyricsText = res2.data.lyrics;
        artist     = artist2;
        title      = title2;
      }
    } catch (_) {}
  }

  if (!lyricsText) {
    api.setMessageReaction("❌", messageID, () => {}, true);
    return api.sendMessage(
      `❌ "${song}" এর lyrics পাওয়া যায়নি।\n▸ সঠিক গানের নাম লিখো।`,
      threadID, messageID
    );
  }

  const trimmed = lyricsText.length > 2000
    ? lyricsText.substring(0, 2000) + "\n...[আরো আছে]"
    : lyricsText;

  api.setMessageReaction("🎵", messageID, () => {}, true);
  return api.sendMessage(
    `🎵 SONG LYRICS\n\n🎤 গান : ${title}\n🎙️ শিল্পী : ${artist}\n\n${trimmed}\n\n💎 ${global.config.BOTNAME || "EMon-BHai-BOT"}`,
    threadID, messageID
  );
};
