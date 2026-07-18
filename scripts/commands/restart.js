module.exports.config = {
  name: "restart",
  version: "1.0.0",
  permission: 2,
  credits: "Emon",
  prefix: true,
  description: "Restart the bot",
  category: "admin",
  usages: "restart",
  cooldowns: 5
};

module.exports.run = async function({ api, event }) {
  await api.sendMessage(
    `╔══════════════════╗\n   🔄 RESTARTING...   \n╚══════════════════╝\n\n⚙️ Bot restart হচ্ছে...\n⏳ কিছুক্ষণের মধ্যে আবার সক্রিয় হবে।\n\n══════════════════\n💎 EMon-BHai-BOT`,
    event.threadID, event.messageID
  );
  process.exit(0);
};
