module.exports.config = {
  name: "weather",
  version: "2.0.0",
  permission: 0,
  credits: "EMon",
  prefix: true,
  description: "যেকোনো শহরের আবহাওয়া দেখো",
  category: "info",
  usages: "weather [city]",
  cooldowns: 5
};

module.exports.run = async function({ api, event, args }) {
  const { threadID, messageID } = event;
  const axios = require("axios");

  const city = args.join(" ") || "Dhaka";
  api.setMessageReaction("⏳", messageID, () => {}, true);

  try {
    const res = await axios.get(
      `https://wttr.in/${encodeURIComponent(city)}?format=j1`,
      { timeout: 10000, headers: { "User-Agent": "curl/7.68.0" } }
    );
    const d = res.data;
    const cur = d.current_condition[0];
    const area = d.nearest_area[0];
    const cityName = area.areaName[0].value;
    const country = area.country[0].value;
    const temp = cur.temp_C;
    const feelsLike = cur.FeelsLikeC;
    const humidity = cur.humidity;
    const wind = cur.windspeedKmph;
    const desc = cur.weatherDesc[0].value;
    const uv = cur.uvIndex;
    const visibility = cur.visibility;

    const weatherEmoji = desc.toLowerCase().includes("sun") ? "☀️"
      : desc.toLowerCase().includes("rain") ? "🌧️"
      : desc.toLowerCase().includes("cloud") ? "☁️"
      : desc.toLowerCase().includes("storm") ? "⛈️"
      : desc.toLowerCase().includes("fog") ? "🌫️"
      : desc.toLowerCase().includes("snow") ? "❄️" : "🌤️";

    api.setMessageReaction("🌤️", messageID, () => {}, true);
    return api.sendMessage(
      `${weatherEmoji} WEATHER REPORT ${weatherEmoji}\n━━━━━━━━━━━━━━━━━━\n\n📍 ${cityName}, ${country}\n\n🌡️ Temperature: ${temp}°C\n🤔 Feels Like: ${feelsLike}°C\n💧 Humidity: ${humidity}%\n💨 Wind: ${wind} km/h\n👁️ Visibility: ${visibility} km\n☀️ UV Index: ${uv}\n\n📋 Condition: ${desc}\n\n━━━━━━━━━━━━━━━━━━\n💎 EMon-BHai-BOT`,
      threadID, messageID
    );
  } catch {
    api.setMessageReaction("❌", messageID, () => {}, true);
    return api.sendMessage(`❌ "${city}" এর আবহাওয়া পাওয়া যায়নি! ইংরেজিতে শহরের নাম দাও।`, threadID, messageID);
  }
};
