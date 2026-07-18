module.exports.config = {
  name: "uptime",
  version: "1.0.0",
  permission: 0,
  credits: "EMon",
  prefix: true,
  description: "Bot কতক্ষণ ধরে চলছে দেখো",
  category: "info",
  usages: "uptime",
  cooldowns: 5
};

module.exports.run = async function({ api, event }) {
  const { threadID, messageID } = event;
  const uptimeSec = process.uptime();
  const days = Math.floor(uptimeSec / 86400);
  const hours = Math.floor((uptimeSec % 86400) / 3600);
  const mins = Math.floor((uptimeSec % 3600) / 60);
  const secs = Math.floor(uptimeSec % 60);

  const mem = process.memoryUsage();
  const toMB = b => (b / 1024 / 1024).toFixed(1);
  const node = process.version;
  const platform = process.platform;

  return api.sendMessage(
    `⏱️ BOT UPTIME ⏱️\n━━━━━━━━━━━━━━━━━━\n\n🕐 চলছে: ${days}d ${hours}h ${mins}m ${secs}s\n\n💾 Memory Usage:\n▸ RSS: ${toMB(mem.rss)} MB\n▸ Heap Used: ${toMB(mem.heapUsed)} MB\n▸ Heap Total: ${toMB(mem.heapTotal)} MB\n\n⚙️ Node.js: ${node}\n🖥️ Platform: ${platform}\n\n━━━━━━━━━━━━━━━━━━\n💎 EMon-BHai-BOT`,
    threadID, messageID
  );
};
