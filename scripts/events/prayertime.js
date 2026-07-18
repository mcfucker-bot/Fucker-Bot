// ── Auto Prayer Time Notification Event ──
// Runs a background timer (every minute) and sends prayer time
// reminders to all groups that enabled it via `prayernotify on`.

module.exports.config = {
  name: "prayertime",
  version: "1.0.0",
  credits: "EMon-BHai",
  description: "Automatically send prayer time reminders to configured groups",
  eventType: []
};

const prayerNames = {
  Fajr:    { bn: "ফজর",    emoji: "🌅" },
  Dhuhr:   { bn: "যোহর",   emoji: "☀️" },
  Asr:     { bn: "আসর",    emoji: "🌤️" },
  Maghrib: { bn: "মাগরিব", emoji: "🌇" },
  Isha:    { bn: "এশা",    emoji: "🌙" }
};

const prayerCache = {};   // city → { date, timings }
let timerStarted = false;

async function fetchTimings(city) {
  const axios = require("axios");
  const today = new Date().toISOString().slice(0, 10);
  if (prayerCache[city]?.date === today) return prayerCache[city].timings;
  try {
    const res = await axios.get(
      `https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(city)}&country=BD&method=1`,
      { timeout: 12000 }
    );
    const timings = res.data?.data?.timings;
    if (timings) { prayerCache[city] = { date: today, timings }; }
    return timings;
  } catch { return null; }
}

async function checkAndNotify(api) {
  if (!global.prayerNotifyGroups || !Object.keys(global.prayerNotifyGroups).length) return;

  const now = new Date();
  const curHH = String(now.getHours()).padStart(2, "0");
  const curMM = String(now.getMinutes()).padStart(2, "0");
  const curTime = `${curHH}:${curMM}`;

  for (const [threadID, cfg] of Object.entries(global.prayerNotifyGroups)) {
    try {
      const timings = await fetchTimings(cfg.city || "Dhaka");
      if (!timings) continue;

      for (const [prayer, info] of Object.entries(prayerNames)) {
        const t = timings[prayer];
        if (!t) continue;
        const [h, m] = t.split(":").map(Number);
        const pTime = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;

        if (curTime === pTime) {
          const currentApi = cfg.api || api;
          if (!currentApi) continue;
          await currentApi.sendMessage(
            `${info.emoji} নামাজের সময় হয়েছে! ${info.emoji}\n━━━━━━━━━━━━━━━━━━\n\n🕌 ${info.bn} নামাজের সময় এখন!\n🕐 সময়: ${t}\n📍 City: ${cfg.city || "Dhaka"}\n\n🤲 সকলকে নামাজ পড়ার আহ্বান জানানো হচ্ছে।\n\n🔵 اللَّهُ أَكْبَرُ\n━━━━━━━━━━━━━━━━━━\n💎 EMon-BHai-BOT`,
            threadID
          ).catch(() => {});
        }
      }
    } catch (_) {}
  }
}

module.exports.run = async function ({ api, event }) {
  // No per-message logic; everything is timer-driven
};

module.exports.onLoad = async function ({ api }) {
  if (timerStarted) return;
  timerStarted = true;

  if (!global.prayerNotifyGroups) global.prayerNotifyGroups = {};

  // Check every 60 seconds
  setInterval(() => checkAndNotify(api).catch(() => {}), 60 * 1000);
  console.log("[prayertime] Background timer started ✅");
};
