module.exports.config = {
  name: "allgroups",
  version: "1.0.0",
  permission: 2,
  credits: "Emon",
  prefix: true,
  description: "List all groups the bot is in",
  category: "admin",
  usages: "allgroups",
  cooldowns: 5
};

module.exports.run = async function({ api, event }) {
  const { threadID, messageID } = event;
  const allThreads = [...(global.data.allThreadID || [])];

  if (allThreads.length === 0) return api.sendMessage(
    `╔══════════════════╗\n   💬 ALL GROUPS   \n╚══════════════════╝\n\n❌ কোনো group পাওয়া যায়নি।`,
    threadID, messageID
  );

  let msg = `╔══════════════════╗\n   💬 ALL GROUPS   \n╚══════════════════╝\n\n📋 মোট : ${allThreads.length}টি group\n\n`;
  let count = 0;
  for (const tid of allThreads) {
    if (count >= 20) { msg += `...এবং আরো ${allThreads.length - 20}টি\n`; break; }
    try {
      const info = await api.getThreadInfo(tid);
      count++;
      msg += `${count}. 💬 ${info.threadName || 'Group Chat'}\n   🔖 ${tid}\n   👥 ${info.participantIDs ? info.participantIDs.length : '?'} সদস্য\n\n`;
    } catch (e) { continue; }
  }
  msg += `══════════════════\n💎 EMon-BHai-BOT`;
  return api.sendMessage(msg, threadID, messageID);
};
