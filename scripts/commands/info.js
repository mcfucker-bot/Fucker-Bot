const fs = require("fs");
const path = require("path");

module.exports.config = {
  name: "info",
  version: "2.0.0",
  permission: 0,
  credits: "Emon",
  prefix: 'awto',
  description: "Bot owner info & uptime",
  category: "admin",
  usages: "info",
  cooldowns: 5,
  dependencies: { "moment-timezone": "" }
};

const INFO_IMG = path.join(__dirname, "Emon", "info.png");

module.exports.run = async function ({ api, event }) {
  const moment = require("moment-timezone");
  const { threadID, messageID } = event;

  const time     = process.uptime();
  const hours    = Math.floor(time / 3600);
  const minutes  = Math.floor((time % 3600) / 60);
  const seconds  = Math.floor(time % 60);
  const juswa    = moment.tz("Asia/Dhaka").format("DD/MM/YYYY hh:mm:ss A");
  const botname  = global.config.BOTNAME || "EMon-BHai-BOT";

  const body =
    `╔══════════════════╗\n` +
    `   👑 BOT OWNER INFO   \n` +
    `╚══════════════════╝\n\n` +
    `👋 আস্সালামুয়ালাইকুম!\n\n` +
    `👤 নাম : EMON HAWLADAR\n` +
    `🧑 বয়স : 23+\n` +
    `🌍 অবস্থান : Malaysia\n` +
    `👫 Relationship : Single 😓\n\n` +
    `══════════════════\n` +
    `🔗 Facebook : https://www.facebook.com/EMon.BHai.FACEBOOK\n` +
    `📱 WhatsApp : wa.me/+8801309991724\n` +
    `══════════════════\n\n` +
    `🤖 Bot : ${botname}\n` +
    `📅 সময় : ${juswa}\n` +
    `⏳ Uptime : ${hours}h ${minutes}m ${seconds}s\n\n` +
    `══════════════════\n` +
    `💎 ${botname} ব্যবহার করার জন্য ধন্যবাদ!`;

  // info.png থাকলে সাথে পাঠাও, না থাকলে শুধু text
  if (fs.existsSync(INFO_IMG)) {
    return api.sendMessage(
      { body, attachment: fs.createReadStream(INFO_IMG) },
      threadID, messageID
    );
  }

  return api.sendMessage(body, threadID, messageID);
};
