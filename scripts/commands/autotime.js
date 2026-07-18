module.exports.config = {
  name: "autotime",
  version: "1.0.0",
  permission: 2,
  credits: "Emon",
  prefix: true,
  description: "Schedule a message to be sent at a specific time",
  category: "admin",
  usages: "autotime [HH:MM] [message]",
  cooldowns: 5
};

module.exports.run = async function({ api, event, args }) {
  const { threadID, messageID } = event;
  const moment = require("moment-timezone");

  if (args.length < 2) return api.sendMessage(
    `╔══════════════════╗\n   ⏰ AUTOTIME HELP   \n╚══════════════════╝\n\n📌 ব্যবহার : autotime [HH:MM] [message]\n📝 উদাহরণ : autotime 09:00 সুপ্রভাত!`,
    threadID, messageID
  );

  const targetTime = args[0];
  const message = args.slice(1).join(" ");

  if (!/^\d{2}:\d{2}$/.test(targetTime)) return api.sendMessage(
    `❌ সঠিক সময় দাও (HH:MM format)\n📝 উদাহরণ : 09:00, 14:30`,
    threadID, messageID
  );

  const now = moment.tz("Asia/Dhaka");
  const target = moment.tz(`${now.format("YYYY-MM-DD")}T${targetTime}:00`, "Asia/Dhaka");
  if (target.isBefore(now)) target.add(1, "day");
  const delay = target.diff(now);

  api.sendMessage(
    `╔══════════════════╗\n   ⏰ AUTOTIME SET   \n╚══════════════════╝\n\n✅ Scheduled message সেট হয়েছে!\n🕐 সময় : ${targetTime}\n📝 Message : ${message}\n⏳ ${Math.floor(delay / 60000)} মিনিট পরে পাঠানো হবে।\n\n══════════════════\n💎 EMon-BHai-BOT`,
    threadID, messageID
  );

  setTimeout(() => {
    api.sendMessage(
      `╔══════════════════╗\n   ⏰ SCHEDULED MSG   \n╚══════════════════╝\n\n${message}\n\n══════════════════\n🕐 ${targetTime} | 💎 EMon-BHai-BOT`,
      threadID
    );
  }, delay);
};
