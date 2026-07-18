module.exports.config = {
  name: "animeinfo",
  version: "1.0.0",
  permission: 0,
  credits: "EMon",
  prefix: true,
  description: "Anime সম্পর্কে তথ্য জানো",
  category: "info",
  usages: "animeinfo [anime name]",
  cooldowns: 5
};

module.exports.run = async function({ api, event, args }) {
  const { threadID, messageID } = event;
  const axios = require("axios");

  if (!args[0]) return api.sendMessage("📌 ব্যবহার: animeinfo [anime name]\nউদাহরণ: animeinfo Naruto", threadID, messageID);

  api.setMessageReaction("⏳", messageID, () => {}, true);
  const name = args.join(" ");
  try {
    const res = await axios.get(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(name)}&limit=1`, { timeout: 10000 });
    const anime = res.data?.data?.[0];
    if (!anime) throw new Error("Not found");

    const title = anime.title_english || anime.title;
    const score = anime.score || "N/A";
    const episodes = anime.episodes || "N/A";
    const status = anime.status || "N/A";
    const type = anime.type || "N/A";
    const genres = anime.genres?.map(g => g.name).join(", ") || "N/A";
    const synopsis = anime.synopsis ? anime.synopsis.slice(0, 250) + "..." : "N/A";
    const year = anime.year || "N/A";

    api.setMessageReaction("🎌", messageID, () => {}, true);
    return api.sendMessage(
      `🎌 ANIME INFO 🎌\n━━━━━━━━━━━━━━━━━━\n\n📺 ${title}\n🌸 Japanese: ${anime.title}\n\n📊 Score: ⭐ ${score}/10\n🎬 Type: ${type}\n📅 Year: ${year}\n📺 Episodes: ${episodes}\n📡 Status: ${status}\n🏷️ Genres: ${genres}\n\n📖 Synopsis:\n${synopsis}\n\n━━━━━━━━━━━━━━━━━━\n💎 EMon-BHai-BOT`,
      threadID, messageID
    );
  } catch {
    api.setMessageReaction("❌", messageID, () => {}, true);
    return api.sendMessage(`❌ "${name}" anime পাওয়া যায়নি!`, threadID, messageID);
  }
};
