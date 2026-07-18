module.exports.config = {
  name: "prayer",
  version: "1.0.0",
  permission: 0,
  credits: "EMon",
  prefix: true,
  description: "নামাজের সময় দেখো",
  category: "info",
  usages: "prayer [city]",
  cooldowns: 5
};

module.exports.run = async function({ api, event, args }) {
  const { threadID, messageID } = event;
  const axios = require("axios");
  const city = args.join(" ") || "Dhaka";

  api.setMessageReaction("⏳", messageID, () => {}, true);
  try {
    const res = await axios.get(
      `https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(city)}&country=BD&method=1`,
      { timeout: 10000 }
    );
    const t = res.data?.data?.timings;
    if (!t) throw new Error("Not found");

    const date = res.data.data.date?.readable || new Date().toDateString();

    api.setMessageReaction("🕌", messageID, () => {}, true);
    return api.sendMessage(
      `🕌 PRAYER TIMES 🕌\n━━━━━━━━━━━━━━━━━━\n\n📍 ${city}\n📅 ${date}\n\n🌅 Fajr (ফজর): ${t.Fajr}\n🌞 Sunrise (সূর্যোদয়): ${t.Sunrise}\n☀️ Dhuhr (যোহর): ${t.Dhuhr}\n🌤️ Asr (আসর): ${t.Asr}\n🌇 Maghrib (মাগরিব): ${t.Maghrib}\n🌙 Isha (এশা): ${t.Isha}\n\n━━━━━━━━━━━━━━━━━━\n💎 EMon-BHai-BOT`,
      threadID, messageID
    );
  } catch {
    api.setMessageReaction("❌", messageID, () => {}, true);
    return api.sendMessage(`❌ "${city}" এর নামাজের সময় পাওয়া যায়নি!`, threadID, messageID);
  }
};
