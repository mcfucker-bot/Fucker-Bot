module.exports.config = {
  name: "prayernotify",
  version: "1.0.0",
  permission: 1,
  credits: "EMon-BHai",
  prefix: true,
  description: "নামাজের সময় auto notification চালু/বন্ধ করো",
  category: "admin",
  usages: "prayernotify on [city]  |  prayernotify off  |  prayernotify status",
  cooldowns: 5
};

module.exports.run = async function ({ api, event, args }) {
  const { threadID, messageID } = event;
  const sub = args[0]?.toLowerCase();

  if (!global.prayerNotifyGroups) global.prayerNotifyGroups = {};

  if (sub === "off") {
    delete global.prayerNotifyGroups[threadID];
    return api.sendMessage(
      `🔕 Prayer Notification বন্ধ করা হয়েছে।\n💎 EMon-BHai-BOT`,
      threadID, messageID
    );
  }

  if (sub === "status") {
    const cfg = global.prayerNotifyGroups[threadID];
    if (!cfg) return api.sendMessage("📴 এই গ্রুপে prayer notification চালু নেই।", threadID, messageID);
    return api.sendMessage(
      `🔔 Prayer Notification চালু আছে!\n📍 City: ${cfg.city}\n💎 EMon-BHai-BOT`,
      threadID, messageID
    );
  }

  if (sub === "on") {
    const city = args.slice(1).join(" ") || "Dhaka";
    global.prayerNotifyGroups[threadID] = { city, api };
    return api.sendMessage(
      `🔔 PRAYER NOTIFICATION চালু! 🔔\n━━━━━━━━━━━━━━━━━━\n\n✅ এই গ্রুপে নামাজের সময় auto notification আসবে!\n📍 City: ${city}\n\n🕌 Fajr, Dhuhr, Asr, Maghrib, Isha সময়ে alert আসবে\n\n💡 বন্ধ করতে: prayernotify off\n━━━━━━━━━━━━━━━━━━\n💎 EMon-BHai-BOT`,
      threadID, messageID
    );
  }

  return api.sendMessage(
    `🕌 PRAYER NOTIFY HELP\n━━━━━━━━━━━━━━━━━━\n📌 চালু করো: prayernotify on Dhaka\n📌 বন্ধ করো: prayernotify off\n📌 Status: prayernotify status\n━━━━━━━━━━━━━━━━━━\n💎 EMon-BHai-BOT`,
    threadID, messageID
  );
};
