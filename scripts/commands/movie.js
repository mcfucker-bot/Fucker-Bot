module.exports.config = {
  name: "movie",
  version: "1.0.0",
  permission: 0,
  credits: "EMon",
  prefix: true,
  description: "Movie/Series এর তথ্য দেখো",
  category: "info",
  usages: "movie [movie name]",
  cooldowns: 5
};

module.exports.run = async function({ api, event, args }) {
  const { threadID, messageID } = event;
  const axios = require("axios");
  const fs = require("fs");
  const path = require("path");

  if (!args[0]) return api.sendMessage("📌 ব্যবহার: movie [নাম]\nউদাহরণ: movie Avengers", threadID, messageID);

  api.setMessageReaction("⏳", messageID, () => {}, true);
  const title = args.join(" ");
  try {
    // Using TMDB search (no key needed for basic)
    const searchRes = await axios.get(
      `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(title)}&api_key=8265bd1679663a7ea12ac168da84d2e8`,
      { timeout: 10000 }
    );
    const results = searchRes.data?.results;
    if (!results?.length) throw new Error("Not found");

    const m = results.find(r => r.media_type === "movie" || r.media_type === "tv") || results[0];
    const name = m.title || m.name;
    const overview = (m.overview || "N/A").slice(0, 300);
    const release = m.release_date || m.first_air_date || "N/A";
    const rating = m.vote_average ? `${m.vote_average}/10 (${m.vote_count} votes)` : "N/A";
    const type = m.media_type === "tv" ? "TV Series" : "Movie";
    const posterPath = m.poster_path ? `https://image.tmdb.org/t/p/w500${m.poster_path}` : null;

    let attachment;
    if (posterPath) {
      try {
        const tmpFile = path.join(__dirname, `../../cache/movie_${Date.now()}.jpg`);
        const imgRes = await axios.get(posterPath, { responseType: "stream", timeout: 10000 });
        const writer = fs.createWriteStream(tmpFile);
        imgRes.data.pipe(writer);
        await new Promise((resolve, reject) => { writer.on("finish", resolve); writer.on("error", reject); });
        attachment = fs.createReadStream(tmpFile);
        setTimeout(() => { try { fs.unlinkSync(tmpFile); } catch {} }, 10000);
      } catch {}
    }

    api.setMessageReaction("🎬", messageID, () => {}, true);
    const body = `🎬 ${type.toUpperCase()} INFO 🎬\n━━━━━━━━━━━━━━━━━━\n\n🎥 ${name}\n📅 Release: ${release}\n⭐ Rating: ${rating}\n📺 Type: ${type}\n\n📖 Overview:\n${overview}\n\n━━━━━━━━━━━━━━━━━━\n💎 EMon-BHai-BOT`;
    return api.sendMessage(attachment ? { body, attachment } : body, threadID, messageID);
  } catch {
    api.setMessageReaction("❌", messageID, () => {}, true);
    return api.sendMessage(`❌ "${title}" movie/series পাওয়া যায়নি!`, threadID, messageID);
  }
};
