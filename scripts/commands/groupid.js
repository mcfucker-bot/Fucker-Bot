module.exports.config = {
  name: "groupid",
  version: "1.0.0",
  permission: 0,
  credits: "Emon",
  prefix: 'awto',
  description: "Get the current group/thread ID",
  category: "without prefix",
  usages: "groupid",
  cooldowns: 5
};

module.exports.run = async function({ api, event }) {
  const info = await api.getThreadInfo(event.threadID);
  return api.sendMessage(
    `╔══════════════════╗\n   🔖 GROUP INFO   \n╚══════════════════╝\n\n💬 গ্রুপের নাম : ${info.threadName || 'N/A'}\n🔖 Group ID : ${event.threadID}\n👥 মোট সদস্য : ${info.participantIDs ? info.participantIDs.length : 'N/A'}\n\n══════════════════\n💎 EMon-BHai-BOT`,
    event.threadID, event.messageID
  );
};
