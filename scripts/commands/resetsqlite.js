module.exports.config = {
  name: "resetsqlite",
  version: "1.0.0",
  permission: 3,
  credits: "Emon",
  prefix: true,
  description: "Reset the SQLite database and restart",
  category: "admin",
  usages: "resetsqlite",
  cooldowns: 5
};

module.exports.run = async function({ api, event }) {
  const fs = require("fs-extra");
  const path = require("path");

  try {
    await api.sendMessage(
      `╔══════════════════╗\n   🗄️ DATABASE RESET   \n╚══════════════════╝\n\n⚠️ Database মুছে ফেলা হচ্ছে...\n🔄 Bot restart হবে।\n\n══════════════════\n💎 EMon-BHai-BOT`,
      event.threadID, event.messageID
    );

    const dbPath = path.join(process.cwd(), "database.db");
    if (fs.existsSync(dbPath)) fs.unlinkSync(dbPath);
    process.exit(0);
  } catch (err) {
    console.error(err);
    return api.sendMessage(`❌ Database reset করতে সমস্যা হয়েছে।`, event.threadID, event.messageID);
  }
};
